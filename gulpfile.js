let preprocessor = "sass";

import pkg from "gulp";
const { src, dest, parallel, series, watch } = pkg;

import browserSync from "browser-sync";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import sassglob from "gulp-sass-glob";
const sass = gulpSass(dartSass);
import postCss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import imagemin from "gulp-imagemin";
import changed from "gulp-changed";
import concat from "gulp-concat";
import ejs from "gulp-ejs";
import rename from "gulp-rename";

import { readFile } from "fs/promises";
const memberDataEnJson = JSON.parse(
  await readFile(new URL("./src/ejs/member-data-en.json", import.meta.url))
);
const memberDataJaJson = JSON.parse(
  await readFile(new URL("./src/ejs/member-data-ja.json", import.meta.url))
);
const valDataJson = JSON.parse(
  await readFile(new URL("./src/ejs/val-data.json", import.meta.url))
);

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./docs",
    },
    // open: "external",
    // host: "192.168.0.24",
  });
}

function styles() {
  return src([`./src/${preprocessor}/*.*`, `!./src/${preprocessor}/_*.*`])
    .pipe(eval(`${preprocessor}glob`)())
    .pipe(eval(preprocessor)({ "include css": true }))
    .pipe(
      postCss([
        autoprefixer({ grid: "true" }),
        cssnano({
          preset: ["default", { discardComments: { removeAll: true } }],
        }),
      ])
    )
    .pipe(concat("style.min.css"))
    .pipe(dest("./docs/css"))
    .pipe(browserSync.stream());
}

function images() {
  return src(["./src/images/**/*.+(jpg|jpeg|png|gif)"])
    .pipe(changed("./docs/images"))
    .pipe(imagemin())
    .pipe(dest("./docs/images"))
    .pipe(browserSync.stream());
}

function duplicate() {
  return src(
    [
      "./src/images/**/*.+(svg|webp)",
      "./src/js/**/*",
      "./src/robots.txt",
      "./src/images/favicon/browserconfig.xml",
      "./src/images/favicon/favicon.ico",
      "./src/images/favicon/site.webmanifest",
    ],
    {
      base: "src/",
      allowEmpty: true,
    }
  )
    .pipe(dest("./docs"))
    .pipe(browserSync.stream());
}

function buildhtml() {
  return src(["./src/ejs/**/*.ejs", "!" + "./src/ejs/**/_*.ejs"])
    .pipe(
      ejs(
        {
          memberDataEnJson: memberDataEnJson,
          memberDataJaJson: memberDataJaJson,
          valDataJson: valDataJson,
        },
        {},
        { ext: ".html" }
      )
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(dest("./docs"))
    .pipe(browserSync.stream());
}

function startwatch() {
  watch(`./src/${preprocessor}/**/*`, { usePolling: true }, styles);
  watch("./src/images/**/*", { usePolling: true }, images);
  watch("./src/ejs/**/*", { usePolling: true }, buildhtml);
  watch("./docs/**/*", { usePolling: true }).on("change", browserSync.reload);
}

export let dev = series(
  styles,
  images,
  duplicate,
  buildhtml,
  parallel(browsersync, startwatch)
);
export default series(styles, images, duplicate, buildhtml);
