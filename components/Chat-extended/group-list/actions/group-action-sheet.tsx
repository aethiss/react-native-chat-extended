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
import { Archive, BellOff, BellRing, LogOut, Trash2, UserPlus } from 'lucide-react-native';

import type { Group } from '../../interfaces';

interface GroupActionSheetProps {
  group?: Group;
  isOpen: boolean;
  onClose: () => void;
  onToggleMute: (groupId: string) => void;
  onToggleArchive: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  onClearMessages: (groupId: string) => void;
  onInvite: (groupId: string) => void;
}

export const GroupActionSheet: React.FC<GroupActionSheetProps> = ({
  group,
  isOpen,
  onClose,
  onToggleMute,
  onToggleArchive,
  onLeaveGroup,
  onClearMessages,
  onInvite,
}) => (
  <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[0.8]}>
    <ActionsheetBackdrop />
    <ActionsheetContent>
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />
      </ActionsheetDragIndicatorWrapper>
      {group ? (
        <>
          <ActionsheetItem
            onPress={() => {
              onToggleMute(group.id);
              onClose();
            }}
          >
            <HStack space="md" alignItems="center">
              <Icon as={group.isMuted ? BellRing : BellOff} color="$mutedForeground" />
              <Text color="$textDark900">
                {group.isMuted ? 'Riattiva notifiche' : 'Silenzia notifiche'}
              </Text>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              onInvite(group.id);
              onClose();
            }}
          >
            <HStack space="md" alignItems="center">
              <Icon as={UserPlus} color="$mutedForeground" />
              <Text color="$textDark900">Invita partecipanti</Text>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              onClearMessages(group.id);
              onClose();
            }}
          >
            <HStack space="md" alignItems="center">
              <Icon as={Trash2} color="$mutedForeground" />
              <Text color="$textDark900">Ripulisci chat</Text>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              onToggleArchive(group.id);
              onClose();
            }}
          >
            <HStack space="md" alignItems="center">
              <Icon as={Archive} color="$mutedForeground" />
              <Text color="$textDark900">
                {group.isArchived ? 'Togli dagli archivi' : 'Archivia chat'}
              </Text>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              onLeaveGroup(group.id);
              onClose();
            }}
          >
            <HStack space="md" alignItems="center">
              <Icon as={LogOut} color="$error600" />
              <Text color="$error600">Esci dal gruppo</Text>
            </HStack>
          </ActionsheetItem>
        </>
      ) : null}
    </ActionsheetContent>
  </Actionsheet>
);
