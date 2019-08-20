import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule, ComponentsConfig } from 'projects/components/src/public-api';
import { ConfiguratorService } from './configurator.service';
import { AuthModule, AuthConfig } from 'projects/auth/src/public-api';

const componentsConfig = new ComponentsConfig();
const authConfig = new AuthConfig();

export function configuratorFactory(configurator: ConfiguratorService) {
  return () => {
    return new Promise((resolve) => {
      console.log('loading');
      configurator.load([
        { key: 'ui', path: 'assets/components.json' },
        { key: 'auth', path: 'assets/auth.json' },
      ]).then(() => {
        configurator.assign('ui', componentsConfig);
        configurator.assign('auth', authConfig);
        console.log('loaded');
        resolve();
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(authConfig),
    ComponentsModule.forRoot(componentsConfig)
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [ConfiguratorService], useFactory: configuratorFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
