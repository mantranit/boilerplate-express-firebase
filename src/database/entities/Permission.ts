import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("permissions")
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  moduleCode: string;

  @Column()
  functionCode: string;

  @Column()
  description: string;

  @Column({ default: false })
  canCreate: boolean;

  @Column({ default: false })
  canRead: boolean;

  @Column({ default: false })
  canUpdate: boolean;

  @Column({ default: false })
  canDelete: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
