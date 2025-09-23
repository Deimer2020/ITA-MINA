import React from "react";
import "../styles/global.css";

export default function SectionJerarquia() {
  // Puedes ir cambiando las rutas de img por tus archivos reales en /public/images/icons
  const tarjetas = [
    {
      title: "Cuerpo Administrativo",
      desc: "Secretaría, coordinación y personal de apoyo",
      img: "/images/icons/administrativo.png", // opcional
      emoji: "🗂️",
    },
    {
      title: "Cuerpo Docente",
      desc: "Profesores de todas las áreas y niveles",
      img: "/images/icons/docente.png",
      emoji: "👩‍🏫",
    },
    {
      title: "Estudiantes",
      desc: "Nuestra razón de ser, con más de 900 jóvenes",
      img: "/images/icons/estudiantes.png",
      emoji: "👩‍🎓",
    },
    {
      title: "Padres de familia",
      desc: "Acompañan y fortalecen el proceso formativo",
      img: "../images/ita.png",
      emoji: "👨‍👩‍👧‍👦",
    },
  ];

  return (
    <section id="jerarquia" className="jerarquia">
      <div className="container">
        <div className="org-intro">
          <span className="chip">Jerarquía Institucional</span>
          <br />
          <h2>Nuestra estructura organizativa</h2>
          <p className="lead">
            La Institución Educativa Agrícola La Mina está conformada por
            diferentes estamentos que trabajan unidos para garantizar calidad
            educativa, identidad rural y excelencia.
          </p>
        </div>

        {/* Bloque del rector */}
        <div className="org-chart">
          <div className="org-card rector">
            <div className="thumb">
              <img src="/images/ita.jpeg" alt="Rector" />
            </div>
            <h4>Rector</h4>
            <p>Aquileo Aguilar</p>
            <p>Líder y representante de la institución</p>
          </div>

          {/* Consejos */}
          <div className="org-level chips">
            <span className="pill">Consejo Directivo</span>
            <span className="pill">Consejo Académico</span>
          </div>

          {/* Tarjetas con imagen/icono */}
          <div className="org-grid">
            {tarjetas.map((t, i) => (
              <div className="org-card" key={i}>
                <div className="thumb">
                  {t.img ? (
                    <img
                      src={t.img}
                      alt={t.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.querySelector(
                          ".emoji"
                        ).style.display = "grid";
                      }}
                    />
                  ) : null}
                  <span
                    className="emoji"
                    style={{ display: t.img ? "none" : "grid" }}
                  >
                    {t.emoji}
                  </span>
                </div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
