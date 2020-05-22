import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(name: string): unknown {
    let newName = name.split(' ');
    return newName[0];
  }

}
