# WeRefer teaser page

- [Node.js](https://nodejs.org/en/) 16.13.2 or later
- [Modernizr](https://modernizr.com/) - detect browsers' .webp availability
- [Bootstrap 5](https://getbootstrap.com/) - import a part of Bootstrap's Sass files into the custom .scss
- [gulp](https://gulpjs.com/) - task runner
- [GitHub Pages](https://pages.github.com/)

## gulp tasks
- Compile [Sass](https://sass-lang.com/) to CSS
- Parse CSS and add vendor prefixes using [PostCSS](https://postcss.org/)
- Minify CSS file
- Watch files and performs the live reload to the page in all browsers
- Optimize images (.jpg, .jpeg, .png, .gif)
- Duplicate images (.svg, .webp)
- Generate HTML from [EJS](https://ejs.co/) templates

## Local development

Run `npm run dev` to start gulp tasks and the development server on http://localhost:3000

## Deploying to GitHub Pages

1. Push files to the `main` branch
2. Automatically run `npm run build` to deploy pages using [GitHub actions](https://docs.github.com/en/actions)

## Language switch

Using JavaScript:

1. Save user's language preference in a browser Cookie when users click a language switch button

2. Detect browser language preference and redirect automatically, if a browser doesn't have a language preference Cookie
