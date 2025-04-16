import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="banner">
      <img src="/img/envios.png" alt="Envíos Hound Express" className="banner__image" />
      <h2 className="banner__title">Rastrea tus envíos</h2>
      <p className="banner__slogan">Rápido. Seguro. Eficiente.</p>
    </section>
  );
};

export default Banner;
