import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthConfig } from './auth-config';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class AuthModule { 
  static forRoot(config: AuthConfig): ModuleWithProviders {
    console.log('AuthModule.forRoot');
    console.log(config);
    return {
      ngModule: AuthModule,
      providers: [
        {provide: AuthConfig, useValue: config }
      ]
    };
  }
}
