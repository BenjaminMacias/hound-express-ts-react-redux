import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  updateGuideStatus,
  setSelectedGuide,
  setHistoryModalOpen,
} from "../store/guidesSlice";
import { Guide } from "../interfaces/Guide";

const GuideList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const guides = useSelector((state: RootState) => state.guides.guides);
  const query = useSelector((state: RootState) => state.guides.query);

  const handleUpdateStatus = (id: string) => {
    dispatch(updateGuideStatus({ id }));
  };

  const handleShowHistory = (id: string) => {
    dispatch(setSelectedGuide(id));
    dispatch(setHistoryModalOpen(true));
  };

  const filteredGuides = query
    ? guides.filter((g) =>
        g.id.toLowerCase().includes(query.trim().toLowerCase())
      )
    : guides;

  return (
    <section className="guide-list" id="list">
      <h2 className="guide-list__title">Lista de Guías</h2>

      {filteredGuides.length === 0 && query ? (
        <p className="guide-list__empty">
          🔍 No se encontró ninguna guía con ese número.
        </p>
      ) : (
        <table className="guide-list__table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Estado</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha de creación</th>
              <th>Última actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuides.map((guide: Guide) => (
              <tr key={guide.id}>
                <td>{guide.id}</td>
                <td>{guide.status}</td>
                <td>{guide.origin}</td>
                <td>{guide.destination}</td>
                <td>{guide.creationDate}</td>
                <td>{guide.lastUpdate}</td>
                <td className="guide-list__actions">
                  {guide.status !== "Entregado" && (
                    <button onClick={() => handleUpdateStatus(guide.id)}>
                      Actualizar
                    </button>
                  )}
                  <button onClick={() => handleShowHistory(guide.id)}>
                    Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default GuideList;
