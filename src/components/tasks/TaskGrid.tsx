import { useFetchPendingTasks } from '../../hooks/useFetchPendingTasks';
import { PendingTasksI } from '../../interfaces/Tasks';
import { TaskItem } from './TaskItem';

export const TaskGrid = () => {
    const User = sessionStorage.getItem('USER') || '';
    const { data, message } = useFetchPendingTasks(User);

    console.log(data, message);

    return (
        <>
            <h1>{message}</h1>
            {
                data.map((task: PendingTasksI) => {
                    <TaskItem key={task._id} task={task} />
                })
            }
        </>
    )
}
