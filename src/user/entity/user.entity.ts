import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'fullname' })
    fullname: string;

    @Column({ name: 'dob', nullable: true })
    dob: Date

    @Column({ name: 'phone_number', nullable: true, unique: true })
    phoneNumber: string;
}
