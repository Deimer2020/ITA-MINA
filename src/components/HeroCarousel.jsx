// src/components/KenBurnsCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/global.css";

export default function KenBurnsCarousel() {
  const slides = [
    { src: "/images/ita.jpeg", title: "Institución Educativa Agrícola La Mina" },
    { src: "/images/ita1.jpeg", title: "Institución Educativa Agrícola La Mina" },
    { src: "/images/ita2.jpeg", title: "Institución Educativa Agrícola La Mina" },
    { src: "/images/ita3.jpeg", title: "Institución Educativa Agrícola La Mina" },
    { src: "/images/ita4.jpeg", title: "Institución Educativa Agrícola La Mina" },
    { src: "/images/ita5.jpeg", title: "Institución Educativa Agrícola La Mina" },
    
  ];

  const [i, setI] = useState(0);
  const n = slides.length;
  const timer = useRef(null);

  const next = () => setI((v) => (v + 1) % n);
  const prev = () => setI((v) => (v - 1 + n) % n);

  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(next, 5000); // 5s por slide
    return () => clearInterval(timer.current);
  }, [i]);

  return (
    <section id="inicio" className="hero">
      <div className="kb-carousel">
        {slides.map((s, idx) => (
          <figure key={idx} className={`kb-slide ${idx === i ? "is-active" : ""}`}>
            {/* Fondo borroso */}
            <div
              className="kb-bg"
              style={{ backgroundImage: `url(${s.src})` }}
            />
            {/* Foto principal */}
            <div
              className="kb-photo"
              style={{ backgroundImage: `url(${s.src})` }}
            />
            <div className="overlay" />
            <figcaption className="content container">
              <h1 className="hero-title">{s.title}</h1>
              <p className="hero-sub">EXCELENCIA · IDENTIDAD RURAL · DESDE 1986</p>
              <div className="cta">
                <a href="#admisiones" className="btn-primary">Ver más</a>
                <a
                  href="https://wa.me/573001112233"
                  className="btn-primary"
                  style={{ background: "transparent", border: "1.5px solid #fff" }}
                >
                  WhatsApp
                </a>
              </div>
            </figcaption>
          </figure>
        ))}

        {/* Flechas */}
        <button className="kb-arrow left" onClick={prev}>❮</button>
        <button className="kb-arrow right" onClick={next}>❯</button>

        {/* Dots */}
        <div className="kb-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === i ? "active" : ""}`}
              onClick={() => setI(idx)}
            />
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="kb-progress">
          <div
            className="kb-bar"
            key={i}
            style={{ animationDuration: "5000ms" }}
          />
        </div>
      </div>
    </section>
  );
}
