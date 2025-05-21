# Nuxt Chat App

## Description

Welcome to Nuxt Chat App! This is a feature-rich, real-time chat application built with the power of Nuxt.js, Vue.js, and MongoDB. Connect with users, engage in dynamic conversations, manage your profile, and enjoy a seamless chat experience.

## Features

- User authentication (sign-up, sign-in, reset password)
- Real-time chat functionality
- User profiles and avatars
- Modern UI with Tailwind CSS

## Technologies Used

- **Frontend:** Nuxt.js, Vue.js, Tailwind CSS, VeeValidate, Zod
- **Backend:** Node.js (implied by Nuxt), MongoDB (with Mongoose)
- **Real-time:** WebSockets (based on nitro experimental config)
- **Other:** Floating UI, GSAP for animations, Iconify for icons.

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

## Project Structure

- `app/`: Contains the Nuxt.js frontend application (components, pages, layouts, composables, etc.).
    - `components/`: Reusable Vue components.
        - `auth/`: Authentication related components.
        - `base/`: Basic UI components.
        - `chat/`: Chat specific components.
    - `composables/`: Vue composables for reusable logic.
    - `layouts/`: Nuxt layouts.
    - `middleware/`: Nuxt route middleware.
    - `pages/`: Nuxt pages for routing.
    - `theme/`: Styling and theme configurations.
- `server/`: Contains the backend logic.
    - `api/`: API endpoints.
    - `models/`: Mongoose models for MongoDB.
    - `services/`: Business logic for different modules.
    - `plugins/`: Server-side plugins (e.g., MongoDB connection).
- `public/`: Static assets.
- `shared/`: Code shared between frontend and backend (e.g., types).
- `nuxt.config.ts`: Nuxt.js configuration file.
- `package.json`: Project metadata and dependencies.
- `Dockerfile` & `docker-compose.yml`: Docker configuration for containerization.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is currently not licensed.
