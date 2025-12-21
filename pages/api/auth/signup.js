
import { db } from '../../../lib/db';
import { hashPassword, generateToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, role, firstName, lastName } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await db.users.findOne(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.users.create({
      email,
      password_hash: hashedPassword,
      role,
      first_name: firstName,
      last_name: lastName
    });

    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
