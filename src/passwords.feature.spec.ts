import { expect } from 'chai'
import { ActionRequest, Before, ActionContext, After, ActionResponse } from 'admin-bro'
import passwordsFeature, { PasswordsOptions } from './passwords.feature'

describe('passwordsFeature', () => {
  let properties: NonNullable<PasswordsOptions['properties']>
  let request: ActionRequest
  let context: ActionContext
  let response: ActionResponse

  beforeEach(() => {
    properties = {
      password: 'visiblePassword',
      encryptedPassword: 'storedPassword',
    }
    request = {
      method: 'post',
      payload: {},
    } as ActionRequest

    response = {
      record: {
        name: 'some Name',
        surname: 'some Surname',
      },
    } as ActionResponse

    context = {} as ActionContext
  })

  it('returns password feature', async () => {
    expect(typeof passwordsFeature()).to.have.eq('function')
  })

  describe('edit#before hook - #encryptPassword', () => {
    let encryptPassword: Before

    const getBeforeHook = (options: PasswordsOptions): Before => {
      const feature = passwordsFeature(options)({})
      return feature.actions?.edit?.before?.[0] as Before
    }

    beforeEach(() => {
      encryptPassword = getBeforeHook({ properties })
    })

    it('does nothing when method is get', async () => {
      request.method = 'get'

      const ret = await encryptPassword(request, context)

      expect(ret).to.deep.eq(request)
    })

    it('des nothing when request doesn\'t have password in the payload', async () => {
      request.payload = {
        [properties.encryptedPassword as string]: 'someExistingPassword',
      }

      const ret = await encryptPassword(request, context)

      expect(ret).to.deep.eq(request)
    })

    it('encrypts the password when it is given and removes the original one', async () => {
      const oldEncrypted = 'someExistingPassword'
      request.payload = {
        [properties.encryptedPassword as string]: oldEncrypted,
        [properties.password as string]: 'some-new-password',
      }

      const ret = await encryptPassword(request, context)

      expect(ret.payload?.[properties.encryptedPassword]).not.to.eq(oldEncrypted)
      expect(ret.payload?.[properties.encryptedPassword]).not.to.be.undefined
      expect(ret.payload?.[properties.password as string]).to.be.undefined
    })
  })

  describe.only('edit#after hook #movePasswordErrors', () => {
    let movePasswordErrors: After<ActionResponse>

    const getAfterHook = (options: PasswordsOptions): After<ActionResponse> => {
      const feature = passwordsFeature(options)({})
      return feature.actions?.edit?.after?.[0] as After<ActionResponse>
    }

    beforeEach(() => {
      movePasswordErrors = getAfterHook({ properties })
    })

    it('does nothing when payload doesn\'t have errors', async () => {
      const ret = await movePasswordErrors(response, request, context)

      expect(ret).to.deep.eq(response)
    })

    it('moves errors from encryptedPassword to password', async () => {
      const errorMessage = 'password is too short'
      response.record.errors = {
        [properties.encryptedPassword]: errorMessage,
      }

      const ret = await movePasswordErrors(response, request, context)

      expect(ret.record.errors[properties.password as string]).to.deep.eq(errorMessage)
    })
  })
})
