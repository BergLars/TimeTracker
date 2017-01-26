import { IProject } from './i-project';
import { ITask } from './i-task';

export interface ITimeTrackingEntry {
    readonly id: number;
    userId: number;
    projectId: number;
    taskId: number;
    startDate: Date;
    endDate: Date;

    // Added properties_functions by js-data
    readonly project ?: IProject;
    projectName(): string;
    readonly task ?: ITask;
    taskDescription(): string;
    date(): string;
    startTime(): string;
    endTime(): string;
}