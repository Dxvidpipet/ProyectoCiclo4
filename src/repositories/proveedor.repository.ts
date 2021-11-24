import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Proveedor, ProveedorRelations} from '../models';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.idProveedor,
  ProveedorRelations
> {
  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource,
  ) {
    super(Proveedor, dataSource);
  }
}
