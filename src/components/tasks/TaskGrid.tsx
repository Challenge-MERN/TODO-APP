import { Link } from 'react-router-dom';
import { useFetchPendingTasks } from '../../hooks/useFetchPendingTasks';
import { PendingTasksI } from '../../interfaces/Tasks';
import { TaskItem } from './TaskItem';
import { Journals } from 'react-bootstrap-icons';

export const TaskGrid = () => {
    const User = sessionStorage.getItem('USER') || '';
    let hiddenLink = true;
    const letsGo = '>>>';

    const { dataResponse, isLoading } = useFetchPendingTasks(User);

    dataResponse.data.length === 0 ? hiddenLink = false : hiddenLink = true;

    console.log(dataResponse.data, dataResponse.message);

    return (
        <>
            <div className='h-100' id='father2'>
                <h2 className='mt-4'>
                    <Journals className='me-2'/>
                    {dataResponse.message}
                </h2>
                {
                    !isLoading && (<Link className='mt-5 btn btn-outline-primary' hidden={hiddenLink} to={'/create-task'}>Crear Tarea {letsGo}</Link>)
                }
                <div className='container-fluid p-3' id='content2'>
                    {
                        dataResponse.data.map((task: PendingTasksI) => (
                            <TaskItem key={task._id} task={task} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
