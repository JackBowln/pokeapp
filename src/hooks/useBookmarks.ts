import { useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon";

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const ls = localStorage.getItem("bookmarks");
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleItemInLocalStorage = (pokemon: Pokemon) => () => {
    const isBookmarked = bookmarks.includes(pokemon);
    if (isBookmarked) setBookmarks((prev: any) => prev.filter((b: any) => b !== pokemon));
    else setBookmarks((prev: any) => [...prev, pokemon]);
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return [bookmarks, toggleItemInLocalStorage];
}

export default useBookmarks;
