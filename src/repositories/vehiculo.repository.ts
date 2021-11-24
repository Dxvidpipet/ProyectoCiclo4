import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Vehiculo, VehiculoRelations} from '../models';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id_vehiculo,
  VehiculoRelations
> {
  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource,
  ) {
    super(Vehiculo, dataSource);
  }
}
