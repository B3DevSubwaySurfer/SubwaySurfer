import {Component, OnInit} from '@angular/core';
// import {GameCompletionCheckService} from "../../../services/game-completion-check.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {BorneClasse} from "../../../classes/borne.classe";

@Component({
  selector: 'app-ink-level-game',
  templateUrl: './ink-level-game.component.html',
  styleUrls: ['./ink-level-game.component.css']
})
export class InkLevelGameComponent implements OnInit{
  private isDragging: boolean = false;
  private borne: BorneClasse | undefined;

  constructor(
      private appService: AppService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Convertissez la chaîne JSON en objet BorneClasse
      this.borne = JSON.parse(params['borne']);
    });
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const gameContainer = document.querySelector('.game-container');
      const gasCan = document.querySelector('.gas-can') as HTMLElement;
      const reservoir = document.querySelector('.reservoir') as HTMLElement;

      if (gameContainer) {
        const containerRect = gameContainer.getBoundingClientRect();
        const gasCanRect = gasCan.getBoundingClientRect();
        const reservoirRect = reservoir.getBoundingClientRect();

        const x = event.clientX - containerRect.left - gasCan.clientWidth / 2;
        const y = event.clientY - containerRect.top - gasCan.clientHeight / 2;

        gasCan.style.left = `${Math.max(0, Math.min(containerRect.width - gasCan.clientWidth, x))}px`;
        gasCan.style.top = `${Math.max(0, Math.min(containerRect.height - gasCan.clientHeight, y))}px`;

        // Vérifiez si les rectangles du bidon et du réservoir se chevauchent
        if (
            gasCanRect.left <= reservoirRect.right &&
            gasCanRect.right >= reservoirRect.left &&
            gasCanRect.top <= reservoirRect.bottom &&
            gasCanRect.bottom >= reservoirRect.top
        ) {
          // Attendre 5 secondes avant de naviguer vers /home
          setTimeout(() => {
            console.log("je suis ici apres 5 secondes");
            this.isGameCompleted();
          }, 5000);
        }
      }
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
  }

  private isGameCompleted() {
    console.log("je suis la borne", this.borne);
    if (this.borne) {
      this.appService.resetInkLevelForBorne(this.borne);
      this.router.navigate(['/home']);
    }
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}
