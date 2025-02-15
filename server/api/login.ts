import { H3Event } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as bcrypt from 'bcrypt'

export default defineEventHandler(async (event: H3Event) => {
  // 1. Читаем тело запроса
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email и пароль обязательны'
    })
  }

  // 2. Папка с пользователями
  const usersDir = join(process.cwd(), 'Users')
  try {
    await fs.access(usersDir) // Проверяем, существует ли папка
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Нет зарегистрированных пользователей'
    })
  }

  // 3. Ищем пользователя по email
  const files = await fs.readdir(usersDir)
  let foundUser = null

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = join(usersDir, file)
      const userData = JSON.parse(await fs.readFile(filePath, 'utf-8'))
      if (userData.email === email) {
        foundUser = userData
        break
      }
    }
  }

  // 4. Если пользователь не найден
  if (!foundUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Неправильный email или пароль'
    })
  }

  // 5. Проверяем пароль (bcrypt.compare)
  const passwordMatch = await bcrypt.compare(password, foundUser.password)
  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Неправильный email или пароль'
    })
  }

  // 6. Возвращаем успешный ответ (без пароля)
  return {
    message: 'Успешный вход!',
    user: {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt
    }
  }
})
