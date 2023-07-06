import { PendingTasksI } from "../../interfaces/Tasks"
import { ShowModal } from "./ShowModal"

interface CompletedTaskItemProps {
    key?: string,
    task: PendingTasksI,
}

export const CompletedTaskItem = ({ task }: CompletedTaskItemProps) => {
    return (
        <>
            <div className="list-group-item d-flex justify-content-between border p-3" >
                <span className="d-flex align-items-center">
                    {task.Task_Name}
                </span>
                <div className='p-2'>
                    <ShowModal key={task._id} task={task} />
                </div>
            </div>
        </>
    )
}

