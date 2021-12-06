import {Entity, model, property, hasOne} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Foto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idFoto?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreFoto: string;

  @property({
    type: 'number',
  })
  id_vehicuo?: number;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @property({
    type: 'number',
  })
  vehiculoId?: number;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
