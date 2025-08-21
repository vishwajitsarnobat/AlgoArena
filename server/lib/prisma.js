// server/lib/prisma.js
const { PrismaClient } = require('@prisma/client'); // require loads module PrismaClient

const prisma = new PrismaClient();

module.exports = prisma;