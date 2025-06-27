# Nuxt Chat App

## General Configuration Steps

Follow these steps to ensure the application works correctly in your local or production environment:

---

### 1. Clone the repository and enter the project

```bash
git clone <repo-url>
cd chat-app
```

---

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in all required values:

```bash
cp .env.example .env
```

**Important variables:**

- MongoDB: `MONGODB_USERNAME`, `MONGODB_PASSWORD`, `MONGODB_DB`, `MONGODB_HOST`, `MONGODB_PORT`
- AWS S3: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`
- CloudFront: `CLOUDFRONT_DOMAIN`, `CLOUDFRONT_KEY_PAIR_ID`, `CLOUDFRONT_PRIVATE_KEY`
- Ably: `ABLY_API_KEY`
- Upstash Redis: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- HTTPS (optional for local dev): `HTTPS_CERT_PATH`, `HTTPS_KEY_PATH`

Example:
```env
# MongoDB
MONGODB_USERNAME=your_mongo_user
MONGODB_PASSWORD=your_mongo_password
MONGODB_DB=your_db
MONGODB_HOST=your_host
MONGODB_PORT=27017

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name

# CloudFront
CLOUDFRONT_DOMAIN=https://your-cloudfront-domain.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=your_key_pair_id
CLOUDFRONT_PRIVATE_KEY=base64_encoded_private_key

# Ably (for real-time)
ABLY_API_KEY=your_ably_api_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# HTTPS (optional for local dev)
HTTPS_CERT_PATH=certs/localhost.pem
HTTPS_KEY_PATH=certs/localhost-key.pem
```

---

### 3. Configure Upstash Redis

The app uses Upstash Redis for sessions and cache.
Make sure you have both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` set in your `.env`.

---

### 4. Configure AWS S3 and CloudFront

- Create a **private** S3 bucket and a CloudFront distribution.
- Upload your CloudFront private key in base64 to `CLOUDFRONT_PRIVATE_KEY`.
- **Disable public access** to your S3 bucket if you want to use signed cookies (recommended).
- If you do not use signed cookies, you must allow public access to files (less secure, not recommended for production).

---

### 5. (Optional but recommended) Configure local HTTPS and subdomain

To make CloudFront signed cookies work locally:

1. Add `127.0.0.1 chat.localhost` to your `/etc/hosts`.
2. Generate a certificate with [mkcert](https://github.com/FiloSottile/mkcert):

   ```bash
   mkcert chat.localhost
   ```

3. Set the paths in your `.env`:

   ```env
   HTTPS_CERT_PATH=certs/chat.localhost.pem
   HTTPS_KEY_PATH=certs/chat.localhost-key.pem
   ```

4. Access the app at `https://chat.localhost:3000`.

> **Note:**
> - This setup is optional, but highly recommended if you want to keep your S3 bucket private and use signed cookies for CloudFront.
> - If you do not use HTTPS and a subdomain locally, you must configure your S3 bucket to allow public access to media files, which is less secure and not recommended for production.

---

### 6. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### 7. Start services with Docker

```bash
docker-compose up --build
```

This will start the app, MongoDB, and Redis.

---

### 8. Start the app in development mode

```bash
npm run dev
```

---

### 9. Access the application

- App: [http://localhost:3000](http://localhost:3000) or [https://chat.localhost:3000](https://chat.localhost:3000) if using local HTTPS.
- MongoDB: [localhost:27017](mongodb://root:password@localhost:27017)
- Redis: [localhost:6379](redis://localhost:6379)

---

### 10. Additional notes

- If using CloudFront with signed cookies, make sure your frontend and backend use the same domain/subdomain and protocol (HTTPS).
- If you have issues with CloudFront cookies locally, check your HTTPS and subdomain configuration.
- For production, ensure you have valid certificates and domains properly configured.

---

## Troubleshooting

- **MongoDB:** Check credentials and connection.
- **Redis/Upstash:** Check URL and token.
- **AWS S3/CloudFront:** Check permissions and keys.
- **Local HTTPS:** If you have cookie issues, check your certificate and domain.

---

## References

- [Upstash Redis Docs](https://docs.upstash.com/)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Docs](https://docs.aws.amazon.com/cloudfront/)
- [mkcert](https://github.com/FiloSottile/mkcert)

---

## Description

A full-stack, real-time chat application built with Nuxt.js, Vue.js, and MongoDB. It supports user authentication, group and private chats, file sharing, and dynamic image transformation via Amazon CloudFront. The backend leverages AWS S3 for file storage and CloudFront for secure, signed media delivery.

---

## Features

- User authentication
- Real-time chat (private & group)
- File and media attachments
- Dynamic image transformation via CloudFront
- Secure, signed media URLs
- Modern UI with Tailwind CSS

---

## Technologies

- **Frontend:** Nuxt.js, Vue.js, Tailwind CSS, VeeValidate, Zod
- **Backend:** Node.js (Nuxt server), MongoDB (Mongoose)
- **Real-time:** Ably (WebSockets)
- **Storage:** AWS S3 (file uploads), CloudFront (media delivery)
- **Image Transformation:** [dynamic-image-transformation-for-amazon-cloudfront](https://aws.amazon.com/solutions/implementations/dynamic-image-transformation-for-amazon-cloudfront/)

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
# MongoDB
MONGODB_USERNAME=your_mongo_user
MONGODB_PASSWORD=your_mongo_password
MONGODB_DB=your_db
MONGODB_HOST=your_host
MONGODB_PORT=27017

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name

# CloudFront
CLOUDFRONT_DOMAIN=https://your-cloudfront-domain.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=your_key_pair_id
CLOUDFRONT_PRIVATE_KEY=base64_encoded_private_key

# Ably (for real-time)
ABLY_API_KEY=your_ably_api_key

# HTTPS (optional for local dev)
HTTPS_CERT_PATH=certs/localhost.pem
HTTPS_KEY_PATH=certs/localhost-key.pem
```

---

## Setup

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## Running with Docker

Build and start all services (app, MongoDB, Redis):

```bash
docker-compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- MongoDB: [localhost:27017](mongodb://root:password@localhost:27017)
- Redis: [localhost:6379](redis://localhost:6379)

---

## Development

Start the Nuxt development server:

```bash
npm run dev
```

---

## Production

Build and start the app:

```bash
npm run build
npm run start
```

---

## File Uploads & Media

- Files are uploaded to S3 using signed URLs.
- Media is served via CloudFront with signed URLs and supports dynamic image transformations (resize, crop, etc.).
- See [`useAttachmentUploader`](app/composables/useAttachmentUploader.ts) and [`server/api/chats/[chat]/attachments/sign/index.post.ts`](server/api/chats/[chat]/attachments/sign/index.post.ts) for upload logic.

---

## Project Structure

- `app/`: Nuxt frontend (components, pages, layouts, composables)
- `server/`: API endpoints, models, services, plugins
- `public/`: Static assets
- `shared/`: Shared types
- `Dockerfile`, `docker-compose.yml`: Containerization

---

## CloudFront Dynamic Image Transformation

This app integrates with [dynamic-image-transformation-for-amazon-cloudfront](https://aws.amazon.com/solutions/implementations/dynamic-image-transformation-on-amazon-cloudfront/).
Images can be transformed on-the-fly by passing query parameters to CloudFront URLs (e.g., `?w=300&h=300&fit=cover`).

---

## Local Certificate & Subdomain Setup (Optional, Recommended)

To ensure secure cookie handling for CloudFront signed URLs (used for image/media delivery), it is **recommended** to configure a local HTTPS certificate and use a subdomain (e.g., `chat.localhost`). This is especially important if you disable public access to your S3 bucket and rely on signed cookies for private content.

**Steps:**

1. **Create a local subdomain** (e.g., add `127.0.0.1 chat.localhost` to your `/etc/hosts`).
2. **Generate a local SSL certificate** for your subdomain (e.g., with [mkcert](https://github.com/FiloSottile/mkcert)):
   ```bash
   mkcert chat.localhost
   ```
3. **Configure your `.env` file**:
   ```env
   HTTPS_CERT_PATH=certs/chat.localhost.pem
   HTTPS_KEY_PATH=certs/chat.localhost-key.pem
   ```
4. **Access the app via** `https://chat.localhost:3000` to ensure cookies work correctly for CloudFront.

> **Note:**
> - This setup is optional, but highly recommended if you want to keep your S3 bucket private and use signed cookies for CloudFront.
> - If you choose not to use HTTPS and a subdomain locally, you must configure your S3 bucket to allow public access to media files, which is less secure and not recommended for production.

---

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit and push
4. Open a Pull Request

---

## License

This project is currently not licensed.
