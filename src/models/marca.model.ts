import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

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

  @belongsTo(() => Vehiculo)
  vehiculoId: number;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
