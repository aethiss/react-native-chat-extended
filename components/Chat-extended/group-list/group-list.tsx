import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Divider } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

import type { Group } from '../interfaces';
import { useChat } from '../hooks';
import { getMessagePreview } from '../utils';
import { GroupComposerSheet } from '../group-composer';
import { GroupActionSheet } from './actions/group-action-sheet';
import { GroupListHeader } from './group-list-header';
import { GroupListItem } from './group-list-item';
import { GroupSwipeable } from './group-swipeable';

export const GroupList: React.FC = () => {
  const router = useRouter();
  const {
    sortedGroups,
    toggleGroupMute,
    toggleGroupArchive,
    toggleGroupPin,
    setActiveGroupId,
    leaveGroup,
    clearGroupMessages,
    addGroup,
    addParticipantsToGroup,
  } = useChat();

  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return sortedGroups;
    }

    return sortedGroups.filter((group) => {
      const matchesTitle = group.title.toLowerCase().includes(query);
      const matchesParticipant = group.participants.some((participant) =>
        participant.displayName.toLowerCase().includes(query),
      );
      const lastMessagePreview = getMessagePreview(group.messages[group.messages.length - 1]);
      const matchesPreview = lastMessagePreview.toLowerCase().includes(query);

      return matchesTitle || matchesParticipant || matchesPreview;
    });
  }, [search, sortedGroups]);

  const openGroup = (group: Group) => {
    setActiveGroupId(group.id);
    router.push({ pathname: '/group/[groupId]', params: { groupId: group.id } });
  };

  const handleLongPress = (group: Group) => {
    setSelectedGroup(group);
    setIsActionSheetOpen(true);
  };

  return (
    <Box flex={1} bg="$backgroundLight0">
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <GroupSwipeable
            onArchive={() => toggleGroupArchive(item.id)}
            onPin={() => toggleGroupPin(item.id)}
          >
            <GroupListItem group={item} onPress={openGroup} onLongPress={handleLongPress} />
            <Divider ml="$20" bg="$backgroundLight200" />
          </GroupSwipeable>
        )}
        ListHeaderComponent={
          <GroupListHeader
            search={search}
            onSearchChange={setSearch}
            onCreateGroup={() => {
              setSelectedGroup(undefined);
              setIsComposerOpen(true);
            }}
          />
        }
      />
      <GroupActionSheet
        group={selectedGroup}
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onToggleArchive={toggleGroupArchive}
        onToggleMute={toggleGroupMute}
        onLeaveGroup={leaveGroup}
        onClearMessages={clearGroupMessages}
        onInvite={() => setIsComposerOpen(true)}
      />
      <GroupComposerSheet
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onCreateGroup={(payload) => {
          const group = addGroup(payload);
          setIsComposerOpen(false);
          openGroup(group);
        }}
        onInviteParticipants={(groupId, participantIds) => {
          addParticipantsToGroup(groupId, participantIds);
          setIsComposerOpen(false);
        }}
        defaultSelectedGroup={selectedGroup}
      />
    </Box>
  );
};
