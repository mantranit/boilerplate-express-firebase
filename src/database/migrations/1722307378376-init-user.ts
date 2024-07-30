import { hashSync } from "bcryptjs";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitData1722307378376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (email, hash_password, status)
            SELECT 'man.tran@watasoftware.com', '${hashSync(
              "123456@wts",
              12
            )}', 'ACTIVE'
            WHERE NOT EXISTS (
                SELECT 1
                FROM users
                WHERE email = 'man.tran@watasoftware.com'
            );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email='man.tran@watasoftware.com';`
    );
  }
}
