import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster, toast } from 'react-hot-toast';


const App = () => {


  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);



  const searchMovies = async (query = "") => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const response = await fetchMovies(query);
      setMovies(response);

      if (response.length === 0) {
        toast("Фільми не знайдено. Спробуйте інший запит.");
      }
    } catch {
      setError(true);
      toast.error("Сталася помилка при пошуку фільмів.");
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

      <Toaster position="top-right" />
    </>
  );
};


export default App;