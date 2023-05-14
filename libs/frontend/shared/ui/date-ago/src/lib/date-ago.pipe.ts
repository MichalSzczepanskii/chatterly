import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(value: Date): unknown {
    console.log(value);
    const date = dayjs(value);
    const currentDate = dayjs();
    const minutesAgo = currentDate.diff(date, 'minutes');
    if (minutesAgo === 0) {
      const secondsAgo = currentDate.diff(date, 'seconds');
      return this.translocoService.translate('time.secondsAgo', {
        seconds: secondsAgo,
      });
    }
    if (minutesAgo < 60)
      return this.translocoService.translate('time.minutesAgo', {
        minutes: minutesAgo,
      });
    const isToday = dayjs().isSame(date, 'day');
    if (isToday) return date.format('HH:mm');
    return date.format('DD/MM/YYYY');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [DateAgoPipe],
  exports: [DateAgoPipe],
})
export class DateAgoPipeModule {}
