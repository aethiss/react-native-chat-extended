import type { Group } from '@/components/Chat-extended/interfaces';
import type { Participant } from '@/components/Chat-extended/interfaces/user';
import { mockContacts } from './contacts';
import { mockCurrentUser } from './current-user';

const toParticipant = (
  id: string,
  role: Participant['role'],
  presence: Participant['presence'],
): Participant => {
  const contact = mockContacts.find((item) => item.id === id);

  if (!contact) {
    throw new Error(`Contact with id ${id} not found`);
  }

  return {
    ...contact,
    role,
    presence,
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  };
};

const now = new Date();

const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString();

export const mockGroups: Group[] = [
  {
    id: 'group-001',
    title: 'Tutti i giochi blizzard e pure di più',
    description: 'Organizziamo raid e serate gaming',
    accentColor: '#22d3ee',
    avatarUri: undefined,
    createdAt: daysAgo(120),
    updatedAt: minutesAgo(25),
    lastActivityAt: minutesAgo(2),
    inviteLink: 'https://chat.extended/group-001',
    isMuted: false,
    isPinned: true,
    isArchived: false,
    unreadCount: 12,
    notificationsMutedUntil: null,
    participants: [
      { ...mockCurrentUser, role: 'admin', presence: 'online' },
      toParticipant('user-104', 'admin', 'online'),
      toParticipant('user-105', 'member', 'recently'),
      toParticipant('user-102', 'member', 'offline'),
    ],
    typingParticipantIds: ['user-104'],
    messages: [
      {
        id: 'msg-001',
        groupId: 'group-001',
        authorId: 'user-104',
        createdAt: hoursAgo(6),
        kind: 'image',
        status: 'read',
        imageUrl:
          'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=60',
        caption: 'SNAP Points: 7.955',
        aspectRatio: 1.2,
      },
      {
        id: 'msg-002',
        groupId: 'group-001',
        authorId: 'user-104',
        createdAt: hoursAgo(5.8),
        kind: 'text',
        status: 'read',
        text: "comunque questo mi piace. Ma ci vorrà un bel po' prima che possa provarlo!",
      },
      {
        id: 'msg-003',
        groupId: 'group-001',
        authorId: 'user-104',
        createdAt: hoursAgo(5.7),
        kind: 'text',
        status: 'read',
        text: 'troppe carte mancanti. Quando dici tanti punti che rank parliamo @Mirko Caruccio?',
      },
      {
        id: 'msg-004',
        groupId: 'group-001',
        authorId: 'user-000',
        createdAt: minutesAgo(40),
        kind: 'text',
        status: 'delivered',
        text: 'Siamo leggendari! Stasera proviamo una run con il nuovo mazzo?',
      },
      {
        id: 'msg-005',
        groupId: 'group-001',
        authorId: 'user-105',
        createdAt: minutesAgo(22),
        kind: 'audio',
        status: 'delivered',
        sourceUrl: 'https://example.com/audio/raid-strategy.m4a',
        durationSeconds: 68,
        waveform: [5, 8, 12, 6, 4, 9, 11, 5, 3, 8, 10, 5, 4, 7, 9, 4, 5, 8, 12, 7, 5],
      },
      {
        id: 'msg-006',
        groupId: 'group-001',
        authorId: 'user-102',
        createdAt: minutesAgo(18),
        kind: 'video',
        status: 'sent',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1606813902914-9a9e8720c21e?auto=format&fit=crop&w=800&q=60',
        sourceUrl: 'https://example.com/video/legendary-pull.mp4',
        durationSeconds: 42,
        caption: 'Il drop più assurdo della settimana',
      },
    ],
  },
  {
    id: 'group-002',
    title: 'Famiglia Meneghin',
    description: 'Condividiamo foto e aggiornamenti',
    accentColor: '#f97316',
    avatarUri: undefined,
    createdAt: daysAgo(300),
    updatedAt: hoursAgo(8),
    lastActivityAt: hoursAgo(3),
    inviteLink: 'https://chat.extended/group-002',
    isMuted: true,
    isPinned: false,
    isArchived: false,
    unreadCount: 0,
    notificationsMutedUntil: hoursAgo(-12),
    participants: [
      { ...mockCurrentUser, role: 'owner', presence: 'online' },
      toParticipant('user-101', 'admin', 'online'),
      toParticipant('user-103', 'member', 'recently'),
    ],
    typingParticipantIds: [],
    messages: [
      {
        id: 'msg-201',
        groupId: 'group-002',
        authorId: 'user-101',
        createdAt: hoursAgo(7),
        kind: 'image',
        status: 'read',
        imageUrl:
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60',
        caption: 'Cena di ieri sera ❤️',
        aspectRatio: 0.8,
      },
      {
        id: 'msg-202',
        groupId: 'group-002',
        authorId: 'user-103',
        createdAt: hoursAgo(6.5),
        kind: 'text',
        status: 'read',
        text: 'Che buone! Mando il video della preparazione più tardi 👩‍🍳',
      },
      {
        id: 'msg-203',
        groupId: 'group-002',
        authorId: 'user-000',
        createdAt: hoursAgo(5.9),
        kind: 'audio',
        status: 'read',
        sourceUrl: 'https://example.com/audio/auguri.m4a',
        durationSeconds: 31,
        waveform: [2, 4, 6, 8, 10, 8, 4, 6, 8, 10, 5, 2, 4, 6, 7, 5],
        isListened: true,
      },
    ],
  },
  {
    id: 'group-003',
    title: 'Meta AI Playground',
    description: 'Sperimentiamo flussi automazione e prompt',
    accentColor: '#8b5cf6',
    avatarUri: undefined,
    createdAt: daysAgo(40),
    updatedAt: minutesAgo(55),
    lastActivityAt: minutesAgo(4),
    inviteLink: 'https://chat.extended/group-003',
    isMuted: false,
    isPinned: false,
    isArchived: false,
    unreadCount: 2,
    notificationsMutedUntil: null,
    participants: [
      { ...mockCurrentUser, role: 'admin', presence: 'online' },
      toParticipant('user-107', 'admin', 'online'),
      toParticipant('user-108', 'member', 'recently'),
    ],
    typingParticipantIds: ['user-107'],
    messages: [
      {
        id: 'msg-301',
        groupId: 'group-003',
        authorId: 'user-107',
        createdAt: minutesAgo(60),
        kind: 'text',
        status: 'delivered',
        text: 'Ti va di provare un nuovo flusso di automazione per la tua community? 🤖',
      },
      {
        id: 'msg-302',
        groupId: 'group-003',
        authorId: 'user-000',
        createdAt: minutesAgo(58),
        kind: 'text',
        status: 'sent',
        text: 'Volentieri! Mandami qualche esempio visivo così capisco meglio.',
      },
      {
        id: 'msg-303',
        groupId: 'group-003',
        authorId: 'user-107',
        createdAt: minutesAgo(5),
        kind: 'video',
        status: 'delivered',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=60',
        sourceUrl: 'https://example.com/video/workflow-demo.mp4',
        durationSeconds: 89,
        caption: 'Ecco la demo rapida del flusso di onboarding',
      },
    ],
  },
];
