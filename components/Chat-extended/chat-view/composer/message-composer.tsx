import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Box, Button, ButtonIcon, HStack, Textarea, TextareaInput } from '@gluestack-ui/themed';
import { Camera, Image as ImageIcon, Mic, Paperclip, Send } from 'lucide-react-native';

import type { MessageComposerPayload } from '../../interfaces';
import { AttachmentActionSheet } from './attachment-action-sheet';

interface MessageComposerProps {
  onSend: (payload: MessageComposerPayload) => void;
  accentColor: string;
}

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80';
const SAMPLE_VIDEO_THUMB =
  'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80';
const SAMPLE_VIDEO = 'https://example.com/video/sample.mp4';
const SAMPLE_AUDIO = 'https://example.com/audio/sample.m4a';
const SAMPLE_WAVEFORM = [4, 6, 8, 6, 5, 4, 8, 10, 12, 9, 7, 5, 3, 4, 5, 6, 8, 7];

export const MessageComposer: React.FC<MessageComposerProps> = ({ onSend, accentColor }) => {
  const [text, setText] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSendText = () => {
    if (!text.trim()) {
      return;
    }

    onSend({ kind: 'text', text });
    setText('');
  };

  const handleAttachment = (kind: Exclude<MessageComposerPayload['kind'], 'text'>) => {
    if (kind === 'image') {
      onSend({
        kind: 'image',
        attachment: { uri: SAMPLE_IMAGE },
        caption: 'Uno scorcio pazzesco!',
      });
    }

    if (kind === 'video') {
      onSend({
        kind: 'video',
        attachment: { uri: SAMPLE_VIDEO, thumbnailUri: SAMPLE_VIDEO_THUMB, durationSeconds: 75 },
        caption: 'Guarda questo highlight! 🔥',
      });
    }

    if (kind === 'audio') {
      onSend({
        kind: 'audio',
        attachment: { uri: SAMPLE_AUDIO, durationSeconds: 28, waveform: SAMPLE_WAVEFORM },
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Box px="$3" pb="$3" bg="rgba(255,255,255,0.85)">
        <HStack
          bg="$backgroundLight200"
          borderRadius="$full"
          alignItems="center"
          px="$2"
          py="$1"
          space="sm"
        >
          <Button variant="link" action="secondary" onPress={() => setIsSheetOpen(true)}>
            <ButtonIcon as={Paperclip} color="$mutedForeground" />
          </Button>
          <Textarea flex={1} bg="$transparent" borderColor="$transparent">
            <TextareaInput
              value={text}
              onChangeText={setText}
              placeholder="Messaggio"
              color="$textDark900"
              multiline
            />
          </Textarea>
          <Button variant="link" action="secondary" onPress={() => handleAttachment('image')}>
            <ButtonIcon as={ImageIcon} color="$mutedForeground" />
          </Button>
          <Button variant="link" action="secondary" onPress={() => handleAttachment('video')}>
            <ButtonIcon as={Camera} color="$mutedForeground" />
          </Button>
          {text.trim() ? (
            <Button bg={accentColor} borderRadius="$full" onPress={handleSendText} px="$3" py="$2">
              <ButtonIcon as={Send} color="$white" />
            </Button>
          ) : (
            <Button
              variant="solid"
              action="positive"
              borderRadius="$full"
              onPress={() => handleAttachment('audio')}
            >
              <ButtonIcon as={Mic} color="$white" />
            </Button>
          )}
        </HStack>
      </Box>
      <AttachmentActionSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={(kind) => {
          handleAttachment(kind);
        }}
      />
    </KeyboardAvoidingView>
  );
};
