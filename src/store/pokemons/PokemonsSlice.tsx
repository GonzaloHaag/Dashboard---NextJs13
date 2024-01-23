
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/pokemons';
/**Por ahora esto sera para guardar mis pokemons en favoritos
 * lo voy a querer guardar asi
 * pokemons:[]
 * favorites: {
 * {
 * '1' : { id:1,name:'Bulbasaur' }
 * '2' : { id:2,name:'Pikachu' }
 * }
 * }
 */

interface PokemonsState {
    favorites: { [key:string] : SimplePokemon }; //Recordemos que simple pokemon tiene un id y un name
}

/**Voy a leer lo que tengo en el localStorage */
// const getInitialState = ():PokemonsState => {
//   /**Yo puedo llamar al localStorage solo del lado del cliente, porque 
//    * del lado del servidor no existe
//    * Si es undefined quiere decir que estamos del lado del servidor, 
//    * por lo tanto retorno un objeto vacio
//    */
//   //Busco con la clave que lo guarde
//   const favoritePokemons = JSON.parse( localStorage.getItem('FavoritePokemons') ?? '{}'); //Como lo del localStorage es un string, tengo que hacer el paso opuesto, parsearlo
//   return favoritePokemons
// }

const initialState:PokemonsState = {
    /**Estaod inicial de mi arreglo de pokemons en favoritos */
  //  '1' : { id:'1',name:'bulbasaur' },
  //  '2' : { id:'2',name:'ivysaur' },
  //  '3' : { id:'3',name:'Venusaur' },
  //  '4' : { id:'4',name:'charmander' },
  favorites: {}, //Inicializo como un objeto vacio
}

const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    /**Acciones para usar en cualquier lado*/
    toggleFavorite( state, action:PayloadAction<SimplePokemon>) {
        /**Funcion para agregar o sacar pokemon de favorito, necesito que me pasen el payload que va a ser de 
         * tipo SimplePokemon, es decir que va a tener id y name para saber si esta en favoritos
         */
        const pokemon = action.payload;
        if( state.favorites[pokemon.id] !== undefined ) {
            //Si el pokemon existe en mi state quiere decir que ya esta en favoritos
           delete state.favorites[pokemon.id]; //Elimino ese id de mi state
  
        }
        else {
          state.favorites[pokemon.id] = pokemon; //Lo grabo en caso de que no este
        }
        /**Aca ya lo puedo guardar en local storage al state */
        //TODO: No se debe hacer EN Redux
        localStorage.setItem('FavoritePokemons',JSON.stringify( state.favorites ) ); //Debo pasar el objeto a string porque solo se puede guardar string en el localStorage
        //Lo estoy guardando con la clave FavoritePokemons y solo guardar string
    },
    setFavoritePokemons( state,action:PayloadAction<{[key:string] : SimplePokemon }> ) {
      state.favorites = action.payload;
    }
  }
});

export const { toggleFavorite, setFavoritePokemons } = PokemonsSlice.actions

export default PokemonsSlice.reducer