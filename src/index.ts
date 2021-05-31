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
    const logger = compiler.getInfrastructureLogger(this.name)
    const codegenContext = await loadContext(this.options.configPath)
    const codegenConfig = codegenContext.getConfig()

    compiler.hooks.beforeCompile.tapPromise(this.name, async () => {
      await generate({
        ...codegenConfig,
        errorsOnly: true,
      }).catch((error) => {
        logger.error('failed to generate GraphQL types')
        console.error(error)
      })
    })
  }
}
