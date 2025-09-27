import React from 'react';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  HStack,
  VStack,
  Text,
} from '@gluestack-ui/themed';
import { Check } from 'lucide-react-native';

import type { DeviceContact } from '../../interfaces';
import { Avatar } from '../../shared';

interface ContactListItemProps {
  contact: DeviceContact;
  isSelected: boolean;
  isDisabled?: boolean;
  onToggle: (contactId: string) => void;
}

export const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  isSelected,
  isDisabled,
  onToggle,
}) => (
  <Checkbox
    isChecked={isSelected}
    isDisabled={isDisabled}
    onChange={() => onToggle(contact.id)}
    value={contact.id}
    borderColor="$transparent"
    py="$2"
  >
    <HStack space="md" alignItems="center">
      <CheckboxIndicator borderColor="$success600" bg={isSelected ? '$success600' : '$white'}>
        <CheckboxIcon as={Check} color={isSelected ? 'white' : undefined} />
      </CheckboxIndicator>
      <Avatar
        initials={contact.initials}
        color={contact.avatarColor}
        uri={contact.avatarUri}
        size={40}
      />
      <VStack flex={1} space="xs">
        <Text fontWeight="$medium" color="$textDark900">
          {contact.displayName}
        </Text>
        {contact.statusMessage ? (
          <Text fontSize="$xs" color="$mutedForeground" numberOfLines={1} ellipsizeMode="tail">
            {contact.statusMessage}
          </Text>
        ) : null}
      </VStack>
    </HStack>
  </Checkbox>
);
