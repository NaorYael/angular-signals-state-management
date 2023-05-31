import {Component, inject, Input, OnInit} from "@angular/core";
import {Joke, JokeFacadeStoreService} from "../../joke-facade-store.service";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {

  @Input() joke!: Joke;

  ngOnInit(): void {}

  #jokeFacadeStoreService = inject(JokeFacadeStoreService);

  loadAnotherJoke() {
    this.#jokeFacadeStoreService.loadJoke();
  }


  }

