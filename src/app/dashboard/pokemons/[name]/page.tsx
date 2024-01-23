/**Componente a mostrar en la ruta /dashboard/pokemons/namePokemon */
import Image from "next/image";
import { Pokemon, PokemonsResponse } from "@/pokemons";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: { name: string }; //Lo que llega en la url va a ser el name
}

const getPokemonName = async (name: string): Promise<Pokemon> => {
    /**Voy a hacer la peticion por name del pokemon con el name que me llega, puede fallar asi que
     * lo encierro en un try catch
     */
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            next: {
                revalidate: 60 * 60 * 30 * 6 //Para que cada 6 meses se revalide la pantalla automaticamente
            }

        }).then((res) => res.json());
        console.log(pokemon);
        return pokemon

    } catch (error) {
        notFound();
    }
}
/**Generacion estatica de 151 pokemosn por el nombre */
export async function generateStaticParams() {
    /**Para sacar el nombre del pokemon debo hacer la consulta a la api */
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        //Le digo que la data va a ser de tipo PokemonsResponse
        .then((res) => res.json());
    const static151Pokemons = data.results.map((pokemon) => ({
        name: pokemon.name
    }));
   return static151Pokemons.map(({ name }) => ({
    name:name
   }))
}
/**Metadata dinamica, dependiendo del pokemon solicitado */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    /**Esta peticion puede fallar, entonces lo envuelvo en un try catch, y en catch genero 
     * una metadata por defecto
     */
    /**Hago la peticion nuevamente y desestrucutro el id y el name del pokemon */
    try {
        const { id, name } = await getPokemonName(params.name); //Aca le mando el id que viene en la URL
        return {
            title: `#${id} - ${name}`,
            description: `Pagina del pokemon: ${name}`
        }

    }
    catch (error) {
        //Metadata por defecto
        return {
            title: 'Pagina del pokemon',
            description: 'Descripción del pokemon'
        }
    }

}

export default async function PokemonPorNamePage({ params }: Props) {

    const pokemon = await getPokemonName(params.name);
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