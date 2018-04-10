import { IClient } from './i-client';
import { IProject } from './i-project';
import { ITask } from './i-task';

export interface ITimeTrackingEntry {
    readonly id: number;
    startDateTime: string;
    endDateTime: string;
    entryDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeSpent: string;
    worktime: string;
    traveltime: string;
    place: string;
    description: string;
    userprofileID: number;
    clientID: number;
    clientName: string;
    project: IProject;
    projects: IProject[];
    task: ITask;
    client: IClient;
    projectID: number;
    projectName: string;
    taskID: number;
    taskDescription: string;
    isBillable: boolean;
    isColored?: boolean;
}