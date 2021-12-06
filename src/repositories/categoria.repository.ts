import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Vehiculo, CategoriaVehicuo} from '../models';
import {CategoriaVehicuoRepository} from './categoria-vehicuo.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.idCategoria,
  CategoriaRelations
> {

  public readonly vehiculos: HasManyThroughRepositoryFactory<Vehiculo, typeof Vehiculo.prototype.id_vehiculo,
          CategoriaVehicuo,
          typeof Categoria.prototype.idCategoria
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CategoriaVehicuoRepository') protected categoriaVehicuoRepositoryGetter: Getter<CategoriaVehicuoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Categoria, dataSource);
    this.vehiculos = this.createHasManyThroughRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter, categoriaVehicuoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
