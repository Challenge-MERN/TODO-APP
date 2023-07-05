
export interface TaskResponseI {
    status: string,
    data: TaskResponseDataI
}

export interface TaskResponseDataI {
    data: PendingTasksI[] | [],
    message: string
}

export interface PendingTasksI {
    _id: string,
    Task_Name: string,
    Description: string,
    Date: string,
    Date_Completion: string,
    Importance: string,
    Status: boolean,
    User_Name: string
}

export interface NewTaskI {
    TaskName: string,
    Description: string,
    Date: string,
    Importance: string,
    UserName: string
}