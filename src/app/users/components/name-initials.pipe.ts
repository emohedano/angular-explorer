import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials'
})
export class NameInitialsPipe implements PipeTransform {

  transform(name: string): string {
    if (!name) {
      return '';
    }

    const parts = name.split(' ');
    return `${parts[0].charAt(0)} ${parts[1].charAt(0)}`;
  }

}
