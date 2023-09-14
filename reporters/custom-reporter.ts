import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';
import * as fs from 'fs';

class CustomReporter implements Reporter {

  private logs = "";

  constructor(options: { customOption?: string } = {}) {
    console.log(`initializing CustomReporter. Options: ${options.customOption}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    this.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    this.log(`Finished the run: ${result.status}`);
    this.persistLogs();
  }

  private log(msg: string) : void {
    let line=`${timestamp()} | ${msg}`
    console.log(line)
    this.logs+=`${line}\n`
  }

  private persistLogs() : void {
    fs.writeFileSync('./playwright-report/report.txt', this.logs);
  }
}

function timestamp() : string {
  return (new Date()).toISOString();
}

export default CustomReporter;