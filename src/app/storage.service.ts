import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { }



  // set a key/value object
  async setObject(key: string, object: Todo[]) {
    try {
      localStorage.setItem(key,JSON.stringify(object))
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log('set Object in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // get a key/value object
  async getObject(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // remove a single key value:
  // remove(key: string) {
  //   this.storage.remove(key);
  // }
  //  delete all data from your application:
  clear(){
    this.storage.clear();
  }


}
