/**PAGINA DE NOT FOUND EN CASO DE QUE SE SOLICITE UN POKEMON QUE NO EXISTE
 * SE PONE AL MISMO NIVEL QUE el page.tsx dentro de [id] para que next identifique que 
 * no es el global si no que en not found corresponde a que se mostrara si un id no existe o
 * es incorrecto
 */
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata:Metadata = {
    title:'Not found'
}

export default function NotFound() {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Pokemón no encontrado
        </div>
        <button className="mt-5">
            <div
                className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
            >
                <span
                    className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                ></span>

                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    <Link href="/dashboard/pokemons">Ver listados de pokemons</Link>
                </span>
            </div>
        </button>
    </main>
    )
}