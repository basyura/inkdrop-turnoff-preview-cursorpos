# turnoff-preview-cursorpos

Move cursor to better position when turn off preview (maybe).

## Settings

```json
position: {
  title: "position of cursor",
  type: "string",
  default: "top",
  enum: ["top", "middle", "bottom"],
},
interval: {
  title: "interval to invoke setCursor",
  type: "number",
  default: 50,
},
adjustline: {
  title: "line number to adjust position",
  type: "number",
  default: 5,
},
```
