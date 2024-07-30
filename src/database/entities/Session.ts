import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("sessions")
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Column()
  email: string;

  @Column({ name: "access_token" })
  accessToken: string;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column({ name: "user_agent" })
  userAgent: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
