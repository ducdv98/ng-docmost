import { Routes } from '@angular/router';
import { WorkspaceSettingsComponent } from './workspace-settings/workspace-settings.component';
import { MembersSettingsComponent } from './members-settings/members-settings.component';
export const settingsRoutes: Routes = [
  {
    path: 'workspace',
    component: WorkspaceSettingsComponent,
  },
  {
    path: 'members',
    component: MembersSettingsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'workspace',
  },
];
