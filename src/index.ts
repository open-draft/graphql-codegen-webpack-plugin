import * as fs from 'fs'
import { invariant } from 'outvariant'
import { Compiler, WebpackPluginInstance } from 'webpack'
import { validate } from 'schema-utils'
import { Schema } from 'schema-utils/declarations/validate'
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli'

export interface PluginOptions {
  /**
   * Relative path to the GraphQL Code Generator configuration file.
   * @example { configPath: "graphql-codegen.yml" }
   */
  configPath: string
}

const optionsSchema: Schema = {
  properties: {
    configPath: {
      type: 'string',
    },
  },
  required: ['configPath'],
}

export class GraphQLCodegenWebpackPlugin implements WebpackPluginInstance {
  private name = 'GraphQLCodegenWebpackPlugin'
  private options: PluginOptions
  private codegenContext: CodegenContext

  constructor(options?: PluginOptions) {
    invariant(
      options && options.configPath,
      'Failed to create %s: the required "configPath" option was not provided.',
      this.name
    )

    validate(optionsSchema, options)

    invariant(
      fs.existsSync(options.configPath),
      'Failed to create %s: provided "configPath" option points to a non-existing file at "%s".',
      this.name,
      options.configPath
    )

    this.options = options
  }

  public async apply(compiler: Compiler) {
    const logger = compiler.getInfrastructureLogger(this.name)

    if (!this.codegenContext) {
      this.codegenContext = await loadContext(this.options.configPath)
    }

    const codegenConfig = this.codegenContext.getConfig()

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
