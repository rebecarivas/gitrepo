import React from "react";
import { Container, Form, Button } from "./styles";
import { FaPlus } from "react-icons/fa";

function Main() {
  return (
    <Container>
      <h1>GitRepo</h1>
      <Form>
        <input type="text" placeholder="Adicionar repositório" />
        <Button type="submit">
          <FaPlus />
        </Button>
      </Form>
    </Container>
  );
}

export default Main;
