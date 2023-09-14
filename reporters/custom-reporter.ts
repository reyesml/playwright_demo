import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  constructor(options: { customOption?: string } = {}) {
    console.log(`initializing CustomReporter. Options: ${options.customOption}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    log(`Starting test ${test.title} ${test}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    log(`Finished the run: ${result.status}`);
  }
}

function log(msg: string) : void {
  console.log(`${timestamp()} | ${msg}`)
}

function timestamp() : string {
  return (new Date()).toISOString();
}

export default CustomReporter;