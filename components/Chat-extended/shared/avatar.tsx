import React from 'react';
import { Image } from 'expo-image';
import { Box, Center, Text } from '@gluestack-ui/themed';

interface AvatarProps {
  size?: number;
  uri?: string;
  initials: string;
  color: string;
  muted?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 48, uri, initials, color, muted }) => {
  return (
    <Box
      width={size}
      height={size}
      borderRadius={size / 2}
      overflow="hidden"
      bg={muted ? '#9ca3af' : color}
      alignItems="center"
      justifyContent="center"
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} />
      ) : (
        <Center flex={1} px="$1">
          <Text color="$white" fontWeight="$bold">
            {initials}
          </Text>
        </Center>
      )}
    </Box>
  );
};
