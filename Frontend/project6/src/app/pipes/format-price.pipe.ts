import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true,
})
export class FormatPricePipe implements PipeTransform {
  transform(value: number): string {
    const strNum: string = value.toString();
    if (strNum.includes('.')) {
      return strNum.substring(0, strNum.indexOf('.'));
    } else {
      return strNum;
    }
  }
}
