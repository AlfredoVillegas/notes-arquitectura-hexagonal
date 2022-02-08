import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  totalNotesCreated: number;
}
