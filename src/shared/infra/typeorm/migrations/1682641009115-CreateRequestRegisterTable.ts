import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRequestRegisterTable1682641009115
  implements MigrationInterface
{
  name = 'CreateRequestRegisterTable1682641009115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "request_registers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "origin_ip" character varying NOT NULL, "agent" character varying NOT NULL, "user_id" uuid, "path" character varying NOT NULL, "method" character varying NOT NULL, "path_params" character varying, "query_params" character varying, "header" character varying NOT NULL, "body" character varying, "response_status" integer, "response_body" character varying, CONSTRAINT "PK_f93dacaa48489dae0d8c92b8a80" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "request_registers" ADD CONSTRAINT "FK_e591a8d43bd6868936c57c5b0f2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request_registers" DROP CONSTRAINT "FK_e591a8d43bd6868936c57c5b0f2"`,
    );
    await queryRunner.query(`DROP TABLE "request_registers"`);
  }
}
