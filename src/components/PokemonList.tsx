
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonApi } from '../services/pokemon-service';
import { PokemonCard } from "./PokemonCard";
const PokemonList= () => {
  const [pokemon, setPokemon] = useState<any>([])
  const [loading, setLoading ] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [count] = useState<number>(58)
  const [perPage] = useState<number>(20)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllData = async () => {
    try {
      setLoading(true)
      const response:any = await PokemonApi.getInstance().GetAllData(page, perPage)
      const data = response
      setPokemon(data)
    } catch(err){
      console.error(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getAllData()
  }, [page])
  

  return (
    <div className="flex flex-col ">
      <div className="flex flex-wrap items-center justify-center h-full gap-2 mt-2">
        <PokemonCard pokemons={pokemon} isLoading={loading}/>
      </div>
      {count}
      {page}
       <Pagination data-testid="pagination" count={count} page={page} onChange={handleChange} variant="outlined" className="self-center my-6"/>
    </div>
  )
}

export default PokemonList;
