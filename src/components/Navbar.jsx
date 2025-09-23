import React, { useEffect, useState } from "react";
import "../styles/global.css";

export default function Navbar(){
  const [open, setOpen] = useState(false);

  // scroll suave a anclas
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand">
            <img src="images/ESCUDOMINA1.png" alt="Escudo IEA La Mina" style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <b>Institucion Educativa Agrícola La Mina</b>
              <div style={{fontSize:12,opacity:.8}}>La Mina · Cesar · 1986</div>
            </div>
          </div>

          <button className="menu-btn" onClick={()=>setOpen(v=>!v)}>☰</button>

          <nav className={`nav-links ${open ? "open" : ""}`}>
            {["inicio","nosotros","jerarquia","docentes","noticias","galeria","contacto"].map((id)=>(
              <a key={id} href={`#${id}`}>{id[0].toUpperCase()+id.slice(1)}</a>
            ))}
            <a href="#admisiones" className="btn-inscribete">Inscríbete</a>
          </nav>
        </div>
      </header>
      <div className="header-spacer" /> {/* evita salto del contenido */}
    </>
  );
}
