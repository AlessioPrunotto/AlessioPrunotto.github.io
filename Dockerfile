# Jekyll 4 dev image. Ruby matches .ruby-version (3.3.x); Node 20 matches
# package.json engines. Rebuild after changing Gemfile/package.json.
FROM ruby:4.0-slim-bookworm

# System deps: compiler toolchain for native gems + Node 20 for npm scripts.
# NodeSource setup needs curl/ca-certificates/gnupg; git for Bundler git sources.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    git \
    gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
        | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
        > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Non-root user matching the host UID for bind-mounted files.
RUN groupadd -g 1000 vscode && \
    useradd -m -u 1000 -g vscode vscode

WORKDIR /usr/src/app
RUN chown -R vscode:vscode /usr/src/app
USER vscode

# Dependency manifests first for layer caching. Gemfile.lock and
# package-lock.json are tracked — keep them in sync with the manifests.
COPY --chown=vscode:vscode Gemfile Gemfile.lock package.json package-lock.json ./

ENV BUNDLE_PATH=/usr/src/app/vendor/bundle \
    BUNDLE_BIN=/usr/src/app/vendor/bundle/bin \
    PATH=/usr/src/app/vendor/bundle/bin:$PATH

RUN bundle install --jobs 4 && npm ci

EXPOSE 4000 35729

# docker-compose.yaml overrides this for live reload; plain `docker run`
# serves the site the same way.
CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0", "--livereload", "--config", "_config.yml,_config_docker.yml"]
