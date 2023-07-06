import { ChangeStatusI, PendingTasksI, TaskResponseDataI, NewTaskI } from '../../interfaces/Tasks';
import Swal from 'sweetalert2';
import { EditTask } from './EditTask';
import { ShowModal } from './ShowModal';
import { Trash2Fill, Check2Circle } from 'react-bootstrap-icons';
import { getTasksFetchPetitions } from '../../helpers/getTasksFetchPetitions';
import { METHODS } from '../../const/Methods';
import { getUserName } from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';

interface TaskItemProps {
    key?: string,
    task: PendingTasksI,
    allTasks: TaskResponseDataI,
    updateTasks: (newTasks: PendingTasksI[]) => void
}

export const TaskItem = ({ task, updateTasks, allTasks }: TaskItemProps) => {

    const deleteAction = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Aviso',
            text: `¿Eliminar tarea ${task.Task_Name}?`,
            showConfirmButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red'
        }).then(async (res) => {
            if (res.isConfirmed) {
                const method = METHODS.DELETE;
                const url = `/task/delete-task/${task.Task_Name}/${getUserName()}`;
                const response = await getTasksFetchPetitions({ method, url });
                if (response.status === 'OK') {
                    toast.success(response.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    const newTasks = removeTask();
                    updateTasks(newTasks);
                }
            }
        });
    }

    const removeTask = () => {
        const { data } = allTasks;
        const tasks: PendingTasksI[] = JSON.parse(JSON.stringify(data));
        const newTasks = tasks.filter((tarea) => tarea._id !== task._id);
        return newTasks;
    }

    const changeStatus = () => {
        Swal.fire({
            icon: 'info',
            title: 'Aviso',
            text: `¿Actualizar tarea ${task.Task_Name}?`,
            showConfirmButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red'
        }).then(async (res) => {
            if (res.isConfirmed) {
                const method = METHODS.PUT;
                const url = `/task/change-taskStatus`;
                const data: ChangeStatusI = {
                    UserName: getUserName(),
                    TaskName: task.Task_Name
                };
                const response = await getTasksFetchPetitions({ method, url, data: data });
                if (response.status === 'OK') {
                    toast.success(response.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    const newTasks = removeTask();
                    updateTasks(newTasks);
                }
            }
        });
    }

    const editTask = (updatedTask: PendingTasksI) => {
        const updatedTasks = removeTask();
        updatedTasks.push(updatedTask)
        updateTasks(updatedTasks);
    }

    return (
        <>
            <div className="list-group-item d-flex justify-content-between border p-3">
                <span className="d-flex align-items-center">
                    <EditTask key={task._id} editTask={editTask} task={task} />
                    {task.Task_Name}
                </span>
                <div className='p-2'>
                    <button className="me-2 btn btn-outline-danger" onClick={deleteAction} title="Eliminar"><Trash2Fill /></button>

                    <ShowModal key={task._id} task={task} />
                    <button className="btn btn-outline-success ms-2" onClick={changeStatus} title="Completar"><Check2Circle /></button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
