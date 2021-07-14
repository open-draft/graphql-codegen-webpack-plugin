import { GraphQLCodegenWebpackPlugin } from '../src'

it('throws an error when the "configPath" option is not provided', () => {
  const errorMessage =
    'Failed to create GraphQLCodegenWebpackPlugin: the required "configPath" option was not provided.'
  expect(() => new GraphQLCodegenWebpackPlugin()).toThrow(errorMessage)
  expect(() => new GraphQLCodegenWebpackPlugin({} as any)).toThrow(errorMessage)
})

it('throws an error when the "configPath" is not a string', () => {
  expect(
    () =>
      new GraphQLCodegenWebpackPlugin({
        configPath: 2 as any,
      })
  ).toThrow(/configuration\.configPath should be a string/)
})

it('throws an error when the "configPath" option points to a non-existing file', () => {
  expect(
    () =>
      new GraphQLCodegenWebpackPlugin({
        configPath: './non-existing.yml',
      })
  ).toThrow(
    'Failed to create GraphQLCodegenWebpackPlugin: provided "configPath" option points to a non-existing file at "./non-existing.yml".'
  )
})
