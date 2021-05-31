import { Compiler, WebpackPluginInstance } from 'webpack'
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

    compiler.hooks.beforeCompile.tapPromise(this.name, async () => {
      await generate(codegenContext).catch((error) => {
        console.error('Failed to generate GraphQL types!', error)
      })
    })
  }
}
