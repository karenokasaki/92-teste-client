import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Enap92</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
                <Link className="nav-link" to="/tarefas">
                  Tarefas
                </Link>
                <Link className="nav-link" to="/notificacoes">
                  Notificações
                </Link>
              </>
            )}
            {!loggedInUser && (
              <Link className="nav-link" to="/">
                Página inicial
              </Link>
            )}
            {loggedInUser && loggedInUser.user.role === "ADMIN" && (
              <Link className="nav-link" to="/admin">
                Página ADMIN
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
