import { MigrationInterface, QueryRunner } from "typeorm";

export class GrandPermission1722323212493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles_permissions (role_id, permission_id)
          SELECT r.id as role_id, p.id as permission_id FROM roles r FULL JOIN permissions p ON true`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE roles_permissions;`);
  }
}
