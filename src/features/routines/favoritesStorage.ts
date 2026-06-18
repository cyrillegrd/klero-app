const FAVORITES_KEY = "klero_routine_favorites";

export function loadFavorites(): string[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleFavorite(circuitId: string) {
  const favorites = loadFavorites();

  if (favorites.includes(circuitId)) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(
        favorites.filter((id) => id !== circuitId)
      )
    );
  } else {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify([
        ...favorites,
        circuitId,
      ])
    );
  }
}

export function isFavorite(circuitId: string) {
  return loadFavorites().includes(circuitId);
}