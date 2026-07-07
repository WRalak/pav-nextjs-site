#!/usr/bin/env node
/**
 * Generates a bcrypt hash for ADMIN_PASSWORD_HASH.
 *
 * Usage:
 *   node scripts/hash-password.mjs "your-password-here"
 *   node scripts/hash-password.mjs            (prompts, input is visible)
 */
import bcrypt from "bcryptjs";
import readline from "node:readline";

async function promptPassword() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Password to hash: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const argPassword = process.argv[2];
  const password = argPassword ?? (await promptPassword());

  if (!password) {
    console.error("No password given.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  // Next.js's env loader expands `$name` in .env values (dotenv-expand
  // semantics), and bcrypt hashes are full of literal `$` characters —
  // so every `$` must be escaped as `\$` or it gets silently mangled.
  const escaped = hash.replace(/\$/g, "\\$");
  console.log('\nADMIN_PASSWORD_HASH="' + escaped + '"\n');
  console.log("Paste the line above into your .env file.");
}

main();
