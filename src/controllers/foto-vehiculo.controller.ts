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
  Foto,
  Vehiculo,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoVehiculoController {
  constructor(
    @repository(FotoRepository) protected fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Foto has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.fotoRepository.vehiculo(id).get(filter);
  }

  @post('/fotos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Foto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Foto.prototype.idFoto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInFoto',
            exclude: ['id_vehiculo'],
            optional: ['fotoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id_vehiculo'>,
  ): Promise<Vehiculo> {
    return this.fotoRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/fotos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Foto.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.fotoRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/fotos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Foto.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.fotoRepository.vehiculo(id).delete(where);
  }
}
