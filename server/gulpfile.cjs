const gulp = require('gulp');
const { series } = require('gulp');
const shell = require('gulp-shell');

gulp.task('migrate', series(
  shell.task(['pnpm migrate up']),
  shell.task(['pnpm migrate -d TEST_DATABASE_URL up']),
));

gulp.task('migrate:down', series(
  shell.task(['pnpm migrate down']),
  shell.task(['pnpm migrate -d TEST_DATABASE_URL down']),
));

gulp.task('migrate:redo', series(
  shell.task(['pnpm migrate redo']),
  shell.task(['pnpm migrate -d TEST_DATABASE_URL redo']),
));
