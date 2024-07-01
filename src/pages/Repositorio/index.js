import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import {
  Container,
  Loading,
  Header,
  BackButton,
  BackButtonContainer,
  IssueList,
  Pagination,
  ButtonIssues,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const [repoOwner, setRepoOwner] = useState({});
  const [issues, setIssues] = useState([]);
  const [hasIssues, setHasIssues] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { state: "all", label: "Todas", active: true },
    {
      state: "open",
      label: "Abertas",
      active: false,
    },
    { state: "closed", label: "Fechadas", active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);
  const [hasNoPagination, setHasNoPagination] = useState(false);

  const { repositorio } = useParams();

  useEffect(() => {
    async function requestRepo() {
      //faz as duas requisições ao mesmo tempo dentro de um array
      const [repoData, issueData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: filters.find((f) => f.active).state,
            per_page: 5,
          },
        }),
      ]);
      setRepoOwner(repoData.data);
      setIssues(issueData.data);
      setLoading(false);
      if (issueData.data.length > 0) {
        setHasIssues(true);
      }
    }

    requestRepo();
  }, [repositorio, filters]);

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page: page,
          per_page: 5,
        },
      });
      setIssues(response.data);
      if (response.data.length === 0) {
        setHasNoPagination(true);
      }
    }
    loadIssues();
  }, [repositorio, page, filters, filterIndex]);

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }
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
          {hasIssues && (
            <ButtonIssues active={filterIndex}>
              {filters.map((filter, index) => (
                <button
                  type="button"
                  key={filter.label}
                  onClick={() => handleFilter(index)}
                >
                  {filter.label}
                </button>
              ))}
            </ButtonIssues>
          )}
          {hasIssues && (
            <IssueList>
              {issues.map((issue) => (
                <li key={issue.id}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a href={issue.html_url} target="_blank">
                        {issue.title}
                      </a>
                      {issue.labels.map((label) => (
                        <span key={label.id}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
          )}

          {hasIssues && (
            <Pagination>
              <button
                type="button"
                onClick={() => handlePage("back")}
                disabled={page < 2}
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={hasNoPagination}
                onClick={() => handlePage("next")}
              >
                Próxima
              </button>
            </Pagination>
          )}
        </Container>
      )}
    </>
  );
}
