import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed';

import { useChat } from '@/components/Chat-extended/hooks';
import { Avatar, SearchInput } from '@/components/Chat-extended/shared';

const ContactsScreen = () => {
  const { contacts, favoriteContacts } = useChat();
  const [query, setQuery] = useState('');

  const filteredContacts = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) {
      return contacts;
    }

    return contacts.filter(
      (contact) =>
        contact.displayName.toLowerCase().includes(text) || contact.phoneNumber.includes(text),
    );
  }, [contacts, query]);

  return (
    <Box flex={1} bg="$backgroundLight0" pt="$6">
      <VStack space="lg" px="$4">
        <Heading size="lg" color="$textDark900">
          Contatti
        </Heading>
        <SearchInput value={query} onChange={setQuery} placeholder="Cerca contatti" />
        <VStack space="md">
          <Text fontSize="$sm" color="$mutedForeground">
            Preferiti
          </Text>
          <HStack space="md">
            {favoriteContacts.map((contact) => (
              <VStack key={contact.id} space="sm" alignItems="center">
                <Avatar
                  initials={contact.initials}
                  color={contact.avatarColor}
                  uri={contact.avatarUri}
                  size={56}
                />
                <Text
                  fontSize="$xs"
                  color="$mutedForeground"
                  numberOfLines={1}
                  maxWidth={80}
                  textAlign="center"
                >
                  {contact.displayName.split(' ')[0]}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </VStack>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <HStack alignItems="center" space="md" py="$3">
            <Avatar
              initials={item.initials}
              color={item.avatarColor}
              uri={item.avatarUri}
              size={48}
            />
            <VStack flex={1}>
              <Text fontWeight="$medium" color="$textDark900">
                {item.displayName}
              </Text>
              <Text color="$mutedForeground" fontSize="$xs">
                {item.statusMessage ?? item.phoneNumber}
              </Text>
            </VStack>
          </HStack>
        )}
      />
    </Box>
  );
};

export default ContactsScreen;
