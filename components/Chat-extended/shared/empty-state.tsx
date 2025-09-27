import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <Box flex={1} justifyContent="center" alignItems="center" px="$8">
    <Text fontSize="$xl" fontWeight="$bold" color="$textDark900" textAlign="center">
      {title}
    </Text>
    <Text mt="$2" color="$mutedForeground" textAlign="center">
      {description}
    </Text>
  </Box>
);
