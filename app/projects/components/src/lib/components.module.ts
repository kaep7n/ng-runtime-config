import { NgModule, ModuleWithProviders } from '@angular/core';
import { TitleComponent } from './title/title.component';
import { ComponentsConfig } from './components-config';

@NgModule({
  declarations: [TitleComponent],
  imports: [
  ],
  exports: [TitleComponent]
})
export class ComponentsModule { 
  static forRoot(config: ComponentsConfig): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        {provide: ComponentsConfig, useValue: config }
      ]
    };
  }
}
