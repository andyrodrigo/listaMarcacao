import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.css'],
})
export class LinhaComponent implements OnInit {
  @Input() nome: string = 'Nome Completo';

  constructor() {}

  ngOnInit(): void {}
}
