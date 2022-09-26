import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useBookmarks from "../hooks/useBookmarks";
import type { Pokemon } from "../types/pokemon";

export const PokemonCard = ({pokemons, isLoading}: PokemonCardProps ) => {
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [bookmarks, toggleBookmark] = useBookmarks();

  const changeBookMarksOnly = (e:any) => {
    setBookmarksOnly(e.target.checked);
  };
  const handleClick = (e:any) => {

  }
  return (
    <>
        { pokemons.map((e:any, i: number)=>{
          const isBookmarked = bookmarks.includes(e.id);

          return (
          isLoading ?
          <Skeleton variant="rectangular" width={200} height={150} />
          :
          <div key={i}>
          <Card sx={{ maxWidth: 345, width: 200, height: 'auto' }  }>
              <Button
              onClick={toggleBookmark(e.id)}>{isBookmarked ? <FavoriteIcon />: <FavoriteBorderIcon/>}
              </Button>
              <Link to={"/"+e.name}>
                  <CardActionArea>
                  
                    <img
                        className="mx-auto"
                        height="140"
                        src={e.sprites.front_default}
                        alt={e.name + 'image'}
                        />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                        {e.name}
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
