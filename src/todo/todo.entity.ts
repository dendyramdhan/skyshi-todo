import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import { ActivityEntity } from "src/activity/activity.entity";

@Entity('todos')
export class TodoEntity {

  @PrimaryGeneratedColumn({ name: "todo_id" }) 
  id: number;

  @Column()
  activity_group_id: number

  @Column() 
  title: string;

  @Column({
    default: "very-high"
  })
  priority: string

  @Column({
    type: 'boolean',
    default: false
  })
  is_active: boolean

  @Expose({ name: "createdAt" })
  @CreateDateColumn()
  created_at: Date

  @Expose({ name: "updatedAt" })
  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => ActivityEntity, (activity) => activity.id)
  @JoinColumn({ name: 'activity_group_id', referencedColumnName: 'id' })
  activity: ActivityEntity
}