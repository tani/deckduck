# Deck Duck 🦆

Deck Duck is a markdown to the slide deck compiler.

## Features

- MathJax v3
- Pluggable to unified
- Tablet friendly
- JS-free (the slide deck depends on only HTML and CSS)

## Example

```markdown
---
title: Example
author: Duck Joe
---

::: frame
# Frist frame

This is the first frame.
:::

::: frame
# Second frame

$$
e^{i\pi} = -1
$$
:::
```

```bash
$ npx deckduck example.md example.html # markdown -> html
$ npx deckduck example.md example.pdf # markdown -> html -> pdf
$ npx deckduck -- --theme=default example.md example.html # markdown -> html, with options
$ npx deckduck -- --theme=default example.md example.pdf # markdown -> html -> pdf, with options
```

## License

MIT (c) TANIGUCHI Masaya