import { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Row,
  Col,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import api from "../api/api";

function TarefasPage() {
  const [form, setForm] = useState({
    details: "",
    dateFin: "",
  });

  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fecthTasks() {
      try {
        const response = await api.get("/task/my-tasks");
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fecthTasks();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/task/create-task", form);
      setReload(!reload);
      setForm({
        details: "",
        dateFin: "",
      });
    } catch (error) {}
  }

  async function handleTaskDone(id) {
    try {
      await api.put(`/task/concluida/${id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTaskDelete(id) {
    await api.delete(`/task/delete/${id}`);
    setReload(!reload);
  }

  async function handleSelect(e, id) {
    await api.put(`/task/edit/${id}`, { status: e.target.value });
    setReload(!reload);
  }
  console.log(tasks);

  return (
    <div>
      <Container className="border rounded mt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome completo do funcionário"
              name="details"
              value={form.details}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data final esperada</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} className="mb-2">
            Salvar tarefa
          </Button>
        </Form>
      </Container>

      <Container className="mt-3">
        <h1>Tarefas</h1>
        {!isLoading &&
          tasks.map((task) => {
            return (
              <Card className="m-3">
                <Card.Body>
                  <p>{task.details}</p>

                  {!task.complete && (
                    <Form.Select
                      onChange={(e) => handleSelect(e, task._id)}
                      defaultValue={task.status}
                    >
                      <option value="aberto">aberto</option>
                      <option value="andamento">andamento</option>
                      <option value="finalizando">finalizando</option>
                    </Form.Select>
                  )}
                </Card.Body>
                <Card.Footer>
                  {!task.complete && (
                    <>
                      <p className="text-muted">
                        Data Final Esperada: {task.dateFin.slice(0, 10)}
                      </p>
                      <Button
                        onClick={() => handleTaskDone(task._id)}
                        size="sm"
                        className="me-5"
                      >
                        Concluída
                      </Button>
                    </>
                  )}
                  {task.complete && (
                    <p>
                      Data da tarefa concluída: {task.dateFin.slice(0, 10)}{" "}
                    </p>
                  )}

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Excluir Task
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
      </Container>
    </div>
  );
}

export default TarefasPage;
