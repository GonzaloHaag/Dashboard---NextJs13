/**Porque sera fijo en todas las rutas dentro de la carpeta dashboard (lrc para crearlo) */

import { Sidebar } from "../../components";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">


      <div className="flex">
        <Sidebar /> {/*Para que sea fijo */}
        <div className="w-full text-slate-900">
          {children} {/**Todo el contenido de los componentes dentro de la carpeta dashboard ira aqui, asi el dashboard contenido en el div es fijo en todos */}
        </div>

      </div>
    </div>
  );
}