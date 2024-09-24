const gulp = require('gulp');
const { series } = require('gulp');
const shell = require('gulp-shell');

require('dotenv').config();

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));

gulp.task('migrate', (function migrate() {
  const tasks = [shell.task(['pnpm migrate up'])];

  if (process.env.NODE_ENV === 'development') {
    tasks.push(shell.task(['pnpm migrate -d TEST_DATABASE_URL up']));
  }

  return series(...tasks);
}()));

gulp.task('migrate:down', (function migrateDown() {
  const tasks = [shell.task([`pnpm migrate down ${argv.iter !== undefined ? argv.iter : ''}`])];

  if (process.env.NODE_ENV === 'development') {
    tasks.push(shell.task([`pnpm migrate -d TEST_DATABASE_URL down ${argv.iter !== undefined ? argv.iter : ''}`]));
  }

  return series(...tasks);
}()));

gulp.task('migrate:redo', (function migrateRedo() {
  const tasks = [shell.task(['pnpm migrate redo'])];

  if (process.env.NODE_ENV === 'development') {
    tasks.push(shell.task(['pnpm migrate -d TEST_DATABASE_URL redo']));
  }

  return series(...tasks);
}()));
