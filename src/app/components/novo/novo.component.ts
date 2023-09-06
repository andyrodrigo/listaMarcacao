import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPessoa } from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-dialog-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
})
export class NovoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NovoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPessoa
  ) {}

  ngOnInit(): void {}

  protected enviar(): void {
    this.dialogRef.close(this.data.nome);
  }

  protected cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
