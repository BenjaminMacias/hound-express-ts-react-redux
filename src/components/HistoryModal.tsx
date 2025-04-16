import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setHistoryModalOpen, setSelectedGuide } from "../store/guidesSlice";

const HistoryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state.guides.isHistoryModalOpen);
  const selectedId = useSelector((state: RootState) => state.guides.selectedGuideNumber);
  const guide = useSelector((state: RootState) =>
    state.guides.guides.find((g) => g.id === selectedId)
  );

  const handleClose = () => {
    dispatch(setHistoryModalOpen(false));
    dispatch(setSelectedGuide(null));
  };

  if (!isOpen || !guide) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Cerrar historial"
        >
          &times;
        </button>

        <h3 className="modal-title">
          Historial de la guía: <strong>{guide.id}</strong>
        </h3>

        {guide.history.length === 0 ? (
          <p className="modal-empty">No hay historial disponible.</p>
        ) : (
          <table className="modal-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {[...guide.history]
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    <td>{entry.status}</td>
                    <td>{entry.location}</td>
                    <td>{entry.notes}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
