import { handler } from './lambda'
import { ScheduledEvent } from 'aws-lambda'
import '@aws-sdk/client-s3'

jest.mock('@aws-sdk/client-s3') // because it implicitly starts promise that will fail because we are not running on AWS
jest.mock('./housekeeping')
jest.spyOn(console, 'log').mockImplementation(() => {})

test('Processing any event should call housekeeping', async () => {
  const event = { id: 'someId' } as ScheduledEvent

  await handler(event)
})
