import path from 'path';
import { Alias } from 'vite';

import tsconfig from '../../tsconfig.base.json';
import workspace from '../../workspace.json';

export const workspaceRoot = path.resolve(__dirname, '../..');

const pathEntries = Object.entries(tsconfig.compilerOptions.paths);

// assumes 1-1 relationship with paths in tsconfig
export const getAliasEntries = (workspaceRootOverride?: string): Alias[] =>
  pathEntries.map(([alias, [currentPath]]) => ({
    find: alias,
    replacement: path.resolve(
      workspaceRootOverride ?? workspaceRoot,
      currentPath
    ),
  }));

export const getProjectName = (path: string) => {
  const { projects } = workspace;
  return Object.entries(projects).find(([projectName, projectPath]) =>
    path.endsWith(projectPath)
  )?.[0];
};
