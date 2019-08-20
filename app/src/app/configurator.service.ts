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

  public load(configurations: ConfigurationDefinition[]): Promise<any> {
    const promises = [];

    for (const configuration of configurations) {
      promises.push(
        // we use fetch instead of the angular HttpClient because using
        // it would trigger the HTTP_INTERCEPTORS injection token to be initialized
        fetch(configuration.path)
          .then(respone => respone.json())
          .then(result => this.configurations[configuration.key] = result)
      );
    }

    return Promise.all(promises);
  }

}
