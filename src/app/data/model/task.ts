export class Task {
	id: number;
	projectID: number;
	taskDescription: string;
	
	constructor(id: number, projectId: number, description: string){
		this.id = id;
		this.projectID = projectId;
		this.taskDescription = description;
	}
}
