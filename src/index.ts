/**
 * @module @admin-bro/passwords
 * @classdesc
 * AdminBro feature allowing you to hash passwords in a a given resource.
 *
 * ## Installation
 *
 * To install the upload feature run:
 *
 * ```bash
 * yarn add @admin-bro/passwords
 * ```
 *
 * ## Usage
 *
 * As any feature you have to pass it to the resource in {@link AdminBroOptions#resources}
 * property:
 *
 * ```
 * const AdminBro = require('admin-bro')
 * const passwordFeature = require('@admin-bro/passwords')
 *
 * // part where you load adapter and models
 * const User = require('./user')
 *
 * const options = {
 *   resources: [{
 *     resource: User,
 *     features: [passwordFeature({
 *       properties: {
 *         encryptedPassword: 'encrypted' // to this db field feature will safe password
 *       },
 *     })]
 *   }]
 * }
 *
 * const adminBro = new AdminBro(options)
 * // and the rest of your app
 * ```
 */

import passwordsFeature from './passwords.feature'

export default passwordsFeature
