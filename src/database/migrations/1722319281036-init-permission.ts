import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPermission1722319281036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permissions (module_name, function_name, can_create, can_read, can_update, can_delete)
            SELECT 'ADMIN', 'GRAND_PERMISSION', true, true, true, true
            WHERE NOT EXISTS (
                SELECT 1
                FROM permissions
                WHERE module_name = 'ADMIN' AND function_name = 'GRAND_PERMISSION'
            );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM permissions WHERE module_name = 'ADMIN' AND function_name = 'GRAND_PERMISSION';`
    );
  }
}
