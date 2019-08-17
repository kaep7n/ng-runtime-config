import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  configurations: { [id: string]: any; } = {};

  constructor(private httpClient: HttpClient) {
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
