import { Injectable } from '@nestjs/common'
import { load as ExifLoad, Tags } from 'exifreader'
import * as fs from 'fs'
import * as moment from 'moment-timezone'

@Injectable()
export class PhotoService {
  constructor() {}

  async getExifData(
    files: Express.Multer.File[],
  ): Promise<Express.Multer.File[]> {
    const promises = files.map(async (file) => {
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
        ].description.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')

        file['created_at'] = moment(formattedDate)
          .utcOffset(tags['OffsetTimeOriginal'].description)
          .toISOString()
      } else {
        file['created_at'] = null
      }
      return file
    })
    return await Promise.all(promises)
  }
}
