# GraphQL Code Generator webpack plugin

A webpack plugin for [GraphQL Code Generator](https://www.graphql-code-generator.com/).

## Getting started

```sh
npm install graphql-codegen-webpack-plugin
# or
yarn add graphql-codegen-webpack-plugin
```

Create a configuration file for GraphQL Code Generator:

```yml
# codegen.yml
schema: 'path/to/schema/**/*.gql'
documents: 'path/to/documents/**/*.tsx'
generates:
  schema.ts:
    plugins:
      - typescript
```

> Refer to the [Config Reference](https://www.graphql-code-generator.com/docs/getting-started/codegen-config) when writing the configuration.

Finally, add the plugin to your webpack configuration:

```js
// webpack.config.js
const {
  GraphQLCodegenWebpackPlugin,
} = require('graphql-codegen-webpack-plugin')

module.exports = {
  plugins: [
    new GraphQLCodegenWebpackPlugin({
      configPath: './graphql-codegen.yml',
    }),
  ],
}
```
