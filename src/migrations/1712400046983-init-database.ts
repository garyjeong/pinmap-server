import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatabase1712400046983 implements MigrationInterface {
  name = 'InitDatabase1712400046983'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(20) NOT NULL COMMENT '이메일', \`password\` varchar(255) NULL COMMENT '비밀번호, SNS의 경우 Null', \`username\` varchar(255) NULL COMMENT '닉네임', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 테이블"`,
    )
    await queryRunner.query(
      `CREATE TABLE \`user_group_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status_name\` varchar(100) NOT NULL COMMENT '그룹 참여 상태명', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 그룹 참여에 대한 상태 테이블"`,
    )
    await queryRunner.query(
      `CREATE TABLE \`user_group\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`is_owner\` tinyint NOT NULL COMMENT '그룹장 여부', \`usersId\` int NULL, \`groupId\` varchar(36) NULL, \`statusId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자와 그룹 중간 테이블"`,
    )
    await queryRunner.query(
      `CREATE TABLE \`group\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(20) NOT NULL COMMENT '그룹 이름', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 그룹 테이블"`,
    )
    await queryRunner.query(
      `ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_3d29fcc8b18122140372b7c1019\` FOREIGN KEY (\`usersId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_31e541c93fdc0bb63cfde6549b7\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_f2f498264ba3f4b92b776dc6c16\` FOREIGN KEY (\`statusId\`) REFERENCES \`user_group_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )

    await queryRunner.query(
      `INSERT INTO \`pinmap\`.\`user_group_status\` (\`id\`, \`status_name\`) VALUES (1, 'joined');`,
    )
    await queryRunner.query(
      `INSERT INTO \`pinmap\`.\`user_group_status\` (\`id\`, \`status_name\`) VALUES (2, 'waiting');`,
    )
    await queryRunner.query(
      `INSERT INTO \`pinmap\`.\`user_group_status\` (\`id\`, \`status_name\`) VALUES (3, 'invited');`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_f2f498264ba3f4b92b776dc6c16\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_31e541c93fdc0bb63cfde6549b7\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_3d29fcc8b18122140372b7c1019\``,
    )
    await queryRunner.query(`DROP TABLE \`group\``)
    await queryRunner.query(`DROP TABLE \`user_group\``)
    await queryRunner.query(`DROP TABLE \`user_group_status\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    )
    await queryRunner.query(`DROP TABLE \`user\``)
  }
}
