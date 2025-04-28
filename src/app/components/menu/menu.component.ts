import { Component, inject, effect } from '@angular/core';
import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, HasRolesDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (this.keycloakStatus === KeycloakEventType.Ready) {
        console.log(keycloakEvent)
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (this.keycloakStatus === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

}
