import { Link } from 'react-router-dom';
import { useFetchPendingTasks } from '../../hooks/useFetchPendingTasks';
import { PendingTasksI } from '../../interfaces/Tasks';
import { TaskItem } from './TaskItem';

export const TaskGrid = () => {
    const User = sessionStorage.getItem('USER') || '';
    let hiddenLink = true;
    const letsGo = '>>>';

    const { dataResponse, isLoading } = useFetchPendingTasks(User);

    dataResponse.data.length === 0 ? hiddenLink = false : hiddenLink = true;

    console.log(dataResponse.data, dataResponse.message);

    return (
        <>
            <h2 className='mt-4'>{dataResponse.message}</h2>
            {
                !isLoading && (<Link className='mt-5 btn btn-outline-primary' hidden={hiddenLink} to={'/create-task'}>Crear Tarea {letsGo}</Link>)
            }
            {
                dataResponse.data.map((task: PendingTasksI) => {
                    <TaskItem key={task._id} task={task} />
                })
            }
        </>
    )
}
