import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import InstagramGrid from '@/components/InstagramGrid';
import GoogleReviews from '@/components/GoogleReviews';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header logo={"https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
      <Hero />
      <About />
      <Services />
      {/* <Gallery /> */}
      <InstagramGrid />
      <GoogleReviews />
      {/*banners*/}
      <Banner />      
      {/* <LocationMap /> */}
      {/*<Contact />*/}
      <Footer logo={"https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
    </main>
  );
}