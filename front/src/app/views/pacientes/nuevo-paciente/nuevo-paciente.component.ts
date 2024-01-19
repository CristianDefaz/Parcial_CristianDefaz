import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PacientesService } from '../../../Services/pacientes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent {
  title = '';
  id!: number;

  paciente: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Enfermedad: new FormControl('', Validators.required),
  
  });
  constructor(
    private pacienteServicio: PacientesService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo paciente';
    } else {
      this.title = 'Actualizar paciente';
      this.pacienteServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.paciente.patchValue({
          Nombre: res.Nombre,
          Edad: res.Edad,
          Enfermedad: res.Enfermedad,
        });
      });
    }
  }
  get f() {
    return this.paciente.controls;
  }

  grabar() {
    Swal.fire({
      title: 'pacientes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.pacienteServicio
            .insertar(this.paciente.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'pacientes',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/pacientes']);
              this.id = 0;
            });
        } else {
          this.pacienteServicio
            .actualizar(this.paciente.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'pacientes',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/pacientes']);
              this.id = 0;
            });
        }
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
