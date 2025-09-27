import { useMemo } from 'react';

import type { Group } from '../interfaces';
import { useChatContext } from '../context';

export const useChat = () => {
  const context = useChatContext();

  const sortedGroups = useMemo<Group[]>(() => {
    const pinned = context.groups.filter((group) => group.isPinned && !group.isArchived);
    const regular = context.groups.filter((group) => !group.isPinned && !group.isArchived);
    const archived = context.groups.filter((group) => group.isArchived);

    const sortByLastActivity = (list: Group[]) =>
      [...list].sort(
        (a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime(),
      );

    return [
      ...sortByLastActivity(pinned),
      ...sortByLastActivity(regular),
      ...sortByLastActivity(archived),
    ];
  }, [context.groups]);

  return {
    ...context,
    sortedGroups,
  };
};
