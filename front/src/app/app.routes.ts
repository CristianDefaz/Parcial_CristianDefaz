import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { TratamientosComponent } from './views/tratamientos/tratamientos.component';
import { NuevoPacienteComponent } from './views/pacientes/nuevo-paciente/nuevo-paciente.component';
import { NuevoTratamientoComponent } from './views/tratamientos/nuevo-tratamiento/nuevo-tratamiento.component';
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'pacientes', 
  component: PacientesComponent 
  },
  {
    path: 'tratamientos',
    component: TratamientosComponent,
  },
  {
    path: 'nuevo-paciente',
    component: NuevoPacienteComponent,
  },
  {
    path: 'editar-paciente/:id',
    component: NuevoPacienteComponent,
  },
  {
    path: 'nuevo-tratamiento',
    component: NuevoTratamientoComponent,
  },
  
  {
    path: 'editar-tratamiento/:id',
    component: NuevoTratamientoComponent,
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
