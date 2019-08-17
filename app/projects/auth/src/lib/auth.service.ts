import { Injectable } from '@angular/core';
import { AuthConfig } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public config: AuthConfig) {
    console.log(config);
   }
}
