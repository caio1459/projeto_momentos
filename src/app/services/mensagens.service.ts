import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensagensService {
  constructor() {}

  mensagem: string = '';

  mensagemAlerta(titulo: string, corpo: string) {
    if (this.mensagem == '') {
      Swal.fire(titulo, corpo, 'warning');
    }
  }
  mensagemSucesso(titulo: string, corpo: string) {
    Swal.fire(titulo, corpo, 'success');
  }
}
