import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  HStack,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import { Camera, FileText, Image as ImageIcon, Mic } from 'lucide-react-native';

import type { MessageKind } from '../../interfaces';

interface AttachmentActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (kind: Exclude<MessageKind, 'text'>) => void;
}

const ATTACHMENT_OPTIONS: {
  label: string;
  icon: React.ComponentType;
  kind: Exclude<MessageKind, 'text'>;
}[] = [
  { label: 'Foto dalla libreria', icon: ImageIcon, kind: 'image' },
  { label: 'Scatta foto o video', icon: Camera, kind: 'video' },
  { label: 'Registra audio', icon: Mic, kind: 'audio' },
];

export const AttachmentActionSheet: React.FC<AttachmentActionSheetProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => (
  <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[0.55]}>
    <ActionsheetBackdrop />
    <ActionsheetContent>
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />
      </ActionsheetDragIndicatorWrapper>
      {ATTACHMENT_OPTIONS.map((option) => (
        <ActionsheetItem
          key={option.kind}
          onPress={() => {
            onSelect(option.kind);
            onClose();
          }}
        >
          <HStack space="md" alignItems="center">
            <Icon as={option.icon} color="$mutedForeground" />
            <Text color="$textDark900">{option.label}</Text>
          </HStack>
        </ActionsheetItem>
      ))}
      <ActionsheetItem
        onPress={() => {
          onClose();
        }}
      >
        <HStack space="md" alignItems="center">
          <Icon as={FileText} color="$mutedForeground" />
          <Text color="$textDark900">Documento (coming soon)</Text>
        </HStack>
      </ActionsheetItem>
    </ActionsheetContent>
  </Actionsheet>
);
