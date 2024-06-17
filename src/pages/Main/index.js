import React, { useState, useCallback } from "react";
import { Container, Form, Button } from "./styles";
import { FaPlus } from "react-icons/fa";
import api from "../../services/api";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        const response = await api.get(`/repos/${newRepo}`);
        const data = {
          nome: response.data.full_name,
        };

        setRepositorios([...repositorios, data]);
        setNewRepo("");
        console.log(repositorios);
      }
      submit();
    },
    [newRepo, setNewRepo]
  );

  function handleInputChange(event) {
    setNewRepo(event.target.value);
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
