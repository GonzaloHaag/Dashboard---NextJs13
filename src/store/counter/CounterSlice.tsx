//ACCIONES PARA EL CONTADOR, LOS SLICE SON ESO. ES GENIAL
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count:number;
    isReady : boolean;
}

const initialState:CounterState = {
     count:1, //El estado inicial sera 1, para acceder es initialState.count
     isReady: false, //Arrancara en false
}

const CounterSlice = createSlice({
  name: 'counter', //Nombre del slice
  initialState,
  reducers: {
    /**ACCIONES QUE QUIERO LLAMAR DESDE CUALQUIER PARTE DE MI APP PARA QUE 
     * CAMBIEN EL VALOR DE MI STATE O INITIAL STATE
     */

   initCounterState( state,action:PayloadAction<number>) {
    /**La idea de esto es poner el isReady en true 
     * Esto sirve para mantener el estado del contador aunque cambiemos 
     * de pagina, ya que le estamos diciendo que no haga nada 
     * si esta inicializado
    */
      if( state.isReady ) return;  //Si ya esta en true me salgo
      
      state.count = action.payload; //Lo que me llega por argumento

      state.isReady = true;
   },
   incrementarContadorEnUno( state ) {
     state.count++; //Le sumo uno al contador
   },
   decrementarContadorEnUno( state ) {
    if( state.count === 0 ) return; //No hago nada porque no quiero restar cuando el contador es 0
    state.count--; //Descontamos en uno al contador
   },
   resetearContador( state, action:PayloadAction<number> ) { //Importante decir que la accion es de tipo PayloadAction y que estoy esperando un numero
    if( action.payload < 0 ) {
      /**Si recibo por argumento un numero negativo, lo paso a 0 para no poder 
       * recibir numeros negativos
       */
      action.payload = 0;
    }
    //Quiero recibir por argumento el valor que debe tener el contador
    state.count = action.payload;
   }
  }
});

export const { incrementarContadorEnUno, decrementarContadorEnUno, resetearContador, initCounterState } = CounterSlice.actions; //Aca exporto mis acciones

export default CounterSlice.reducer;