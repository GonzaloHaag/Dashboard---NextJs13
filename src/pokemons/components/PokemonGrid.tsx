import React from 'react';
import { SimplePokemon } from '..';
import { PokemonCard } from '.';

interface Props {
    pokemons:SimplePokemon[]; //Un arreglo de simplePokemon y es obligatorio que me lo manden
}

export const PokemonGrid = ({ pokemons }:Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
    {
      pokemons.map((pokemon) => (
        <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
         /**Le mando el pokemon para que use el .id y name donde quiera */
      ))
    }
  </div>
  )
}
