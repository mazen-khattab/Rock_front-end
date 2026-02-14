import Contact from './Contact/Contact';
import Discount from './Discount/Discount';
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import SpecialProducts from './SpecialProducts/SpecialProducts'
import './Home.css'

const Home = () => {
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