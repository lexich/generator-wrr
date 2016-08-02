"use strict";
/* eslint import/no-extraneous-dependencies: 0 */

const path = require("path");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const excludeGitignore = require("gulp-exclude-gitignore");
const mocha = require("gulp-mocha");
const nsp = require("gulp-nsp");
const plumber = require("gulp-plumber");

gulp.task("static",
  ()=> gulp.src("**/*.js")
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task("nsp",
  (cb)=> nsp({ package: path.resolve("package.json") }, cb));

gulp.task("test", (cb)=> {
  let mochaErr;

  gulp.src("test/**/*.js")
    .pipe(plumber())
    .pipe(mocha({ reporter: "spec" }))
    .on("error", (err)=> (mochaErr = err))
    .on("end", ()=> cb(mochaErr));
});


gulp.task("prepublish", ["nsp"]);
gulp.task("default", ["static", "test"]);
