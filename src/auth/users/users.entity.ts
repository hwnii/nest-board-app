import { Board } from 'src/boards/boards.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  encryptedPassword: string;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
