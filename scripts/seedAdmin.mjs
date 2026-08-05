// Run with: node scripts/seedAdmin.mjs
// Reads MONGODB_URI from .env.local and creates the first superadmin.
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    passwordHash: String,
    role: { type: String, default: "superadmin" },
  },
  { timestamps: true }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const name = await ask("Admin name: ");
  const email = (await ask("Admin email: ")).toLowerCase().trim();
  const password = await ask("Admin password: ");
  rl.close();

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { email },
    { name, email, passwordHash, role: "superadmin" },
    { upsert: true, new: true }
  );

  console.log(`✅ Superadmin '${email}' created/updated.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
