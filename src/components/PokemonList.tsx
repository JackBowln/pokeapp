
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonApi } from '../services/pokemon-service';
import { PokemonCard } from "./PokemonCard";
const PokemonList= () => {
  const [pokemon, usePokemon] = useState<any>([])
  const [loading, useLoading ] = useState<boolean>(false)

  const GetAllData = async () => {
    try {
      useLoading(true)
      const response:any = await PokemonApi.getInstance().GetAllData(3, 20)
      const data = response
      console.log(data);
      usePokemon(data)
    } catch(err){
      console.error(err)
    } finally {
      useLoading(false)
      
    }
  }



  useEffect(() => {
    GetAllData()
  }, [])

  return (
    <div>
      { loading ?
        <Skeleton variant="rectangular" width={210} height={118} />
        : <PokemonCard pokemons={pokemon}/>
      }
    </div>
  )
}

export default PokemonList;
