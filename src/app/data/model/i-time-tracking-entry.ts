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
    projectID: number;
    taskID: number;

    // Added properties_functions by js-data
    readonly project?: IProject;
    projectName: string;
    readonly task?: ITask;
    taskDescription: string;
}