import { IProject } from './i-project';
import { ITask } from './i-task';

export interface ITimeTrackingEntry {
    readonly id: number;
    entryDate: string;
    startTime: string;
    endTime: string;
    timeSpent: string;
    description: string;
    userprofileID: number;
    taskID: number;
    task: ITask;
    taskDescription: string;
}