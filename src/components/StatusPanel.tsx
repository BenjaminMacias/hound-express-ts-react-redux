import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const StatusPanel: React.FC = () => {
  const guides = useSelector((state: RootState) => state.guides.guides);

  // Cálculos internos (total no se muestra)
  const total = guides.length;
  const pending = guides.filter((g) => g.status === "Pendiente").length;
  const inTransit = guides.filter((g) => g.status === "En tránsito").length;
  const delivered = guides.filter((g) => g.status === "Entregado").length;

  return (
    <section className="status-panel" id="status">
      <div className="status-panel__card">
        Pendientes: {pending}
      </div>
      <div className="status-panel__card">
        En tránsito: {inTransit}
      </div>
      <div className="status-panel__card">
        Entregadas: {delivered}
      </div>
    </section>
  );
};

export default StatusPanel;
