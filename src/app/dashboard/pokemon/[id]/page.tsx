/**Componente a mostrar cuando se solicite la ruta /dashboard/pokemon/idPokemon 
 * Dentro de la carpeta app solo va  el sistema de rutas --> CLAVE
 */

import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";


interface Props {
    params:{id:string}; //Informacion que voy a obtener por URL
}
/**QUIERO GENERAR 151 PAGINAS DE POKEMON ANTES QUE EL USUARIO ME LAS SOLICITE,
 * VOY A REALIZAR UNA GENERACION ESTATICA DE 151 POKEMONS
 * La funcion es generateStaticParams
 * Esto solo se genera en proceso de buildtime
 */
export async function generateStaticParams() {
   /**El return de aqui tiene que ser todo el arreglo de 
    * las paginas a generar, en este caso un arreglo de 151
    * [
    * {id:1}
    * {id:2} y asi
    * ]
    * Para no crear asi los 151 id, me creo un array 151 elementos
    */
   const statics151Pokemons = Array.from({ length:151 }).map( (value,indice) => `${indice + 1}`); //indice + 1 entre `` porque espero un string
   return statics151Pokemons.map((id) =>({
     id:id
   }));
}
/**Metadata dinamica, dependiendo del pokemon solicitado */
export async function generateMetadata({ params }:Props):Promise<Metadata> {
    /**Esta peticion puede fallar, entonces lo envuelvo en un try catch, y en catch genero 
     * una metadata por defecto
     */
    /**Hago la peticion nuevamente y desestrucutro el id y el name del pokemon */
    try{
        const {id,name}= await getPokemonId(params.id); //Aca le mando el id que viene en la URL
        return {
            title: `#${id} - ${name}`,
            description:`Pagina del pokemon: ${name}`
        }

    }
    catch(error) {
        //Metadata por defecto
        return {
            title:'Pagina del pokemon',
            description:'Descripción del pokemon'
        }
    }
   
}

const getPokemonId = async (id:string):Promise<Pokemon> => {
    /**Esta peticion puede fallar por lo tanto debo manejar en caso de 
     * que falle, hago un try catch y en catch mando a llamar el notfound , que es una 
     * funcion de next/navigation que manda a mi archivo not-found.tsx de la carpeta [id]
     */
    /**Retorna una promesa que resuelve algo de tipo Pokemon */
    /**Ahora hago la peticion fetch al pokemon por id que viene en la URL */
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`,{
              next:{
                revalidate:60 * 60 * 30 * 6 //Para que cada 6 meses se revalide la pantalla automaticamente
              }
        }).then((res) => res.json());
    
        console.log('Se cargó',pokemon.name);
        return pokemon;
        
    } catch (error) {
        notFound();
    }
 

}
export default async function PokemonPorIdPage({ params }: Props) {

    const pokemon = await getPokemonId(params.id);
    
  
    return (
      <div className="flex mt-5 flex-col items-center text-slate-800">
        <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
          <div className="mt-2 mb-8 w-full">
            <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
              #{pokemon.id} {pokemon.name}
            </h1>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                width={150}
                height={150}
                alt={`Imagen del pokemon ${pokemon.name}`}
                className="mb-5"
              />
  
  
              <div className="flex flex-wrap">
                {
                  pokemon.moves.map(move => (
                    <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 w-full">
  
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
              <p className="text-sm text-gray-600">Types</p>
              <div className="text-base font-medium text-navy-700 flex">
                {
                  pokemon.types.map(type => (
                    <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                  ))
                }
              </div>
            </div>
  
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
              <p className="text-sm text-gray-600">Peso</p>
              <span className="text-base font-medium text-navy-700 flex">
                {
                  pokemon.weight
                }
              </span>
            </div>
  
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
              <p className="text-sm text-gray-600">Regular Sprites</p>
              <div className="flex justify-center">
  
                <Image
                  src={pokemon.sprites.front_default}
                  width={100}
                  height={100}
                  alt={`sprite ${pokemon.name}`}
                />
  
                <Image
                  src={pokemon.sprites.back_default}
                  width={100}
                  height={100}
                  alt={`sprite ${pokemon.name}`}
                />
  
              </div>
            </div>
  
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
              <p className="text-sm text-gray-600">Shiny Sprites</p>
              <div className="flex justify-center">
  
                <Image
                  src={pokemon.sprites.front_shiny}
                  width={100}
                  height={100}
                  alt={`sprite ${pokemon.name}`}
                />
  
                <Image
                  src={pokemon.sprites.back_shiny}
                  width={100}
                  height={100}
                  alt={`sprite ${pokemon.name}`}
                />
  
              </div>
            </div>
  
  
  
          </div>
        </div>
      </div>
    );
  }