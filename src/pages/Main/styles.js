import styled, { keyframes, css } from "styled-components";

export const Container = styled.main`
  width: 60%;
  background-color: #001f21;
  margin: 50px auto;
  padding: 20px;
  border-radius: 5px;
  h1 {
    display: flex;
    justify-content: center;
    font-size: 40px;
    color: #ecc039;
  }
`;

export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  input {
    flex: 1;
    border: 2px solid #001f21;
    border-radius: 5px;
    padding: 5px;
    font-size: 20px;
  }
`;
//animação do botão
const animated = keyframes`
from{
    transform: rotate(0deg);
}to{
    transform: rotat(360deg);
}
`;
export const Button = styled.button.attrs((props) => ({
  disabled: props.loading,
}))`
  border: 2px solid #001f21;
  border-radius: 5px;
  padding: 5px;
  font-size: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animated} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style: none;
  li {
    color: #001f21;
    font-size: 20px;
    background-color: #ebe7b7;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
    }
  }
`;
export const TrashButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 20px;
`;

export const DetailButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 20px;
  margin-right: 5px;
`;
