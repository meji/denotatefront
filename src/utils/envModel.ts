export type StringOrNumber = string | number;

export interface Env {
  PORT: StringOrNumber;
  API_URL: string | undefined;
}
