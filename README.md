# AlessioPrunotto.github.io

[![CI](https://github.com/AlessioPrunotto/AlessioPrunotto.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/AlessioPrunotto/AlessioPrunotto.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/AlessioPrunotto/AlessioPrunotto.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/AlessioPrunotto/AlessioPrunotto.github.io/actions/workflows/pages.yml)

Personal academic website for Alessio Prunotto, focused on computational chemistry, drug design, publications, CV, talks, and selected projects.

The site is built with Jekyll 4 (Ruby 3.3, Node 20) and deployed via GitHub Actions.

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

Two supported paths (pick one): native Ruby or Docker. Both use the pinned
toolchains: Ruby from `.ruby-version`, Node 20 from `package.json` engines.

### Option A — native (macOS)

Apple's system Ruby is too old for Jekyll 4. Install Ruby 3.3 via Homebrew:

- brew install ruby@3.3
- export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" (add to shell profile)
- bundle install
- npm ci

### Option B — Docker (any OS)

- docker compose up --build

This builds the `Dockerfile` image (pinned Ruby 3.3 + Node 20, gems and npm
packages baked in) and serves with live reload. No local Ruby/Node needed.
Alternatively open the repo in VS Code via "Dev Containers: Reopen in Container".

### Build, serve, check (native commands; same steps run in CI)

Build JS bundle (regenerates `assets/js/main.min.js`):

- npm run build:js

Build once (strict front matter, production HTML compression):

- JEKYLL_ENV=production bundle exec jekyll build --strict-front-matter

Run local server:

- bundle exec jekyll serve --livereload

Audit links/images (must pass in CI):

- bundle exec htmlproofer ./_site --disable-external --allow-hash-href

Local URLs:

- Site: http://127.0.0.1:4000/
- LiveReload: http://127.0.0.1:35729 (native `--livereload` / Docker default)

## Content Maintenance Notes

- Edit header links in _data/navigation.yml
- Update author profile and homepage intro in _config.yml
- Add new publications to _publications/
- Add new posts to _posts/
- Add custom styling in _sass/layout/_custom.scss

## Deployment

Pushes to `master` deploy automatically:

- `.github/workflows/pages.yml` builds Jekyll 4 with the repo's own
  `Gemfile.lock` (+ `npm ci` / `npm run build:js`) and publishes to the
  `github-pages` environment. The repo Pages setting uses Source "GitHub
  Actions" (not the legacy auto-builder, which cannot build Jekyll 4).
- `.github/workflows/ci.yml` validates pull requests and pushes: strict
  Jekyll build + `htmlproofer` link/image audit.
- `.github/dependabot.yml` proposes weekly Bundler/npm/Docker/Actions
  updates; CI must stay green before merging.

Live URL: https://alessioprunotto.github.io

## Acknowledgements

- This site is based on the Academic Pages Jekyll template:
    https://github.com/academicpages/academicpages.github.io
- Academic Pages was originally forked from Minimal Mistakes:
    https://mmistakes.github.io/minimal-mistakes/
- Minimal Mistakes is Copyright (c) 2016 Michael Rose.
- This repository includes and customizes that upstream work under the MIT License. See LICENSE.
- Built with Jekyll 4 and the plugins listed in `Gemfile`.

## License

This repository is distributed under the MIT License. See LICENSE for full text.
