DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

mkdir -p $DIR/pre-build
rm -Rf $DIR/pre-build/*
rsync -av --exclude='node_modules' --exclude='pre-build' --exclude='script' --exclude='README.md' --exclude='.nvmrc' --exclude='.gitlab-ci.yml' --exclude='.gitignore' $DIR/../* $DIR/pre-build/