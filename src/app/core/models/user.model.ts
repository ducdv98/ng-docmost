import { Workspace } from './workspace.model';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: Date;
  avatarUrl: string;
  timezone: string;
  settings: UserSettings;
  invitedById: string;
  lastLoginAt: string;
  lastActiveAt: Date;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  workspaceId: string;
  deactivatedAt: Date;
  deletedAt: Date;
  fullPageWidth: boolean; // used for update
}

export interface CurrentUser {
  user: User;
  workspace: Workspace;
}

export interface UserSettings {
  preferences: {
    fullPageWidth: boolean;
  };
}
