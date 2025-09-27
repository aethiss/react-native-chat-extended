import React, { useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { Box, HStack, Text } from '@gluestack-ui/themed';

import type { Group, MessageComposerPayload } from '../interfaces';
import { useChat } from '../hooks';
import { TypingIndicator } from '../shared';
import { MessageList } from './messages/message-list';
import { MessageComposer } from './composer/message-composer';

const backgroundImage = require('@/assets/images/backgrounds/background_dark_1.png');

interface ChatViewProps {
  group: Group;
}

export const ChatView: React.FC<ChatViewProps> = ({ group }) => {
  const { currentUser, sendMessage } = useChat();

  const typingNames = useMemo(() => {
    if (!group.typingParticipantIds.length) {
      return '';
    }

    const names = group.participants
      .filter(
        (participant) =>
          group.typingParticipantIds.includes(participant.id) && !participant.isCurrentUser,
      )
      .map((participant) => participant.displayName.split(' ')[0]);

    if (!names.length) {
      return '';
    }

    if (names.length === 1) {
      return `${names[0]} sta scrivendo...`;
    }

    return `${names.slice(0, 2).join(', ')} stanno scrivendo...`;
  }, [group.participants, group.typingParticipantIds]);

  const handleSend = (payload: MessageComposerPayload) => {
    sendMessage(group.id, payload);
  };

  return (
    <Box flex={1} bg="$backgroundLight100">
      <ImageBackground source={backgroundImage} style={{ flex: 1 }} resizeMode="cover">
        <MessageList
          messages={group.messages}
          currentUserId={currentUser.id}
          accentColor={group.accentColor}
          participants={group.participants}
        />
      </ImageBackground>
      {typingNames ? (
        <Box px="$4" py="$2" bg="rgba(0,0,0,0.25)">
          <HStack space="md" alignItems="center">
            <TypingIndicator color={group.accentColor} />
            <Text color="$white" fontSize="$xs">
              {typingNames}
            </Text>
          </HStack>
        </Box>
      ) : null}
      <MessageComposer onSend={handleSend} accentColor={group.accentColor} />
    </Box>
  );
};
