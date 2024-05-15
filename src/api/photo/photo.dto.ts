export namespace PhotoRequestDto {}

export namespace PhotoResponseDto {
  export class Photo {
    constructor() {}
  }

  export class Photos {
    photos: Photo[]

    constructor(photos: Photo[]) {
      this.photos = photos
    }
  }
}
