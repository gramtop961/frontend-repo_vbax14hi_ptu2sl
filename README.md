# Jarvis v1 — Minimal Keyboard‑First Personal AI Dashboard

A single‑page dashboard with a clean, minimal interface. Type commands at the bottom to manage notes and todos, do quick utilities, and import/export your data — all stored locally via localStorage. No backend required.

## Setup

1. npm i
2. npm run dev
3. Open the local URL shown in your terminal.

## Features

- Keyboard‑first chat‑like command interface
- Scrollable history (persists to `jarvis.history.v1`)
- Notes (`jarvis.notes.v1`) and Todos (`jarvis.todos.v1`) persisted locally
- Lightweight skills/command system with help, time, date, clear, echo, calc, export
- Import/Export JSON from the header
- Mobile‑friendly minimal UI with Tailwind

## Commands

- help — list all commands with examples
- time — local time (HH:MM, weekday)
- date — local date (YYYY‑MM‑DD)
- clear — clear only the chat history (asks to confirm)
- echo <text>
- calc <expression> — numbers and + - * / % ( ) only
- export — download a JSON of history, notes, todos
- note add <text>
- note list
- note remove <id>
- note clear
- todo add <text>
- todo list
- todo toggle <id>
- todo remove <id>
- todo clear

### Examples

- help
- note add Read a book
- note list
- todo add Ship project
- todo list
- todo toggle 1
- calc (2+3*4)-5

## Import / Export

- Export: run `export` in the command bar to download the file (name format `jarvis-export-YYYYMMDD-HHMM.json`).
- Import: click the Import button in the header and choose a previously exported JSON. Imported items merge into existing data; IDs are regenerated on conflict.

## Keyboard Shortcuts

- Ctrl/Cmd + K — focus input
- Esc — clear input
- ArrowUp in empty input — recall last command
- Enter — run command
- Shift+Enter — newline (no send)

## UI Notes

- Minimal, monochrome palette with soft focus rings
- Clear message layout with timestamps and role labels

