#!/bin/bash

output_file="output.md"

{
    echo "# TSX Files"
    echo ""
} > "$output_file"

find . -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
    {
        echo "- File: ${file}"
        echo ""
        echo '```'
        cat "$file"
        echo '```'
        echo ""
    } >> "$output_file"
done

echo "Markdown file generated: $output_file"
