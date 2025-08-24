import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';
import { isCampoFormInvalido } from '../../shared/form-utils/validaCampos';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private lugarService: LugarService) {

    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)])
    });
  }

  ngOnInit(): void {
      this.categoriaService.obterTodas().subscribe({
        next: (listaCategorias) => this.categorias = listaCategorias
      })

  }
  salvar() {
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      this.lugarService.salvar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log("Cadastrado com sucesso! ", lugar);
          this.camposForm.reset();
        },
        error: (erro) => console.error("Ocorreu um erro: ", erro.message )
      })
    }
  }

  isCampoInvalido(campo: string){
    return isCampoFormInvalido(this.camposForm, campo);
  }

}
