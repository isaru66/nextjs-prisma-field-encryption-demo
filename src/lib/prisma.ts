import { PrismaClient } from '@prisma/client'
import { fieldEncryptionExtension } from 'prisma-field-encryption'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const basePrisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma

const client = basePrisma.$extends(fieldEncryptionExtension())
export default client