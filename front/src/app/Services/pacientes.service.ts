import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../Interfaces/pacientes';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private urlBase: string =
  'http://localhost/Parcial_CristianDefaz/Inventario/Controllers/Paciente.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<Pacientes[]> {
  return this.clientePhp.get<Pacientes[]>(this.urlBase + 'todos');
}
insertar(paciente: Pacientes): Observable<any> {
  var prov = new FormData();
  prov.append('Nombre', paciente.Nombre);
  prov.append('Edad', paciente.Edad.toString());
  prov.append('Enfermedad', paciente.Enfermedad);
  return this.clientePhp.post(this.urlBase + 'insertar', prov);
}
eliminar(id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_paciente', id.toString());
  return this.clientePhp.post(this.urlBase + 'eliminar', prov);
}
uno(id: number): Observable<Pacientes> {
  var prov = new FormData();
  prov.append('ID_paciente', id.toString());
  return this.clientePhp.post<Pacientes>(this.urlBase + 'uno', prov);
}
actualizar(paciente: Pacientes, id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_paciente', id.toString());
  prov.append('Nombre', paciente.Nombre);
  prov.append('Edad', paciente.Edad.toString());
  prov.append('Enfermedad', paciente.Enfermedad);
  return this.clientePhp.post(this.urlBase + 'actualizar', prov);
}
}
