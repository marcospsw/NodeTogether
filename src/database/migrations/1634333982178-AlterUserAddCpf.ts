import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddCpf1634333982178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cpf');
  }
}
