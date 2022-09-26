import HttpClient from '../plugins/httpClient';
import type { AllPokemons, Pokemon } from '../types/pokemon';

export class PokemonApi extends HttpClient {
  private static classInstance?: PokemonApi;
  private URLs: string[] = []
  private constructor() {
    super("https://pokeapi.co/api/v2/pokemon/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new PokemonApi();
    }

    return this.classInstance;
  }

  private paginatePokemons = (currentPage: number = 1, perPage: number) => {
    this.URLs = []
    for(let i = currentPage*perPage - perPage; i <= currentPage*perPage -1; i++){
      this.URLs.push("https://pokeapi.co/api/v2/pokemon/"+(i+1))
    }
  }

  public GetAllData = async (currentPage: number = 1, perPage: number) => {
    this.paginatePokemons(currentPage, perPage)
    return await Promise.all(this.URLs.map(this.FetchData))
  };

  private FetchData = async (URL: string) => await  this.instance.get(URL)

  public getPokemons = () => this.instance.get<AllPokemons>('/');

  public getPokemonsCount = async () => {
    const response = await this.getPokemons()
    return response.count
  }
  
  public getPokemon = (name: string) => this.instance.get<Pokemon>(`/${name}`);
}
