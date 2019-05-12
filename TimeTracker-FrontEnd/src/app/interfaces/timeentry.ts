export interface Timeentry {
    readonly teid: number;
    userprofileID: number;
    projectID: number;
    clientID: number;
    description: string;
    entryDate: string;
    worktime: string;
}