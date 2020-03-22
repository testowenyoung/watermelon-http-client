import * as core from '@actions/core'
import {run} from '../src/main'

jest.setTimeout(600000)

describe('when called with a GET query', () => {
  beforeEach(() => {
    process.env['INPUT_URL'] = 'https://jsonplaceholder.typicode.com/todos?id=1'
    process.env['INPUT_METHOD'] = 'get'
  })

  afterEach(() => {
    delete process.env['INPUT_URL']
    delete process.env['INPUT_METHOD']
  })

  it('should output a valid result', async () => {
    const fakeSetOutput = jest.spyOn(core, 'setOutput')

    await run()

    expect(fakeSetOutput).toBeCalledWith('status', expect.anything())
    expect(fakeSetOutput).toBeCalledWith('response', expect.anything())
  })
})

describe('when called with a POST request', () => {
  beforeEach(() => {
    process.env['INPUT_URL'] = 'https://jsonplaceholder.typicode.com/todos?id=1'
    process.env['INPUT_METHOD'] = 'post'
    process.env['INPUT_DATA'] =
      '{ "title": "dummy-todo", "userId": 1, "completed": false }'
  })

  afterEach(() => {
    delete process.env['INPUT_URL']
    delete process.env['INPUT_METHOD']
    delete process.env['INPUT_DATA']
  })

  it('should output a valid result', async () => {
    const fakeSetOutput = jest.spyOn(core, 'setOutput')

    await run()

    expect(fakeSetOutput).toBeCalledWith('status', expect.anything())
    expect(fakeSetOutput).toBeCalledWith('response', expect.anything())
  })
})

describe('when called with a GraphQL query', () => {
  beforeEach(() => {
    process.env['INPUT_URL'] = 'https://countries.trevorblades.com/'
    process.env['INPUT_GRAPHQL'] = `
      {
        country(code: "CO") {
          name
          emoji
         }
      }`
  })

  afterEach(() => {
    delete process.env['INPUT_URL']
    delete process.env['INPUT_GRAPHQL']
  })

  it('should output something if a query was supplied', async () => {
    const fakeSetOutput = jest.spyOn(core, 'setOutput')

    await run()

    expect(fakeSetOutput).toBeCalledWith('status', expect.anything())
    expect(fakeSetOutput).toBeCalledWith('response', expect.anything())
  })
})
