import { Stack, StackProps, Construct, Duration } from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { RetentionDays } from '@aws-cdk/aws-logs'
import FunctionList from '../../functions'
export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // const isTest = process.env.NODE_ENV === 'test'

    FunctionList.functions.forEach(({ name, description}) => {
      new Function(this, name, {
        functionName: name,
        description: description,
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: Code.fromAsset(`../dist/${name}.zip`),
        memorySize: 256,
        timeout: Duration.minutes(5),
        logRetention: RetentionDays.ONE_WEEK, // this will trigger the creation of a custom lambda used by CDK which looks strange too me
        environment: {
          NODE_OPTIONS: '--enable-source-maps',
        },
      })
    })
    
  }
}
