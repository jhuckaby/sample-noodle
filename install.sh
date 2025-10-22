#!/usr/bin/env bash
set -e

# Absolute path to the script's directory
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Running from: $DIR"
echo "Current working dir: $(pwd)"

POOLNOODLE_DIR="/opt/poolnoodle/conf/apps"
SOURCE_LINK="$DIR/package.json"
TARGET_LINK="$POOLNOODLE_DIR/sample-noodle.json"

# Check for PoolNoodle
if [[ ! -d "$POOLNOODLE_DIR" ]]; then
	echo "Error: PoolNoodle web server is not installed (missing: $POOLNOODLE_DIR)" >&2
	exit 1
fi

echo "Creating symlink: $SOURCE_LINK --> $TARGET_LINK"
ln -snf $SOURCE_LINK $TARGET_LINK

echo "Signaling PoolNoodle to hot reload..."
touch /opt/poolnoodle/conf/config.json

echo "Done."
