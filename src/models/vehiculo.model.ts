import {Entity, model, property} from '@loopback/repository';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_vehiculo?: number;

  @property({
    type: 'string',
    required: true,
  })
  color_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo_Vehiculo: string;

  @property({
    type: 'number',
    required: true,
  })
  serie_chasis_vehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  serie_motor_vehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_vehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento_vehiculo: number;

  @property({
    type: 'boolean',
    required: true,
  })
  existencia_vehiculo: boolean;


  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
