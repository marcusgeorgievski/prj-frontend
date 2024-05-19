# PRJ Frontend

## Usage

Run the development server:

```bash
npm run dev
```

## Development

### Auth

[Clerk](https://clerk.com/) is a hosted authentication solution. It provides storage and management of users which can be accessed from the Clerk admin panel for the given project. Clerk also provides react components for both visual and functional purposes.

[Clerk's Express middleware](https://clerk.com/docs/references/nodejs/overview) will be implemented to only allow authenticated user to make requests to the backend.

- [Clerk Next.js SDK Reference](https://clerk.com/docs/references/nextjs/overview)
- [Clerk React Component Reference](https://clerk.com/docs/components/overview)

### Database

[Neon](https://neon.tech/) is a serverless Postgres database.

- Obtain the DB credentials through the MS Teams char

[postgres](https://www.npmjs.com/package/postgres) is a fast and lightweight query builder for CRUD operations inside the code.

- Refer to the table of contents on the page from the link above for usage
