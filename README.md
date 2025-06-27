# Nuxt Chat App

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

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit and push
4. Open a Pull Request

---

## License

This project is currently not licensed.
