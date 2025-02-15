import { H3Event } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as bcrypt from 'bcrypt'


export default defineEventHandler(async (event: H3Event) => {
  // 1. Читаем тело запроса
  const { username, email, password } = await readBody(event)

  // 2. Проверяем обязательные поля
  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Все поля обязательны'
    })
  }

  // 3. Папка Users для хранения JSON-файлов
  const usersDir = join(process.cwd(), 'Users')
  // Создадим папку, если её нет
  await fs.mkdir(usersDir, { recursive: true })

  // 4. Читаем все JSON-файлы в папке Users, ищем пользователя
  const files = await fs.readdir(usersDir)
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = join(usersDir, file)
      const userData = JSON.parse(await fs.readFile(filePath, 'utf-8'))
      // Проверяем email и username
      if (userData.email === email || userData.username === username) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Пользователь с таким email или именем уже существует'
        })
      }
    }
  }

  // 5. Хэшируем пароль
  const hashedPassword = await bcrypt.hash(password, 10)

  // 6. Формируем данные пользователя
  const newUser = {
    id: Date.now(),       // Просто пример, можно сгенерировать UUID
    username,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }

  // 7. Записываем данные в JSON-файл: username-{timestamp}.json
  const fileName = `${username}-${Date.now()}.json`
  const filePath = join(usersDir, fileName)
  await fs.writeFile(filePath, JSON.stringify(newUser, null, 2), 'utf-8')

  // 8. Возвращаем результат
  return { message: 'Пользователь зарегистрирован!', user: { ...newUser, password: 'HIDDEN' } }
})
