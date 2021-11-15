import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Marca, Foto} from '../models';
import {MarcaRepository} from './marca.repository';
import {FotoRepository} from './foto.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id_vehiculo,
  VehiculoRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly tiene_foto: HasOneRepositoryFactory<Foto, typeof Vehiculo.prototype.id_vehiculo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.tiene_foto = this.createHasOneRepositoryFactoryFor('tiene_foto', fotoRepositoryGetter);
    this.registerInclusionResolver('tiene_foto', this.tiene_foto.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
