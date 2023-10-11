import { Routes as RoutesDom, Route } from "react-router-dom";
import { Desktop } from "@/src/pages/desktop";
import { Agendamentos } from "../pages/agendamentos";
import { Consultas } from "../pages/consultas";

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Desktop />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
      <Route path="/consultas" element={<Consultas />} />
    </RoutesDom>
  );
};

export default Routes;
