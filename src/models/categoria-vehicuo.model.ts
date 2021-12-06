import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaVehicuo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  idvehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  idcategoria: number;

  @property({
    type: 'number',
  })
  categoriaId?: number;

  @property({
    type: 'number',
  })
  vehiculoId?: number;

  constructor(data?: Partial<CategoriaVehicuo>) {
    super(data);
  }
}

export interface CategoriaVehicuoRelations {
  // describe navigational properties here
}

export type CategoriaVehicuoWithRelations = CategoriaVehicuo & CategoriaVehicuoRelations;
