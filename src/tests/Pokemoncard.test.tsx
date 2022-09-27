import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import pokemonsMock from "./data/pokemonsMock";

jest.mock("axios");


test("pokemon list", async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: pokemonsMock });
  render(<Router>
    <PokemonCard pokemons={pokemonsMock} isLoading={false}/>
  </Router>
  );

  const pokemonsList = await waitFor(() => screen.findAllByTestId("pokemon"));

  expect(pokemonsList).toHaveLength(20);
});


