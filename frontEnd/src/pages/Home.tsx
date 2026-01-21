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

            <footer className="py-6 text-center text-gray-400 text-xs">
                Made with <span className="text-red-500">❤️</span> by Stark Protocol S4
            </footer>
        </div>
    );
};

export default Home;
