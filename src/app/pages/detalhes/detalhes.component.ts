import { Comentario } from './../../interfaces/comentario';
import Swal from 'sweetalert2';
import { Momento } from './../../interfaces/momento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentoService } from 'src/app/services/momento.service';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.sass'],
})
export class DetalhesComponent implements OnInit {
  constructor(
    private momentoService: MomentoService,
    private route: ActivatedRoute,
    private messageService: MensagensService,
    private router: Router,
    private comentarioService: ComentarioService
  ) {}
  ulr: string = this.momentoService.getApiUlr();
  momento?: Momento;
  editarIcon = faEdit;
  excluirIcon = faDeleteLeft;
  comentarioForm!: FormGroup;

  ngOnInit(): void {
    // Obtém o parâmetro 'id' da rota atual e converte para o tipo Number.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Chama o momentoService para buscar o objeto Momento com o ID fornecido.
    // O método getMomento faz uma chamada HTTP para buscar os dados do momento pelo ID.
    // Quando a resposta é recebida, o objeto Momento é atribuído à variável momento.
    this.momentoService
      .getMomento(id)
      .subscribe((item) => (this.momento = item.data));

    this.comentarioForm = new FormGroup({
      texto: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
    });
  }

  get texto() {
    return this.comentarioForm.get('texto')!;
  }

  get userName() {
    return this.comentarioForm.get('userName')!;
  }

  async enviar(formDir: FormGroupDirective) {
    if (this.comentarioForm.invalid) {
      this.messageService.mensagemAlerta(
        'Opps!',
        'A campos a serem preenchidos!'
      );
      return;
    }
    const data: Comentario = this.comentarioForm.value;
    data.momento_id = Number(this.momento!.id);

    await this.comentarioService
      .criarComentario(data)
      .subscribe((comentario) => {
        this.momento!.comentario!.push(comentario.data);
        this.messageService.mensagemSucesso(
          'Tudo Certo',
          'Dados inseridos com sucesso!'
        );
      });
    //reseta o form
    this.comentarioForm.reset();
    formDir.resetForm();
  }

  async excluir(id: any) {
    Swal.fire({
      title: 'Confirma excluir este item?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.momentoService.removerMomento(id).subscribe();
        this.messageService.mensagemSucesso(
          'Tudo Certo!',
          'Registro excluido com sucesso'
        );
        this.router.navigate(['/']);
      }
    });
  }
}
