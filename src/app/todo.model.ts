export class Todo{
    id: number;
    title: string = '';
    flag : number = 1;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  
  }