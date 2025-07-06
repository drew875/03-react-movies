import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`
    }
}

const fetchMovies = async (query = ""): Promise<Movie[]> => {
    const res = await axios.get<TMDBResponse>(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options);
    return res.data.results;
};


export default fetchMovies;