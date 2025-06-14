
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => (
  <>
    <Navbar />
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Thank You!</h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Your submission has been received. We'll get back to you as soon as possible.
      </p>
      {/* Optionally, add a button to go back home */}
      <a href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
        Back to Home
      </a>
    </section>
    <Footer />
  </>
);

export default ThankYou;
