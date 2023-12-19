import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  metroLine1: string[] = [
    'Lille CHU-Eurasanté', 'CHU - Centre O. Lambret', 'Porte des Postes', 'Wazemmes', 'Gambetta', 'République Beaux-Arts', 'Rihour', 'Gare Lille Flandres', 'Caulier', 'Fives', 'Marbrerie', 'Mairie d\'Hellemmes', 'Square Flandres', 'Pont de Bois', 'Villeneuve d\'Ascq Hôtel de Ville', 'Triolo', 'Cité Scientifique Pr Gabillard', 'Villeneuve d\'Ascq 4 Cantons Stade Pierre Mauroy'
  ];

  metroLine2A: string[] = [
    'Saint-Philibert', 'Bourg', 'Maison des Enfants', 'Pont Supérieur', 'Lomme Lambersart', 'Canteleu', 'Bois Blancs', 'Port de Lille', 'Cormontaigne', 'Montebello', 'Porte des Postes', 'Porte d\'Arras', 'Porte de Douai', 'Porte de Valenciennes', 'Lille Grand Palais', 'Mairie de Lille', 'Gare Lille Flandres', 'Gare Lille Europe', 'Saint-Maurice Pellevoisin', 'Mons Sarts'
  ];

  metroLine2B: string[] = [
    'Mairie de Mons', 'Fort de Mons', 'Les Prés Edgard Pisani', 'Jean Jaurès', 'Wasquehal Hôtel de Ville', 'Wasquehal Pavé de Lille', 'Croix - Centre', 'Epeule - Montesquieu', 'Roubaix Grand Place', 'Eurotéléport', 'Roubaix Charles de Gaulle', 'Alsace', 'Mercure', 'Carliers', 'Gare de Tourcoing', 'Tourcoing Centre', 'Colbert', 'Phalempins', 'Pont de Neuville', 'Tourcoing Sébastopol', 'Tourcoing C.H. Dron'
  ];

  selectedStation: string | null = null;  // Déclaration de la propriété

  getStationPosition(index: number, arrayLength: number): string {
    return (index / (arrayLength - 1)) * 100 + '%';
  }

  onSelectStation(station: string): void {
    this.selectedStation = station;  // Mise à jour de la propriété
  }

  isStationSelected(station: string): boolean {
    return this.selectedStation === station;  // Vérification de la station sélectionnée
  }
}