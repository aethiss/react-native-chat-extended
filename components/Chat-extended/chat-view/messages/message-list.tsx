import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { VStack } from '@gluestack-ui/themed';

import type { ChatMessage } from '../../interfaces';
import { isSameDay } from '../../utils';
import { AudioMessageBubble } from './audio-message-bubble';
import { ImageMessageBubble } from './image-message-bubble';
import { MessageDaySeparator } from './message-day-separator';
import { TextMessageBubble } from './text-message-bubble';
import { VideoMessageBubble } from './video-message-bubble';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
  accentColor: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  accentColor,
}) => {
  const data = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [messages],
  );

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

        return (
          <VStack>
            {index === 0 || shouldShowSeparator ? (
              <MessageDaySeparator date={item.createdAt} />
            ) : null}
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
          </VStack>
        );
      }}
      inverted
    />
  );
};
