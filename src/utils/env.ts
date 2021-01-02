import {Env, StringOrNumber} from './envModel';
import * as dotenv from 'dotenv';

dotenv.config()

class EnvBuilder {
  private env: Env

  constructor() {
    this.env = {} as Env
  }

  withPort(defaultPort: StringOrNumber) {
    this.env.PORT = process.env.PORT || defaultPort
    return this
  }

  withApi(defaultApi: string) {
    this.env.API_URL = process.env.API_URI || defaultApi
    return this
  }

  builder(): Env {
    return this.env
  }
}

export const env = new EnvBuilder()
  .withApi('https://denotate-back.herokuapp.com')
  .withPort('8080')
  .builder()
