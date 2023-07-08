import { Link } from 'react-router-dom';
import { useFetchPendingTasks } from '../../hooks/useFetchPendingTasks';
import { PendingTasksI } from '../../interfaces/Tasks';
import { TaskItem } from './TaskItem';
import { Journals, Search } from 'react-bootstrap-icons';
import { useState } from 'react';
import { PATHS } from '../../const/Paths';
import { DATE_OP, IMPORTANCE } from '../../const/TaskImportance';


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

    let filteredTasks: PendingTasksI[] = dataResponse.data;

    filteredTasks =
        selectedDate === DATE_OP.LEJANA
            ? dataResponse.data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
            : selectedDate === DATE_OP.PROXIMA
                ? dataResponse.data.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
                : dataResponse.data;


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
                        filteredTasks.map((task: PendingTasksI) => {
                            const importanceFilter = selectedImportance === '' || task.Importance === selectedImportance;
                            const dateFilter = selectedDate === '' || task.Date === selectedDate;
                            if (importanceFilter && dateFilter || !dateFilter && importanceFilter) {
                                return <TaskItem key={task._id} updateTasks={updateTasks} allTasks={dataResponse} task={task} />;
                            }
                        })}
                </div>
                <h4 hidden={!hiddenLink} className='text-center pt-2'><Search /> FILTRAR</h4>
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
                <div hidden={!hiddenLink} id='filtrado'>
                    <label className='pe-2'>Fecha:</label>
                    <select id='filter' className='form-control' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                        <option value={DATE_OP.PROXIMA}>{DATE_OP.PROXIMA}</option>
                        <option value={DATE_OP.LEJANA}>{DATE_OP.LEJANA}</option>
                    </select>
                </div>
            </div>
        </>
    )
}
