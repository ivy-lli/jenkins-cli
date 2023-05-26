import { exec } from 'child_process';

export const readGitBranch = () =>
  new Promise<string>((resolve, reject) => {
    return exec('git branch --show-current', (err, stdout, _stderr) => {
      if (err) reject(`getBranch Error: ${err}`);
      else if (typeof stdout === 'string') resolve(stdout.trim());
    });
  });
