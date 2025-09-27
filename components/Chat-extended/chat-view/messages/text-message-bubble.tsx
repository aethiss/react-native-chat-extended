import React from 'react';
import { Text } from '@gluestack-ui/themed';

import type { TextMessage } from '../../interfaces';
import { MessageBubble } from './message-bubble';

interface TextMessageBubbleProps {
  message: TextMessage;
  isOwn: boolean;
  accentColor: string;
}

export const TextMessageBubble: React.FC<TextMessageBubbleProps> = ({
  message,
  isOwn,
  accentColor,
}) => (
  <MessageBubble
    isOwnMessage={isOwn}
    status={message.status}
    timestamp={message.createdAt}
    accentColor={accentColor}
  >
    <Text color={isOwn ? '$white' : '$textDark900'} fontSize="$sm">
      {message.text}
    </Text>
  </MessageBubble>
);
