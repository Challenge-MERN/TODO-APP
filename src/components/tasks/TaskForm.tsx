import { useState } from 'react';
import { NewTaskI } from '../../interfaces/Tasks';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getToken, getUserName } from '../../services/users';
import { IMPORTANCE } from '../../const/TaskImportance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [importance, setImportance] = useState('');
    const importancia = IMPORTANCE;

    const api = `${import.meta.env.VITE_API}/task/create-task`;
    const currentDate = new Date().toISOString().split('T')[0];

    const sendTaskData = async () => {
        if (importance === 'Selecciona una opción' || importance === '') {
            toast.error('Completa lo solicitado', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setImportance('');
            return;
        } else {

            const task: NewTaskI = {
                TaskName: taskName,
                Description: description,
                Date: date,
                Importance: importance,
                UserName: getUserName()
            }
            try {
                const response = await fetch(api, {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getToken()
                    }
                });

                if (!response.ok) {
                    throw new Error('Error HTTP: ' + response.status);
                }

                const data = await response.json();
                toast.success(data.data, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                clearForm();
            } catch (err) {
                toast.error('Error inesperado!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log('Catch error: ', err);
            }
        }
    }

    const clearForm = () => {
        setDate('');
        setTaskName('');
        setDescription('');
        setImportance('');
    }

    return (
        <>
            <div className='container-fluid p-5' id='content'>
                <form onSubmit={evt => {
                    evt.preventDefault();
                    sendTaskData();
                }}>
                    <div>
                        <label className='pb-2'>Título de tarea:</label>
                        <input
                            className='form-control'
                            type="text"
                            value={taskName}
                            placeholder='Título'
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
                        <label className='pb-2 pt-2'>Fecha estimada de finalización:</label>
                        <input
                            className='form-control'
                            type="date"
                            value={date}
                            onChange={evt => setDate(evt.target.value)}
                            min={currentDate}
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
                        <button type='button' onClick={clearForm} className='btn btn-outline-danger me-3'>Cancelar</button>
                        <button type='submit' className='btn btn-outline-success'>Crear Tarea</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

