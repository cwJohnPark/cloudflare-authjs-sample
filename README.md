# Cloudflare AuthJS Boilerplate

This project is an authentication system boilerplate using Auth.js (NextAuth) on Cloudflare Workers.

## Tech Stack

- **Next.js 15** (OpenNextJS 1.0.4)
- **NextAuth 5.0.0-beta**
- **React 19**
- **Tailwind CSS 3**
- **Cloudflare D1** (Serverless Relational Database)
- **Cloudflare Turnstile** (Bot Protection)
- **Lemon Squeezy** (Payment Processing)
- **i18n** (Internationalization)
- **Wrangler**

## Features

- User authentication storage using Cloudflare D1 database
- Email authentication (magic link) using Resend
- Google OAuth authentication
- Cloudflare Turnstile bot protection integration
- Lemon Squeezy payment processing and subscription management
- Multi-language support with i18n (English, Korean, Japanese, Spanish, Chinese)
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
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY="Cloudflare Turnstile Site Key"
CLOUDFLARE_TURNSTILE_SECRET_KEY="Cloudflare Turnstile Secret Key"
LEMON_SQUEEZY_API_KEY="Lemon Squeezy API Key"
LEMON_SQUEEZY_WEBHOOK_SIGNING_KEY="Lemon Squeezy Webhook Secret"
```

**Environment Variables Explanation:**

- `AUTH_SECRET`: Can be generated using the command `npx auth secret`.
- `AUTH_RESEND_KEY`: Get an API key by creating an account on [Resend](https://resend.com/).
- `AUTH_EMAIL_FROM`: Sender email address for authentication emails.
- `AUTH_URL`: Local URL for development, deployed domain URL for production.
- `AUTH_GOOGLE_ID/SECRET`: OAuth credentials from respective consoles. [AuthJS Google Provider](https://authjs.dev/getting-started/providers/google)
- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`: Public site key for Cloudflare Turnstile bot protection. [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
- `CLOUDFLARE_TURNSTILE_SECRET_KEY`: Secret key for Cloudflare Turnstile server-side verification.
- `LEMON_SQUEEZY_API_KEY`: API key for Lemon Squeezy payment processing. [Lemon Squeezy API](https://docs.lemonsqueezy.com/api)
- `LEMON_SQUEEZY_WEBHOOK_SIGNING_KEY`: Webhook secret for Lemon Squeezy payment events.
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
- **Email (Resend)**: Magic link authentication via email
- **Cloudflare Turnstile**: Bot protection for authentication forms

### Session Management

- Custom session provider for global session state
- Server-side session validation
- Automatic redirect based on authentication status

## Internationalization (i18n)

### Multi-Language Support

- **Supported Languages**: English, Korean, Japanese, Spanish, Chinese
- **Dynamic Language Switching**: Real-time language switching without page reload
- **URL-based Localization**: Language-specific URLs (e.g., `/en/dashboard`, `/ko/dashboard`)
- **Automatic Language Detection**: Browser language preference detection
- **Localized Content**: All UI elements, messages, and content are fully localized

## Payment Processing

### Lemon Squeezy Integration

- **Subscription Management**: Handle subscription creation, updates, and cancellations
- **Payment Processing**: Secure payment processing with webhook support
- **Billing Dashboard**: User-friendly billing interface with subscription details
- **Webhook Handling**: Real-time payment event processing

## Database Migration

Call `GET /api/setup` to automatically create and migrate D1 database schema using Auth.js D1 adapter.

## Dashboard Features

The dashboard includes:

- **Interactive Charts**: Area charts with multiple data series
- **Data Tables**: Advanced tables with sorting, filtering, and pagination
- **Responsive Sidebar**: Collapsible navigation with user profile
- **Cards Section**: Overview cards with key metrics
- **Billing Management**: Subscription and payment management interface
- **Language Switcher**: Multi-language support with language selection dropdown
- **Modern UI**: Built with shadcn/ui components

## Development Notes

### Resend Magic Link

During development, you can only send testing emails to your own email address. To send emails to other recipients in production, verify a domain at [resend.com/domains](https://resend.com/domains) and change the `from` address to use the verified domain.

### D1 Local Development

Calling `GET /api/setup` produces the local D1 database at `.wrangler/state/v3/d1/miniflare-D1DatabaseObject`.

### i18n Configuration

The project uses Next.js App Router internationalization with the following structure:

- Language dictionaries are located in `src/lib/i18n/dictionaries/`
- Supported languages: `en`, `ko`, `ja`, `es`, `zh`
- URL structure: `/[lang]/[route]` (e.g., `/en/dashboard`, `/ko/settings`)
- Language switcher component available in the navigation

## Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your forked repository: `git push origin feature/your-feature-name`
5. Submit a Pull Request

## License

This project is distributed under the MIT License.

## References

This project was inspired by and built upon the official Cloudflare tutorial, recreated with modern implementations and additional features.

- Official tutorial: https://developers.cloudflare.com/developer-spotlight/tutorials/fullstack-authentication-with-next-js-and-cloudflare-d1/
