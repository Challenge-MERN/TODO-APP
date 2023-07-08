import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { PendingTasksI } from "../../interfaces/Tasks";
import { EyeFill } from "react-bootstrap-icons";

interface TaskItemProps {
  key?: string,
  task: PendingTasksI
}

export const ShowModal = ({ task }: TaskItemProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-warning p-1" title="Detalles" onClick={handleShow}>
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
          <Modal.Title className="text-center w-100">Tarea: {task.Task_Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ps-5">
            <div>
              <span className="fw-bold">Descripción:</span><br />
              <span className="ps-3">{task.Description}</span>
            </div>
            <div>
              <br />
              <span className="fw-bold">Importancia:</span><br />
              <span className="ps-3">{task.Importance}</span>
            </div>
            <div>
              <br />
              <span className="fw-bold">Fecha compromiso:</span><br />
              <span className="ps-3">{task.Date}</span>
            </div>
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
