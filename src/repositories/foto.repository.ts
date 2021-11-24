import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Foto, FotoRelations} from '../models';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.idFoto,
  FotoRelations
> {
  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource,
  ) {
    super(Foto, dataSource);
  }
}
