import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  private configurations: { [id: string]: any; } = {};

  constructor(private httpClient: HttpClient) {
  }

  public assign<T>(id: string, target: T) {
    var configuration = this.configurations[id];
    Object.assign(target, configuration);
  }

  public load(id: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(path)
        .subscribe(result => {
          this.configurations[id] = result;
          resolve();
        }, reject);
    });
  }

}
