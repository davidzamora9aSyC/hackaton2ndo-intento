import { Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { ManyToOne } from "typeorm";
import { PasajeroEntity } from "src/pasajero/pasajero.entity/pasajero.entity";
import { ConductorEntity } from "src/conductor/conductor.entity/conductor.entity";

@Entity()
export class ViajeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column()
    direccionInicio: string;
  
    @Column()
    direccionFin: string;
  
    @Column('float')
    costo: number;
  
    @ManyToOne(() => ConductorEntity, conductor => conductor.viajes)
    conductor: ConductorEntity;
  
    @ManyToOne(() => PasajeroEntity, pasajero => pasajero.viajes)
    pasajero: PasajeroEntity;

}