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
export const IssueList = styled.ul`
  margin-top: 30px;
  list-style: none;
  li {
    background-color: #ebe7b7;
    padding: 15px;
    display: flex;
    border-radius: 10px;
    margin-bottom: 10px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    div {
      margin-left: 10px;
      strong {
        display: flex;
      }
      a {
        color: #001f21;
        text-decoration: none;
        transform: 0.3s;
        :visited {
          color: #001f21;
        }
        &:hover {
          color: #de4f15;
        }
      }
      span {
        background-color: #001f21;
        color: #ebe7b7;
        padding: 4px;
        border-radius: 5px;
        margin-left: 10px;
      }
      p {
        color: #001f21;
        margin-top: 10px;
      }
    }
  }
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 5px 10px;
    border-radius: 5px;
    background: #ecc039;
    color: #001f21;
    font-weight: bold;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
export const ButtonIssues = styled.div`
  margin: 15px 0;
  button {
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;
    color: #001f21;

    &:nth-child(${(props) => props.active + 1}) {
      background: #ecc039;
      color: #001f21;
      font-weight: bold;
    }
  }
`;
