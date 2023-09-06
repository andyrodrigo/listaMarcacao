import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { NovoComponent } from '../novo/novo.component';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { IPessoa, Pessoa } from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.css'],
})
export class LinhaComponent implements OnInit {
  @Input() pessoa: Pessoa = new Pessoa();

  @Output() emitir = new EventEmitter<IPessoa>();
  @Output() salvar = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  protected editarNome(): void {
    const dialogRef = this.dialog.open(NovoComponent, {
      width: '250px',
      data: this.pessoa,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pessoa.nome = result;
      }
    });
  }

  protected riscar(): void {
    this.pessoa.riscado = !this.pessoa.riscado;
    this.salvar.emit();
  }

  protected chamarExclusao(): void {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: {
        mensagem: `Excluir ${this.pessoa.nome}?`,
        nome: this.pessoa.nome,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.emitir.emit(this.pessoa);
      }
    });
  }
}
