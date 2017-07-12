import { IClient } from './i-client';
export interface IProject {
	readonly id: number;
	projectName: string;
	client: IClient;
	clientID: number;
}
