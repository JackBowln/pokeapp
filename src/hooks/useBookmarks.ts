import { useEffect, useState } from "react";

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const ls = localStorage.getItem("bookmarks");
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleItemInLocalStorage = (id: number) => () => {
    const isBookmarked = bookmarks.includes(id);
    if (isBookmarked) setBookmarks((prev: any) => prev.filter((b: any) => b !== id));
    else setBookmarks((prev: any) => [...prev, id]);
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return [bookmarks, toggleItemInLocalStorage];
}

export default useBookmarks;
