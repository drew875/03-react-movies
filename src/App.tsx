import SearchBar from "./components/SearchBar/SearchBar";
import fetchMovies from "./services/movieServices";
import type { Movie } from "./types/movie";
import { useEffect, useState } from "react";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieModal from "./components/MovieModal/MovieModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";



const App = () => {


  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);



  const searchMovies = async (query = "") => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetchMovies(query);
      setMovies(response);
    } catch {
      setError(true);
    }
    setLoading(false);
  }
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <>
      <SearchBar onSubmit={searchMovies} />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};


export default App;