import axios from 'axios';
import {Joke} from "./joke-facade-store.service";

export async function getRandomJoke(): Promise<any> {
  const response = await axios.get<{ joke: Joke}>(
    'https://api.chucknorris.io/jokes/random'
  );
  return response.data;
}
