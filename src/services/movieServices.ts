import axios from "axios";
import type { Movie } from "../types/movie";


const myKey = import.meta.env.VITE_TMDB_TOKEN;

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`
    }
}

const fetchMovies = async (query = ""): Promise<Movie[]> => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options);
    return res.data.results;
};


export default fetchMovies;