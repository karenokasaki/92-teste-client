import { useState, useEffect } from "react";
import api from "../api/api";
import { Card, Form, Container } from "react-bootstrap";

function AdminPage() {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fecthTasks() {
      try {
        const response = await api.get("/task/all-tasks");
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fecthTasks();
  }, [reload]);

  console.log(tasks);

  return (
    <div>
      <Container className="mt-3">
        <h1>Tarefas</h1>
        {!isLoading &&
          tasks.map((task) => {
            return (
              <Card className="m-3">
                <Card.Body>
                  <p>{task.details}</p>
                  <p>{task.status}</p>
                </Card.Body>
                <Card.Footer>
                  {!task.complete && (
                    <>
                      <p className="text-muted">
                        Data Final Esperada: {task.dateFin.slice(0, 10)}
                      </p>
                    </>
                  )}
                  {task.complete && (
                    <p>
                      Data da tarefa concluída: {task.dateFin.slice(0, 10)}{" "}
                    </p>
                  )}
                </Card.Footer>
              </Card>
            );
          })}
      </Container>
    </div>
  );
}

export default AdminPage;
