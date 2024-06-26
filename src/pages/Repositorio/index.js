import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Repositorio() {
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
      <h1 style={{ color: "#fff" }}>Repositório: {repositorio}</h1>
    </>
  );
}

export default Repositorio;
