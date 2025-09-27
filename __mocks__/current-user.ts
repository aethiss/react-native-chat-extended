import type { Participant } from '@/components/Chat-extended/interfaces';

export const mockCurrentUser: Participant = {
  id: 'user-000',
  displayName: 'Luca Meneghin',
  initials: 'LM',
  phoneNumber: '+39 333 555 0190',
  avatarColor: '#22c55e',
  role: 'owner',
  presence: 'online',
  statusMessage: 'Always exploring new builds',
  isCurrentUser: true,
};
