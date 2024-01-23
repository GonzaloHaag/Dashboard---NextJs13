/**Componente para la ruta /dashboard/pokemons */
import { PokemonsResponse,SimplePokemon } from "@/pokemons"; 
import { PokemonGrid } from "@/pokemons/components";
import { Metadata } from "next";


export const metadata:Metadata = {
  title:'Pokemons Page',
  description:'Description pokemons page'
}

//Fetching a la pokeapi, 151 pokemons

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
  /**Promesa que va a responder un tipo de arreglo de SimplePokemon */
  const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    //Le digo que la data va a ser de tipo PokemonsResponse
    .then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name
  }));
  // throw new Error('Este es un error que no deberia suceder');
  return pokemons;
}

export default async function PokemonsPage() {

  const pokemons = await getPokemons(151); //Invoco la funcion en una variable, le paso el limit de 151
  /**Mostrar todas las imagenes de los 151 pokemons --> tarea
   * Y cambiar en el src el 10 por el id del pokemon
   */
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Listado de Pokémons <small className="text-blue-500">Estáticos</small></span>
      <PokemonGrid pokemons={ pokemons } /> {/**Es obligatorio mandarselo */}
    </div>
  );
}