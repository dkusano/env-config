const path = require('path')
const glob = require('glob')
const fs = require('fs')
const yaml = require('js-yaml')

function load (dir) {
  const env = process.env.NODE_ENV || 'development'

  const configEnvs = [env]
  if (process.env.CONFIG_ENV && process.env.CONFIG_ENV !== env) {
    configEnvs.unshift(process.env.CONFIG_ENV)
  }

  const config = { env }

  glob.sync(path.join(dir, '*.yml')).forEach(file => {
    const data = yaml.safeLoad(fs.readFileSync(file))
    const env = configEnvs.find(env => env in data)
    if (!env) return
    const name = path.basename(file, '.yml')
    config[name] = data[env]
  })

  return config
}

module.exports = load
