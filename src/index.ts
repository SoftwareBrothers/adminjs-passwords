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
 * Additionally you will have to install password hashing library.
 * In the example you can use argon2:
 *
 * ```
 * yarn add argon2
 * ```
 *
 * ## Usage
 *
 * As any feature you have to pass it to the resource in {@link AdminBroOptions#resources}.
 *
 * In the example below we use argon2 as a hashing function.
 * We will also use `encrypted` property from the User where we will store the
 * hashed password.
 *
 * Furthermore, we will hide the encrypted field in the UI. We will do this in the
 * regular {@link ResourceOptions}.
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
 *       properties: {
 *         encryptedPassword: 'encrypted' // to this db field feature will safe password
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
 */

import passwordsFeature from './passwords.feature'

export default passwordsFeature
