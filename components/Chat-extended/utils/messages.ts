import type { ChatMessage, MessageKind } from '../interfaces';

export const getMessagePreview = (message?: ChatMessage): string => {
  if (!message) {
    return '';
  }

  switch (message.kind) {
    case 'text':
      return message.text;
    case 'image':
      return message.caption ? `📷 ${message.caption}` : '📷 Photo';
    case 'audio':
      return '🎧 Voice message';
    case 'video':
      return message.caption ? `🎬 ${message.caption}` : '🎬 Video';
    default:
      return '';
  }
};

export const isMediaMessage = (kind: MessageKind): boolean => kind !== 'text';
