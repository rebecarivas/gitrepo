import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100vh;
`;
export const Container = styled.main`
  width: 70%;
  background-color: #001f21;
  margin: 50px auto;
  padding: 20px;
  border-radius: 5px;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50%;
    border-radius: 50%;
    margin-top: 30px;
  }
  h1 {
    font-size: 40px;
    color: #ecc039;
    text-transform: uppercase;
    margin-top: 30px;
  }
  p {
    color: #ecc039;
    font-size: 20px;
    text-align: center;
    max-width: 80%;
    margin-top: 10px;
  }
`;
export const BackButtonContainer = styled.div`
  padding: 10px;
`;
export const BackButton = styled(Link)`
  text-decoration: none;
  color: #001f21;
  :visited {
    color: #001f21;
  }
`;
