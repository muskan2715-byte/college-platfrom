import path from 'path'
import { defineConfig } from 'prisma/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrate: {
    async adapter() {
      return new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    }
  }
})