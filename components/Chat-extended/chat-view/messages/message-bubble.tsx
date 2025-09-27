import React, { ReactNode } from 'react';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';

import type { DeliveryStatus } from '../../interfaces';
import { formatTime } from '../../utils';
import { MessageStatusIcon } from './message-status-icon';

interface MessageBubbleProps {
  isOwnMessage: boolean;
  status: DeliveryStatus;
  timestamp: string;
  accentColor: string;
  children: ReactNode;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  isOwnMessage,
  status,
  timestamp,
  accentColor,
  children,
}) => (
  <Box
    maxWidth="78%"
    bg={isOwnMessage ? accentColor : '$backgroundLight200'}
    borderRadius="$2xl"
    borderBottomRightRadius={isOwnMessage ? '$md' : '$2xl'}
    borderBottomLeftRadius={isOwnMessage ? '$2xl' : '$md'}
    px="$3"
    py="$2"
    shadowColor="#000000"
    shadowOpacity={0.05}
    shadowRadius={6}
    alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
    flexShrink={1}
  >
    <VStack space="sm">
      {children}
      <HStack alignItems="center" justifyContent="flex-end" space="xs">
        <Text fontSize="$xs" color={isOwnMessage ? '$white' : '$mutedForeground'}>
          {formatTime(timestamp)}
        </Text>
        {isOwnMessage ? (
          <MessageStatusIcon status={status} color="#ffffff" />
        ) : null}
      </HStack>
    </VStack>
  </Box>
);
