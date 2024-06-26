import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  List,
  TrashButton,
  AlertMessage,
} from "./styles";
import { FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState(() => {
    const repoStorage = localStorage.getItem("repos");
    return repoStorage ? JSON.parse(repoStorage) : [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertHasRepo, setAlertHasRepo] = useState(false);
  const [alertNotFound, setAlertNotFound] = useState(false);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(false);
        setAlertHasRepo(false);
        setAlertNotFound(false);

        try {
          if (newRepo === "") {
            throw new Error("Você precisa indicar um repositório.");
          }

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);
          if (hasRepo) {
            setAlertHasRepo(true);
            return;
          }

          const response = await api.get(`/repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
          console.log(repositorios);
        } catch (error) {
          if (error.message === "Você precisa indicar um repositório.") {
            setAlert(true);
          } else if (error.response && error.response.request.status === 404) {
            setAlertNotFound(true);
          } else {
            console.log(error);
          }
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
    setAlert(false);
    setAlertHasRepo(false);
    setAlertNotFound(false);
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
      <Form onSubmit={handleSubmit} error={alert}>
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
      {(alert || alertNotFound) && (
        <AlertMessage>Digite um repositório válido!</AlertMessage>
      )}
      {alertHasRepo && (
        <AlertMessage>Repositório já existente na base!</AlertMessage>
      )}

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            {repo.name}{" "}
            <span>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaBars />
              </Link>
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
