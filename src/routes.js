import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

function RouteComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repositorio">
          <Route path=":repositorio" element={<Repositorio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouteComponent;
