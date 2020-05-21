import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceString'
})
export class SpliceStringPipe implements PipeTransform {

  transform(data: string, ...args: number[]): unknown {
    if(data.length < args[0]){
      return data;
    }
    if(data.length > args[0]){
      return data.slice(0, args[0]) + "...";
    }
    return data;
  }

}
