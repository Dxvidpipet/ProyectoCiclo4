import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Foto,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoFotoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/foto', {
    responses: {
      '200': {
        description: 'Vehiculo has one Foto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Foto),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto> {
    return this.vehiculoRepository.tiene_foto(id).get(filter);
  }

  @post('/vehiculos/{id}/foto', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehiculo.prototype.id_vehiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInVehiculo',
            exclude: ['idFoto'],
            optional: ['id_vehicuo']
          }),
        },
      },
    }) foto: Omit<Foto, 'idFoto'>,
  ): Promise<Foto> {
    return this.vehiculoRepository.tiene_foto(id).create(foto);
  }

  @patch('/vehiculos/{id}/foto', {
    responses: {
      '200': {
        description: 'Vehiculo.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehiculoRepository.tiene_foto(id).patch(foto, where);
  }

  @del('/vehiculos/{id}/foto', {
    responses: {
      '200': {
        description: 'Vehiculo.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehiculoRepository.tiene_foto(id).delete(where);
  }
}
