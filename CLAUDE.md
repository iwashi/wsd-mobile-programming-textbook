# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese programming textbook titled "Dartで学ぶプログラミング入門" (Learning Programming with Dart), built using mdBook - a static site generator for creating books from Markdown files.

## Build Commands

- `mdbook build` - Builds the book to the `book/` directory
- `mdbook serve` - Serves the book locally at http://localhost:3000 with live-reload
- `mdbook watch` - Watches for changes and rebuilds automatically
- `mdbook clean` - Cleans the build directory

## Repository Structure

```
├── book.toml           # mdBook configuration
├── book/              # Generated HTML output (gitignored)
├── src/               # Source Markdown files
│   ├── SUMMARY.md     # Book structure definition - critical file
│   ├── introduction.md
│   └── chapter_1/ to chapter_15/  # Chapter content
└── todo.md            # Chapter completion tracking
```

## Writing Guidelines

1. **Target Audience**: Programming beginners (プログラミング初心者)
2. **Language**: All content should be written in Japanese
3. **Code Examples**: Use Dart for all code examples
4. **File Naming**: Follow the existing pattern: `{chapter_number}_{section_number}_{topic}.md`

## Content Structure

The book is organized into 8 parts:
- Part 1: プログラミングへの招待 (Introduction to Programming)
- Part 2: データと計算の基礎 (Data and Computation Basics)
- Part 3: プログラムの流れを制御する (Control Flow)
- Part 4: データの集まりを扱う (Data Collections)
- Part 5: 関数でコードを整理する (Functions)
- Part 6: オブジェクト指向プログラミング入門 (OOP Introduction)
- Part 7: エラーハンドリングとデバッグ (Error Handling & Debugging)
- Part 8: 実践プロジェクト (Practice Projects)

## Important Notes

- The `SUMMARY.md` file defines the book structure - any new chapters or sections must be added here
- Content should be beginner-friendly with clear explanations in Japanese
- Each chapter directory contains individual section files
- The project uses standard mdBook configuration without custom themes or plugins
- Progress tracking is done via `todo.md` with checkboxes for each section

## Syntax Highlighting Configuration

**Important**: Although this textbook teaches Dart programming, all code blocks use `javascript` syntax highlighting instead of `dart`.

**Reason**: mdBook does not have built-in support for Dart syntax highlighting. Since Dart and JavaScript share similar syntax (functions, comments, control structures), using `javascript` provides better code readability with proper syntax coloring.

**Usage**: 
- Use `\`\`\`javascript` for all Dart code examples
- This applies to all chapters throughout the textbook
- The actual code remains Dart - only the syntax highlighting language tag is changed