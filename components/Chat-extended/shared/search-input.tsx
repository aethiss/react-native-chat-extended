import React from 'react';
import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Search } from 'lucide-react-native';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <Input bg="$gray2" borderColor="$transparent" borderRadius="$full" px="$3" py="$2">
    <InputSlot>
      <InputIcon as={Search} color="$mutedForeground" />
    </InputSlot>
    <InputField
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      color="$textDark900"
      autoCapitalize="none"
    />
  </Input>
);
