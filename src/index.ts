import { Compiler, WebpackPluginInstance } from 'webpack'
import { generate, loadContext } from '@graphql-codegen/cli'

export interface PluginOptions {
  configPath: string
}

export class GraphQLCodegenWebpackPlugin implements WebpackPluginInstance {
  private name = 'GraphQLCodegenWebpackPlugin'
  private options: PluginOptions
  private isCodegenEnabled: boolean

  constructor(options?: PluginOptions) {
    this.isCodegenEnabled = false
    this.options = options
  }

  public async apply(compiler: Compiler) {
    const logger = compiler.getInfrastructureLogger(this.name)
    const codegenContext = await loadContext(this.options.configPath)
    const codegenConfig = codegenContext.getConfig()

    if (this.isCodegenEnabled) {
      return
    }

    compiler.hooks.beforeCompile.tapPromise(this.name, async () => {
      await generate({
        ...codegenConfig,
        errorsOnly: true,
        watch: compiler.watchMode,
      })
        .then(() => {
          this.isCodegenEnabled = true
          logger.info('successfully generated GraphQL types')
        })
        .catch((error) => {
          logger.error('failed to generate GraphQL types')
          throw error
        })
    })
  }
}
