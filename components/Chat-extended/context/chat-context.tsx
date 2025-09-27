import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { mockContacts } from '@/__mocks__/contacts';
import { mockCurrentUser } from '@/__mocks__/current-user';
import { mockGroups } from '@/__mocks__/groups';
import type {
  ChatContextValue,
  ChatMessage,
  Group,
  GroupCreationPayload,
  GroupUpdatePayload,
  MessageComposerPayload,
  Participant,
} from '../interfaces';
import type { DeviceContact } from '../interfaces/user';
import { persistChatState, loadChatState } from '../storage/chat-storage';
import { createId } from '../utils';

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const toParticipant = (contact: DeviceContact, overrides?: Partial<Participant>): Participant => ({
  ...contact,
  role: overrides?.role ?? 'member',
  presence: overrides?.presence ?? 'recently',
  lastSeenAt: overrides?.lastSeenAt,
  isMuted: overrides?.isMuted,
  isCurrentUser: overrides?.isCurrentUser,
});

const buildMessageFromPayload = (
  groupId: string,
  authorId: string,
  payload: MessageComposerPayload,
): ChatMessage => {
  const createdAt = new Date().toISOString();

  switch (payload.kind) {
    case 'text':
      return {
        id: createId('msg'),
        groupId,
        authorId,
        createdAt,
        status: 'sending',
        kind: 'text',
        text: payload.text?.trim() ?? '',
      };
    case 'image':
      return {
        id: createId('msg'),
        groupId,
        authorId,
        createdAt,
        status: 'sending',
        kind: 'image',
        imageUrl: payload.attachment?.uri ?? '',
        caption: payload.caption,
        aspectRatio: 0.9,
      };
    case 'audio':
      return {
        id: createId('msg'),
        groupId,
        authorId,
        createdAt,
        status: 'sending',
        kind: 'audio',
        sourceUrl: payload.attachment?.uri ?? '',
        durationSeconds: payload.attachment?.durationSeconds ?? 30,
        waveform: payload.attachment?.waveform ?? [4, 5, 6, 8, 6, 5, 7, 4, 6, 8, 9, 7, 5, 4, 6],
      };
    case 'video':
      return {
        id: createId('msg'),
        groupId,
        authorId,
        createdAt,
        status: 'sending',
        kind: 'video',
        sourceUrl: payload.attachment?.uri ?? '',
        thumbnailUrl: payload.attachment?.thumbnailUri ?? payload.attachment?.uri ?? '',
        durationSeconds: payload.attachment?.durationSeconds ?? 60,
        caption: payload.caption,
        aspectRatio: 1.6,
      };
    default: {
      const exhaustiveCheck: never = payload.kind;
      throw new Error(`Unsupported message type: ${exhaustiveCheck}`);
    }
  }
};

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [contacts, setContacts] = useState<DeviceContact[]>([]);
  const [currentUser, setCurrentUser] = useState<Participant>(mockCurrentUser);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | undefined>();
  const hydrationRef = useRef(false);

  useEffect(() => {
    if (hydrationRef.current) {
      return;
    }

    const stored = loadChatState();

    if (stored) {
      setGroups(stored.groups);
      setContacts(stored.contacts);
      setCurrentUser(stored.currentUser);
    } else {
      const seedGroups = mockGroups;
      const seedContacts = mockContacts;
      setGroups(seedGroups);
      setContacts(seedContacts);
      setCurrentUser(mockCurrentUser);
      persistChatState({
        groups: seedGroups,
        contacts: seedContacts,
        currentUser: mockCurrentUser,
      });
    }

    hydrationRef.current = true;
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    persistChatState({ groups, contacts, currentUser });
  }, [contacts, currentUser, groups, isHydrated]);

  const getGroupById = useCallback(
    (groupId: string) => groups.find((group) => group.id === groupId),
    [groups],
  );

  const getParticipantById = useCallback(
    (groupId: string, participantId: string) =>
      getGroupById(groupId)?.participants.find((participant) => participant.id === participantId),
    [getGroupById],
  );

  const updateGroupById = useCallback((groupId: string, updater: (group: Group) => Group) => {
    setGroups((prev) => prev.map((group) => (group.id === groupId ? updater(group) : group)));
  }, []);

  const sendMessage = useCallback(
    (groupId: string, payload: MessageComposerPayload) => {
      if (payload.kind === 'text' && !payload.text?.trim()) {
        return;
      }

      const message = buildMessageFromPayload(groupId, currentUser.id, payload);

      setGroups((prevGroups) =>
        prevGroups.map((group) => {
          if (group.id !== groupId) {
            return group;
          }

          return {
            ...group,
            messages: [...group.messages, message],
            lastActivityAt: message.createdAt,
            updatedAt: message.createdAt,
            unreadCount: group.unreadCount,
            typingParticipantIds: group.typingParticipantIds.filter((id) => id !== currentUser.id),
          };
        }),
      );

      setTimeout(() => {
        setGroups((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id !== groupId) {
              return group;
            }

            return {
              ...group,
              messages: group.messages.map((item) =>
                item.id === message.id ? { ...item, status: 'delivered' } : item,
              ),
            };
          }),
        );
      }, 1200);
    },
    [currentUser.id],
  );

  const markMessagesAsRead = useCallback(
    (groupId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        unreadCount: 0,
        messages: group.messages.map((message) =>
          message.authorId === currentUser.id ? message : { ...message, status: 'read' },
        ),
      }));
    },
    [currentUser.id, updateGroupById],
  );

  const toggleGroupMute = useCallback(
    (groupId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        isMuted: !group.isMuted,
      }));
    },
    [updateGroupById],
  );

  const toggleGroupPin = useCallback(
    (groupId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        isPinned: !group.isPinned,
      }));
    },
    [updateGroupById],
  );

  const toggleGroupArchive = useCallback(
    (groupId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        isArchived: !group.isArchived,
      }));
    },
    [updateGroupById],
  );

  const clearGroupMessages = useCallback(
    (groupId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        messages: [],
        unreadCount: 0,
      }));
    },
    [updateGroupById],
  );

  const leaveGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((group) => group.id !== groupId));
  }, []);

  const addGroup = useCallback(
    (payload: GroupCreationPayload) => {
      const nowISO = new Date().toISOString();
      const participantSet = new Set(payload.selectedParticipantIds);
      const selectedContacts = contacts.filter((contact) => participantSet.has(contact.id));

      const participants: Participant[] = [
        { ...currentUser, role: 'admin', presence: 'online' },
        ...selectedContacts.map((contact) =>
          toParticipant(contact, {
            role: 'member',
            presence: 'recently',
          }),
        ),
      ];

      const group: Group = {
        id: createId('group'),
        title: payload.title,
        description: payload.description,
        avatarUri: payload.avatarUri,
        accentColor: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
        createdAt: nowISO,
        updatedAt: nowISO,
        lastActivityAt: nowISO,
        inviteLink: `https://chat.extended/${Math.random().toString(36).slice(2, 9)}`,
        isMuted: false,
        isPinned: true,
        isArchived: false,
        unreadCount: 0,
        notificationsMutedUntil: null,
        participants,
        typingParticipantIds: [],
        messages: [
          {
            id: createId('msg'),
            groupId: 'placeholder',
            authorId: currentUser.id,
            createdAt: nowISO,
            kind: 'text',
            status: 'sent',
            text: `Benvenuti in ${payload.title}!`,
          },
        ],
      };

      group.messages = group.messages.map((message) => ({
        ...message,
        groupId: group.id,
      }));

      setGroups((prev) => [group, ...prev]);

      return group;
    },
    [contacts, currentUser],
  );

  const updateGroup = useCallback(
    (groupId: string, payload: GroupUpdatePayload) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        ...payload,
        updatedAt: new Date().toISOString(),
      }));
    },
    [updateGroupById],
  );

  const addParticipantsToGroup = useCallback(
    (groupId: string, participantIds: string[]) => {
      updateGroupById(groupId, (group) => {
        const existingIds = new Set(group.participants.map((participant) => participant.id));
        const additionalParticipants = contacts
          .filter((contact) => participantIds.includes(contact.id) && !existingIds.has(contact.id))
          .map((contact) =>
            toParticipant(contact, {
              role: 'member',
              presence: 'recently',
            }),
          );

        return {
          ...group,
          participants: [...group.participants, ...additionalParticipants],
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [contacts, updateGroupById],
  );

  const removeParticipantFromGroup = useCallback(
    (groupId: string, participantId: string) => {
      updateGroupById(groupId, (group) => ({
        ...group,
        participants: group.participants.filter((participant) => participant.id !== participantId),
      }));
    },
    [updateGroupById],
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      currentUser,
      groups,
      contacts,
      favoriteContacts: contacts.filter((contact) => contact.isFavorite),
      isHydrated,
      activeGroupId,
      setActiveGroupId,
      getGroupById,
      getParticipantById,
      sendMessage,
      markMessagesAsRead,
      toggleGroupMute,
      toggleGroupPin,
      toggleGroupArchive,
      clearGroupMessages,
      leaveGroup,
      addGroup,
      updateGroup,
      addParticipantsToGroup,
      removeParticipantFromGroup,
    }),
    [
      activeGroupId,
      addGroup,
      addParticipantsToGroup,
      clearGroupMessages,
      contacts,
      currentUser,
      getGroupById,
      getParticipantById,
      groups,
      isHydrated,
      leaveGroup,
      markMessagesAsRead,
      removeParticipantFromGroup,
      sendMessage,
      toggleGroupArchive,
      toggleGroupMute,
      toggleGroupPin,
      updateGroup,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};
