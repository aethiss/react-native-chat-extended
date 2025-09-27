import React from 'react';
import { Pressable } from 'react-native';
import { HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Pin, VolumeX } from 'lucide-react-native';

import type { Group } from '../interfaces';
import { Avatar, UnreadBadge } from '../shared';
import { getMessagePreview, formatTime } from '../utils';

interface GroupListItemProps {
  group: Group;
  onPress: (group: Group) => void;
  onLongPress: (group: Group) => void;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({ group, onPress, onLongPress }) => {
  const lastMessage = group.messages[group.messages.length - 1];
  const preview = getMessagePreview(lastMessage);
  const lastMessageTime = lastMessage ? formatTime(lastMessage.createdAt) : '';
  const authorInitials =
    lastMessage?.authorId ===
    group.participants.find((participant) => participant.isCurrentUser)?.id
      ? 'You'
      : undefined;

  return (
    <Pressable onPress={() => onPress(group)} onLongPress={() => onLongPress(group)}>
      <HStack alignItems="center" px="$4" py="$3" space="md">
        <Avatar
          initials={group.title
            .split(' ')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')}
          color={group.accentColor}
          uri={group.avatarUri}
          muted={group.isMuted}
        />
        <VStack flex={1} space="sm">
          <HStack alignItems="center" justifyContent="space-between">
            <HStack space="sm" alignItems="center">
              <Text fontSize="$md" fontWeight="$semibold" color="$textDark900">
                {group.title}
              </Text>
              {group.isPinned ? <Icon as={Pin} size="sm" color="$success600" /> : null}
              {group.isMuted ? <Icon as={VolumeX} size="sm" color="$mutedForeground" /> : null}
            </HStack>
            <Text fontSize="$xs" color="$mutedForeground">
              {lastMessageTime}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              flex={1}
              numberOfLines={1}
              ellipsizeMode="tail"
              color="$mutedForeground"
              fontSize="$sm"
            >
              {authorInitials ? `${authorInitials}: ` : ''}
              {preview}
            </Text>
            <UnreadBadge count={group.unreadCount} />
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
