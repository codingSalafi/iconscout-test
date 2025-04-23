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
The Lottie Player (≈85 KB gzipped) handles JSON animations flawlessly but won’t render or play .lottie bundles at all. The DotLottie Player (≈497 KB gzipped) renders and plays .lottie files (some animations still don't work) but can’t reliably play raw JSON—often freezing at the first frame. In short, the leaner, faster, smooth-playing Lottie Player is the clear winner. So, I would go with deploying that (the one with Lottie Player).

NB: I also found out that DotLottie has been deprecated and superceded by `@lottiefiles/dotlottie-wc` but i didnt try that
NB: Also I couldn't get a direct lottie or json response on the API(version 3) so i had to use a mix of the search api and the download api.

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
