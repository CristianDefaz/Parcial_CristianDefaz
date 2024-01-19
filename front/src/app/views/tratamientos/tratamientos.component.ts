import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tratamientos } from '../../Interfaces/tratamientos';
import { TratamientosService } from '../../Services/tratamientos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})
export class TratamientosComponent {
  title = 'Tratamientos';
  tratamientos: Tratamientos[];

  constructor(private TratamientosService: TratamientosService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.TratamientosService.todos().subscribe((listatratamientos) => {
      this.tratamientos= listatratamientos;
      console.log(listatratamientos);
    });
  }
  alerta() {
    Swal.fire('Tratamientos', 'Mensaje en Tratamientoss', 'success');
  }

  eliminar(TratamientosId: number) {
    Swal.fire({
      title: 'Tratamientos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.TratamientosService.eliminar(TratamientosId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Tratamientos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Tratamientos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
