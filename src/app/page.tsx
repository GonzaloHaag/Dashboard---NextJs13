import { redirect } from "next/navigation"

export default function HomePage() {
  /**Yo quiero que cuando la persona entre a mi pagina directamente se muestre lo que tengo en 
   * /dashboard/main , por lo tanto redirijo a esa ruta cosa que cuando entren al 
   * localhost:3000 me redireccione a la ruta especificada --> Clave
   */
  redirect('/dashboard/main');
}
