import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import EditUser from "../components/EditUser";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { setLoggedInUser, loggedInUser } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [reload, setReload] = useState(false);

  const [form, setForm] = useState({
    name: "",
  });

  console.log(loggedInUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        console.log(response);
        setUser(response.data);
        setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  function logOff() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  }

  async function handleDelete(e) {
    try {
      await api.delete("/user/delete");
      logOff();
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="mb-5 align-items-center">
          <Col>
            <Card>
              <h1 className="text-muted">{user.name}</h1>
              <p>{user.email}</p>
            </Card>
          </Col>
          <Col>
            {" "}
            <img src={user.profilePic} alt="profile pic" className="rounded" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" onClick={() => setShowEdit(true)}>
              Editar perfil
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDelete}>
              Excluir perfil
            </Button>
          </Col>
          <Col>
            <Link to="/tarefas">
              <Button variant="dark">Minhas Tarefas</Button>
            </Link>
          </Col>
          <Col>
            <Button variant="dark" onClick={logOff}>
              Log off
            </Button>
          </Col>
        </Row>
      </Container>

      {showEdit && (
        <EditUser
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          form={form}
          setForm={setForm}
          setReload={setReload}
          reload={reload}
        />
      )}
    </div>
  );
}

export default ProfilePage;
