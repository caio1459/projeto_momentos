import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Momento } from 'src/app/interfaces/momento';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  constructor(public messageService: MensagensService) {}

  @Output() onSubmit = new EventEmitter<Momento>();

  @Input() btnText!: String;
  @Input() momentoData: Momento | null = null;

  msg: string = '';

  momentoForm!: FormGroup;

  ngOnInit(): void {
    this.momentoForm = new FormGroup({
      id: new FormControl(this.momentoData ? this.momentoData.id : null),
      titulo: new FormControl(
        this.momentoData ? this.momentoData.titulo : null,
        [Validators.required]
      ),
      descricao: new FormControl(
        this.momentoData ? this.momentoData.descricao : null,
        [Validators.required]
      ),
      image: new FormControl(null),
    });
  }

  get titulo() {
    return this.momentoForm.get('titulo')!;
  }

  get descricao() {
    return this.momentoForm.get('descricao')!;
  }

  selecionarArquivo(event: any) {
    // Obtem o arquivo selecionado a partir do evento.
    const file: File = event.target.files[0];
    // Atualiza o valor do campo 'image' no formulário usando Reactive Forms.
    this.momentoForm.patchValue({ image: file });
  }
  /**
   * Método para enviar os dados do formulário quando acionado um evento de envio.
   * Verifica se o formulário é inválido antes de enviar.
   * Se o formulário for válido, emite os dados através do evento 'onSubmit'.
   */
  enviar(): void {
    // Verifica se o formulário é inválido.
    if (this.momentoForm.invalid) {
      this.messageService.mensagemAlerta(
        'Calma Apressadinho',
        'A campos que não foram preechidos!'
      );
      return; // Sai da função se o formulário for inválido.
    } else {
      // Emite os dados do formulário através do evento 'onSubmit'.
      // Os dados do formulário são emitidos como um objeto contendo os valores dos campos do formulário.
      this.onSubmit.emit(this.momentoForm.value);
    }
  }
}
