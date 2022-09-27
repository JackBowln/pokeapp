import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBookmarks from "../hooks/useBookmarks";
import { PokemonApi } from "../services/pokemon-service";
import { Ability, Move, Stat, Type } from "../types/pokemon";

export const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<any>([])
  const [loading, setLoading ] = useState<boolean>(true)
  const [bookmarks, toggleBookmark] = useBookmarks();
  const [bookmarksOnly, setBookmarksOnly] = useState(false);

  const { name } = useParams<{ name: string }>();

  const getData = async () => {
    try {
      setLoading(true)
      const response:any = await PokemonApi.getInstance().getPokemon(name)
      const data = response
      setPokemon(data)
    } catch(err){
      console.error(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const changeBookMarksOnly = (e: any) => {
    setBookmarksOnly(e.target.checked);
  };
  const isBookmarked = bookmarks.some((p:any) => p.name === pokemon.name)
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
    {
      loading ? 
      <div>
      NOTHING YET
      </div>:
      <div className="flex flex-col items-center mt-6">
        <Typography variant="h2" align="center" className="first-letter:uppercase">{pokemon.name + "#" + pokemon.order}
        <Button
          onClick={toggleBookmark(pokemon)}>{isBookmarked ? <FavoriteIcon className="h-40" />: <FavoriteBorderIcon className="h-40"/>}
        </Button>
        </Typography>
        <div className="flex">
          <Box
          component="img"
          sx={{
            height: 200,
            width: "auto",
          }}
          alt={pokemon.name + "-image"}
          src={pokemon.sprites.front_default}
          />
          <Box
          component="img"
          sx={{
            height: 200,
            width: "auto",
          }}
          alt={pokemon.name + "-image"}
          src={pokemon.sprites.other["official-artwork"].front_default }
          />
          <Box
          component="img"
          sx={{
            height: 200,
            width: "auto",
          }}
          alt={pokemon.name + "-image"}
          src={pokemon.sprites.versions["generation-i"]["red-blue"].front_default }
          />
        </div>
        <Typography variant="h3">Types</Typography>
        {
          pokemon.types.map((e:Type, i: number )=> {
            return (
              <Typography paragraph key={i}>
                {e.type.name}
              </Typography>
            )}
          )
        }
        <div className="flex gap-8">
        <div className="flex flex-col">
        <div>
          
        <Typography variant="h3">Stats</Typography>
        {
          pokemon.stats.map((e:Stat, i: number )=> {
            return ( <div key={i}>
              <Typography paragraph >
                {e.stat.name}{" "}{e.base_stat}
                <LinearProgress variant="determinate" value={e.base_stat} />
              </Typography>
            </div>
            )}
            )
          }
          </div>
        <div>

        <Typography variant="h3">Abilities</Typography>
        {
          pokemon.abilities.map((e:Ability, i: number )=> {
            return (
              <Typography paragraph key={i}>
                {e.ability.name}
              </Typography>
            )}
            )
          }
          </div>
        </div>
        <div>  
        <Typography variant="h3">Moves</Typography>

        {
          pokemon.moves.map((e:Move, i: number )=> {
            return (
              <Typography paragraph key={i} >
                
                { i < 5 ? e.move.name :""}
              </Typography>
            )}
            )   
        }
        </div>
        </div>
        <Typography variant="h3">Weight</Typography>
        <Typography paragraph>
          { pokemon.weight/ 10 } kg
        </Typography>
        <Typography variant="h3">Height</Typography>
        <Typography paragraph>
          { pokemon.height * 10 } cm
        </Typography>
        <Typography variant="h3">Base Experience</Typography>
        <Typography paragraph>
          { pokemon.base_experience }
        </Typography>       
      </div>
        
      
    }
    </>
  )
}
