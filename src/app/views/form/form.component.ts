import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent {
  @Input() btnText!: String;

  momentoForm!: FormGroup;

  ngOnInit(): void {
    this.momentoForm = new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    });
  }

  get titulo() {
    return this.momentoForm.get('titulo')!;
  }

  get descricao() {
    return this.momentoForm.get('descricao')!;
  }

  enviar() {
    if (this.momentoForm.invalid) {
      return;
    } else {
      console.log('Teste');
    }
  }
}
