import { PendingTasksI } from "../../interfaces/Tasks";
import { ShowCompletedTask } from "./ShowCopletedTask";

interface CompletedTaskItemProps {
    key?: string,
    task: PendingTasksI,
}

export const CompletedTaskItem = ({ task }: CompletedTaskItemProps) => {
    return (
        <>
            <div className="list-group-item d-flex justify-content-between border" style={{fontWeight: 'bold'}}>
                <div className="ps-2 d-flex flex-column align-items-center w-100">           
                    <span>Día realizada:</span>
                    <span>{task.Date_Completion.split(/T/)[0]}</span>
                </div>
                <div className='p-2'>
                    <ShowCompletedTask key={task._id} task={task} />
                </div>
            </div>
        </>
    )
}

