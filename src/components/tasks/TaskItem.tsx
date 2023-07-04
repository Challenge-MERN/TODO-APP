import { PendingTasksI } from '../../interfaces/Tasks';

interface TaskItemProps {
    key: string,
    task: PendingTasksI
}

export const TaskItem = ( { task }: TaskItemProps ) => {
    return (
        <li className="list-group-item d-flex justify-content-between" >
            <span className="align-self-center">{task.Description}</span>
            <button className="btn btn-outline-danger" title="Borrar">Borrar</button>
        </li>
    )
}
