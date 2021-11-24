import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Categoria, CategoriaRelations} from '../models';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.idCategoria,
  CategoriaRelations
> {
  constructor(
    @inject('datasource.mysql2') dataSource: Mysql2DataSource,
  ) {
    super(Categoria, dataSource);
  }
}
