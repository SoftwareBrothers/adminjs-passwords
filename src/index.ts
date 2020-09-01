/**
 * @module @admin-bro/passwords
 * @classdesc
 * AdminBro feature allowing you to hash passwords in a a given resource.
 *
 * ## Installation
 *
 * To install the passwords feature run:
 *
 * ```bash
 * yarn add @admin-bro/passwords
 * ```
 *
 * And install password hashing library if you don't have it yet.
 * I suggest using [argon2](https://www.npmjs.com/package/argon2) or
 * [Bcrypt](https://www.npmjs.com/package/bcrypt)..
 *
 * ```
 * yarn add argon2
 * ```
 *
 * You can also implement your own hashing function.
 *
 * ## Usage
 *
 * As any feature, you have to pass it to the resource in {@link AdminBroOptions#resources}.
 *
 * In the example below we will use `argon2` as a hashing function.
 * We will also use `encrypted` property from the `User` model, where we will store the
 * hashed password.
 *
 * Furthermore, we will hide the encrypted field in the UI. We will do this by the help of the
 * standard {@link PropertyOptions#isVisible}
 *
 * Feature creates virtual `password` property. You can change that in {@link PasswordsOptions}.
 *
 * ```
 * const AdminBro = require('admin-bro')
 * const passwordFeature = require('@admin-bro/passwords')
 * const argon2 = require('argon2')
 *
 * // part where you load adapter and models
 * const User = require('./user')
 *
 * const options = {
 *   resources: [{
 *     resource: User,
 *     options: {
 *       properties: { encrypted: { isVisible: false } },
 *     },
 *     features: [passwordFeature({
 *       // PasswordsOptions
 *       properties: {
 *         // to this field will save the hashed password
 *         encryptedPassword: 'encrypted'
 *       },
 *       hash: argon2.hash,
 *     })]
 *   }]
 * }
 *
 * const adminBro = new AdminBro(options)
 * // and the rest of your app
 * ```
 *
 * ## Options
 *
 * For the lits of available options take see at {@link PasswordsOptions}.
 */

import passwordsFeature from './passwords.feature'

export default passwordsFeature
