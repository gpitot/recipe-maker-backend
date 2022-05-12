import { ScheduledEvent } from 'aws-lambda'

export async function handler(_: ScheduledEvent) {
  Promise.resolve({
    status : 200,
    body : JSON.stringify({
      success: "Guillaume"
    })
  })
}
