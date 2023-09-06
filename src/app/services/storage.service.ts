import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  gravarItem(chave: string, valor: string): void {
    localStorage.setItem(chave, valor);
  }

  lerItem(chave: string): any {
    return localStorage.getItem(chave);
  }

  removerItem(chave: string): void {
    localStorage.removeItem(chave);
  }

  limparDados(): void {
    localStorage.clear();
  }
}
