import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Marca, MarcaRelations} from '../models';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.idMarca,
  MarcaRelations
> {
  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource,
  ) {
    super(Marca, dataSource);
  }
}
