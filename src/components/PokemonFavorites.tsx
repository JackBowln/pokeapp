import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import useBookmarks from "../hooks/useBookmarks";
import { PokemonCard } from "./PokemonCard";
const PokemonFavorites= () => {
  const [pokemon, setPokemon] = useState<any>([])
  const [loading, setLoading ] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [bookmarks, toggleBookmark] = useBookmarks();
  const perPage: number = 20


  const GetAllData = async () => {
    try {
      setLoading(true)
      setPokemon(bookmarks.slice(
        page * perPage - perPage,
        page * perPage
      ))
      getCount()
      console.log(pokemon)
      
    } catch(err){
      console.error(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setCount(Math.ceil(total/perPage))
  };

  const getCount = () => {
    setTotal(bookmarks.length )
    console.log(total, bookmarks)
    console.log(total/perPage);
    setCount(Math.ceil(total/perPage))
    console.log(count);
  }


  useEffect(() => {
    GetAllData()
  }, [page])

  return (
    <div className="flex flex-col ">
      <div className="flex flex-wrap items-center justify-center h-full gap-2 mt-2">
        <PokemonCard pokemons={pokemon} isLoading={loading}/>
      </div>
      { (bookmarks.length > perPage) &&
        <Pagination count={count} page={page} onChange={handleChange} variant="outlined" className="self-center my-6"/>
      }
    </div>
  )
}

export default PokemonFavorites;
