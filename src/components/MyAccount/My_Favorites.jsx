import MovieCard from "../Movies/MovieCard/MovieCard";
import { useSelector } from "react-redux";

function My_Favorites() {

    const myFavorites = useSelector((state) => state.favorites.my_favorites)

    return (
    <main className="text-white px-10 py-4">
      
      <h2 className="text-3xl font-semibold mb-6">My favorites</h2>
      
      <section className="flex flex-row flex-wrap mt-12">
        {myFavorites.length > 0 && myFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {myFavorites.length == 0 && (
          <p className="h-screen">You have no favorites yet!</p>
        )}
      </section>

    </main>
  )
}

export default My_Favorites