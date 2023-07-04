import { TaskResponseDataI, TaskResponseI } from '../interfaces/Tasks';
import { getToken } from '../services/users';


export const getPendingTasks = async (userName: string) => {
    
    const api = `${import.meta.env.VITE_API}/task/get-pendingTasks/${userName}`;
    let tasks: TaskResponseDataI = {
        data: [],
        message: ''
    }

    try {
        const response = await fetch(api, {
            headers: {
                'Authorization': getToken() 
            }
        });
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response.status);
        }
  
        const { data }: TaskResponseI = await response.json();
        
        tasks = {
            data: data.data,
            message: data.message
        }
      } catch (err) {
        console.error('Catch error: ', err);
      }

    return tasks;
}