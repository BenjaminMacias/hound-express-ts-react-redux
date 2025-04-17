import React from "react";
import "./styles/main.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import GuideForm from "./components/GuideForm";
import StatusPanel from "./components/StatusPanel";
import GuideList from "./components/GuideList";
import HistoryModal from "./components/HistoryModal";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Banner />

      <main className="container">
        {/* Sección Registro */}
        <section id="register">
          <GuideForm />
        </section>

        {/* Sección Estado general */}
        <section id="status">
          <StatusPanel />
        </section>

        {/* Sección Buscar */}
        <section id="search">
          <SearchBar />
        </section>

        {/* Sección Guías */}
        <section id="list">
          <GuideList />
        </section>
      </main>

      <HistoryModal />
    </>
  );
};

export default App;
