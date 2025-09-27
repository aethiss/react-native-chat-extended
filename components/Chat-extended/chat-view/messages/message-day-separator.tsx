import React from 'react';
import { Center, Text } from '@gluestack-ui/themed';

import { formatDay } from '../../utils';

interface MessageDaySeparatorProps {
  date: string;
}

export const MessageDaySeparator: React.FC<MessageDaySeparatorProps> = ({ date }) => (
  <Center my="$2">
    <Text
      px="$3"
      py="$1"
      bg="$backgroundLight200"
      borderRadius="$full"
      color="$mutedForeground"
      fontSize="$xs"
      fontWeight="$medium"
    >
      {formatDay(date)}
    </Text>
  </Center>
);
