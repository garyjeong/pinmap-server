import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPhotoDatecolumns1715502702741 implements MigrationInterface {
    name = 'ModifyPhotoDatecolumns1715502702741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`inserted_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`folder\` DROP FOREIGN KEY \`FK_c6d723b923923f7e333f510b889\``);
        await queryRunner.query(`ALTER TABLE \`folder\` CHANGE \`group_id\` \`group_id\` int NOT NULL COMMENT '그룹 아이디'`);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD CONSTRAINT \`FK_c6d723b923923f7e333f510b889\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folder\` DROP FOREIGN KEY \`FK_c6d723b923923f7e333f510b889\``);
        await queryRunner.query(`ALTER TABLE \`folder\` CHANGE \`group_id\` \`group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD CONSTRAINT \`FK_c6d723b923923f7e333f510b889\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`inserted_at\``);
    }

}
