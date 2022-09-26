
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import useBookmarks from "../hooks/useBookmarks";
import { PokemonApi } from '../services/pokemon-service';
import { PokemonCard } from "./PokemonCard";
const PokemonList= () => {
  const [pokemon, setPokemon] = useState<any>([])
  const [loading, setLoading ] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(20)
  const [total, setTotal] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [bookmarks, toggleBookmark] = useBookmarks();
  const [bookmarksOnly, setBookmarksOnly] = useState(false);

  const GetAllData = async () => {
    try {
      setLoading(true)
      const response:any = await PokemonApi.getInstance().GetAllData(page, bookmarksOnly? bookmarks.length :20)
      const data = response
      setPokemon(data.filter((s:any) => (bookmarksOnly ? bookmarks.includes(s.id) : s)))
    } catch(err){
      console.error(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
    getCount()
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const changeBookMarksOnly = (e: any) => {
    setBookmarksOnly(e.target.checked);
  };
  const getCount = async() => {
    const response = await PokemonApi.getInstance().getPokemonsCount()
    console.log("all", response);
    setTotal(bookmarksOnly ? bookmarks.length : response)
    setCount(Math.ceil(total/perPage))
  }


  useEffect(() => {
    GetAllData()
    getCount()
  }, [page, bookmarksOnly])

  return (
    <div className="flex flex-col ">
      <div className="flex flex-wrap items-center justify-center h-full gap-2 mt-2">
      <label htmlFor="check">Bookmarked users only</label>
      <input id={"check"} type="checkbox" checked={bookmarksOnly} onChange={changeBookMarksOnly} />
        <PokemonCard pokemons={pokemon} isLoading={loading}/>
      </div>
       <Pagination count={count} page={page} onChange={handleChange} variant="outlined" className="self-center my-6"/>
    </div>
  )
}

export default PokemonList;
