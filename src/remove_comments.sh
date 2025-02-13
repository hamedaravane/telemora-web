#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
echo "Processing TypeScript files in directory: $SCRIPT_DIR"

find "$SCRIPT_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) | while IFS= read -r file; do
    echo "Processing file: $file"
    cp "$file" "$file.bak"
    sed -i -E '/^[[:space:]]*\/\/.*$/d' "$file"
    sed -i -E 's/([[:space:];])\/\/.*$/\1/' "$file"
    rm -f "$file.bak"
done

echo "All TypeScript files have been processed."
