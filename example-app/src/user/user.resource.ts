import passwordsFeature from '@admin-bro/passwords'
import { ResourceWithOptions } from 'admin-bro'
import argon2 from 'argon2'
import { User } from './user.entity'

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {

    },
  },
  features: [passwordsFeature({
    properties: { encryptedPassword: 'hashedPassword' },
    hash: argon2.hash,
  })],
}

export default UserResource
