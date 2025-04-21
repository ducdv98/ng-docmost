import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkspaceStore } from '@core/state/worskspace.store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  readonly workspaceStore = inject(WorkspaceStore);
  title = 'ng-docmost';
}
