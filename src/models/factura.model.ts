import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ventas} from './ventas.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_venta: string;

  @property({
    type: 'string',
    required: true,
  })
  consecutivo: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  precio_venta?: string;

  @hasOne(() => Ventas, {keyTo: 'id_factura'})
  ambas_se_relacionan: Ventas;

  @property({
    type: 'string',
  })
  id_factura?: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
