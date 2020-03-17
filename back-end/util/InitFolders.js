import execa from 'execa';
import fs from 'fs';
import Path from 'path';
import logger from '../server/api/logger';

let path = Path.join('');

export async function InitFolder() {
  try {
    let path_root = path.resolve(__dirname, '../../../uploads');
    if (!fs.existsSync(path_root)) {
      execa.commandSync(`mkdir -p ${path_root}`);
    }
  } catch (err) {
    console.log('error : ', err);
    throw new Error(`Init folder error.`)
  }
}
