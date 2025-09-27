import React from 'react';
import { Image } from 'expo-image';
import { Box, Text } from '@gluestack-ui/themed';

import type { ImageMessage } from '../../interfaces';
import { MessageBubble } from './message-bubble';

interface ImageMessageBubbleProps {
  message: ImageMessage;
  isOwn: boolean;
  accentColor: string;
}

export const ImageMessageBubble: React.FC<ImageMessageBubbleProps> = ({
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
    <Box borderRadius="$xl" overflow="hidden">
      <Image
        source={{ uri: message.imageUrl }}
        style={{ width: 220, height: message.aspectRatio ? 220 / message.aspectRatio : 200 }}
        contentFit="cover"
      />
    </Box>
    {message.caption ? (
      <Text color={isOwn ? '$white' : '$textDark900'} fontSize="$sm" mt="$1">
        {message.caption}
      </Text>
    ) : null}
  </MessageBubble>
);
