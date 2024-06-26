import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import {
  Container,
  Loading,
  Header,
  BackButton,
  BackButtonContainer,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const [repoOwner, setRepoOwner] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { repositorio } = useParams();

  useEffect(() => {
    async function requestRepo() {
      //faz as duas requisições ao mesmo tempo dentro de um array
      const [repoData, issueData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
      setRepoOwner(repoData.data);
      setIssues(issueData.data);
      setLoading(false);
    }

    requestRepo();
  }, [repositorio]);

  return (
    <>
      <BackButtonContainer>
        <BackButton to="/">
          <FaArrowLeft size={30} />
        </BackButton>
      </BackButtonContainer>
      {loading ? (
        <Loading>
          <h1>Carregando...</h1>
        </Loading>
      ) : (
        <Container>
          <Header>
            <img src={repoOwner.owner.avatar_url} alt={repoOwner.owner.login} />
            <h1>{repoOwner.name}</h1>
            <p>{repoOwner.description}</p>
          </Header>
        </Container>
      )}
    </>
  );
}
