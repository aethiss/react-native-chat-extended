import React from 'react';
import { Box, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Play } from 'lucide-react-native';

import type { AudioMessage } from '../../interfaces';
import { MessageBubble } from './message-bubble';

interface AudioMessageBubbleProps {
  message: AudioMessage;
  isOwn: boolean;
  accentColor: string;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
};

export const AudioMessageBubble: React.FC<AudioMessageBubbleProps> = ({
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
    <HStack alignItems="center" space="md">
      <Box bg={isOwn ? 'rgba(255,255,255,0.25)' : '$success100'} borderRadius="$full" p="$2">
        <Icon as={Play} size="sm" color={isOwn ? '$white' : '$success600'} />
      </Box>
      <VStack flex={1} space="sm">
        <HStack alignItems="flex-end" space="xs">
          {message.waveform?.slice(0, 20).map((value, index) => (
            <Box
              key={`${message.id}-wave-${index}`}
              width={3}
              borderRadius="$full"
              bg={isOwn ? 'rgba(255,255,255,0.7)' : '$success500'}
              height={Math.max(8, Math.min(28, value * 2))}
            />
          ))}
        </HStack>
        <Text color={isOwn ? '$white' : '$mutedForeground'} fontSize="$xs">
          {formatDuration(message.durationSeconds)} • Voice message
        </Text>
      </VStack>
    </HStack>
  </MessageBubble>
);
