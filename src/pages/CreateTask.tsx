import { TaskForm } from "../components/tasks/TaskForm";
import { JournalPlus } from "react-bootstrap-icons";


const CreateTask = () => {
  return (
    <div id="father" className="h-100">
      <h2 className="text-center"><JournalPlus/> Nueva Tarea</h2>
      <TaskForm />
    </div>
  )
}

export default CreateTask;
