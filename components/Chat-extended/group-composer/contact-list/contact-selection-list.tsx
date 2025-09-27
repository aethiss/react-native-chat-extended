import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Box } from '@gluestack-ui/themed';

import type { DeviceContact } from '../../interfaces';
import { SearchInput } from '../../shared';
import { ContactListItem } from './contact-list-item';

interface ContactSelectionListProps {
  contacts: DeviceContact[];
  selectedIds: string[];
  excludedIds?: string[];
  onToggle: (contactId: string) => void;
}

export const ContactSelectionList: React.FC<ContactSelectionListProps> = ({
  contacts,
  selectedIds,
  excludedIds = [],
  onToggle,
}) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return contacts;
    }

    return contacts.filter(
      (contact) =>
        contact.displayName.toLowerCase().includes(query) || contact.phoneNumber.includes(query),
    );
  }, [contacts, search]);

  return (
    <Box flex={1}>
      <SearchInput value={search} onChange={setSearch} placeholder="Cerca contatti" />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            isSelected={selectedIds.includes(item.id)}
            isDisabled={excludedIds.includes(item.id)}
            onToggle={onToggle}
          />
        )}
      />
    </Box>
  );
};
