# Next.js Art Gallery Website

This is a Next.js website for displaying art items.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:1337
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up the following environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: Your production API URL

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The base URL of your API (e.g., `http://localhost:1337` for local development or your production API URL for deployment)

## Image Configuration

If you're using a different domain for your images in production, make sure to update the `next.config.js` file to include that domain in the `images.domains` array.

## Type Issues with Next.js 15

If you encounter type errors related to page props, make sure you're using inline type definitions for page components rather than separate interfaces:

```typescript
// Use this:
export default async function Page({ params }: { params: { id: string } }) {
  // ...
}

// Instead of this:
interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  // ...
}
```

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
