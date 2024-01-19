import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TratamientosService } from '../../../Services/tratamientos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Pacientes } from '../../../Interfaces/pacientes';
import { PacientesService } from '../../../Services/pacientes.service';
@Component({
  selector: 'app-nuevo-tratamiento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-tratamiento.component.html',
  styleUrl: './nuevo-tratamiento.component.css'
})
export class NuevoTratamientoComponent {
  title = '';
  id!: number;
  pacienteLista:Pacientes[];
  tratamiento: FormGroup = new FormGroup({
    ID_paciente: new FormControl('', Validators.required),
    Tipo_tratamiento: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
  
  });
  constructor(
    private tratamientoServicio: TratamientosService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private pacienteService:PacientesService,
  ) {}

  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo tratamiento';
      await this.cargaPacientes1();
    } else {
      this.title = 'Actualizar tratamiento';
      await this.cargaPacientes();
      this.tratamientoServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.tratamiento.patchValue({
          ID_paciente: res.ID_paciente,
          Tipo_tratamiento: res.Tipo_tratamiento,
          Costo: res.Costo,
        });
      });
    }
  }

  cargaPacientes(){

    this.pacienteService.todos().subscribe((res)=>{
      this.pacienteLista=res;
    });
  }
  cargaPacientes1(){

    this.pacienteService.todos1().subscribe((res)=>{
      this.pacienteLista=res;
    });
  }

  get f() {
    return this.tratamiento.controls;
  }
  

  grabar() {
    Swal.fire({
      title: 'tratamientos',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.tratamientoServicio
            .insertar(this.tratamiento.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'tratamientos',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/tratamientos']);
              this.id = 0;
            });
        } else {
          this.tratamientoServicio
            .actualizar(this.tratamiento.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'tratamientos',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/tratamientos']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'tratamientos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
