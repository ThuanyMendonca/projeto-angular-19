import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { Categoria } from '../../categorias/categoria';
import { Lugar } from '../../lugares/lugar';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(private lugarService: LugarService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe(categorias => this.categoriasFiltro = categorias);
    // ou assim
    this.lugarService.obterTodos().subscribe({
      next: (lugaresResposta) => {
        this.lugares = lugaresResposta
        console.log('Lugares: ', this.lugares);
      },
      error: (erro) => console.error('Erro ao listar lugares: ', erro.message)
    });
  }

  getTotalEstrelas(lugar: Lugar) : string {
    return '&#9733;'.repeat(lugar.avaliacao || 0) + '&#9734;'.repeat(5 - (lugar.avaliacao || 0));
  }

  filtrar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro).subscribe(resultado => this.lugares = resultado)
  }
}
