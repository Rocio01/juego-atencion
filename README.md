# Attention training game

A cognitive training web app I built for my parents. Each round flashes a
central object and a traffic sign somewhere in the periphery, then asks three
quick questions. Difficulty adapts to each player, so the game stays
challenging without becoming frustrating.

**Live demo:** https://juego-atencion.zrmartinezg.workers.dev/ (the interface is in Spanish)

## How a round works

1. A central object (a vehicle, a bird or a boat) and a traffic sign in one of
   six sectors around it appear for a short time.
2. Then the player answers: which object was in the center, which sector the
   sign was in, and which sign it was.

Training the center and the periphery together targets divided attention.

## Adaptive difficulty

A staircase algorithm (`src/staircase.ts`) uses one level number to control
two kinds of difficulty:

- **Exposure time** drops from 2400 ms to 800 ms in steps of 80 ms.
- **Distractors:** neutral geometric shapes are added at levels 8 and 15. They
  are never real signs, so the answer is never ambiguous.

The level goes up after three fully correct rounds in a row and down after a
round with no correct answers. A partly correct round only resets the streak.
This 3-up / 1-down rule is standard in adaptive psychophysics, and it settles
near 79% correct answers.

The best level and the milestone badges (every 5 levels) are saved in
`localStorage`. The player can choose among three color palettes.

## Stack

Vite · React 19 · TypeScript · Vitest · Oxlint · Cloudflare Workers (static
assets)

## Run it locally

```sh
npm install
npm run dev      # development server
npm test         # unit tests (staircase, data, achievements, game state)
npm run lint
npm run deploy   # build and deploy to Cloudflare Workers
```

## License

MIT, see [LICENSE](LICENSE).
