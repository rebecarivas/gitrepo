import React, { useState, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  List,
  TrashButton,
  DetailButton,
} from "./styles";
import { FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`/repos/${newRepo}`);
          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
          console.log(repositorios);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }
  const handleTrash = useCallback(
    (repoName) => {
      const find = repositorios.filter((r) => r.name !== repoName);
      setRepositorios(find);
    },
    [repositorios]
  );
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
        <Button type="submit" loading={loading ? 1 : 0}>
          {loading ? <FaSpinner /> : <FaPlus />}
        </Button>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            {repo.name}{" "}
            <span>
              <DetailButton>
                <FaBars />
              </DetailButton>
              <TrashButton onClick={() => handleTrash(repo.name)} type="button">
                <FaTrash />
              </TrashButton>
            </span>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
