
# Binaries.
bin = ./node_modules/.bin
babel = $(bin)/babel
browserify = $(bin)/browserify
eslint = $(bin)/eslint
http-server = $(bin)/http-server
mocha = $(bin)/mocha
mocha-phantomjs = $(bin)/mocha-phantomjs
node = node
watchify = $(bin)/watchify

# Opts.
babel_opts =
browserify_opts = --debug --transform babelify
mocha_opts = --reporter spec
eslint_opts = --ignore-pattern "build.js" --ignore-pattern "mocha.js"

# Flags.
DEBUG ?=
GREP ?=

# Config.
ifeq ($(DEBUG),true)
	mocha += debug
	node += debug
endif

# Run all of the checks.
check: lint test

# Remove the generated files.
clean:
	@ rm -rf ./dist ./node_modules

# Build the source.
dist:
	$(babel) ./lib $(babel_opts) --out-dir ./dist

# Build the example.
example:
	@ $(browserify) ./example/index.js $(browserify_opts)

# Install the dependencies.
install:
	@ npm install

# Lint the source files.
lint:
	@ $(eslint) "{example,lib,test}/**/*.js" $(eslint_opts)

# Start the example server.
start:
	@ $(http-server) ./example

# Run all the tests.
test: test-server test-browser

# Run the browser-side tests.
test-browser:
	@ $(browserify) ./test/browser.js $(browserify_opts) --outfile ./test/support/build.js
	@ open ./test/support/browser.html

# Run the server-side tests.
test-server:
	@ $(mocha) $(mocha_opts) ./test/server.js \
	--compilers js:babel-core/register \
	--require source-map-support/register \
	--fgrep "$(GREP)"

# Watch the source.
watch-dist:
	@ $(MAKE) dist babel_opts="$(babel_opts) --watch"

# Watch the example.
watch-example:
	@ $(MAKE) example browserify="$(watchify)" \
		browserify_opts="$(browserify_opts) --outfile ./example/build.js"

# Phony targets.
.PHONY: dist
.PHONY: example
.PHONY: test
