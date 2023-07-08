import { useState } from "react";
import { Button, FloatingLabel, Modal } from "react-bootstrap"
import { EditTaskI, PendingTasksI } from "../../interfaces/Tasks";
import { PencilSquare } from "react-bootstrap-icons";
import { IMPORTANCE } from "../../const/TaskImportance";
import { getUserName } from "../../services/users";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { METHODS } from "../../const/Methods";
import { getTasksFetchPetitions } from "../../helpers/getTasksFetchPetitions";

interface TaskItemProps {
    key?: string,
    task: PendingTasksI,
    editTask: (task: PendingTasksI) => void
}

export const EditTask = ({ task, editTask }: TaskItemProps) => {
    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState(task.Task_Name);
    const [description, setDescription] = useState(task.Description);
    const [date, setDate] = useState(task.Date);
    const [importance, setImportance] = useState(task.Importance);
    const importancia = IMPORTANCE;


    const handleClose = () => {
        cancelAction();
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const editAction = () => {
        const newTask: EditTaskI = {
            TaskName: taskName,
            Description: description,
            Date: date,
            Importance: importance,
            UserName: getUserName(),
            Status: task.Status
        }
        if (changesExists(newTask) && newTask.Importance !== IMPORTANCE[0]) {
            Swal.fire({
                icon: 'info',
                title: 'Importante!',
                text: 'Se detectaron modificaciones, ¿desea confirmar los cambios?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Confirmar',
                cancelButtonColor: 'red',
                cancelButtonText: 'Cancelar'
            }).then(async (confirm) => {
                if (confirm.isConfirmed) {
                    const method = METHODS.PUT;
                    const url = `/task/edit-task/${task.Task_Name}`;
                    const data = newTask;
                    const response = await getTasksFetchPetitions({ method, url, data: data });
                    if (response.status === 'OK') {
                        Swal.fire({
                            icon: 'success',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        const parseTask: PendingTasksI = {
                            _id: task._id,
                            Task_Name: newTask.TaskName,
                            Description: newTask.Description,
                            Date: newTask.Date,
                            Date_Completion: task.Date_Completion,
                            Importance: newTask.Importance,
                            Status: task.Status,
                            User_Name: task.User_Name
                        };
                        editTask(parseTask);
                        setShow(false);
                    }
                }
            });
        } else if (newTask.Importance === IMPORTANCE[0]) {
            Swal.fire({
                icon: 'warning',
                title: 'Ingresa información válida!',
                text: `Importacia "${IMPORTANCE[0]}" no es válida.`,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue'
            });
        } else {
            Swal.fire({
                icon: 'question',
                title: 'Sin cambios!',
                text: 'Sin cambios detectados',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue'
            });
        }
    }

    const changesExists = (newData: EditTaskI) => {
        if (newData.TaskName !== task.Task_Name)
            return true;
        else if (newData.Date !== task.Date)
            return true;
        else if (newData.Description !== task.Description)
            return true;
        else if (newData.Importance !== task.Importance)
            return true;
        else
            return false;
    }

    const cancelAction = () => {
        setTaskName(task.Task_Name);
        setDate(task.Date);
        setDescription(task.Description);
        setImportance(task.Importance);
    }

    return (
        <>
            <Button variant="outline-primary me-2 p-1" onClick={handleShow}>
                <PencilSquare />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header >
                    <Modal.Title className="w-100 text-center">Editar tarea {task.Task_Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={evt => {
                            evt.preventDefault();
                            editAction();
                        }}>
                            <div>
                                <label className='pb-2'>Alias de tarea:</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    value={taskName}
                                    placeholder='Alias'
                                    onChange={evt => setTaskName(evt.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className='pb-2 pt-2'>Descripción:</label>
                                <FloatingLabel controlId="floatingTextarea2" label="Descripción">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                        value={description}
                                        onChange={evt => setDescription(evt.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </div>
                            <div>
                                <label className='pb-2 pt-2'>Fecha esperada a realizar:</label>
                                <input
                                    className='form-control'
                                    type="date"
                                    value={date}
                                    onChange={evt => setDate(evt.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className='pb-2 pt-2'>Importancia:</label>
                                <select value={importance} onChange={evt => setImportance(evt.target.value)} className='form-control'>
                                    {importancia.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-4 d-flex justify-content-end'>
                                <button type='button' onClick={cancelAction} className='btn btn-outline-danger me-3'>Cancelar</button>
                                <button type='submit' className='btn btn-outline-success'>Confirmar</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
