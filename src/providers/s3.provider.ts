import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import * as fs from 'fs'
import { getS3FileKey } from 'src/utils/file.util'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Provider {
  private s3: AWS.S3

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>(
        'AWS_ACCESS_KEY_ID',
      ),
      secretAccessKey: this.configService.get<string>(
        'AWS_SECRET_ACCESS_KEY',
      ),
      region: this.configService.get<string>('AWS_REGION'),
    })

    this.s3 = new AWS.S3()
  }

  async uploadPhotoFile(
    folderId: string,
    filePath: string,
    fileExtension: string,
    filename: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const fileKey = getS3FileKey('photos', folderId, filename)
    const fileContent = fs.readFileSync(filePath)
    const params = {
      Bucket: 'public-gary-pinmap',
      Key: fileKey,
      Body: fileContent,
      ContentType: fileExtension,
    }

    return await this.s3.upload(params).promise()
  }
}
