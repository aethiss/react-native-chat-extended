import React from 'react';
import { Button, ButtonIcon, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { Camera, Plus, Settings2 } from 'lucide-react-native';

import { SearchInput } from '../shared';

interface GroupListHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateGroup: () => void;
}

export const GroupListHeader: React.FC<GroupListHeaderProps> = ({
  search,
  onSearchChange,
  onCreateGroup,
}) => (
  <VStack space="md" px="$4" pt="$6" pb="$2" bg="$backgroundLight0">
    <HStack alignItems="center" justifyContent="space-between">
      <Button variant="link" action="secondary" px="$0">
        <ButtonText color="$success700" fontWeight="$semibold">
          Modifica
        </ButtonText>
      </Button>
      <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900">
        Chats
      </Text>
      <HStack space="sm">
        <Button variant="link" action="secondary" px="$0">
          <ButtonIcon as={Camera} size="lg" color="$success700" />
        </Button>
        <Button onPress={onCreateGroup} variant="link" action="positive" px="$0">
          <ButtonIcon as={Plus} size="lg" color="$success700" />
        </Button>
      </HStack>
    </HStack>
    <SearchInput value={search} onChange={onSearchChange} placeholder="Ask Meta AI or Search" />
    <HStack space="md">
      <Button variant="outline" action="secondary" borderRadius="$full" px="$3" py="$2">
        <ButtonIcon as={Settings2} size="sm" color="$success700" />
        <ButtonText color="$success700" ml="$2">
          Communities
        </ButtonText>
      </Button>
      <Button variant="outline" action="secondary" borderRadius="$full" px="$3" py="$2">
        <ButtonText color="$mutedForeground">Broadcast lists</ButtonText>
      </Button>
    </HStack>
  </VStack>
);
