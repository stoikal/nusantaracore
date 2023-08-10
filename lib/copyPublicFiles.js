import fs from 'fs/promises'
import path from 'path'
import { rimraf } from 'rimraf'
import config from '../config.js'

const { BUILD_DIR, PUBLIC_DIR } = config

async function copyRecursive (sourcePath, destinationPath) {
  try {
    await fs.mkdir(destinationPath, { recursive: true })
  } catch (err) {
    // Directory already exists, or an error occurred
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  const files = await fs.readdir(sourcePath)

  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file)
    const destinationFilePath = path.join(destinationPath, file)

    const stats = await fs.stat(sourceFilePath)
    const isDirectory = stats.isDirectory()

    if (isDirectory) {
      await copyRecursive(sourceFilePath, destinationFilePath)
    } else {
      await fs.copyFile(sourceFilePath, destinationFilePath)
    }
  }
}

export default async function copyPublicFiles () {
  await rimraf(BUILD_DIR)
  await fs.mkdir(BUILD_DIR)
  await copyRecursive(PUBLIC_DIR, BUILD_DIR)
}
