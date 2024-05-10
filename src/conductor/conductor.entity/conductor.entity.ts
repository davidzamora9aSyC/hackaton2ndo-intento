
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';


@Entity()
export class ConductorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column()
  cedula: string;

  @Column()
  celular: string;

  @OneToMany(() => ViajeEntity, viaje => viaje.conductor)
  viajes: ViajeEntity[];

  @OneToOne(() => VehiculoEntity, vehiculo => vehiculo.conductor)
  vehiculo: VehiculoEntity

}
