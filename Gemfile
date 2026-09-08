source 'https://rubygems.org'

# Jekyll 4 stack (see .ruby-version). We deliberately do NOT use the
# `github-pages` gem: it pins Jekyll 3.9 and an old Sass/kramdown set.
# Deployment builds with `bundle exec jekyll build` in GitHub Actions.
gem 'jekyll', '~> 4.3'
gem 'jekyll-sass-converter', '~> 3.0'
gem 'kramdown', '~> 2.4'
gem 'kramdown-parser-gfm'
gem 'webrick'
gem 'faraday-retry'

group :jekyll_plugins do
  gem 'jekyll-feed'
  gem 'jekyll-sitemap'
  gem 'jekyll-redirect-from'
  gem 'jemoji'
end

group :test do
  gem 'html-proofer', '~> 5.0'
end
