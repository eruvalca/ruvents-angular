import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'timeStringFormat' })
export class TimeStringFormat implements PipeTransform {
    transform(timeString: string): string {
        return moment(timeString, 'HH:mm').format('h:mm a');
    }
}
