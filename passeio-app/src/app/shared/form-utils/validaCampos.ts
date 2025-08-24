import { FormGroup } from '@angular/forms';

export function isCampoFormInvalido(form: FormGroup, nomeCampo: string): boolean {

  const campo = form.get(nomeCampo);
  return !!(campo && campo.invalid && campo.touched && campo.errors?.['required']);
}
