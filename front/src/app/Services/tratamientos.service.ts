import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamientos } from '../Interfaces/tratamientos';
@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  private urlBase: string =
  'http://localhost/Parcial_CristianDefaz/Inventario/Controllers/Tratamiento.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<Tratamientos[]> {
  return this.clientePhp.get<Tratamientos[]>(this.urlBase + 'todos');
}

insertar(tratamiento: Tratamientos): Observable<any> {
  var prov = new FormData();
  prov.append('ID_paciente', tratamiento.ID_paciente.toString());
  prov.append('Tipo_tratamiento', tratamiento.Tipo_tratamiento);
  prov.append('Costo', tratamiento.Costo.toString());
  return this.clientePhp.post(this.urlBase + 'insertar', prov);
}
eliminar(id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_tratamiento', id.toString());
  return this.clientePhp.post(this.urlBase + 'eliminar', prov);
}
uno(id: number): Observable<Tratamientos> {
  var prov = new FormData();
  prov.append('ID_tratamiento', id.toString());
  return this.clientePhp.post<Tratamientos>(this.urlBase + 'uno', prov);
}
actualizar(tratamiento: Tratamientos, id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_tratamiento', id.toString());
  prov.append('ID_paciente', tratamiento.ID_paciente.toString());
  prov.append('Tipo_tratamiento', tratamiento.Tipo_tratamiento);
  prov.append('Costo', tratamiento.Costo.toString());
  return this.clientePhp.post(this.urlBase + 'actualizar', prov);
}
}
