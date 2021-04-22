const { readdirSync } = require('fs')

exports.Directories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);