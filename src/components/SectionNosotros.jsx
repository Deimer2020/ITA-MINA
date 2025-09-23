import React from "react";
import "../styles/global.css";

export default function SectionNosotros(){
  return (
    <section id="nosotros" className="about">
      <div className="container about-wrap">
        <div className="about-head">
          <span className="chip">Nosotros</span>
          <h2>Formación con identidad rural y excelencia</h2>
          <p className="lead">
            La Institución Educativa Agrícola La Mina promueve una formación integral,
            con amor por la naturaleza, cultura de trabajo y altos estándares académicos.
          </p>
        </div>

        <div className="about-grid">
          {/* Columna izquierda */}
          <div className="about-card">
            <h3>Misión</h3>
            <p>
              Formar ciudadanos íntegros con identidad rural, competencias académicas y
              socioemocionales, capaces de transformar su entorno con ética y liderazgo.
            </p>
            <h3>Visión</h3>
            <p>
              Ser referente regional en educación agrícola y cultural, reconocida por su
              calidad humana, innovación pedagógica y compromiso con el territorio.
            </p>

            <div className="values">
              <div className="value"><b>Respeto</b><span>•</span></div>
              <div className="value"><b>Trabajo</b><span>•</span></div>
              <div className="value"><b>Identidad</b><span>•</span></div>
              <div className="value"><b>Excelencia</b></div>
            </div>

            <div className="stats">
              <div><strong>1986</strong><small>Fundación</small></div>
              <div><strong>+900</strong><small>Estudiantes</small></div>
              <div><strong>+60</strong><small>Docentes</small></div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="about-media">
            <div className="media-card">
              {/* Ajusta la ruta según tu carpeta /public/images */}
              <img
                src="/images/ESCUDOMINA1.png"
                alt="Escudo IEA La Mina"
                className="escudo-img"
                loading="lazy"
              />
              <div className="media-caption">
                Escudo y colores institucionales
              </div>
            </div>

            <div className="media-card wide">
              {/* Si tienes otra foto del campus, cámbiala aquí */}
              <div
                className="media-bg"
                style={{ backgroundImage: 'url(/images/ita1.jpeg)' }}
              />
              <div className="media-caption">
                Campus · La Mina, Cesar
              </div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <a href="#programas" className="btn-primary">Conoce nuestros programas</a>
          <a href="#admisiones" className="btn-inscribete">Inscríbete</a>
        </div>
      </div>
    </section>
  );
}
