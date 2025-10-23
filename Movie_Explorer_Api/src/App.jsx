import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import MovieDetails from "./components/MovieDetails";
import { getPopularMovies, searchMovies } from "./services/api";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch movies whenever searchQuery or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, page);
        } else {
          data = await getPopularMovies(page);
        }
        setMovies(data?.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  return (
    <MovieProvider>
      <NavBar setSearchQuery={setSearchQuery} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                loading={loading}
                error={error}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
