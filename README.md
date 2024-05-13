#Floodgen

FloodGen is a flood advocacy tool that uses generative AI to visualize photorealistic images of potential flood scenarios. Positioned as an advocacy tool that reaches beyond the limits of traditional aerial maps, FloodGen is designed to raise awareness, support community preparedness, and support local government’s resilience strategies.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on GitHub Pages

Make sure to add the [nextjs.yml](https://github.com/BetaNYC/floodgen/blob/main/.github/workflows/nextjs.yml) in the .github/ workflows doc path

### Comment out these codes in the nextjs.yml file:
    # with:
    # Automatically inject basePath in your Next.js configuration file and disable
          # server side image optimization (https://nextjs.org/docs/api-reference/next/image#unoptimized).
          #
          # You may remove this line if you want to manage the configuration yourself.
          # static_site_generator: nextÏ
    #- name: Static HTML export with Next.js
    # run: ${{ steps.detect-packagmanager.outputs.runner }} next export

### In the next config.js file please add:

    const nextConfig = {
      output: "export",
      basePath: "",
    };

Push your changes from  the local file and the GitHub Action will automatically run the deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!



