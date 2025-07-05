import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css"
interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
    if (movies.length === 0) return null;

    return (
        <>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id} onClick={() => onSelect(movie)}>
                        {movie.poster_path && (
                            <img
                                className={css.image}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                loading="lazy"
                            />
                        )}
                        <h2>{movie.title}</h2>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MovieGrid;