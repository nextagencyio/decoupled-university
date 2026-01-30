# Decoupled University

A university website starter template for Decoupled Drupal + Next.js. Built for colleges, universities, and educational institutions.

![Decoupled University Screenshot](docs/screenshot.png)

## Features

- **Academic Programs** - Showcase degree programs with details, requirements, and highlights
- **Faculty Directory** - Faculty profiles with research interests, education, and contact info
- **Events Calendar** - Campus events, lectures, ceremonies with registration
- **News & Announcements** - University news with categories and featured articles
- **Modern Design** - Clean, accessible UI optimized for educational content

## Quick Start

### 1. Clone the template

```bash
npx degit nextagencyio/decoupled-university my-university
cd my-university
npm install
```

### 2. Run interactive setup

```bash
npm run setup
```

This interactive script will:
- Authenticate with Decoupled.io (opens browser)
- Create a new Drupal space
- Wait for provisioning (~90 seconds)
- Configure your `.env.local` file
- Import sample content

### 3. Start development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Manual Setup

If you prefer to run each step manually:

<details>
<summary>Click to expand manual setup steps</summary>

### Authenticate with Decoupled.io

```bash
npx decoupled-cli@latest auth login
```

### Create a Drupal space

```bash
npx decoupled-cli@latest spaces create "My University"
```

Note the space ID returned (e.g., `Space ID: 1234`). Wait ~90 seconds for provisioning.

### Configure environment

```bash
npx decoupled-cli@latest spaces env 1234 --write .env.local
```

### Import content

```bash
npm run setup-content
```

This imports:
- Homepage with statistics and CTAs
- 6 Academic Programs
- 2 Faculty Members
- 2 Events
- 2 News Articles
- 2 Static Pages

</details>

## Content Types

### Academic Program
- Title, Body
- Degree Type (Bachelor's, Master's, etc.)
- Department (taxonomy)
- Duration, Credits
- Program Highlights (paragraphs)

### Faculty Member
- Title (name), Body (bio)
- Position, Department
- Contact info (email, phone, office)
- Photo, Research Interests
- Education credentials

### Campus Event
- Title, Body
- Event Date, End Date
- Location
- Event Type (taxonomy)
- Registration URL

### News Article
- Title, Body
- Featured Image
- Category (taxonomy)
- Featured flag

## Customization

### Colors & Branding
Edit `tailwind.config.js` to customize colors, fonts, and spacing.

### Content Structure
Modify `data/university-content.json` to add or change content types and sample content.

### Components
React components are in `app/components/`. Update them to match your design needs.

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextagencyio/decoupled-university)

### Other Platforms
Works with any Node.js hosting platform that supports Next.js.

## Documentation

- [Decoupled.io Docs](https://www.decoupled.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drupal GraphQL](https://www.decoupled.io/docs/graphql)

## License

MIT
