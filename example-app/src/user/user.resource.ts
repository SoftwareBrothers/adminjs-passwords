import uploadFeature from '@admin-bro/upload'
import { User } from './user.entity'
import { ResourceWithOptions } from 'admin-bro'

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    listProperties: ['id', 'avatar', 'email', 'test'],
  },
  features: [],
}

export default UserResource
