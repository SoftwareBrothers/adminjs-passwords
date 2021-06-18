/* eslint-disable import/first */
import path from 'path'
import { config } from 'dotenv'

config({ path: path.join(__dirname, '../../.env') })

import express from 'express'
import AdminJS from 'adminjs'
import { buildRouter } from '@adminjs/express'
import { Database, Resource } from '@adminjs/typeorm'
import { createConnection } from 'typeorm'

import UserResource from './user/user.resource'

const PORT = 3000

AdminJS.registerAdapter({ Resource, Database })

const run = async () => {
  await createConnection()
  const app = express()
  const admin = new AdminJS({
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
