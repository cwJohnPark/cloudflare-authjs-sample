# Cloudflare AuthJS Boilerplate

This project is an authentication system boilerplate using Auth.js (NextAuth) on Cloudflare Workers.

## Tech Stack

- **Next.js 15** (OpenNextJS 1.0.4)
- **NextAuth 5.0.0-beta**
- **React 19**
- **Tailwind CSS 3**
- **Cloudflare D1** (Serverless Relational Database)
- **Wrangler**

## Features

- User authentication storage using Cloudflare D1 database
- Email authentication (magic link) using Resend
- Apple, Google OAuth authentication
- Cloudflare deployment optimization with Open NextJS
- Responsive dashboard UI with shadcn components
- TypeScript support
- Built-in authentication middleware and session provider
- Interactive charts and data tables in dashboard
- Modern UI components with Tailwind CSS

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

### 4. Configure Environment Variables

Copy the `.env.example` file to create your local environment configuration:

```bash
cp .env.example .env.local
```

Then edit the `.env.local` file with your actual values:

```env
AUTH_SECRET="randomly generated long string"
AUTH_RESEND_KEY="API key from Resend"
AUTH_EMAIL_FROM="no-reply@yourdomain.com"
AUTH_URL="http://localhost:8787/"
AUTH_GOOGLE_ID="Google OAuth Client ID"
AUTH_GOOGLE_SECRET="Google OAuth Client Secret"
AUTH_APPLE_ID="Apple OAuth Client ID"
AUTH_APPLE_SECRET="Apple OAuth Client Secret"
```

**Environment Variables Explanation:**

- `AUTH_SECRET`: Can be generated using the command `npx auth secret`.
- `AUTH_RESEND_KEY`: Get an API key by creating an account on [Resend](https://resend.com/).
- `AUTH_EMAIL_FROM`: Sender email address for authentication emails.
- `AUTH_URL`: Local URL for development, deployed domain URL for production.
- `AUTH_GOOGLE_ID/SECRET`: OAuth credentials from respective consoles. [AuthJS Google Provider](https://authjs.dev/getting-started/providers/google)
- `AUTH_APPLE_ID/SECRET`: OAuth credentials from respective consoles. [AuthJS Apple Provider](https://authjs.dev/getting-started/providers/apple)

**Note**: For Cloudflare Workers deployment, you'll also need to configure these same variables in your Cloudflare dashboard or use `.dev.vars` for local development with Wrangler.

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

## Development and Deployment

### Development Mode

For local development with Next.js development server:

```bash
npm run dev
```

For testing with Cloudflare Workers runtime (preview mode):

```bash
npm run preview
```

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Authentication Methods

### Multi-Provider Authentication

- **Google OAuth**: One-click login with Google account
- **Apple OAuth**: One-click login with Apple ID
- **Email (Resend)**: Magic link authentication via email

### Session Management

- Custom session provider for global session state
- Server-side session validation
- Automatic redirect based on authentication status

## Database Migration

Call `GET /api/setup` to automatically create and migrate D1 database schema using Auth.js D1 adapter.

## Dashboard Features

The dashboard includes:

- **Interactive Charts**: Area charts with multiple data series
- **Data Tables**: Advanced tables with sorting, filtering, and pagination
- **Responsive Sidebar**: Collapsible navigation with user profile
- **Cards Section**: Overview cards with key metrics
- **Modern UI**: Built with shadcn/ui components

## Development Notes

### Resend Magic Link

During development, you can only send testing emails to your own email address. To send emails to other recipients in production, verify a domain at [resend.com/domains](https://resend.com/domains) and change the `from` address to use the verified domain.

### D1 Local Development

Calling `GET /api/setup` produces the local D1 database at `.wrangler/state/v3/d1/miniflare-D1DatabaseObject`.

## Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your forked repository: `git push origin feature/your-feature-name`
5. Submit a Pull Request

## License

This project is distributed under the MIT License.

## References

- Official tutorial: https://developers.cloudflare.com/developer-spotlight/tutorials/fullstack-authentication-with-next-js-and-cloudflare-d1/
