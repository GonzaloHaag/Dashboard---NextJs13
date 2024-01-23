/**Componente a mostrar en la ruta /dashboard/main */

import { WidgetsGrid } from "@/components";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:'Admin Dashboard',
  description:'Description admin dashboard'
}
export default function MainPage() {
  /**En este componente quiero mostrar el valor del contador GLOBAL,
   * lo utilizaremos para mantener un estado globalmente con REDUX
   */
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Información General</span>
      <WidgetsGrid />
    </div>
  );
}
