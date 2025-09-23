import './styles/global.css';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Footer from './components/Footer';
import KenBurnsCarousel from './components/HeroCarousel';
import SectionNosotros from './components/SectionNosotros';
import SectionJerarquia from './components/Jeraquia';
import SectionDocentes from './components/SectionDocentes';
import SectionDivider from './components/SectionDivider';

function App() {
  return (
    <>
      <Navbar />
      <KenBurnsCarousel></KenBurnsCarousel>
      <SectionNosotros></SectionNosotros>
      <SectionJerarquia></SectionJerarquia>
    <SectionDivider variant="angle" nextBg="#ffffff"></SectionDivider>
      <SectionDocentes></SectionDocentes>
      <Footer />
    </>
  );
}

export default App;
