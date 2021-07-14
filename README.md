# GraphQLCodegenWebpackPlugin

A webpack plugin for [GraphQL Code Generator](https://www.graphql-code-generator.com/).

## How is this plugin different?

- No abstraction over GraphQL Code Generator—you have full control over the technology without an extra API layer to maintain.
- Executes `graphql-codegen` internally in the right stages of a webpack build. This keeps your generated definitions up-to-date while developing, as you don't have to run an extra command to generate them anymore.
- Utilizes GraphQL Code Generator's Node.js API instead of relying on child processes.

## Getting started

### Install

```sh
npm install graphql-codegen-webpack-plugin --save-dev
# or
yarn add graphql-codegen-webpack-plugin --dev
```

### Configure GraphQL Code Generator

Create a configuration file for GraphQL Code Generator:

```yml
# graphql-codegen.yml
schema: 'path/to/schema/**/*.gql'
documents: 'path/to/documents/**/*.tsx'
generates:
  schema.ts:
    plugins:
      - typescript
```

> Learn more about how to [configure GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started/codegen-config).

### Configure webpack

Finally, add the `GraphQLCodegenWebpackPlugin` plugin to your webpack configuration:

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

## Honorable mentions

- [`graphql-let`](https://github.com/piglovesyou/graphql-let)
