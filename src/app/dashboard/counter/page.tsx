import { CartCounter } from "@/shopping-cart/components";

export const metadata = {
  title:'Counter Page',
  subtitle:'Un simple contador'
};

/**Componente a mostrar en la ruta /dashboard/counter */
export default function CounterPage() {

 
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      {/**Yo necesito usar useState en lo de abajo, por lo tanto paso esa parte sola para que 
       * este del lado del cliente, y no todo el componente. --> Clave identificar esto, porque el 
       * useState necesita el client pero no podre poner el metadata para el SEO, entonces paso a un componente 
       * solo lo que usa useState y lo otro lo dejo del lado del servidor
       */}
      <CartCounter value={ 20 } />
    </div>
  );
}