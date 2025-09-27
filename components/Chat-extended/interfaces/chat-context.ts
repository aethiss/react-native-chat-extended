import type { Group, GroupCreationPayload, GroupUpdatePayload } from './group';
import type { MessageKind } from './message';
import type { DeviceContact, Participant } from './user';

export interface MessageComposerPayload {
  kind: MessageKind;
  text?: string;
  attachment?: {
    uri: string;
    thumbnailUri?: string;
    durationSeconds?: number;
    waveform?: number[];
  };
  caption?: string;
}

export interface ChatContextValue {
  currentUser: Participant;
  groups: Group[];
  contacts: DeviceContact[];
  favoriteContacts: DeviceContact[];
  isHydrated: boolean;
  activeGroupId?: string;
  setActiveGroupId: (groupId: string | undefined) => void;
  getGroupById: (groupId: string) => Group | undefined;
  getParticipantById: (groupId: string, participantId: string) => Participant | undefined;
  sendMessage: (groupId: string, payload: MessageComposerPayload) => void;
  markMessagesAsRead: (groupId: string) => void;
  toggleGroupMute: (groupId: string) => void;
  toggleGroupPin: (groupId: string) => void;
  toggleGroupArchive: (groupId: string) => void;
  clearGroupMessages: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  addGroup: (payload: GroupCreationPayload) => Group;
  updateGroup: (groupId: string, payload: GroupUpdatePayload) => void;
  addParticipantsToGroup: (groupId: string, participantIds: string[]) => void;
  removeParticipantFromGroup: (groupId: string, participantId: string) => void;
}
