import { useState } from "react";
import { Modal, Card, Row, Col, Button, Form } from "react-bootstrap";
import api from "../api/api";

function EditUser({ showEdit, setShowEdit, form, setForm, reload, setReload }) {
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      await api.put("/user/edit", form);
      setShowEdit(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  return (
    <Modal show={showEdit} onHide={() => setShowEdit(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do funcionário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do funcionário"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEdit(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditUser;
