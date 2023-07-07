import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { PendingTasksI } from "../../interfaces/Tasks";
import { EyeFill } from "react-bootstrap-icons";

interface TaskItemProps {
  key?: string,
  task: PendingTasksI
}

export const ShowCompletedTask = ({ task }: TaskItemProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-warning" title="Detalles" onClick={handleShow}>
        <EyeFill />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{task.Task_Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Descripción</th>
                <th>Importancia</th>
                <th>Fecha compromiso</th>
                <th>Fecha realizada</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>{task.Description}</td>
                <td>{task.Importance}</td>
                <td>{task.Date}</td>
                <td>{task.Date_Completion.split(/T/)[0]}</td>
              </tr>
            </tbody>
          </table>
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
