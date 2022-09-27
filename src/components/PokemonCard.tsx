import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useBookmarks from "../hooks/useBookmarks";
import type { Pokemon } from "../types/pokemon";

export const PokemonCard = ({pokemons, isLoading}: PokemonCardProps ) => {
  const [bookmarks, toggleBookmark] = useBookmarks();

 
  return (
    <>
        { pokemons.map(({name, sprites}:any, i: number)=>{
          const data = {name, sprites}
          const isBookmarked = bookmarks.some((p:any) => p.name === data.name)
          return (
          isLoading ?
          <Skeleton key={i} variant="rectangular" width={200} height={150} />
          :
          <div key={name} data-testid="pokemon">
          <Card sx={{ maxWidth: 345, width: 200, height: 'auto' }  }>
              <Button
              onClick={toggleBookmark(data)}>{isBookmarked ? <FavoriteIcon />: <FavoriteBorderIcon/>}
              </Button>
              <Link to={"/details/"+data.name}>
                  <CardActionArea>
                  
                    <img
                        className="mx-auto"
                        height="140"
                        src={data.sprites.front_default}
                        alt={data.name + 'image'}
                        />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                        {data.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Link>
              </Card>
            </div>
          )})
        } 
    </>
  )
}
interface PokemonCardProps {
  pokemons: Pokemon[]
  isLoading: Boolean
};
