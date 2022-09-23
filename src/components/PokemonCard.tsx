import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { Pokemon } from "../types/pokemon";
export const PokemonCard = ({pokemons}: PokemonCardProps) => {
  return (
    <div>
      { pokemons.map((e:any, i: number)=>(

        <Card sx={{ maxWidth: 345 }}  key={i}>
      <CardActionArea>
      <CardMedia
          component="img"
          height="140"
          image={e.sprites.front_default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {e.name}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>

      </CardActions>
    </Card>
          )) }
    </div>
  )
}
interface PokemonCardProps {
  pokemons: Pokemon[]
};
