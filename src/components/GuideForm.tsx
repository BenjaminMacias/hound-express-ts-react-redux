import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addGuide } from "../store/guidesSlice";
import { Guide } from "../interfaces/Guide";

const GuideForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const existingGuides = useSelector((state: RootState) => state.guides.guides);

  const [formData, setFormData] = useState({
    trackingNumber: "",
    origin: "",
    destination: "",
    recipient: "",
    creationDate: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { trackingNumber, origin, destination, recipient, creationDate } = formData;

    if (
      !trackingNumber.trim() ||
      !origin.trim() ||
      !destination.trim() ||
      !recipient.trim() ||
      !creationDate.trim()
    ) {
      setError("Por favor completa todos los campos sin dejar espacios vacíos.");
      return;
    }

    const exists = existingGuides.some(
      g => g.id.trim().toLowerCase() === trackingNumber.trim().toLowerCase()
    );

    if (exists) {
      setError("El número de guía ya existe.");
      return;
    }

    const newGuide: Guide = {
      id: trackingNumber.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      recipient: recipient.trim(),
      creationDate: creationDate.trim(),
      status: "Pendiente", // será también usado por el slice
      lastUpdate: creationDate.trim(),
      history: [], // se sobrescribirá con la entrada inicial en el slice
    };

    dispatch(addGuide(newGuide));

    setFormData({
      trackingNumber: "",
      origin: "",
      destination: "",
      recipient: "",
      creationDate: "",
    });

    setError(null);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registrar Nueva Guía</h2>

      {error && <p className="form__error">{error}</p>}

      <input
        name="trackingNumber"
        value={formData.trackingNumber}
        onChange={handleChange}
        placeholder="Número de guía"
      />
      <input
        name="origin"
        value={formData.origin}
        onChange={handleChange}
        placeholder="Origen"
      />
      <input
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        placeholder="Destino"
      />
      <input
        name="recipient"
        value={formData.recipient}
        onChange={handleChange}
        placeholder="Destinatario"
      />
      
      <input
        type="date"
        name="creationDate"
        value={formData.creationDate}
        onChange={handleChange}
      />

      <button type="submit">Registrar</button>
    </form>
  );
};

export default GuideForm;
