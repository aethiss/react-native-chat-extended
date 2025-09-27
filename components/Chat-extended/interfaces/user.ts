export type PresenceStatus = 'online' | 'recently' | 'offline';

export interface UserIdentity {
  id: string;
  displayName: string;
  phoneNumber: string;
  avatarColor: string;
  avatarUri?: string;
  initials: string;
  statusMessage?: string;
}

export interface Contact extends UserIdentity {
  isFavorite?: boolean;
  lastInteractionAt?: string;
}

export type ParticipantRole = 'owner' | 'admin' | 'member';

export interface Participant extends UserIdentity {
  role: ParticipantRole;
  presence: PresenceStatus;
  lastSeenAt?: string;
  isMuted?: boolean;
  isCurrentUser?: boolean;
}

export interface DeviceContact extends Contact {
  emails?: string[];
  tags?: string[];
}
