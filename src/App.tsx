import React, { useState, useEffect } from "react";
import "./styles/main.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import GuideForm from "./components/GuideForm";
import StatusPanel from "./components/StatusPanel";
import GuideList from "./components/GuideList";
import HistoryModal from "./components/HistoryModal";
import SearchBar from "./components/SearchBar";

import { Guide } from "./interfaces/Guide";

const App: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddGuide = (newGuide: Guide) => {
    const now = new Date().toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const guideWithHistory: Guide = {
      ...newGuide,
      lastUpdate: now,
      history: [
        {
          date: now,
          status: newGuide.status,
          location: newGuide.destination,
          notes: `Guía registrada con estado ${newGuide.status}`,
        },
      ],
    };

    setGuides((prev) => [...prev, guideWithHistory]);
  };

  const handleUpdateStatus = (number: string) => {
    const updatedGuides = guides.map((guide) => {
      if (guide.number === number) {
        const states = ["Pendiente", "En tránsito", "Entregado"];
        const currentIndex = states.indexOf(guide.status);
        if (currentIndex < states.length - 1) {
          const newStatus = states[currentIndex + 1];
          const now = new Date().toLocaleString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return {
            ...guide,
            status: newStatus,
            lastUpdate: now,
            history: [
              ...guide.history,
              {
                date: now,
                status: newStatus,
                location: guide.destination,
                notes: `Estado actualizado a ${newStatus}`,
              },
            ],
          };
        }
      }
      return guide;
    });

    setGuides(updatedGuides);
  };

  const handleShowHistory = (number: string) => {
    const guide = guides.find((g) => g.number === number);
    if (guide) {
      setSelectedGuide(guide);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedGuide(null);
    setIsModalOpen(false);
  };

  const filteredGuides = guides.filter((guide) =>
    guide.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    console.log("Guías actualizadas:", guides);
  }, [guides]);

  return (
    <>
      <Header />
      <Banner />

      <main className="container">
        {/* 📝 Sección Registro */}
        <section id="register">
          <GuideForm onAddGuide={handleAddGuide} existingGuides={guides} />
        </section>

        {/* 📊 Sección Estado general */}
        <section id="status">
          <StatusPanel
            total={guides.filter((g) => g.status !== "Entregado").length}
            inTransit={guides.filter((g) => g.status === "En tránsito").length}
            delivered={guides.filter((g) => g.status === "Entregado").length}
          />
        </section>

        {/* 🔍 Sección Buscar */}
        <section id="search">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        </section>

        {/* 📦 Sección Guías */}
        <section id="list">
          <GuideList
            guides={filteredGuides}
            query={searchQuery}
            onUpdateStatus={handleUpdateStatus}
            onShowHistory={handleShowHistory}
          />
        </section>
      </main>

      <HistoryModal
        isOpen={isModalOpen}
        selectedGuide={selectedGuide}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default App;
