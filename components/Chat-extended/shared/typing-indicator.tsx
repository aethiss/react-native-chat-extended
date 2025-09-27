import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { HStack } from '@gluestack-ui/themed';

interface TypingIndicatorProps {
  color?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ color = '#16a34a' }) => {
  const dotScale = useRef([
    new Animated.Value(0.4),
    new Animated.Value(0.4),
    new Animated.Value(0.4),
  ]).current;
  const keys = useRef(['typing-dot-0', 'typing-dot-1', 'typing-dot-2']).current;

  useEffect(() => {
    const animations = dotScale.map((animatedValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 360,
            delay: index * 120,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.4,
            duration: 360,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [dotScale]);

  return (
    <HStack space="sm" alignItems="center">
      {dotScale.map((scale, index) => (
        <Animated.View
          key={keys[index]}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: color,
            transform: [{ scale }],
          }}
        />
      ))}
    </HStack>
  );
};
