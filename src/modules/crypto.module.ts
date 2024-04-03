import { hash, compare } from 'bcrypt'

export async function setHashedPassword(
  password: string,
  salt: number,
): Promise<string> {
  return await hash(password, salt)
}

export async function compareSyncPassword(
  password: string,
  input_password: string,
): Promise<boolean> {
  return (await compare(input_password, password)) ? true : false
}
