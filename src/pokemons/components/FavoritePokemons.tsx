'use client'; //Porque voy a llamar el store, y me creo este componente solo para eso y no perder la metadata
import { useAppSelector } from "@/store";
import { PokemonGrid } from ".";
import { useEffect, useState } from "react";
import {  IoHeartOutline } from "react-icons/io5";
export const FavoritePokemons = () => {
    const favoritePokemons = useAppSelector((state) => Object.values( state.pokemons.favorites ));
    /**Necesito mandarle un arreglo a pokemonGrid, por lo tanto transformo 
     * el favoritePokemons a un arreglo de la siguiente forma
     * Object.values( state.pokemons )
     */
  return (
    // <PokemonGrid pokemons={ Object.values( favoritePokemons ) } object.Values para devolver un array />
    <>
    {

        favoritePokemons.length === 0 
        ? (<NoFavorites />)
        : (<PokemonGrid pokemons={ favoritePokemons } />)
       
    }
    </>
  )
}
export const NoFavorites = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline size={100} className='text-red-500' />
            <span>No hay favoritos</span>
        </div>
    )
}