'use client'; //Porque voy a usar mi store y es un context
import Link from 'next/link';
import Image from 'next/image';
import { SimplePokemon } from '..';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite } from '@/store/pokemons/PokemonsSlice';

interface PokemonCardProps {
    pokemon: SimplePokemon; //Voy a recibir el pokemon desde pokemonGrid, de tipo SimplePokemon, es decir que tiene id y name si o si
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {

    /**Ahora quiero acceder a mi store de pokemons para saber si esta en favoritos, pero yo 
     * quiero saber si el pokemon.id existe en mi arreglo
     * Lo que hago es agregarle !! para que me devuelva true si encuentra el id 
     * o false si no lo encuentra. Entonces yo con eso puedo jugar
     * Si no le agrego los !! devuelve undefined y tambien puedo jugar con eso, es 
     * solo para simplificarlo
     */
    const estaEnFavoritos = useAppSelector((state) => !!state.pokemons.favorites[pokemon.id]); 
    // console.log(estaEnFavoritos)
    const dispatch = useAppDispatch();
    return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
                    <Image
                        key={pokemon.id}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        width={100}
                        height={100}
                        alt={pokemon.name}
                        priority={false}
                    />
                    <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{pokemon.name}</p>
                    <div className="mt-5">
                        <Link
                            href={`/dashboard/pokemons/${pokemon.name}`}
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
                        >
                            Más información
                        </Link>
                    </div>
                </div>
                <div className="border-b">
                    <div 
                    onClick={() => dispatch( toggleFavorite( pokemon ) )}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                        <div className="text-red-600">
                           {
                            estaEnFavoritos ? <IoHeart /> : <IoHeartOutline />
                           }
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                {
                                    estaEnFavoritos ? ('Está en favoritos') : ('No está en favoritos')
                                }
                            </p>
                            <p className="text-xs text-gray-500">Click para cambiar</p>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
