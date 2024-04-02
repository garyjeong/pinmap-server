import { config } from 'dotenv'
import { Group } from 'src/entities/group.entity'
import { User, UserGroup } from 'src/entities/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

let config_path = '.env'

if (process.env.NODE_ENV === 'production') {
  config_path = '.env.production'
} else if (process.env.NODE_ENV === 'development') {
  config_path = '.env.development'
}

config({
  path: config_path,
})

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [User, UserGroup, Group],
  migrations: ['dist/migration/**/*.js'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  timezone: 'Z',
}

export const dataSource: DataSource = new DataSource(options)
