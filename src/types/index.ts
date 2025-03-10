export interface PokemonOption {
    value: string; 
    label: string; 
    sprite: string; 
  }
  
  export interface FormData {
    firstName: string;
    lastName: string;
    pokemonTeam: PokemonOption[];
  }