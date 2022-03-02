import fs from 'fs'

console.log('Copy / Past configuration ....')

if (fs.existsSync('.env')) {
  console.log('Done')

  process.exit(0)
}

fs.copyFileSync('.env.dist', '.env')

console.log('done')
process.exit(0)
