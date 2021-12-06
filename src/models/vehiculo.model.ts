import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Foto} from './foto.model';
import {Categoria} from './categoria.model';
import {CategoriaVehicuo} from './categoria-vehicuo.model';

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

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @hasOne(() => Foto, {keyTo: 'id_vehicuo'})
  tiene_foto: Foto;

  @property({
    type: 'number',
  })
  fotoId?: number;

  @hasOne(() => Foto)
  foto: Foto;
  @hasMany(() => Marca)
  marcas: Marca[];

  @belongsTo(() => Marca)
  marcaId: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaVehicuo}})
  categorias: Categoria[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
