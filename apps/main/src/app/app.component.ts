import {NgIf, NgFor} from '@angular/common';
import {Component, inject} from '@angular/core';
import {JokeFacadeStoreService} from './joke-facade-store.service';
import {CardComponent} from "./components/card/card.component";

@Component({
  standalone: true,
  imports: [NgIf, NgFor, CardComponent],
  selector: 'df-root',
  template: `
    <p *ngIf="loading(); else jokeTemplate">Loading...</p>
    <ng-template #jokeTemplate>
      <p *ngIf="error()">{{error()!.message}}</p>
      <div class="container" *ngIf="!error()">
       <app-card [joke]="joke()"></app-card>
<!--        <pre>{{joke() | json}}</pre>-->
      </div>
    </ng-template>
  `,
})
export class AppComponent {

  #jokeFacadeStoreService = inject(JokeFacadeStoreService);
  joke = this.#jokeFacadeStoreService.joke;
  loading = this.#jokeFacadeStoreService.loading;
  error = this.#jokeFacadeStoreService.error;

}
