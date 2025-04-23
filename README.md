# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:
To see test the search pages:
for the one page using Lottie Player: try `http://localhost:3000/search/lottie/any_search_term`
for the one page using DotLottie Player: try `http://localhost:3000/searchdot/lottie/any_search_term`


```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

# My Conclusion from the two: 
The Lottie Player is only about 85 KB gzipped, delivers an LCP of around 0.8 seconds, and reliably plays every animation. The DotLottie Player, at roughly 497 KB gzipped, can sometimes load a bit faster but with inconsistent LCPs and animation just stopped midway (playback stall). In short, the leaner, faster, smooth-playing Lottie Player is the clear winner. So, I would go with deploying that (the one with Lottie Player).

NB: I also found out that DotLottie has been deprecated and superceded by `@lottiefiles/dotlottie-wc` but i didnt try that

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
