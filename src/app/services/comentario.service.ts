import { Comentario } from './../interfaces/comentario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respostas } from '../interfaces/resposta';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  constructor(private htpp: HttpClient) {}
  // Base da URL da API definida
  private url: string = 'http://localhost:3333/';
  // URL completa para o endpoint da API para manipulação de 'momentos'.
  private apiUlr = `${this.url}api/momentos`;

  criarComentario(data: Comentario): Observable<Respostas<Comentario>> {
    const ulr = `${this.apiUlr}/${data.id}/comentario`
    return this.htpp.post<Respostas<Comentario>>(this.url, data);
  }
}
