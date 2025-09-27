import { MMKV } from 'react-native-mmkv';

export const chatStorage = new MMKV({ id: 'chat-extended-storage' });

export const getStorageJSON = <T>(key: string): T | undefined => {
  const value = chatStorage.getString(key);
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`Failed to parse storage key ${key}`, error);
    return undefined;
  }
};

export const setStorageJSON = <T>(key: string, value: T): void => {
  chatStorage.set(key, JSON.stringify(value));
};

export const deleteStorageKey = (key: string): void => {
  chatStorage.delete(key);
};
