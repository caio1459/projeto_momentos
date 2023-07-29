import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensagensService {
  constructor() {}

  mensagemAlerta(titulo: string, corpo: string): void {
    Swal.fire(titulo, corpo, 'warning');
  }

  mensagemSucesso(titulo: string, corpo: string): void {
    Swal.fire(titulo, corpo, 'success');
  }
}
