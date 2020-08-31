import passwordsFeature from '@admin-bro/passwords'
import { ResourceWithOptions } from 'admin-bro'
import { User } from './user.entity'

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {

    },
  },
  features: [passwordsFeature({
    properties: { encryptedPassword: 'hashedPassword' },
  })],
}

export default UserResource
