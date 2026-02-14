import Contact from './Contact/Contact';
import Discount from './Discount/Discount';
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import SpecialProducts from './SpecialProducts/SpecialProducts'
import { useAuth } from '../../Context/AuthContext';
import './Home.css'

const Home = () => {
    const { loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <div className='home'>
            <Navbar />
            <Hero />
            <SpecialProducts />
            <Discount />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home;