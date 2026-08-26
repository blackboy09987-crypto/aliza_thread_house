import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <new-password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
// Escape "$" so Next.js's .env variable-expansion doesn't mangle the bcrypt hash.
console.log(hash.replaceAll("$", "\\$"));

