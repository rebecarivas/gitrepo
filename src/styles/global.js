import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body{
    background-color: #029b99;
    font-family: Arial, Helvetica, sans-serif;
}
button{
    cursor: pointer;
}
`;
