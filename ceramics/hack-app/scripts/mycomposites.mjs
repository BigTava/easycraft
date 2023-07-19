import ora from 'ora'

import { writeComposite } from './composites.mjs';

const spinner = ora();

try {
    spinner.info("[Composites] bootstrapping composites");
    await writeComposite(spinner)
    spinner.succeed("Composites] composites bootstrapped");
  } catch (err) {
    spinner.fail(err.message)
    ceramic.kill()
    throw err
  }
