import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'numberToTime'})
export class NumberToTimePipe implements PipeTransform {
    transform(date: moment.Moment): string {
        // let isPM = false;
        // let hourString: string;
        // let minuteString: string;
        // if (hour > 12) {
        //     hour = hour - 12;
        //     hourString = hour.toString();
        //     isPM = true;
        // } else {
        //     hourString = hour.toString();
        // }
        // if (minute < 10) {
        //     minuteString = '0' + minute.toString();
        // } else {
        //     minuteString = minute.toString();
        // }

        // if (isPM) {
        //     return hourString + ':' + minuteString + ' PM';
        // } else {
        //     return hourString + ':' + minuteString + ' AM';
        // }
        return moment(date).format('h:mm a');
    }
}
