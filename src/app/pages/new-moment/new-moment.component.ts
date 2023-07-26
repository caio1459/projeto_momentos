import { Component } from '@angular/core';
import { Momento } from 'src/app/interfaces/momento';
import { MomentoService } from 'src/app/services/momento.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.sass'],
})
export class NewMomentComponent {
  btnText: String = 'Compartilhar';

  constructor(private momentoService: MomentoService) {}

  async createHendler(momento: Momento) {
    // Cria um novo objeto FormData para enviar os dados ao servidor como uma solicitação multipart/form-data.
    const formData = new FormData();

    // Adiciona os campos 'titulo' e 'descricao' do objeto Momento ao formData.
    formData.append('titulo', momento.titulo);
    formData.append('descricao', momento.descricao);

    // Verifica se há uma imagem selecionada no objeto Momento e, se houver, a adiciona ao formData.
    if (momento.image) {
      formData.append('image', momento.image);
    }

    // Chama o serviço MomentoService para criar um novo momento enviando o formData.
    // O método criarMomento é a chamada ao servidor que consome o formData para processar o novo momento.
    // O uso de "await" indica que estamos aguardando a conclusão da operação antes de prosseguir.
    await this.momentoService.criarMomento(formData).subscribe();
  }
}
