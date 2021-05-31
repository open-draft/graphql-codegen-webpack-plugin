import * as fs from 'fs'
import * as path from 'path'
import { Compilation, Compiler, WebpackPluginInstance } from 'webpack'
import { generate, loadContext } from '@graphql-codegen/cli'

export interface PluginOptions {
  configPath: string
}

export class GraphQLCodegenWebpackPlugin implements WebpackPluginInstance {
  private name = 'GraphQLCodegenWebpackPlugin'
  private options: PluginOptions

  constructor(options?: PluginOptions) {
    this.options = options
  }

  public async apply(compiler: Compiler) {
    const codegenContext = await loadContext(this.options.configPath)

    compiler.hooks.beforeCompile.tapPromise(this.name, async (compilation) => {
      const files = await generate(codegenContext).catch((error) => {
        console.error('Failed to generate GraphQL types!', error)
      })

      console.log(files)
    })
  }

  private async addAsset(filePath: string, compilation: Compilation) {
    const logger = compilation.getLogger(this.name)
    const absoluteFilePath = path.resolve(
      compilation.compiler.context,
      filePath
    )

    const [fileStats, fileContent] = await Promise.all([
      fs.promises.stat(filePath),
      fs.promises.readFile(filePath),
    ])

    const fileName = path.basename(filePath)
    // compilation.assets[fileName] = {
    //   source: () => fileContent,
    //   size: () => fileStats.size,
    // }

    return fileName
  }
}
