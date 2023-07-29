import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Momento } from '../interfaces/momento';
import { Respostas } from '../interfaces/resposta';

/**
 * Serviço para manipular operações relacionadas a 'momentos'.
 * Este serviço lida com a comunicação com o backend através de requisições HTTP.
 */
@Injectable({
  providedIn: 'root',
})
export class MomentoService {
  // Base da URL da API definida
  private url: string = 'http://localhost:3333/';

  // URL completa para o endpoint da API para manipulação de 'momentos'.
  private apiUlr = `${this.url}api/momentos`;

  constructor(private http: HttpClient) {}

  getApiUlr() {
    return this.url;
  }
  setApiUlr(ulr: string) {
    this.url = ulr;
  }
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

  //Retorna todos os momentos de acordo com a resposta da aplicação
  getAllMomentos(): Observable<Respostas<Momento[]>> {
    return this.http.get<Respostas<Momento[]>>(this.apiUlr);
  }
}
