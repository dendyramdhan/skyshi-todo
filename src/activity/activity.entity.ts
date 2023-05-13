import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import { TodoEntity } from "src/todo/todo.entity";


@Entity('activities')
export class ActivityEntity {

  @PrimaryGeneratedColumn({ name: "activity_id" }) 
  id: number;

  @Column() 
  title: string;

  @Column()
  email: string

  @OneToMany(() => TodoEntity, (todo) => todo.activity)
  @JoinColumn({ referencedColumnName: 'activity_id' })
  todos: TodoEntity[]

  @Expose({ name: "createdAt" })
  @CreateDateColumn()
  created_at: Date

  @Expose({ name: "updatedAt" })
  @UpdateDateColumn()
  updated_at: Date
}