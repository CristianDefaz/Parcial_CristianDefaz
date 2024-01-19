import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pacientes } from '../../Interfaces/pacientes';
import { PacientesService } from '../../Services/pacientes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  title = 'pacientes';
  pacientes: Pacientes[];

  constructor(private PacientesService: PacientesService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.PacientesService.todos().subscribe((listapacientes) => {
      this.pacientes= listapacientes;
      console.log(listapacientes);
    });
  }
  alerta() {
    Swal.fire('pacientes', 'Mensaje en pacientess', 'success');
  }

  eliminar(pacientesId: number) {
    Swal.fire({
      title: 'pacientes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PacientesService.eliminar(pacientesId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'pacientes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'pacientes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
