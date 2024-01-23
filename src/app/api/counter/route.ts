import { NextResponse } from "next/server";

/**Esto sera lo que vamos a servir cuando se haga una peticion a /api/counter 
 * RestFulApi getCounter
*/
export async function GET(request: Request) {
    /**Esto sera para el metodo GET */
    console.log( { method:request.method }); //Para saber el metodo
    return NextResponse.json({ 
        count:100
    });
}