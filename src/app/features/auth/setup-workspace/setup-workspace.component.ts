import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SetupWorkspaceRequest } from 'src/app/core/models/request/setup-workspace-request.model';
import { AuthStore } from 'src/app/core/state/auth.store';
import { WorkspaceStore } from 'src/app/core/state/worskspace.store';
import { FormControlErrorDirective } from 'src/app/shared/directives/form-control-error.directive';

@Component({
  selector: 'app-setup-workspace',
  imports: [MatIconModule, ReactiveFormsModule, FormControlErrorDirective],
  templateUrl: './setup-workspace.component.html',
  styleUrl: './setup-workspace.component.scss',
})
export class SetupWorkspaceComponent implements OnInit {
  private fb = inject(FormBuilder);
  readonly authStore = inject(AuthStore);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly router = inject(Router);

  ngOnInit(): void {
    if (this.workspaceStore.workspaceAvailable()) {
      this.router.navigate(['/login']);
    }
  }

  workspaceForm = this.fb.group({
    workspaceName: ['test', [Validators.required]],
    name: ['test', [Validators.required]],
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required]],
  });

  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const request = this.workspaceForm.getRawValue() as SetupWorkspaceRequest;
      this.workspaceStore.setupWorkspace(request);
    } else {
      this.workspaceForm.markAllAsTouched();
    }
  }
}
