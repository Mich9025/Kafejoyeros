import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import InstagramGrid from '@/components/InstagramGrid';
import GoogleReviews from '@/components/GoogleReviews';
import LocationMap from '@/components/LocationMap';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-4-JPG-Photoroom.png"} />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <InstagramGrid />
      <GoogleReviews />
      <LocationMap />
      {/*<Contact />*/}
      <Footer />
    </main>
  );
}