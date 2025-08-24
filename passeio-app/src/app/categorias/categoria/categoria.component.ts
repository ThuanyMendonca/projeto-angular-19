import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { isCampoFormInvalido } from '../../shared/form-utils/validaCampos';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor(private service: CategoriaService) {
    this.camposForm = new FormGroup({
      // FormControl recebe dois parametros: valor inicial e validadores
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid) {
      // Pode utilizar o subscribe das 2 formas
      // .subscribe( categoria => {
      //   console.log('Categoria salva com sucesso!', categoria);
      // });
      this.service.salvar(this.camposForm.value).subscribe({
        next: (categoria) => {
          console.log('Categoria salva com sucesso!', categoria);
          this.camposForm.reset(); // limpa o formulario
        },
        error: (erro) => console.error('Erro ao salvar categoria', erro.message)
      });
    }
  }

  isCampoInvalido(campo: string){
      return isCampoFormInvalido(this.camposForm, campo);
    }
}
