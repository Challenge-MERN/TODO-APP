import { useEffect, useState } from 'react';
import { getPendingTasks as pendingTasks } from '../helpers/getPendingTasks';
import { PendingTasksI } from '../interfaces/Tasks';

export const useFetchPendingTasks = ( userName: string ) => {
    const taskI: PendingTasksI[] = [];
    const [dataResponse, setDataResponse] = useState({
        data: taskI,
        message: ''
    });
    
    const getPendingTasks = async () => {
        const response = await pendingTasks(userName);
        setDataResponse({
            data: response.data,
            message: response.message
        }
        );
    }

    useEffect(() => {
        getPendingTasks();
    },[]);

    return dataResponse; 
}