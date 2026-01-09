import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'fullname' })
    fullname: string;

    @Column({ name: 'pwd' })
    pwd: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'role' })
    role: string;
}