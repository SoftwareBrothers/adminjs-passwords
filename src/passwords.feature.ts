import AdminBro, { buildFeature, Before, ActionResponse, After } from 'admin-bro'
import * as argon2 from 'argon2'

export type PasswordsOptions = {
  /**
   * Names of the properties used by the feature
   */
  properties?: {
    /**
     * Virtual property which will be seen by end user. Its value is not stored in the database.
     * Default to `password`
     */
    password?: string,
    /**
     * Property where encrypted password will be stored. Default to `encryptedPassword`
     */
    encryptedPassword: string,
  }
}

export type Custom = {
  [T in keyof NonNullable<PasswordsOptions['properties']>]: NonNullable<T>
}

const editComponent = AdminBro.bundle('../src/components/edit')

const passwordsFeature = (options?: PasswordsOptions) => {
  const passwordProperty = options?.properties?.password || 'password'
  const encryptedPasswordProperty = options?.properties?.encryptedPassword || 'encryptedPassword'

  const encryptPassword: Before = async (request) => {
    const { method } = request
    const { [passwordProperty]: newPassword, ...rest } = request.payload || {}

    if (method === 'post' && newPassword) {
      return {
        ...request,
        payload: {
          ...rest,
          [encryptedPasswordProperty]: await argon2.hash(newPassword),
        },
      }
    }
    return request
  }

  const movePasswordErrors: After<ActionResponse> = async (response) => {
    if (response.record
      && response.record.errors
      && response.record.errors[encryptedPasswordProperty]) {
      response.record.errors[passwordProperty] = response.record.errors[encryptedPasswordProperty]
    }
    return response
  }

  return buildFeature({
    properties: {
      [passwordProperty]: {
        custom: {
          password: passwordProperty,
          encryptedPassword: encryptedPasswordProperty,
        } as Custom,
        isVisible: { filter: false, show: false, edit: true, list: false },
        components: {
          edit: editComponent,
        },
      },
    },
    actions: {
      edit: {
        before: [encryptPassword],
        after: [movePasswordErrors],
      },
      new: {
        before: [encryptPassword],
        after: [movePasswordErrors],
      },
    },
  })
}

export default passwordsFeature
