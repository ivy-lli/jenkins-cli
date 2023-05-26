import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { Option, Select, Spinner } from '@inkjs/ui';
import { availableBranches } from './jenkins/api.js';
import { readGitBranch } from './jenkins/cmd.js';
import { ArrayUtils } from './utils.js';

type Props = {
  name: string | undefined;
};

export default function App({}: Props) {
  const [jenkinsBranches, setJenkinsBranches] = useState<string[]>();
  const [branches, setBranches] = useState<Option[]>();
  const [branchName, setBranchName] = useState<string>();
  const [currentGitBranch, setCurrentGitBranch] = useState<string>();

  const scanJenkinsBranches = () =>
    availableBranches().then(res => setJenkinsBranches(res.jobs.filter(job => job.color !== 'disabled').map(job => job.name)));

  useEffect(() => {
    readGitBranch().then(branch => setCurrentGitBranch(branch));
    scanJenkinsBranches();
  }, []);

  useEffect(() => {
    if (jenkinsBranches) {
      const removed = ArrayUtils.remove(jenkinsBranches, currentGitBranch);
      setBranches(
        ['#cmd:rescan', removed, ...jenkinsBranches]
          .filter(b => b !== undefined)
          .map(b => {
            return { label: b!.replaceAll('%2F', '/'), value: b!.toString() };
          })
      );
    }
  }, [jenkinsBranches, currentGitBranch]);

  const selectBranch = (value: string) => {
    if (value === '#cmd:rescan') {
      setJenkinsBranches(undefined);
      scanJenkinsBranches();
    } else {
      setBranchName(value);
    }
  };

  if (jenkinsBranches === undefined || branches === undefined) {
    return <Spinner label='Fetch branches' />;
  }
  return (
    <Box flexDirection='column' gap={1}>
      <Select visibleOptionCount={10} highlightText={currentGitBranch} options={branches} onChange={branch => selectBranch(branch)} />
      <Text>
        Selected: <Text color='green'>{branchName}</Text>
      </Text>
    </Box>
  );
}
