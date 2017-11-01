import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials'
})
export class NameInitialsPipe implements PipeTransform {

  transform(name: string): string {
    const parts = name.split(' ');
    return `${parts[0].charAt(0)} ${parts[1].charAt(0)}`;
  }

}
