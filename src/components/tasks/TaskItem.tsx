import { PendingTasksI } from '../../interfaces/Tasks';
import Swal from 'sweetalert2';
import { ShowModal } from './ShowModal';
import { Trash2Fill, Check2Circle, PencilSquare } from 'react-bootstrap-icons';
import { getTasksFetchPetitions } from '../../helpers/getTasksFetchPetitions';
import { METHODS } from '../../const/Methods';
import { getUserName } from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import { TaskGrid } from './TaskGrid';

interface TaskItemProps {
    key?: string,
    task: PendingTasksI
}

export const TaskItem = ({ task }: TaskItemProps) => {

    const deleteTask = () => {
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
                if (response.ok) {
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
                }
            }
        });
    }

    const changeStatus = () => {
        console.log(task);
    }

    return (
        <>
            <div className="list-group-item d-flex justify-content-between border p-3" >
                <span className="d-flex align-items-center">
                    <button className="btn btn-outline-primary me-2" onClick={changeStatus} title="Editar"><PencilSquare /></button>
                    {task.Task_Name}
                </span>
                <div className='p-2'>
                    <button className="me-2 btn btn-outline-danger" onClick={deleteTask} title="Eliminar"><Trash2Fill /></button>
                    <ShowModal key={task._id} task={task} />
                    <button className="btn btn-outline-success ms-2" onClick={changeStatus} title="Completar"><Check2Circle /></button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
