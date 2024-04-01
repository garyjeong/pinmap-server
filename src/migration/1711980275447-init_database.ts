import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1711980275447 implements MigrationInterface {
    name = 'InitDatabase1711980275447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`email\` varchar(20) NOT NULL, \`password\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 테이블"`);
        await queryRunner.query(`CREATE TABLE \`user_group\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NULL, \`group_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자와 그룹 중간 테이블"`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 그룹 테이블"`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_7ded8f984bbc2ee6ff0beee491b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_bb9982562cca83afb76c0ddc0d6\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_bb9982562cca83afb76c0ddc0d6\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_7ded8f984bbc2ee6ff0beee491b\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP TABLE \`user_group\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
