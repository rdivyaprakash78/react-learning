# 🟩 Wordle Clone

A React-based clone of the popular Wordle game. Guess a hidden 5-letter word in 6 attempts!

---

## 🎮 Features

### 🧩 Gameplay Logic

- 5-letter word guessing game.
- Automatically focuses next tile on input.
- Supports backspace navigation to previous tile.
- Submit word using `Enter` key when last tile is filled.

### 🧠 Word Validation

- Word is validated against a dictionary of **15,000+ valid words**.
- Uses `Set` data structure for **O(1)** word lookup for efficient validation.
- Invalid or incomplete guesses trigger alerts.

### 🧱 Tile Behavior

- Individual letter tiles are implemented using `<input>` fields.
- Disables input on next tile unless the previous is filled.
- Automatically capitalizes letters.
- Cursor auto-moves forward and backward based on input and deletion.

### 🧼 Input Controls

- Restricts input to a single character per tile.
- Automatically uppercases all input.
- Prevents submission unless all 5 letters are entered.
