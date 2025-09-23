import React, { useEffect, useMemo, useState } from "react";
import "../styles/global.css";

/* ===========================
   Helpers para rutas de imágenes
   =========================== */
function fotoPerfil(slug) {
  return `/images/Docentes/${slug}/profile.jpg`;
}
function evidenciaUrl(slug, file) {
  return `/images/Docentes/${slug}/evidencias/${file}`;
}

/* ===========================
   Hook pequeño para media-query
   =========================== */
function useMediaQuery(query) {
  const [match, setMatch] = React.useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

export default function SectionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [q, setQ] = useState("");
  const [abierto, setAbierto] = useState(null);
  const [blocks, setBlocks] = useState(1);

  const PAGE_SIZE = 8;
  const isDesktop = useMediaQuery("(min-width:1024px)");

  /* ============ cargar datos ============ */
  useEffect(() => {
    fetch("/data/Docentes.json")
      .then((r) => r.json())
      .then(setDocentes)
      .catch(console.error);
  }, []);

  /* ====== deduplicar por slug o id ====== */
  const base = useMemo(() => {
    const seen = new Set();
    return docentes.filter((d) => {
      const key = d.slug ?? d.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [docentes]);

  /* ============ áreas dinámicas ============ */
  const AREAS = useMemo(() => {
    const s = new Set(["Todas"]);
    base.forEach((d) => s.add(d.area));
    return Array.from(s);
  }, [base]);

  /* ======== filtrado + búsqueda ========= */
  const lista = useMemo(() => {
    return base
      .filter((d) => filtro === "Todas" || d.area === filtro)
      .filter((d) =>
        (d.nombre + d.materia + d.area).toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [base, filtro, q]);

  /* ============ paginado (desktop) ============ */
  const visible = useMemo(
    () => lista.slice(0, blocks * PAGE_SIZE),
    [lista, blocks]
  );
  const hasMore = visible.length < lista.length;

  const docenteSel = useMemo(
    () => lista.find((d) => d.id === abierto) || null,
    [lista, abierto]
  );

  /* helper para no repetir JSX de una card */
  const renderCard = (d) => (
    <article className="teacher-card" key={d.id}>
      <Avatar nombre={d.nombre} foto={fotoPerfil(d.slug)} />
      <h3>{d.nombre}</h3>
      <div className="meta">
        <span className="badge">{d.area}</span>
        <span className="badge ghost">{d.materia}</span>
      </div>
      <div className="contact">
        {d.email && (
          <a href={`mailto:${d.email}`} title="Email" className="icon-btn">
            ✉️
          </a>
        )}
        {d.tel && (
          <a
            href={`https://wa.me/57${d.tel}`}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp"
            className="icon-btn"
          >
            💬
          </a>
        )}
      </div>
      <button className="btn-outline" onClick={() => setAbierto(d.id)}>
        Más info…
      </button>
    </article>
  );

  return (
    <section id="docentes" className="teachers">
      <div className="container">
        {/* encabezado */}
        <div className="org-intro">
          <span className="chip">Docentes</span>
          <br />
          <h2>Nuestro equipo académico</h2>
          <p className="lead">
            Conoce a los maestros que impulsan la excelencia y la identidad rural
            en la IEA La Mina.
          </p>
        </div>

        {/* filtros */}
        <div className="teachers-toolbar">
          <div className="filter-group">
            {AREAS.map((a) => (
              <button
                key={a}
                className={`pill ${filtro === a ? "active" : ""}`}
                onClick={() => {
                  setFiltro(a);
                  setBlocks(1); // reset del paginado al cambiar filtro
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="Buscar por nombre o materia..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setBlocks(1); // reset al buscar
              }}
            />
          </div>
        </div>

        {/* SOLO MÓVIL/TABLET: carrusel horizontal */}
        {!isDesktop && (
          <div className="teachers-carousel">
            <div className="carousel-rail">
              {lista.map((d) => renderCard(d))}
            </div>
          </div>
        )}

        {/* SOLO DESKTOP: grid + paginado */}
        {isDesktop && (
          <>
            <div className="teachers-grid">{visible.map(renderCard)}</div>

            <div className="load-more-wrap">
              {hasMore ? (
                <button
                  className="btn-primary"
                  onClick={() => setBlocks((b) => b + 1)}
                >
                  Ver más docentes
                </button>
              ) : (
                <div className="end-hint">Has visto todos los docentes.</div>
              )}
            </div>
          </>
        )}
      </div>

      {/* modal */}
      {docenteSel && (
        <Modal onClose={() => setAbierto(null)}>
          <div className="teacher-modal">
            <div className="modal-header">
              <Avatar
                nombre={docenteSel.nombre}
                foto={fotoPerfil(docenteSel.slug)}
                size="lg"
              />
              <div>
                <h3>{docenteSel.nombre}</h3>
                <div className="meta">
                  <span className="badge">{docenteSel.area}</span>
                  <span className="badge ghost">{docenteSel.materia}</span>
                </div>
                <p className="bio">{docenteSel.bio}</p>
              </div>
            </div>

            {docenteSel.proyectos?.length > 0 && (
              <>
                <h4>Proyectos y evidencias</h4>
                <div className="evidence-grid">
                  {docenteSel.proyectos.map((p, i) => (
                    <figure key={i} className="evidence">
                      <div
                        className="evidence-thumb"
                        style={{
                          backgroundImage: `url(${evidenciaUrl(
                            docenteSel.slug,
                            p.evidencia
                          )})`,
                        }}
                      />
                      <figcaption>
                        <b>{p.titulo}</b> <small>· {p.anio}</small>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}

            <div className="modal-actions">
              {docenteSel.email && (
                <a href={`mailto:${docenteSel.email}`} className="btn-primary">
                  Escribir
                </a>
              )}
              {docenteSel.tel && (
                <a
                  href={`https://wa.me/57${docenteSel.tel}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  WhatsApp
                </a>
              )}
              <button className="btn-outline" onClick={() => setAbierto(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

/* ===========================
   Avatar con fallback iniciales
   =========================== */
function Avatar({ nombre, foto, size = "md" }) {
  const initials = nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`teacher-avatar ${size}`}>
      {foto && (
        <img
          src={foto}
          alt={nombre}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.querySelector(".fallback").style.display =
              "grid";
          }}
        />
      )}
      <span className="fallback">{initials}</span>
    </div>
  );
}

/* ===========================
   Modal simple
   =========================== */
function Modal({ children, onClose }) {
  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
