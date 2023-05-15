import { DateAgoPipe } from './date-ago.pipe';
import { TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';
import { TranslocoService } from '@ngneat/transloco';
import * as dayjs from 'dayjs';

describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;
  let translocoService: TranslocoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
    });

    translocoService = TestBed.inject(TranslocoService);
    pipe = new DateAgoPipe(translocoService);
  });

  it('should display 10 minutes ago', () => {
    const currentDate = dayjs();
    expect(
      pipe.transform(currentDate.subtract(10, 'minutes').toDate())
    ).toEqual('10 minutes ago');
  });

  it('should display only time if given date is from today', () => {
    jest.useFakeTimers().setSystemTime(dayjs('2023-05-14 16:00').toDate());
    const currentDate = dayjs('2023-05-14 14:00').toDate();
    expect(pipe.transform(currentDate)).toEqual('14:00');
  });

  it('should display 10 seconds ago', () => {
    jest.useFakeTimers().setSystemTime(dayjs('2023-05-14 16:00:10').toDate());
    const currentDate = dayjs('2023-05-14 16:00:00').toDate();
    expect(pipe.transform(currentDate)).toEqual('10 seconds ago');
  });

  describe('display date', () => {
    it('should display date if day is the same but different month', () => {
      jest.useFakeTimers().setSystemTime(dayjs('2023-05-14 16:00').toDate());
      const currentDate = dayjs('2023-04-14 14:00').toDate();
      expect(pipe.transform(currentDate)).toEqual('14/04/2023');
    });

    it('should display date if given date is from different day', () => {
      jest.useFakeTimers().setSystemTime(dayjs('2023-05-14 16:00').toDate());
      const currentDate = dayjs('2023-05-13 14:00').toDate();
      expect(pipe.transform(currentDate)).toEqual('13/05/2023');
    });
  });
});
