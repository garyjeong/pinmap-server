import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyId1712906677232 implements MigrationInterface {
    name = 'ModifyId1712906677232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_31e541c93fdc0bb63cfde6549b7\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_31e541c93fdc0bb63cfde6549b7\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_31e541c93fdc0bb63cfde6549b7\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`group\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`groupId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_31e541c93fdc0bb63cfde6549b7\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
