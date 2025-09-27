import React from 'react';
import { Badge, BadgeText } from '@gluestack-ui/themed';

interface UnreadBadgeProps {
  count: number;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count }) => {
  if (count <= 0) {
    return null;
  }

  const label = count > 99 ? '99+' : count.toString();

  return (
    <Badge bg="$success600" borderRadius="$full" px="$2" py="$1">
      <BadgeText color="$white" fontSize="$xs" fontWeight="$bold">
        {label}
      </BadgeText>
    </Badge>
  );
};
