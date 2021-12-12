import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Ventas} from '../models';
import {VentasRepository} from './ventas.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly ambas_se_relacionan: HasOneRepositoryFactory<Ventas, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Factura, dataSource);
    this.ambas_se_relacionan = this.createHasOneRepositoryFactoryFor('ambas_se_relacionan', ventasRepositoryGetter);
    this.registerInclusionResolver('ambas_se_relacionan', this.ambas_se_relacionan.inclusionResolver);
  }
}
