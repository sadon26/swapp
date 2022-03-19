import "./_index.scss";

const MoviesList = ({ movies, selectedMovie }) => (
    <div className="grid grid__layout movies__display">
        {movies.map((movie, index) => (
            <div
                className={`col-6 stagger__in--${
                    index + 1
                } p-2 movie cursor-pointer`}
                key={movie.episode_id}
                onClick={() => selectedMovie(movie)}
            >
                {movie.title}
            </div>
        ))}
    </div>
);

export default MoviesList;
