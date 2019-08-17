import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { ComponentsConfig } from 'projects/components/src/lib/components-config';

export function onAppInit() {
  return () => {
    return new Promise((resolve, reject) => {
      console.log('onAppInit');
      fetch('assets/cfg.json')
        .then(response => {
          console.log('loadCfg response');
          console.log(response);
          return response.json();
        })
        .then(runtimeCfg => {
          console.log('loadCfg runtimeCfg');
          console.log(runtimeCfg);
          cfg.title = runtimeCfg.title;

          console.log('loadCfg cfg');
          resolve(true);
        });
    });
  }
}

let cfg: ComponentsConfig = new ComponentsConfig();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule.forRoot(cfg)
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, useFactory: onAppInit }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
