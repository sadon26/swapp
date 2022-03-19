import { useEffect, useRef, useState } from "react";
import "./_index.scss";
import DownArrow from "../../assets/icons/down-arrow.svg";
import useFetch from "../../hooks/useFetch";
import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";

const Home = () => {
    const starWarsTextRef = useRef();
    const [showView, setShowView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showMoviesModal, setShowMoviesModal] = useState(false);
    const { getData } = useFetch();

    const fetchMovies = async (data) => {
        try {
            setLoading(true);
            const response = await getData(data);
            if (response.status === 200)
                setMovies(
                    response.data.results.sort((a, b) =>
                        new Date(a.release_date).getTime() <
                        new Date(b.release_date).getTime()
                            ? -1
                            : 1
                    )
                );
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    };

    const removeAnimationIntro = () => {
        setTimeout(() => {
            starWarsTextRef.current?.classList?.add("clear");
        }, 4000);
        setTimeout(() => {
            setShowView(true);
            fetchMovies({ url: "films" });
        }, 6000);
    };

    const handleMovieSelect = (movie) => {
        setShowMoviesModal(false);
        setSelectedMovie(movie);
    };

    useEffect(() => {
        removeAnimationIntro();
    }, []);

    if (!showView) {
        return (
            <div className="star-wars__intro">
                <p ref={starWarsTextRef} className="star-wars__font">
                    STAR <br /> WARS
                </p>
            </div>
        );
    }

    return (
        <main>
            <p className="text-center fs-40 fw-700 mb-2">
                STAR WARS COLLECTION
            </p>
            <section>
                <div
                    role="movies-opener"
                    className="flex justify-between items-center star-wars-movie__select cursor-pointer"
                    onClick={() =>
                        !loading &&
                        setShowMoviesModal((prevState) => !prevState)
                    }
                >
                    <p className="fs-18 fw-600">
                        {loading
                            ? "Loading star wars movies..."
                            : "Select a movie"}
                    </p>
                    <div className="flex">
                        <img src={DownArrow} alt="down-arrow" />
                    </div>
                </div>

                {movies.length && showMoviesModal ? (
                    <MoviesList
                        movies={movies}
                        selectedMovie={handleMovieSelect}
                    />
                ) : null}

                {selectedMovie ? <Movie movie={selectedMovie} /> : null}
            </section>
        </main>
    );
};

export default Home;
