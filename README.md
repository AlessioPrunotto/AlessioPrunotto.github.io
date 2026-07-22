# AlessioPrunotto.github.io

Personal academic website for Alessio Prunotto, focused on computational chemistry, drug design, publications, CV, talks, and selected projects.

The site is built with Jekyll and hosted via GitHub Pages.

## Live Site

- https://alessioprunotto.github.io

## What Is In This Repository

- Site configuration: _config.yml
- Navigation and data files: _data/
- Reusable HTML includes: _includes/
- Page layouts: _layouts/
- Main pages: _pages/
- Blog posts: _posts/
- Publications collection: _publications/
- Talks collection: _talks/
- Styling (SCSS): _sass/
- Static assets: assets/, images/, files/

## Local Development

Prerequisites:

- Ruby and Bundler
- Node.js and npm

Install dependencies:

- bundle install

If your system Ruby blocks global gem writes, install gems locally in the repo:

- bundle config set --local path vendor/bundle
- BUNDLE_FORCE_RUBY_PLATFORM=1 bundle install

Build once:

- bundle exec jekyll build

Run local server:

- bundle exec jekyll serve --livereload

Local URLs:

- Site: http://127.0.0.1:4000/
- LiveReload: http://127.0.0.1:35729

## Content Maintenance Notes

- Edit header links in _data/navigation.yml
- Update author profile and homepage intro in _config.yml
- Add new publications to _publications/
- Add new posts to _posts/
- Add custom styling in _sass/layout/_custom.scss

## Deployment

This repository is intended for GitHub Pages deployment from the default branch, using the repository name format username.github.io.

## Acknowledgements

- This site is based on the Academic Pages Jekyll template:
    https://github.com/academicpages/academicpages.github.io
- Academic Pages was originally forked from Minimal Mistakes:
    https://mmistakes.github.io/minimal-mistakes/
- Minimal Mistakes is Copyright (c) 2016 Michael Rose.
- This repository includes and customizes that upstream work under the MIT License. See LICENSE.
- Built with Jekyll and plugins from the GitHub Pages ecosystem.

## License

This repository is distributed under the MIT License. See LICENSE for full text.
