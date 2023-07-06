import { useState, useEffect } from 'react';
import { PendingTasksI } from "../interfaces/Tasks";
import { getTasksFetchPetitions } from "../helpers/getTasksFetchPetitions";


export const useTasksFetchPetitions = (method: string, url: string, data: PendingTasksI | string) => {
    const taskI: PendingTasksI[] = [];
    const [isLoading, setIsLoading] = useState(true);
    const [dataResponse, setDataResponse] = useState(
        {
            status: '',
            data: ''
        } || {
            data: taskI,
            message: ''
        });

    const doPetition = async () => {
        const response = await getTasksFetchPetitions({ method, url, data });
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

