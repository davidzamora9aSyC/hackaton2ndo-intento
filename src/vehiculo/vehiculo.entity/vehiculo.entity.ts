
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';

@Entity()
export class VehiculoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  carroMoto: boolean;

  @Column()
  placa: string;

  @Column()
  kilometraje: number;

  @OneToOne(() => ConductorEntity, conductor => conductor.vehiculo)
  @JoinColumn()
  conductor: ConductorEntity;
}
