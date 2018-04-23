const assert = require('assert')
const envConfig = require('../index')

describe('env-config', () => {
  it('loads config yamls', () => {
    process.env.NODE_ENV = 'production'
    process.env.CONFIG_ENV = 'development'

    assert.deepEqual(
      envConfig(`${__dirname}/sample`),
      {
        env: 'production',
        database: {
          adapter: 'postgresql',
          database: 'dev'
        },
        blog: {
          title: 'My Blog'
        }
      }
    )
  })
})
