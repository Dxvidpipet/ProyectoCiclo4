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
Categoria,
CategoriaVehicuo,
Vehiculo,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaVehiculoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Vehiculo through CategoriaVehicuo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.categoriaRepository.vehiculos(id).find(filter);
  }

  @post('/categorias/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'create a Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categoria.prototype.idCategoria,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCategoria',
            exclude: ['id_vehiculo'],
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id_vehiculo'>,
  ): Promise<Vehiculo> {
    return this.categoriaRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/categorias/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Categoria.Vehiculo PATCH success count',
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
    return this.categoriaRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/categorias/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Categoria.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.categoriaRepository.vehiculos(id).delete(where);
  }
}
