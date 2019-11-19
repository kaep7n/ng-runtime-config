import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { ComponentsConfig } from '../components-config';

export const COMPONENT_CONFIG = new InjectionToken<string>("COMPONENT_CONFIG");

@Component({
  selector: 'lib-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  constructor(@Inject(COMPONENT_CONFIG) public config: ComponentsConfig) { 
    console.log('TitleComponent');
    console.log(config);
  }

  ngOnInit() {
  }

}
