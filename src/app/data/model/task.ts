export class Task {
	id: number;
	projectId: number;
	description: string;
	
	constructor(id: number, projectId: number, description: string){
		this.id = id;
		this.projectId = projectId;
		this.description = description;
	}
}
