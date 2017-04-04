import { Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the MathcesCategoryPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/

@Pipe({
    name: "mathcesCategory",
    pure: false
})
export class MathcesCategoryPipe implements PipeTransform {
   transform(items: Array<any>, lang: string): Array<any> {
        let result = items.filter(item => lang=='ru' || (lang=='en' && item[0]!=='course'));
        return result;
    }
}

