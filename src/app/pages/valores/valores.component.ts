import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { Valores } from '../../models/valores';


@Component({
  selector: 'app-valores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valores.component.html',
  styleUrl: './valores.component.css'
  
})
export class ValoresComponent implements OnInit{
  editandoId: number | null = null;

valores: Valores[] = [];

  valor: Valores = {
    id: 0,
    nombre:'',
    valor: 0,
    usuario: 0
};
 
 constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargar();
  }
  cancelar() {

  this.editandoId = null;

  this.cargar();

}
  cargar() {

    this.api.obtenerTodos()
      .subscribe(r => {
        this.valores = r;
      });

  }
  guardar() {

    if(this.valor.id == 0){

      this.api.agregar(this.valor)
        .subscribe(() => {
          this.limpiar();
          this.cargar();
        });

    }
    else {

      this.api.actualizar(this.valor)
        .subscribe(() => {
          this.limpiar();
          this.cargar();
        });

    }
  }
    editar(item:any) {
    this.editandoId = item.id;
  }
  guardarFila(item:any) {

  const valorEnviar = {
    ...item,
    valor: parseFloat(
      item.valor.toString().replace(',', '.')
    )
  };

  this.api.actualizar(valorEnviar)
    .subscribe(() => {

      this.editandoId = null;

      this.cargar();

    });

}

  eliminar(id:number) {

    if(confirm('Eliminar registro?')){

      this.api.eliminar(id)
        .subscribe(() => {
          this.cargar();
        });

    }
  }

  
  limpiar() {

    this.valor = {
      id:0,
      nombre:'',
      valor:0,
      usuario:0
    };

  }
  formatearDecimal() {

  if (!this.valor.valor)
    return;

  let valor = this.valor.valor.toString();

  // Convertir punto a coma
  valor = valor.replace(/\./g, ',');

  // Permitir solo números y coma
  valor = valor.replace(/[^0-9,]/g, '');

  // Solo una coma
  const partes = valor.split(',');

  if (partes.length > 2) {
    valor = partes[0] + ',' + partes[1];
  }

  // Máximo 4 decimales
  if (partes[1]) {

    partes[1] = partes[1].substring(0,4);

    valor = partes[0] + ',' + partes[1];
  }

  this.valor.valor = parseFloat(valor.replace(',', '.'))

};
soloDecimal(event: KeyboardEvent, valorActual: string): boolean {

  const tecla = event.key;

  // números
  if (/^[0-9]$/.test(tecla))
    return true;

  // permitir un solo decimal
  if ((tecla === ',' || tecla === '.') &&
      !valorActual.includes(',') &&
      !valorActual.includes('.')) {

    return true;
  }

  const especiales = [
    'Backspace',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Delete'
  ];

  if (especiales.includes(tecla))
    return true;

  event.preventDefault();

  return false;
}
formatearVisual(valor: number | null): string {

  if (valor == null)
    return '';

  return valor.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
};
onValorChange(valorInput: string, p: any) {

  if (!valorInput) {
    p.valor = null;
    return;
  }

  valorInput = valorInput.replace(/\./g, '');
  valorInput = valorInput.replace(',', '.');

  const numero = parseFloat(valorInput);

  if (!isNaN(numero)) {
    p.valor = numero;
  }

};


onValorEdit(valor: string, p: any) {

  // guardar texto visual
  p.valorTexto = valor;

  // eliminar espacios
  valor = valor.trim();

  // convertir comas a puntos
  valor = valor.replace(/,/g, '.');

  // dejar solo números y puntos
  valor = valor.replace(/[^0-9.]/g, '');

  // permitir un solo decimal
  const partes = valor.split('.');

  if (partes.length > 2) {

    valor =
      partes[0] + '.' +
      partes.slice(1).join('');
  }

  const numero = parseFloat(valor);

  if (!isNaN(numero)) {
    p.valor = numero;
  }
}

}