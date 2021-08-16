import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationTextFieldsService {

  constructor() { }

  textMinLength(value: number): string {
    return `Tamanho mínimo de ${value} caracteres!`;
  }

  textMaxLength(value: number): string {
    return `Tamanho máximo de ${value} caracteres!`;
  }

  requiredTextField() : string {
    return "Campo obrigatório!";
  }

  numberMinLength(value: number): string {
    return `O valor mínimo é ${value}!`;
  }

  numberMaxLength(value: number): string {
    return `O valor máximo é ${value}!`;
  }

}
