import type { ChatMessage, DraftMessage } from './message';
import type { Participant } from './user';

export interface GroupMeta {
  id: string;
  title: string;
  description?: string;
  avatarUri?: string;
  accentColor: string;
  createdAt: string;
  updatedAt: string;
  isMuted: boolean;
  isPinned: boolean;
  isArchived: boolean;
  unreadCount: number;
  notificationsMutedUntil?: string | null;
}

export interface Group extends GroupMeta {
  participants: Participant[];
  messages: ChatMessage[];
  typingParticipantIds: string[];
  lastActivityAt: string;
  inviteLink?: string;
  draft?: DraftMessage;
}

export interface GroupPreview extends GroupMeta {
  lastMessageText?: string;
  lastMessageAt?: string;
  lastAuthorId?: string;
}

export interface GroupCreationPayload {
  title: string;
  selectedParticipantIds: string[];
  description?: string;
  avatarUri?: string;
}

export interface GroupUpdatePayload {
  title?: string;
  description?: string;
  avatarUri?: string;
  isMuted?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
}
