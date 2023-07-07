import { Link } from 'react-router-dom';
import { useFetchPendingTasks } from '../../hooks/useFetchPendingTasks';
import { PendingTasksI } from '../../interfaces/Tasks';
import { TaskItem } from './TaskItem';
import { Journals, Search } from 'react-bootstrap-icons';
import { useState } from 'react';
import { PATHS } from '../../const/Paths';
import { IMPORTANCE } from '../../const/TaskImportance';


export const TaskGrid = () => {
    const [, setInfo] = useState<PendingTasksI[]>();
    const [selectedImportance, setSelectedImportance] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const User = sessionStorage.getItem('USER') || '';
    let hiddenLink = true;
    const letsGo = '>>>';
    const directTo = PATHS.CREATE_TASK;
    const buttonContent = 'Crear Tarea';

    const { dataResponse, isLoading } = useFetchPendingTasks(User);

    dataResponse.data.length === 0 ? hiddenLink = false : hiddenLink = true;

    const updateTasks = (newTasks: PendingTasksI[]) => {
        setInfo(newTasks);
        dataResponse.data = [];
        dataResponse.data = newTasks;
    }

    return (
        <>
            <div id='father2'>
                {
                    !isLoading && (
                        <h2 className='mt-4'>
                            <Journals className='me-2' />
                            {dataResponse.message}
                        </h2>
                    )
                }
                {
                    !isLoading && (
                        <Link className='mt-5 btn btn-outline-warning' hidden={hiddenLink} to={directTo}>{buttonContent} {letsGo}</Link>
                    )
                }
                <div className='container-fluid p-3' hidden={!hiddenLink} id='content2'>
                    {
                        dataResponse.data
                            .filter((task) => selectedImportance === '' || task.Importance === selectedImportance)
                            .map((task: PendingTasksI) => (
                                <TaskItem key={task._id} updateTasks={updateTasks} allTasks={dataResponse} task={task} />
                            ))
                    }
                </div>
                <h4 hidden={!hiddenLink} className='text-center'><Search /> FILTRAR</h4>
                <div hidden={!hiddenLink} id='filtrado'>
                    <label className='pe-2'>Importancia:</label>
                    <select id='filter' className='form-control' value={selectedImportance} onChange={(e) => setSelectedImportance(e.target.value)}>
                        <option value="">Todas</option>
                        {
                            IMPORTANCE.map((imp, index) => (
                                imp !== IMPORTANCE[0] && <option key={index} value={imp}>{imp}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    )
}
