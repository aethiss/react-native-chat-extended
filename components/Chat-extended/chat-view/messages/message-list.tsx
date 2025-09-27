import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { HStack, VStack } from '@gluestack-ui/themed';

import type { ChatMessage } from '../../interfaces';
import { isSameDay } from '../../utils';
import { AudioMessageBubble } from './audio-message-bubble';
import { ImageMessageBubble } from './image-message-bubble';
import { MessageDaySeparator } from './message-day-separator';
import { TextMessageBubble } from './text-message-bubble';
import { VideoMessageBubble } from './video-message-bubble';
import type { Participant } from '../../interfaces/user';
import { Avatar } from '../../shared';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
  accentColor: string;
  participants: Participant[];
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  accentColor,
  participants,
}) => {
  const data = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [messages],
  );

  const participantMap = useMemo(
    () =>
      participants.reduce<Record<string, Participant>>((acc, participant) => {
        acc[participant.id] = participant;
        return acc;
      }, {}),
    [participants],
  );

  const renderAvatar = (participantId: string, fallbackColor: string) => {
    const participant = participantMap[participantId];

    if (!participant) {
      return (
        <Avatar
          size={36}
          initials="?"
          color={fallbackColor}
          muted
        />
      );
    }

    return (
      <Avatar
        size={36}
        initials={participant.initials}
        color={participant.avatarColor}
        uri={participant.avatarUri}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 12, paddingBottom: 72 }}
      renderItem={({ item, index }) => {
        const isOwn = item.authorId === currentUserId;
        const previousMessage = data[index - 1];
        const shouldShowSeparator =
          previousMessage && !isSameDay(previousMessage.createdAt, item.createdAt);

        const avatar = renderAvatar(item.authorId, accentColor);

        return (
          <VStack>
            {index === 0 || shouldShowSeparator ? (
              <MessageDaySeparator date={item.createdAt} />
            ) : null}
            <HStack
              px="$3"
              py="$1"
              alignItems="flex-end"
              space="sm"
              flexDirection={isOwn ? 'row-reverse' : 'row'}
              justifyContent="flex-start"
            >
              {avatar}
              {item.kind === 'text' ? (
                <TextMessageBubble message={item} isOwn={isOwn} accentColor={accentColor} />
              ) : null}
              {item.kind === 'image' ? (
                <ImageMessageBubble message={item} isOwn={isOwn} accentColor={accentColor} />
              ) : null}
              {item.kind === 'audio' ? (
                <AudioMessageBubble message={item} isOwn={isOwn} accentColor={accentColor} />
              ) : null}
              {item.kind === 'video' ? (
                <VideoMessageBubble message={item} isOwn={isOwn} accentColor={accentColor} />
              ) : null}
            </HStack>
          </VStack>
        );
      }}
      inverted
    />
  );
};
