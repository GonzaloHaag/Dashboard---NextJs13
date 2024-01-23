//Para crear un contexto necesitamos que sea generado del lado del cliente
'use client'
import { Provider } from "react-redux";
import { store } from ".";
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemons/PokemonsSlice";

interface Props{
    children:React.ReactNode;
}

export const Providers = ( {children} : Props) => {

 /**Voy a pedir los pokemons favoritos guardados en el localStorage mediante un 
  * useEffect, que se asegura que es del lado del cliente
  * No puedo usar localStorage del lado del servidor
  * Los pido con la clave que los guarde
  */
 useEffect(() => {
  const favoritePokemons = JSON.parse( localStorage.getItem('FavoritePokemons') ?? '{}'); //Como lo del localStorage es un string, tengo que hacer el paso opuesto, parsearlo
  /*Ahora ese objeto se lo madno a la accion de setFavoritePokemons */
  store.dispatch( setFavoritePokemons( favoritePokemons ));

 },[]);
  return (
    //Provider del store de Redux
    <Provider store={ store }>
        { children }
    </Provider>
  )
}
