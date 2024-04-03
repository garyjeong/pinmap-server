import * as bcrypt from 'bcrypt'

export async function hashedPassword(
  password: string,
): Promise<string> {
  const saltOrRounds = 20
  return await bcrypt.hash(password, saltOrRounds)
}
