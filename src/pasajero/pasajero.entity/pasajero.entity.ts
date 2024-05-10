
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class PasajeroEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
nombre: string;

@Column()
cedula: string;

@Column()
celular: string;

@OneToMany(() => ViajeEntity, viaje => viaje.pasajero)
viajes: ViajeEntity[];
}