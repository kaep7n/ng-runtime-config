import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AuthConfig } from './auth-config';

export const AUTH_CONFIG = new InjectionToken<string>("AUTH_CONFIG");

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(AUTH_CONFIG) public config: AuthConfig) {
    console.log(config);
   }
}
