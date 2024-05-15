import { Injectable } from '@nestjs/common'
import { load as ExifLoad, Tags } from 'exifreader'
import * as fs from 'fs'
import * as moment from 'moment-timezone'
import { Photo } from 'src/entities/photo.entity'
import { EntityManager } from 'typeorm'
import { CustomFile } from './photo.dto'

@Injectable()
export class PhotoService {
  constructor() {}

  async getExifData(
    files: Express.Multer.File[],
  ): Promise<Express.Multer.File[]> {
    return await Promise.all(
      files.map(async (file) => {
        const file_buffer = fs.readFileSync(file.path)
        const tags: Tags = await ExifLoad(file_buffer, {
          async: true,
        })
        file['latitude'] = tags['GPSLatitude']
          ? tags['GPSLatitude'].description
          : null
        file['longitude'] = tags['GPSLongitude']
          ? tags['GPSLongitude'].description
          : null

        if (tags['DateTimeOriginal'] && tags['OffsetTimeOriginal']) {
          const formattedDate = tags[
            'DateTimeOriginal'
          ].description.replace(
            /^(\d{4}):(\d{2}):(\d{2})/,
            '$1-$2-$3',
          )

          file['created_at'] = moment(formattedDate)
            .utcOffset(tags['OffsetTimeOriginal'].description)
            .toISOString()
        } else {
          file['created_at'] = null
        }
        return file
      }),
    )
  }

  async createPhotosData(
    queryRunner: EntityManager,
    folderId: string,
    file: CustomFile,
    url: string,
  ): Promise<Photo> {
    const photo: Photo = await queryRunner.save(Photo, {
      filename: file.originalname,
      url: url,
      latitude: file?.latitude || null,
      longitude: file?.longitude || null,
      created_at: file?.created_at || null,
      folder: { id: folderId },
    })
    return photo
  }
}
