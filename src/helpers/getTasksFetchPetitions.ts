import { ChangeStatusI, EditTaskI, PendingTasksI } from '../interfaces/Tasks';
import { getToken } from '../services/users';
import { METHODS } from '../const/Methods';

interface TasksPetitionsProps {
    method: string,
    url: string,
    data?: PendingTasksI | string | ChangeStatusI | EditTaskI
}

export const getTasksFetchPetitions = async ({ method, url, data }: TasksPetitionsProps) => {

    const URL_ROOT = import.meta.env.VITE_API;
    const headers = {
        'Authorization': getToken(),
        'Content-Type': 'application/json'
    }
    let response;
    try {
        switch (method) {
            case METHODS.DELETE:
                response = await fetch(`${URL_ROOT}${url}`, {
                    method: METHODS.DELETE,
                    headers: {
                        'Authorization': headers.Authorization
                    }
                });
                break;
            case METHODS.POST:
                response = await fetch(`${URL_ROOT}${url}`, {
                    method: METHODS.POST,
                    headers: headers,
                    body: JSON.stringify(data),
                });
                break;
            case METHODS.PUT:
                response = await fetch(`${URL_ROOT}${url}`, {
                    method: METHODS.PUT,
                    headers: headers,
                    body: JSON.stringify(data),
                });
                break;
            default: // GET method
                response = await fetch(`${URL_ROOT}${url}`, {
                    headers: {
                        'Authorization': headers.Authorization
                    }
                });
                break;
        }
        if (!response.ok) {
            throw new Error('Error HTTP: ' + response.status);
        }
    } catch (err) {
        console.error('Catch error: ', err);
    }

    return await response?.json();
}

