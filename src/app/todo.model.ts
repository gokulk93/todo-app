export class Todo{
    id: number;
    title: string = '';
    complete: boolean = false;
    flag : number = 1;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  
  }