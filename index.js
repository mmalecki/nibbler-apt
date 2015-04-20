var exec = require('nibbler-exec')

module.exports = function(descriptor, options, cb) {
  var packages = (Array.isArray(descriptor.pkg) ? descriptor.pkg.join(' ') : descriptor.pkg)
  if (!packages || !packages.trim()) throw new Error('`packages` is required');

  var cmds = []

  if (descriptor.updateCache) cmds.push('apt-get update -y')

  if (descriptor.state === 'present') {
    cmds.push('apt-get install -y ' + packages)
  }
  else if (options.state === 'absent') {
    cmds.push('apt-get remove -y ' + packages)
  }
  else throw new Error('Invalid `state`: ' + descriptor.state)

  return exec(cmds.join(' && '), options, cb)
}
