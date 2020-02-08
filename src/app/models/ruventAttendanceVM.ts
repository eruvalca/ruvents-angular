import { RuventToUser } from './ruventToUser';

export class RuventAttendanceVM {
    ruventId: number;
    title: string;
    description: string;
    address: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    createDate: Date;
    createdBy: string;
    modifyDate: Date;
    modifyBy: string;
    attending: number;
    notAttending: number;
}
