import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFolderAndPhotoTable1712909072935 implements MigrationInterface {
    name = 'CreateFolderAndPhotoTable1712909072935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`photo\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`filename\` varchar(100) NOT NULL COMMENT '이미지 파일명', \`url\` varchar(255) NOT NULL COMMENT '이미지 업로드 URL', \`image_date\` datetime NOT NULL COMMENT '이미지 생성 일자', \`image_location\` point NULL COMMENT '이미지 위치 정보', \`group_id\` int NOT NULL COMMENT '이미지가 업로드된 그룹 아이디', \`folderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사진 테이블"`);
        await queryRunner.query(`CREATE TABLE \`folder\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL COMMENT '폴더명', \`description\` varchar(255) NOT NULL COMMENT '폴더 설명', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="폴더 테이블"`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_045600141e2ae5f96c95c92a764\` FOREIGN KEY (\`folderId\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_045600141e2ae5f96c95c92a764\``);
        await queryRunner.query(`DROP TABLE \`folder\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
    }

}
