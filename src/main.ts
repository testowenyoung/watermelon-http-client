import * as core from '@actions/core'
import {request, Method} from './http'
import {graphqlPayloadFor} from './graphql'

export async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    let method: string = core.getInput('method')
    let data: string = core.getInput('data')
    const graphql: string = core.getInput('graphql')

    if (graphql.length !== 0) {
      method = 'POST'
      data = graphqlPayloadFor(graphql)

      core.info(`graphql:\n${graphql}`)
    }

    core.info(`url: ${url}`)
    core.info(`method: ${method}`)
    if (data.length !== 0) {
      core.info(`data: ${data}`)
    }

    const [status, rawHeaders, rawResponse] = await request(
      url,
      <Method>method,
      data
    )

    const headers = JSON.stringify(rawHeaders)
    const response = JSON.stringify(rawResponse)

    if (status < 200 || status >= 300) {
      core.error(`response status: ${status}`)
      core.error(`response headers: ${headers}`)
      core.error(`response body:\n${response}`)

      throw new Error(`request failed: ${response}`)
    }

    core.info(`response status: ${status}`)
    core.info(`response headers: ${headers}`)
    core.info(`response body:\n${response}`)

    core.setOutput('status', `${status}`)
    core.setOutput('headers', `${headers}`)
    core.setOutput('response', `${response}`)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
