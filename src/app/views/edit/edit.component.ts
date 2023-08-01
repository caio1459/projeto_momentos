// Importando as dependências necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Momento } from 'src/app/interfaces/momento';
import { MensagensService } from 'src/app/services/mensagens.service';
import { MomentoService } from 'src/app/services/momento.service';

@Component({
  selector: 'app-edit', //
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass'],
})
export class EditComponent implements OnInit {
  constructor(
    private momentoService: MomentoService,
    private route: ActivatedRoute, //ActivatedRoute obtem informações da rota atual
    private router: Router,
    private messageService: MensagensService
  ) {}

  ngOnInit(): void {
    // Método executado quando o componente é inicializado
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtendo o parâmetro 'id' da rota atual e converte para número
    this.momentoService
      .getMomento(id)
      .subscribe((item) => (this.momento = item.data)); // Assinando a resposta com o método subscribe para atualizar a propriedade momento com os dados do momento obtido
  }
  momento!: Momento;
  btnText: string = 'Editar';

  async edit(momentoData: Momento) {
    const id = this.momento.id;
    const formData = new FormData(); // Criando um objeto FormData para enviar os dados do momento

    formData.append('titulo', momentoData.titulo); // Adicionando o título do momento ao FormData
    formData.append('descricao', momentoData.descricao); // Adicionando a descrição do momento ao FormData
    if (momentoData.image) {
      formData.append('image', momentoData.image); // Adicionando a imagem do momento ao FormData, caso exista
    }

    await this.momentoService.atualizarMomento(id!, formData).subscribe(() => {
      this.messageService.mensagemSucesso(
        'Tudo Certo!',
        'Dados atualizados com sucesso!'
      );
      this.router.navigate(['/']); // Navegando para a página inicial utilizando o serviço Router
    });
  }
}
