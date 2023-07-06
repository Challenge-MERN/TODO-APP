import { TaskGrid } from '../components/tasks/TaskGrid';

const PendingTasks = () => {
  return (
    <div className='text-center h-100'>
      <TaskGrid key={1} Page='PendingTask' />
    </div>
  )
}

export default PendingTasks;