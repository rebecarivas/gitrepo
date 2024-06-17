import React, { useState } from "react";
import { Container, Form, Button } from "./styles";
import { FaPlus } from "react-icons/fa";

function Main() {
  const [newRepo, setNewRepo] = useState("");

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <Container>
      <h1>GitRepo</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <FaPlus />
        </Button>
      </Form>
    </Container>
  );
}

export default Main;
