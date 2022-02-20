import { Entity, Column, PrimaryColumn, EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';

/*
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
*/
export interface UserSchemaType {
  email: string;
  id: string;
  name: string;
  password: string;
  isActive: boolean;
  totalNotesCreated: number;
}

export const UserSchema = new EntitySchema<UserSchemaType>({
  name: 'user',
  columns: {
    id: {
      type: String,
      primary: true
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    isActive: {
      type: Boolean
    },
    totalNotesCreated: {
      type: Number
    }
  }
});
