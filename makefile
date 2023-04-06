.DEFAULT_GOAL := build

init:
	@echo "Initialising the project"
	@sudo chmod -R 777 .scripts
	@yarn install
	@yarn node ./.scripts/init.cjs

build_arch: test
	@echo "✅"

clean:
	@echo "🛁 Cleaning..."
	@rm -Rf dist

test:
	@echo "Testing..."
	@./.scripts/test.sh

build: init clean
	@echo "👩‍🏭 Building..."
	@yarn build
	
start:
	yarn dev
