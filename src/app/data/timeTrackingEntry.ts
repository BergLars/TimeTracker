export class TimeTrackingEntry {
	public projectID: string;
	public task: string;
	public time: number;
	public isEditing: boolean;

	public constructor (projectID: string, task: string, time: number) {
		this.projectID = projectID;
		this.task = task;
		this.time = time;
		this.isEditing = false;
	}
}