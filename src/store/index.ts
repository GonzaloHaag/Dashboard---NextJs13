//Me creo el store de Redux, aqui estara todo lo que necesitan usar mis componentes globalemnte 
import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from './counter/CounterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import PokemonsSlice from './pokemons/PokemonsSlice';

export const store = configureStore({
  reducer: {
    //Aca debo colocar mis Slice para que puedan ser utilizados en el appSelector voy a counter.count
    counter: CounterSlice,
    pokemons: PokemonsSlice,
  },
})

/**TODO ESTO ES PARA LOS TIPOS DE TYPESCRIPT Y REDUX LEA TODO LO QUE QUEREMOS PONER Y LO INTERFIERA */
// Inferir los tipos 'RootState' y 'AppDispatch' a partir del propio almacén
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; //dispatch para disparar acciones
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //Selector para escuchar y leer nuestro store