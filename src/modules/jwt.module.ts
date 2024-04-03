import { validate as uuidValidate } from 'uuid'

export async function createToken(id: string): Promise<string> {
  if (!uuidValidate(id)) {
    throw new Error('Invalid UUID')
  }
  return await this.jwtService.sign({ id: id })
}
