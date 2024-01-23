/**Ahora solo este componente va a ser generado del lado del cliente porque es lo unico que necesita 
 * el useState, y podremos poner metadata y todo lo demas --> CLAVE. no utilizamos use client en toda 
 * la pagina del /dashboard/counter
 */
'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrementarContadorEnUno, incrementarContadorEnUno, initCounterState, resetearContador } from '@/store/counter/CounterSlice';
import { useEffect } from 'react';

interface Props {
    value?: number;
}
export interface CounterResponse {
    method:string;
    count:number;
}
/**Funcion para traerme lo que devuelve mi api en /counter/api  */
const getApiCounter = async() => {
    const data = await fetch('/api/counter').then((res) => res.json());
    return data as CounterResponse; //Le digo que la respuesta sera de tipo CounterResponse
}
export const CartCounter = ({ value = 0 }: Props) => {
    /**El value me lo manda el page.tsx de counter, si no viene que sea 0 */
    // const [counterNumber,setCounterNumber]  = useState(value);
    /**Aca puedo solicitar el store, porque este componente es del lado del cliente */
    const counterNumber = useAppSelector((state) => state.counter.count); //Me traigo el valor del count, valor inicial en 1, luego lo uso normal
    const dispatch = useAppDispatch(); //Para usar las acciones

    // useEffect(() => {
    //     dispatch( initCounterState(value) )
    // }, [dispatch, value]);

    useEffect(() => {
       getApiCounter().then((data) => dispatch( initCounterState( data.count )) ); //Cuando se resuelva mando a llamar el dispatch y le paso el count que devuelve mi api en /api/counter/route.ts
    },[dispatch])
    
    return (
        <>
            <span className="text-9xl">{counterNumber}</span>
            <div className="flex">
                <button
                onClick={ () => dispatch( incrementarContadorEnUno() ) }
                className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2'>+1</button>
                <button 
                onClick={ () => dispatch( decrementarContadorEnUno() )}
                className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">-1</button>
            </div>
        </>
    )
}
