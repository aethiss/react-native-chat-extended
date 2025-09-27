import React, { ReactNode } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Archive, Pin } from 'lucide-react-native';

interface GroupSwipeableProps {
  onArchive: () => void;
  onPin: () => void;
  children: ReactNode;
}

interface ActionButtonProps {
  color: string;
  icon: React.ComponentType<{ color?: string; size?: number }>;
  label: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  color,
  icon: IconComponent,
  label,
  onPress,
}) => (
  <RectButton
    style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}
    onPress={onPress}
  >
    <IconComponent color="white" size={22} />
    <Text color="$white" fontSize="$xs" mt="$1">
      {label}
    </Text>
  </RectButton>
);

export const GroupSwipeable: React.FC<GroupSwipeableProps> = ({ children, onArchive, onPin }) => (
  <Swipeable
    friction={2}
    renderRightActions={() => (
      <Box width={160} flexDirection="row" height="100%">
        <ActionButton color="#0891b2" icon={Archive} label="Archive" onPress={onArchive} />
        <ActionButton color="#10b981" icon={Pin} label="Pin" onPress={onPin} />
      </Box>
    )}
  >
    {children}
  </Swipeable>
);
