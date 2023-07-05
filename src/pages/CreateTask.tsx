import { TaskForm } from "../components/tasks/TaskForm";


const CreateTask = () => {
  return (
    <div id="father" className="h-100">
      <h1 className="text-center">Nueva Tarea</h1>
      <TaskForm />
    </div>
  )
}

export default CreateTask;
