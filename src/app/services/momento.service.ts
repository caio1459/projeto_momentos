import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Serviço para manipular operações relacionadas a 'momentos'.
 * Este serviço lida com a comunicação com o backend através de requisições HTTP.
 */
@Injectable({
  providedIn: 'root',
})
export class MomentoService {
  // Base da URL da API definida no arquivo environments/environment.ts.
  private ulr = environment.baseApiUlr;

  // URL completa para o endpoint da API para manipulação de 'momentos'.
  private apiUlr = `${this.ulr}api/momentos`;

  constructor(private http: HttpClient) {}

  /**
   * Método para criar um 'momento' enviando um objeto FormData através de uma requisição POST.
   * Pega como parametrô o objeto FormData contendo os dados do 'momento' a serem enviados.
   * retorna um Observable que pode ser inscrito para receber a resposta da requisição HTTP.
   */
  criarMomento(formData: FormData): Observable<FormData> {
    // Faz uma requisição POST para a API enviando o objeto FormData contendo os dados do 'momento'.
    // O tipo genérico especificado no método post<FormData>() espera que a resposta seja do tipo FormData.
    return this.http.post<FormData>(this.apiUlr, formData);
  }
}
