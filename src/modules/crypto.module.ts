import { hashSync, compareSync } from 'bcrypt'

export async function setHashedPassword(
  password: string,
  salt: number,
): Promise<string> {
  return hashSync(password, salt)
}

export async function compareSyncPassword(
  password: string,
  input_password: string,
): Promise<boolean> {
  return compareSync(password, input_password) ? true : false
}
