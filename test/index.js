const assert = require('assert')
const envConfig = require('../index')

describe('env-config', () => {
  it('loads config yamls', () => {
    process.env.NODE_ENV = 'development'
    process.env.CONFIG_ENV = 'production'

    assert.deepEqual(
      envConfig(`${__dirname}/sample`),
      {
        env: 'development',
        database: {
          adapter: 'postgresql',
          database: 'prod'
        },
        blog: {
          title: 'My Blog'
        }
      }
    )
  })
})
