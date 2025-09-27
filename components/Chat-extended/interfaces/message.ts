import type { Participant } from './user';

export type MessageKind = 'text' | 'image' | 'audio' | 'video';

export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface MessageBase {
  id: string;
  groupId: string;
  authorId: string;
  createdAt: string;
  kind: MessageKind;
  status: DeliveryStatus;
  isForwarded?: boolean;
  isReply?: boolean;
  replyToMessageId?: string;
  reactions?: {
    emoji: string;
    participantId: string;
  }[];
  isEdited?: boolean;
  isPinned?: boolean;
}

export interface TextMessage extends MessageBase {
  kind: 'text';
  text: string;
  mentions?: string[];
}

export interface ImageMessage extends MessageBase {
  kind: 'image';
  imageUrl: string;
  caption?: string;
  aspectRatio?: number;
}

export interface AudioMessage extends MessageBase {
  kind: 'audio';
  waveform?: number[];
  durationSeconds: number;
  sourceUrl: string;
  isListened?: boolean;
}

export interface VideoMessage extends MessageBase {
  kind: 'video';
  thumbnailUrl: string;
  durationSeconds: number;
  sourceUrl: string;
  caption?: string;
  aspectRatio?: number;
}

export type ChatMessage = TextMessage | ImageMessage | AudioMessage | VideoMessage;

export type MessageWithAuthor = ChatMessage & {
  author?: Participant;
};

export interface DraftMessage {
  text: string;
  attachment?: Partial<ImageMessage | AudioMessage | VideoMessage>;
  lastUpdatedAt: string;
}
