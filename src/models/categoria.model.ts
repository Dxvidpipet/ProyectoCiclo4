import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {CategoriaVehicuo} from './categoria-vehicuo.model';

@model()
export class Categoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idCategoria?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreCategoria: string;

  @hasMany(() => Vehiculo, {through: {model: () => CategoriaVehicuo}})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
