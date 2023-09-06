export interface IPessoa {
  chave?: string;
  nome?: string;
  riscado?: boolean;
}

export class Pessoa implements IPessoa {
  constructor(
    public chave?: string,
    public nome?: string,
    public riscado?: boolean
  ) {}
}
