import { useState, useEffect } from 'react';
import { ChangeStatusI, EditTaskI, PendingTasksI } from "../interfaces/Tasks";
import { getTasksFetchPetitions } from "../helpers/getTasksFetchPetitions";

interface TaskFetchPetitions {
    method: string,
    url: string,
    data?: PendingTasksI | string | ChangeStatusI | EditTaskI
}

export const useTasksFetchPetitions = ({ method, url, data }: TaskFetchPetitions) => {
    const taskI: PendingTasksI[] = [];
    const [isLoading, setIsLoading] = useState(true);
    const [dataResponse, setDataResponse] = useState({
            data: {
                data: taskI,
                message: ''
            },
            status: ''
        });

    const doPetition = async () => {
        let response;
        if(data)
            response = await getTasksFetchPetitions({ method, url, data});
        else 
            response = await getTasksFetchPetitions({ method, url});
        setDataResponse(response);
        setIsLoading(false);
    }

    useEffect(() => {
        doPetition();
    }, []);

    return {
        dataResponse,
        isLoading
    };
}

