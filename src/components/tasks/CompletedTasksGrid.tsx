import { FolderCheck } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import { PATHS } from "../../const/Paths";
import { useTasksFetchPetitions } from "../../hooks/useTasksFetchPetitions";
import { METHODS } from "../../const/Methods";
import { getUserName } from "../../services/users";
import { PendingTasksI } from "../../interfaces/Tasks";
import { CompletedTaskItem } from "./CompletedTaskItem";

export const CompletedTasksGrid = () => {
    let hiddenLink = true;
    const letsGo = '>>>';
    const directTo = PATHS.PENDING_TASKS;
    const buttonContent = 'Tareas Pendientes';
    const method = METHODS.GET;
    const url = `/task/get-completedTasks/${getUserName()}`;

    const { dataResponse, isLoading } = useTasksFetchPetitions({ method, url });

    dataResponse.data.data.length === 0 ? hiddenLink = false : hiddenLink = true;

    const { data, message } = dataResponse.data;

    return (
        <>
            <div id="father2">
                {
                    !isLoading && (
                        <h2 className="mt-4">
                            <FolderCheck className="me-2" /> {message}
                        </h2>
                    )
                }
                {
                    !isLoading && (
                        <Link className='mt-5 btn btn-outline-primary' hidden={hiddenLink} to={directTo}>{buttonContent} {letsGo}</Link>
                    )
                }
                <div className="container-fluid p-3" hidden={!hiddenLink} id='contentCompleted'>
                    {
                        data.map((task: PendingTasksI) => (
                            <CompletedTaskItem key={task._id} task={task} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
