# WeRefer teaser page

- Node.js 16.13.2 or later
- Modernizr - detect browsers' .webp availability
- Bootstrap 5 - import a part of Bootstrap's Sass files into the custom .scss
- gulp - task runner

## gulp tasks
- Compile Sass to CSS
- Parse CSS and add vendor prefixes using PostCSS
- Minify CSS file
- Watch files and performs the live reload to the page in all browsers
- Optimize images (.jpg, .jpeg, .png, .gif)
- Duplicate images (.svg, .webp)
- Generate HTML from EJS as a template

## Local development

Run `npm run dev` to run gulp tasks and start the development server on http://localhost:3000

## Deploying to GitHub Pages

1. Push files to the main branch
2. Automatically run `npm run build` to deploy pages using GitHub actions

## Language switch

Using JavaScript:

1. Saves users' language preference in a browser Cookie when users click a language switch button

2. Detects browser language preference and redirects automatically, if a browser doesn't have a language preference Cookie
