import React from 'react';
import { Icon } from '@gluestack-ui/themed';
import { Check, CheckCheck, Clock } from 'lucide-react-native';

import type { DeliveryStatus } from '../../interfaces';

interface MessageStatusIconProps {
  status: DeliveryStatus;
  color?: string;
}

export const MessageStatusIcon: React.FC<MessageStatusIconProps> = ({
  status,
  color = '#22c55e',
}) => {
  switch (status) {
    case 'sending':
      return <Icon as={Clock} size="xs" color={color} />;
    case 'sent':
      return <Icon as={Check} size="xs" color={color} />;
    case 'delivered':
    case 'read':
      return <Icon as={CheckCheck} size="xs" color={color} />;
    default:
      return null;
  }
};
