import { Injectable } from '@angular/core';
import { ConfigurationDefinition } from './configurationDefinition';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  private configurations: { [id: string]: any; } = {};

  constructor() {
  }

  public assign<T>(id: string, target: T) {
    const configuration = this.configurations[id];
    Object.assign(target, configuration);
  }

  public load(id: string, path: string): Promise<any> {
    return fetch(path)
    .then(response => response.json())
    .then(json => {
      console.log('fetched ' + path, json);
      this.configurations[id] = json;
    });
  }
}
