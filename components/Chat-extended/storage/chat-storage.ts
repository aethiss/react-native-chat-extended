import type { Group } from '../interfaces';
import type { DeviceContact, Participant } from '../interfaces/user';
import { getStorageJSON, setStorageJSON } from './mmkv';

const CHAT_STATE_KEY = 'chat/state/v1';

export interface PersistedChatState {
  groups: Group[];
  contacts: DeviceContact[];
  currentUser: Participant;
}

export const loadChatState = (): PersistedChatState | undefined =>
  getStorageJSON<PersistedChatState>(CHAT_STATE_KEY);

export const persistChatState = (state: PersistedChatState): void => {
  setStorageJSON(CHAT_STATE_KEY, state);
};
