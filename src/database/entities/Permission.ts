import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity("permissions")
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "module_name" })
  moduleName: string;

  @Column({ name: "function_name" })
  functionName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: "can_create", default: false })
  canCreate: boolean;

  @Column({ name: "can_read", default: false })
  canRead: boolean;

  @Column({ name: "can_update", default: false })
  canUpdate: boolean;

  @Column({ name: "can_update_fields", nullable: true })
  canUpdateFields: string;

  @Column({ name: "can_delete", default: false })
  canDelete: boolean;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
