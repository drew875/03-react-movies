import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const notify = () => toast("Please enter your search query.");

const SearchBar = ({ onSubmit }: SearchBarProps) => {

    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        console.log("name", query);

        if (query == "") {
            notify();
            return;
        }
        onSubmit(query);

    }


    return (

        <div className={css.container}>
            <Toaster position="top-center" reverseOrder={false} />
            <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by TMDB
            </a>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit(formData);
                }}
            >
                <input name="query" type="text" placeholder="Search movies..." autoComplete="off" />
                <button type="submit">Search</button>
            </form>
        </div>

    )
}

export default SearchBar;