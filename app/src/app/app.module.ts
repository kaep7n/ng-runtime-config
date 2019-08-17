import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { ComponentsConfig } from 'projects/components/src/lib/components-config';
import { ConfiguratorService } from './configurator.service';

export function configuratorFactory(configurator: ConfiguratorService) {
  return () => {
    Promise.all([
      configurator.load('cfg', 'assets/cfg.json'),
      configurator.load('auth', 'assets/auth.json')
    ]).then((() => {
      console.log(configurator.configurations);
      Object.assign(cfg, configurator.configurations['cfg']);
    }))
  }
}

const cfg: ComponentsConfig = new ComponentsConfig();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule.forRoot(cfg)
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [ConfiguratorService], useFactory: configuratorFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
