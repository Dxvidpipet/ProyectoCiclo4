import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ventas, VentasRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly Relacion_unoauno: HasOneRepositoryFactory<Factura, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Ventas, dataSource);
    this.Relacion_unoauno = this.createHasOneRepositoryFactoryFor('Relacion_unoauno', facturaRepositoryGetter);
    this.registerInclusionResolver('Relacion_unoauno', this.Relacion_unoauno.inclusionResolver);
  }
}
