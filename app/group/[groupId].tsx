import React, { useEffect, useMemo } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Phone, Video, Search as SearchIcon, MoreVertical } from 'lucide-react-native';

import { ChatView } from '@/components/Chat-extended/chat-view';
import { Avatar } from '@/components/Chat-extended/shared';
import { useChat } from '@/components/Chat-extended/hooks';

const GroupChatScreen = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { getGroupById, markMessagesAsRead } = useChat();
  const group = useMemo(
    () => (groupId ? getGroupById(groupId) : undefined),
    [getGroupById, groupId],
  );

  const groupIdValue = group?.id;
  const unreadCount = group?.unreadCount ?? 0;

  useEffect(() => {
    if (!groupIdValue || unreadCount === 0) {
      return;
    }

    markMessagesAsRead(groupIdValue);
  }, [groupIdValue, unreadCount, markMessagesAsRead]);

  if (!group) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text>Chat non trovata.</Text>
      </Box>
    );
  }

  const subtitle = `${group.participants.length} partecipanti • Aggiornato ${new Date(
    group.lastActivityAt,
  ).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HStack space="md" alignItems="center">
              <Avatar
                initials={group.title
                  .split(' ')
                  .slice(0, 2)
                  .map((word) => word.charAt(0).toUpperCase())
                  .join('')}
                color={group.accentColor}
                uri={group.avatarUri}
                size={40}
              />
              <VStack>
                <Text fontWeight="$semibold" color="$textDark900">
                  {group.title}
                </Text>
                <Text fontSize="$xs" color="$mutedForeground">
                  {subtitle}
                </Text>
              </VStack>
            </HStack>
          ),
          headerRight: () => (
            <HStack space="md" alignItems="center">
              <Icon as={Video} color="$mutedForeground" />
              <Icon as={Phone} color="$mutedForeground" />
              <Icon as={SearchIcon} color="$mutedForeground" />
              <Icon as={MoreVertical} color="$mutedForeground" />
            </HStack>
          ),
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#0f172a',
        }}
      />
      <ChatView group={group} />
    </>
  );
};

export default GroupChatScreen;
