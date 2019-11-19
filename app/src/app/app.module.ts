import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule, ComponentsConfig, COMPONENT_CONFIG } from 'projects/components/src/public-api';
import { ConfiguratorService } from './configurator.service';
import { AuthModule, AuthConfig, AUTH_CONFIG } from 'projects/auth/src/public-api';
import { config } from 'rxjs';

const componentsConfig = new ComponentsConfig();
const authConfig = new AuthConfig();

export function configuratorFactory(configurator: ConfiguratorService) {
  console.log('configuratorFactory');
  return () => {
    console.log('Starting APP_INITIALIZER');
    return Promise.all([
      configurator.load('cfg', 'assets/components.json'),
      configurator.load('auth', 'assets/auth.json')
    ]);
  }
}

export function authConfigFactory(configurator: ConfiguratorService) : AuthConfig {
  let authConfig = new AuthConfig();
  configurator.assign('auth', authConfig);
  console.log('authConfigFactory ' + authConfig.mode);
  return authConfig;
}

export function componentConfigFactory(configurator: ConfiguratorService) : ComponentsConfig {
  let cfg = new ComponentsConfig();
  configurator.assign('cfg', cfg);
  console.log('componentConfigFactory ' + cfg.title);
  return cfg;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ComponentsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [ConfiguratorService], useFactory: configuratorFactory },
    { provide: AUTH_CONFIG, deps: [ConfiguratorService], useFactory: authConfigFactory },
    { provide: COMPONENT_CONFIG, deps: [ConfiguratorService], useFactory: componentConfigFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
