import NavbarPlayground from './components/NavbarPlayground';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavbarPlayground />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
