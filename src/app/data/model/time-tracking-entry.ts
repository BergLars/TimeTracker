export class TimeTrackingEntry {
    id: number;
    userId: number;
    taskId: number;
    startDate: Date;
    endDate: Date;

    constructor(id: number, userId: number, taskId: number, startDate: Date, endDate: Date) {
        this.id = id;
        this.userId = userId;
        this.taskId = taskId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
