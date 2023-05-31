import { HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { getRandomJoke } from './joke-api.util';
import { defaultEqualityFn } from './default-equality-fn.util';


interface State {
    joke: Joke;
    error: HttpErrorResponse | null;
    loading: boolean;
    loaded: boolean
}

export interface Joke {
  categories?: string[]
  created_at?: string
  icon_url?: string
  id?: string
  updated_at?: string
  url?: string
  value?: string
}

@Injectable({ providedIn: 'root' })
export class JokeFacadeStoreService  {

    constructor() {
        this.loadJoke();
    }

    #state = signal<State>({
        joke: {id: '', categories: [], created_at: new Date().toISOString(), icon_url: '', url: '', updated_at: '', value: ''},// initial values
        error: null,
        loading: false,
        loaded: false
      });

    joke = computed(() => this.#state().joke, {equal: defaultEqualityFn});
    error = computed(() => this.#state().error, {equal: defaultEqualityFn});
    loading = computed(() => this.#state().loading, {equal: defaultEqualityFn});
    loaded = computed(() => this.#state(), {equal: defaultEqualityFn});

    patch(partialState: Partial<State>) {
        this.#state.update((state) => ({
          ...state,
          ...partialState,
        }));
      }

    async loadJoke() {
        this.patch({loading: true});
        try {
            const jokeObj = await getRandomJoke();
            this.patch({
                joke: jokeObj,
                error: null,
                loading: false,
                loaded: true
            })
        } catch (error) {
            this.patch({
                joke: {},
                error: new HttpErrorResponse({error}),
                loading: false,
                loaded: true
            })
        }
    }


}
