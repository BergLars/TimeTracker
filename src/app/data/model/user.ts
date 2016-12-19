export class User {
	id: number;
	password: string;
	isAdmin: boolean;
	username: string;
	percentageOfOwrk: number;
	
	constructor(id: number, password: string, isAdmin: boolean, username: string, percentageOfWork: number){
		this.id = id;
		this.password = password;
		this.isAdmin = isAdmin;
		this.username = username;
		this.percentageOfOwrk = percentageOfWork;
	}
}
