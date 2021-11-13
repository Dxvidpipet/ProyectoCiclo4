import {Entity, model, property} from '@loopback/repository';

@model()
export class Marca extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idMarca?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreMarca: string;


  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
