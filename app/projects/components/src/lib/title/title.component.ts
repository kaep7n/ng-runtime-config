import { Component, OnInit } from '@angular/core';
import { ComponentsConfig } from '../components-config';

@Component({
  selector: 'lib-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  constructor(public config: ComponentsConfig) { 
    console.log('TitleComponent');
    console.log(config);
  }

  ngOnInit() {
  }

}
