import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from 'src/app/services/storage.service';
import { NovoComponent } from '../novo/novo.component';
import { IPessoa } from 'src/app/models/pessoa.model';
import { ConfirmarComponent } from '../confirmar/confirmar.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  itens: IPessoa[] = [];

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarLista();
  }

  private buscarLista(): void {
    const lista = this.storageService.lerItem('itens');
    if (lista) {
      const itens = JSON.parse(lista);
      this.itens = itens;
    } else {
      this.itens = [];
    }
  }

  protected drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itens, event.previousIndex, event.currentIndex);
  }

  protected adicionar(): void {
    const dialogRef = this.dialog.open(NovoComponent, {
      width: '250px',
      data: { nome: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const novo = {
          chave: this.gerarChaveAleatoria(),
          nome: result,
          riscado: false,
        };
        this.itens.push(novo);
        this.salvarDados();
      }
    });
  }

  private gerarChaveAleatoria(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chave = '';
    for (let i = 0; i < 16; i++) {
      chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave;
  }

  protected receberPessoa(pessoa: IPessoa) {
    if (pessoa.chave) this.excluirPessoa(pessoa.chave);
  }

  private excluirPessoa(chave: string): void {
    const indice = this.itens.findIndex((item) => item.chave === chave);
    if (indice > -1) {
      this.itens.splice(indice, 1);
    }
    this.salvarDados();
  }

  protected desmarcarTodos(): void {
    if (this.itens.length > 0) {
      const dialogRef = this.dialog.open(ConfirmarComponent, {
        width: '300px',
        data: {
          mensagem: `Desmarcar Todos?`,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.itens.forEach((item) => {
            item.riscado = false;
          });
          this.salvarDados();
        }
      });
    }
  }

  protected salvarDados(): void {
    const lista = JSON.stringify(this.itens);
    this.storageService.gravarItem('itens', lista);
  }
}
