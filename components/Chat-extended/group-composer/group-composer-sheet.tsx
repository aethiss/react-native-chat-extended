import React, { useEffect, useMemo, useState } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import type { Group, GroupCreationPayload } from '../interfaces';
import { useChat } from '../hooks';
import { ContactSelectionList } from './contact-list/contact-selection-list';

interface GroupComposerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (payload: GroupCreationPayload) => void;
  onInviteParticipants?: (groupId: string, participantIds: string[]) => void;
  defaultSelectedGroup?: Group;
}

export const GroupComposerSheet: React.FC<GroupComposerSheetProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  onInviteParticipants,
  defaultSelectedGroup,
}) => {
  const { contacts, currentUser } = useChat();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const mode: 'create' | 'invite' = defaultSelectedGroup ? 'invite' : 'create';

  useEffect(() => {
    if (isOpen) {
      setTitle(defaultSelectedGroup?.title ?? '');
      setDescription(defaultSelectedGroup?.description ?? '');
      setSelectedIds([]);
    }
  }, [defaultSelectedGroup, isOpen]);

  const excludedIds = useMemo(() => {
    if (!defaultSelectedGroup) {
      return [currentUser.id];
    }

    return defaultSelectedGroup.participants.map((participant) => participant.id);
  }, [currentUser.id, defaultSelectedGroup]);

  const toggleContact = (contactId: string) => {
    if (excludedIds.includes(contactId)) {
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    );
  };

  const handlePrimaryAction = () => {
    if (mode === 'create') {
      if (!title.trim()) {
        return;
      }

      onCreateGroup({
        title: title.trim(),
        description: description.trim() || undefined,
        selectedParticipantIds: selectedIds,
      });
      setTitle('');
      setDescription('');
      setSelectedIds([]);
    } else if (defaultSelectedGroup && onInviteParticipants) {
      onInviteParticipants(defaultSelectedGroup.id, selectedIds);
      setSelectedIds([]);
    }
  };

  const isActionDisabled = mode === 'create' ? !title.trim() : selectedIds.length === 0;

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[0.9]}>
      <ActionsheetBackdrop />
      <ActionsheetContent maxHeight="90%">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack space="lg" flex={1} width="100%">
          <Box px="$4">
            <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
              {mode === 'create' ? 'Crea nuovo gruppo' : 'Invita amici'}
            </Text>
            <Text fontSize="$sm" color="$mutedForeground">
              {mode === 'create'
                ? 'Seleziona i contatti da aggiungere e dai un nome alla chat di gruppo.'
                : 'Scegli i contatti da invitare nel gruppo esistente.'}
            </Text>
          </Box>
          <VStack space="md" px="$4">
            <FormControl isDisabled={mode === 'invite'}>
              <FormControlLabel>
                <FormControlLabelText>Nome gruppo</FormControlLabelText>
              </FormControlLabel>
              <Input borderRadius="$lg">
                <InputField value={title} onChangeText={setTitle} placeholder="Titolo" />
              </Input>
            </FormControl>
            <FormControl isDisabled={mode === 'invite'}>
              <FormControlLabel>
                <FormControlLabelText>Descrizione</FormControlLabelText>
              </FormControlLabel>
              <Input borderRadius="$lg">
                <InputField
                  value={description}
                  onChangeText={setDescription}
                  placeholder="A cosa serve questo gruppo?"
                />
              </Input>
            </FormControl>
          </VStack>
          <Box flex={1} px="$4">
            <ContactSelectionList
              contacts={contacts}
              selectedIds={selectedIds}
              excludedIds={excludedIds}
              onToggle={toggleContact}
            />
          </Box>
          <Box px="$4" pb="$6">
            <Button
              onPress={() => {
                handlePrimaryAction();
                onClose();
              }}
              isDisabled={isActionDisabled}
              borderRadius="$full"
              bg="$success600"
            >
              <ButtonText color="$white">
                {mode === 'create' ? 'Crea gruppo' : 'Invia inviti'}
              </ButtonText>
            </Button>
          </Box>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};
