'use client';
/**Debe ser client porque voy a usar un valor del store */
import { useAppSelector } from "@/store";
import { SimpleWidget } from ".."
import { RxCounterClockwiseClock } from "react-icons/rx";


export const WidgetsGrid = () => {

    const counter = useAppSelector((state) => state.counter.count); //Selecciono el valor del counter
    return (
        <div className="flex flex-wrap p-2 items-center justify-center">
            <SimpleWidget 
            title={ `${counter}` } //Aca le mando el valor del contador que uso desde el store
            label="Contador"
            subTitle="Valor del contador"
            icon= {<RxCounterClockwiseClock size={ 70 } color='blue' />} 
            href="/dashboard/counter"
            />
            {/* <SimpleWidget /> */}
        </div>
    )
}
