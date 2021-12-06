import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Foto, FotoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.idFoto,
  FotoRelations
> {

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Foto.prototype.idFoto>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Foto, dataSource);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
