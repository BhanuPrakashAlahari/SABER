import { Link } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { KeyFeatures } from '../components/landing/KeyFeatures';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { GetStarted } from '../components/landing/GetStarted';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen pb-10">
            <header className="px-8 py-6 flex items-center justify-between sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5">
                <h1 className="text-xl font-bold tracking-tight text-white uppercase letter-spacing-2">SABER</h1>
                <Link to="/login" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wide">
                    Login
                </Link>
            </header>

            <main className="flex-1 w-full flex flex-col">
                <Hero />
                <KeyFeatures />
                <WhyChooseUs />
                <GetStarted />
            </main>

            <footer className="py-8 text-center text-gray-400 text-xs border-t border-white/5 bg-black">
                <div className="mb-4">
                    Made with <span className="text-red-500">❤️</span> by Stark Protocol S4
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-500">
                    <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                    <Link to="/terms-and-conditions" className="hover:text-zinc-300 transition-colors">Terms & Conditions</Link>
                    <Link to="/refund-policy" className="hover:text-zinc-300 transition-colors">Refund Policy</Link>
                    <Link to="/shipping-policy" className="hover:text-zinc-300 transition-colors">Shipping Policy</Link>
                    <Link to="/contact" className="hover:text-zinc-300 transition-colors">Contact Us</Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
