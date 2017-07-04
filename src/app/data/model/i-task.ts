import { IProject } from './i-project';
export interface ITask {
	readonly id: number;
	projectID: number;
	taskDescription: string;
	project: IProject;
}
