const BASE_URL = "https://localhost:7048/api/Movies";

// ✅ Fetch all popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    // Ensure consistent shape for frontend (Home expects results + total_pages)
    return {
      results: data.map((m, index) => ({
        id: index + 1, // generate an id (since backend doesn’t have one)
        title: m.title,
        release_date: m.releaseDate,
        poster_path: m.imageUrl,
      })),
      total_pages: 1,
    };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [], total_pages: 1 };
  }
};

// ✅ Fetch movies by search query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return {
      results: data.map((m, index) => ({
        id: index + 1,
        title: m.title,
        release_date: m.releaseDate,
        poster_path: m.imageUrl,
      })),
      total_pages: 1,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [], total_pages: 1 };
  }
};

// ✅ Fetch single movie details (optional, based on title or id)
export const getMovieDetails = async (idOrTitle) => {
  try {
    // Your backend currently doesn’t provide /Movies/:id endpoint
    // so we fetch all and find the movie by title or generated id
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const movies = data.map((m, index) => ({
      id: index + 1,
      title: m.title,
      release_date: m.releaseDate,
      poster_path: m.imageUrl,
    }));

    const movie = movies.find(
      (m) => m.id.toString() === idOrTitle || m.title === decodeURIComponent(idOrTitle)
    );

    return movie || null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
