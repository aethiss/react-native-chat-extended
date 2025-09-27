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
}) => {
  const iconWrapperBg = isOwn ? 'rgba(255,255,255,0.25)' : 'rgba(15, 23, 42, 0.08)';
  const iconColor = isOwn ? '$white' : accentColor;
  const trackBg = isOwn ? 'rgba(255,255,255,0.35)' : '$backgroundLight300';
  const progressBg = isOwn ? '$white' : accentColor;
  const secondaryTextColor = isOwn ? 'rgba(255,255,255,0.85)' : '$mutedForeground';
  const primaryTextColor = isOwn ? '$white' : '$textDark900';

  const progress = message.isListened ? 1 : Math.min(0.65, (message.waveform?.length ?? 0) / 25);

  return (
    <MessageBubble
      isOwnMessage={isOwn}
      status={message.status}
      timestamp={message.createdAt}
      accentColor={accentColor}
    >
      <HStack alignItems="center" space="md">
        <Box
          width={44}
          height={44}
          borderRadius={22}
          bg={iconWrapperBg}
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Play} size="sm" color={iconColor} />
        </Box>
        <VStack flex={1} space="xs">
          <Box height={3} borderRadius="$full" overflow="hidden" bg={trackBg}>
            <Box height="100%" width={`${Math.max(0.2, progress) * 100}%`} bg={progressBg} />
          </Box>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color={secondaryTextColor} fontSize="$xs">
              0:00
            </Text>
            <Text color={primaryTextColor} fontSize="$xs" fontWeight="$medium">
              {formatDuration(message.durationSeconds)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </MessageBubble>
  );
};
