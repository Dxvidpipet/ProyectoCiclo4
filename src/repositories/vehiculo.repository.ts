import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Marca, Foto, Categoria, CategoriaVehicuo} from '../models';
import {MarcaRepository} from './marca.repository';
import {FotoRepository} from './foto.repository';
import {CategoriaVehicuoRepository} from './categoria-vehicuo.repository';
import {CategoriaRepository} from './categoria.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id_vehiculo,
  VehiculoRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly tiene_foto: HasOneRepositoryFactory<Foto, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly foto: HasOneRepositoryFactory<Foto, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly marcas: HasManyRepositoryFactory<Marca, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly marca: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id_vehiculo>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.idCategoria,
          CategoriaVehicuo,
          typeof Vehiculo.prototype.id_vehiculo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('CategoriaVehicuoRepository') protected categoriaVehicuoRepositoryGetter: Getter<CategoriaVehicuoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaVehicuoRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.marca = this.createBelongsToAccessorFor('marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('marca', this.marca.inclusionResolver);
    this.marcas = this.createHasManyRepositoryFactoryFor('marcas', marcaRepositoryGetter,);
    this.registerInclusionResolver('marcas', this.marcas.inclusionResolver);
    this.foto = this.createHasOneRepositoryFactoryFor('foto', fotoRepositoryGetter);
    this.registerInclusionResolver('foto', this.foto.inclusionResolver);
    this.tiene_foto = this.createHasOneRepositoryFactoryFor('tiene_foto', fotoRepositoryGetter);
    this.registerInclusionResolver('tiene_foto', this.tiene_foto.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
