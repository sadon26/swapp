import "./_index.scss";

const MoviesList = ({ movies, selectedMovie }) => {
    return (
        <div className="grid grid__layout movies__display">
            {movies.map((movie, index) => (
                <div
                    className={`col-12 stagger__in--${
                        index + 1
                    } p-2 movie cursor-pointer`}
                    key={movie.episode_id}
                    onClick={() => selectedMovie(movie)}
                >
                    {movie.title}(
                    {new Date(movie.release_date).toLocaleDateString()})
                </div>
            ))}
        </div>
    );
};

export default MoviesList;
