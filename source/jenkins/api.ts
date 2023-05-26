import { JENKINS, JOB } from './jenkins.js';
import fetch from 'node-fetch';

type JenkinsJob = {
  name: string;
  color: 'disabled' | 'blue' | 'yellow' | 'red';
};

export type JenkinsJobReturnValue = {
  jobs: JenkinsJob[];
};

export const availableBranches = async (): Promise<JenkinsJobReturnValue> => {
  return fetch(`https://${JENKINS}/job/${JOB}/api/json`).then(res => res.json() as Promise<JenkinsJobReturnValue>);
};
