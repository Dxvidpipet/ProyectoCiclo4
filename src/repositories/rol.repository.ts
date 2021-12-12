import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly esta_asosiado: HasManyRepositoryFactory<Usuario, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.esta_asosiado = this.createHasManyRepositoryFactoryFor('esta_asosiado', usuarioRepositoryGetter,);
    this.registerInclusionResolver('esta_asosiado', this.esta_asosiado.inclusionResolver);
  }
}
