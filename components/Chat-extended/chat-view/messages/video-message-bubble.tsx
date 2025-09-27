import React from 'react';
import { Image } from 'expo-image';
import { Box, Center, HStack, Icon, Text } from '@gluestack-ui/themed';
import { Play } from 'lucide-react-native';

import type { VideoMessage } from '../../interfaces';
import { MessageBubble } from './message-bubble';

interface VideoMessageBubbleProps {
  message: VideoMessage;
  isOwn: boolean;
  accentColor: string;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
};

export const VideoMessageBubble: React.FC<VideoMessageBubbleProps> = ({
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
    <Box borderRadius="$xl" overflow="hidden" position="relative">
      <Image
        source={{ uri: message.thumbnailUrl }}
        style={{ width: 220, height: message.aspectRatio ? 220 / message.aspectRatio : 180 }}
        contentFit="cover"
      />
      <Center position="absolute" inset={0}>
        <Box bg="rgba(0,0,0,0.4)" borderRadius="$full" p="$2">
          <Icon as={Play} size="md" color="$white" />
        </Box>
      </Center>
      <HStack
        position="absolute"
        bottom={8}
        right={8}
        bg="rgba(0,0,0,0.55)"
        px="$2"
        py="$1"
        borderRadius="$full"
        space="xs"
      >
        <Icon as={Play} size="xs" color="$white" />
        <Text color="$white" fontSize="$xs">
          {formatDuration(message.durationSeconds)}
        </Text>
      </HStack>
    </Box>
    {message.caption ? (
      <Text color={isOwn ? '$white' : '$textDark900'} fontSize="$sm" mt="$1">
        {message.caption}
      </Text>
    ) : null}
  </MessageBubble>
);
