import { Momento } from 'src/app/interfaces/momento';
import { Component, OnInit } from '@angular/core';
import { MomentoService } from 'src/app/services/momento.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private momentoService: MomentoService,
    public messageService: MensagensService
  ) {}

  baseApi = this.momentoService.getApiUlr();

  allMomentos: Momento[] = [];

  momentos: Momento[] = [];

  ngOnInit(): void {
    this.momentoService.getAllMomentos().subscribe((items) => {
      const data = items.data;
      // Formata a propriedade created_at de cada momento para o formato de data local brasileiro
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMomentos = data;
      this.momentos = data;
    });
  }
}