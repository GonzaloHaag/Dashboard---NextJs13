/**Componente para la ruta /dashboard/pokemons */
import { FavoritePokemons, NoFavorites } from "@/pokemons/components";
import { Metadata } from "next";


export const metadata:Metadata = {
  title:'Favorites Page',
  description:'Description Favorites Page'
}

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Pokemons favorites <small className="text-blue-500">Global State</small></span>
       {/*Voy a renderizar otro componente para usar el context de redux (store) desde el 
       lado del cliente y no perder la metadata 
       YO ACA QUIERO MOSTRAR LOS POKEMONS QUE TENGO EN MI ESTADO DE FAVORITOS EN MI STORE
       El problema es que no quiero poner esta page en use client porque no podre usar 
       la metadata, por lo tanto me creo otro componente*/}
       <FavoritePokemons />      
       
    </div>
  );
}
