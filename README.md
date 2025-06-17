# Cloudflare AuthJS Boilerplate

This project is an authentication system boilerplate using Auth.js (NextAuth) on Cloudflare Workers.

## Tech Stack

- NextJS 15.3.2 (OpenNextJS 1.0.4)
- NextAuth 5.0.0-beta
- ReactJS 19
- Tailwind 3.4.17
- Wrangler 4.20.1

## Features

- User authentication storage using Cloudflare D1 database
- Email authentication(magic link) using Resend
- Apple, Google Authentication
- Cloudflare deployment optimization with Open NextJS
- Responsive UI (Tailwind CSS)
- TypeScript support

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/cwjohnpark/cloudflare-authjs-sample.git
cd cloudflare-authjs-sample
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Cloudflare

1. Create an account and log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Create a new project in Workers & Pages.
3. Create a D1 database.

### 4. Configure .dev.vars File

Set up your `.dev.vars` file as follows:

```.env
AUTH_SECRET="randomly generated long string"
AUTH_RESEND_KEY="API key from Resend"
AUTH_EMAIL_FROM="no-reply@yourdomain.com"
AUTH_URL="http://localhost:8787/"
```

- `AUTH_SECRET`: Can be generated using the command `npx auth secret`.
- `AUTH_RESEND_KEY`: Get an API key by creating an account on [Resend](https://resend.com/).
- `AUTH_EMAIL_FROM`: Sender email address for authentication emails.
- `AUTH_URL`: Local URL for development, deployed domain URL for production.

### 5. Modify wrangler.jsonc File

Edit the following items in your `wrangler.jsonc` file:

```jsonc
{
  "name": "your-project-name",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "your-database-name",
      "database_id": "your-database-id"
    }
  ]
}
```

## Development Mode

This command builds the project using Open NextJS and deploys it to Cloudflare Workers.

```bash
npm run preview
```

## Deployment

```bash
npm run deploy
```

## Project Structure

```bash
cloudflare-authjs-sample/
├── src/
│   ├── app/
│   │   ├── auth.ts          # Auth.js configuration
│   │   ├── page.tsx         # Main page
│   │   └── layout.tsx       # App layout
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions
│   └── middleware.ts        # Authentication middleware
├── public/                  # Static files
├── .dev.vars                # Development environment variables
├── wrangler.jsonc           # Cloudflare configuration
└── next.config.ts           # Next.js configuration
```

## How to Contribute

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your forked repository: `git push origin feature/your-feature-name`
5. Submit a Pull Request.

## Authentication

### Resend Magic Link

You can only send testing emails to your own email address. To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.

## D1 Local Development

Calling `GET /api/setup` produces `.wrangler/state/v3/d1/miniflare-D1DatabaseObject`

## License

This project is distributed under the MIT License.

This project builds based on https://github.com/mackenly/auth-js-d1-example.

Reference: https://developers.cloudflare.com/developer-spotlight/tutorials/fullstack-authentication-with-next-js-and-cloudflare-d1/#1-create-a-nextjs-app-using-workers
