import AboutMe from "../components/AboutMe";
import Carousel from "../components/Carousel";
import Reviews from "../components/Reviews";


function Home() {
    return (
        <div className="home">
            <div id="carousel">
                <Carousel />
            </div>
            <div id="about-me">
                <AboutMe />
            </div>
            <div id="reviews">
                <Reviews />
            </div>
        </div>
    )
}

export default Home;