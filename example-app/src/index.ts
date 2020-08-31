/* eslint-disable import/first */
import path from 'path'
import { config } from 'dotenv'

config({ path: path.join(__dirname, '../../.env') })

import express from 'express'
import AdminBro from 'admin-bro'
import { buildRouter } from '@admin-bro/express'
import { Database, Resource } from '@admin-bro/typeorm'
import { createConnection } from 'typeorm'

import UserResource from './user/user.resource'

const PORT = 3000

AdminBro.registerAdapter({ Resource, Database })

const run = async () => {
  await createConnection()
  const app = express()
  const admin = new AdminBro({
    resources: [UserResource],
  })

  admin.watch()

  const router = buildRouter(admin)

  app.use(admin.options.rootPath, router)

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
}

run()
