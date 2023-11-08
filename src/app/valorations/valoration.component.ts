import { Component, OnInit } from '@angular/core';
import { Valoration } from '../valorations';
import { ValorationService } from '../valoration.service'; 

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.css']
})
export class ValorationsComponent implements OnInit {
  valorations: Valoration[] = [];

  constructor(private valorationService: ValorationService) { }
  
  //Ordena obtener los 'valorations' cuando se inicializa la pagina
  ngOnInit(): void {
    this.getValorations();
  }
  // Obtiene los 'heroes' proporcionados por el HeroService que a la vez le llegan del fichero de mock heroes
  getValorations(): void {
    this.valorationService.getValoration()
    .subscribe((valorations: Valoration[]) => this.valorations = valorations);
  }
  add(eventName: string): void {
    eventName = eventName.trim();
    if (!eventName) { return; }
    this.valorationService.addValoration({ eventName } as Valoration)
      .subscribe((valoration: any) => {
        this.valorations.push(valoration);
      });
  }
  delete(valoration: Valoration): void {
    this.valorations = this.valorations.filter((h: Valoration) => h !== valoration);
    this.valorationService.deleteValoration(valoration._id).subscribe();
  }

  
}
