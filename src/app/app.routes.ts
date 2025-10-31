import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Servicios } from './pages/servicios/servicios';
import { CitasForm } from './citas/citas-form/citas-form';
import { MascotasForm } from './mascotas/mascotas-form/mascotas-form';
import { MascotasList } from './mascotas/mascotas-list/mascotas-list';
import { CitasList } from './citas/citas-list/citas-list';
import { HistorialList } from './historial/historial-list/historial-list';
import { authGuardGuard } from './core/guards/auth.guard-guard';

export const routes: Routes = [
    {path: "", component:Home,canActivate:[authGuardGuard]},
    {path: "servicios", component:Servicios},
    {path: "login", component:Login},
    {path: "cita", component:CitasForm},
    {path: "cita/list", component:CitasList},
    {path: "mascotas", component:MascotasForm},
    {path: "mascotas/list", component:MascotasList},
    {path: "historial", component:HistorialList},
    {path:"**",redirectTo:''}
];
