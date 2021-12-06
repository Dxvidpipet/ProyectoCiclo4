import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CategoriaVehicuo, CategoriaVehicuoRelations} from '../models';

export class CategoriaVehicuoRepository extends DefaultCrudRepository<
  CategoriaVehicuo,
  typeof CategoriaVehicuo.prototype.id,
  CategoriaVehicuoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CategoriaVehicuo, dataSource);
  }
}
