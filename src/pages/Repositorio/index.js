import React from "react";
import { useParams } from "react-router-dom";

function Repositorio() {
  const { repositorio } = useParams();
  console.log(repositorio);

  return (
    <>
      <h1 style={{ color: "#fff" }}>Repositório: {repositorio}</h1>
    </>
  );
}

export default Repositorio;
