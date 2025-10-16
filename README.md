# Next.js + Prisma ORM Field-Level Encryption Demo

This is a demonstration project showcasing **field-level encryption** in [Prisma ORM](https://www.prisma.io/) integrated with [Next.js](https://nextjs.org). The project demonstrates how to encrypt sensitive data fields (like ID card numbers) at the application layer using the [prisma-field-encryption](https://github.com/47ng/prisma-field-encryption) extension.

## 🎯 Project Overview

This demo implements a simple user management system where:
- User data is stored in a PostgreSQL database
- Sensitive fields (ID card numbers) are automatically encrypted before being stored
- Encrypted data is automatically decrypted when retrieved
- The encryption/decryption is transparent to the application code

## 🔑 Key Features

- **Field-Level Encryption**: Automatic encryption/decryption of sensitive fields using `prisma-field-encryption`
- **Next.js 15**: Modern React framework with App Router
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **TypeScript**: Full type safety across the application
- **Server Components**: Efficient data fetching with React Server Components
- **Tailwind CSS**: Modern, responsive UI styling

## 📋 Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or hosted)
- Basic knowledge of Next.js and Prisma

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
PRISMA_FIELD_ENCRYPTION_KEY="k1.aesgcm256.YOURENCRYPTIONKEY"
```

### 3. Database Setup

#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Database Migration
```bash
npx prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate the Prisma Client with TypeScript types
- Apply the migration to your database

#### Seed the Database
```bash
npx prisma db seed
```

This seeds the database with 12 sample users. The ID card numbers will be automatically encrypted in the database.

#### Query Database
you can use AzureDataExplorer or SSMS to confirm that the data already encrypted inside database
![AzureDataExplorer](docs/images/azure_data_explorer.png)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application displaying decrypted user data.

#### Application screenshot
![NestJSApp](docs/images/data_decrypted_on_nextjs.png)


## 🏗️ Project Structure

```
nextjs-prisma/
├── prisma/
│   ├── schema.prisma          # Database schema with encrypted field annotation
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Database migration files
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page displaying users
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── lib/
│       └── prisma.ts         # Prisma client with encryption extension
├── docs/
│   └── images/               # Documentation screenshots
└── package.json
```

## 🔐 How Encryption Works

### 1. Schema Definition

In `prisma/schema.prisma`, sensitive fields are marked with the `/// @encrypted` annotation:

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  idCardNo String? @unique /// @encrypted
}
```

### 2. Prisma Client Extension

The `src/lib/prisma.ts` file extends the Prisma Client with the encryption extension:

```typescript
import { fieldEncryptionExtension } from 'prisma-field-encryption'

const client = basePrisma.$extends(fieldEncryptionExtension())
```

### 3. Automatic Encryption/Decryption

When you use the Prisma Client:
- **Writing data**: Values are automatically encrypted before being stored
- **Reading data**: Values are automatically decrypted after being retrieved

```typescript
// Encryption happens automatically
await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@example.com",
    idCardNo: "10000-10000-001" // This will be encrypted in DB
  }
})

// Decryption happens automatically
const users = await prisma.user.findMany() // idCardNo is decrypted
```

### 4. Database Storage

In the actual database (viewable via pgAdmin or similar tools):
- The `idCardNo` field is stored as encrypted ciphertext
- The application layer handles all encryption/decryption transparently

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:seed  # Seed database with sample data
```

## 📖 Prisma Commands Reference

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio (database GUI)
npx prisma studio

# Seed database
npx prisma db seed

# Reset database (⚠️ Destructive)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

## 🎓 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

### Prisma Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Field Encryption](https://github.com/47ng/prisma-field-encryption)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

⚠️ **Warning: Not Production Ready**

This is a demonstration project intended for demo purposes only. While it showcases field-level encryption concepts.

For production use, consider the following improvements:
- Implement **envelope encryption** to make the key rotation process faster
- Store the **Key Encryption Key (KEK)** in a secure Key Vault service
- Store the **Encrypted Data Encryption Key (DEK)** in a centralized database table