import { GluestackUIProvider } from '@gluestack-ui/themed';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { config } from '@gluestack-ui/config';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { ChatProvider } from '@/components/Chat-extended/context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config} colorMode={colorScheme === 'dark' ? 'dark' : 'light'}>
        <ChatProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="group/[groupId]" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </ChatProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
