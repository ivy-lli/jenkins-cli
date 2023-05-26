import React, { useState } from 'react';
import { Text } from 'ink';
import { TextInput } from '@inkjs/ui';

type Props = {
  name: string | undefined;
};

export default function App({}: Props) {
  const [branchName, setBranchName] = useState<string>();
  if (branchName) {
    return (
      <Text>
        Hello, <Text color='green'>{branchName}</Text>
      </Text>
    );
  }
  return <TextInput placeholder='Enter your name...' onSubmit={name => setBranchName(name)} />;
}
