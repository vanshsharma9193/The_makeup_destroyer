import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'vip'
    },
    process.env.JWT_SECRET || 'cherry_blossom_haute_beaute_secret_key_2026_luxury',
    { expiresIn: '30d' }
  );
};

// @desc    Authenticate user & get VIP token
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both VIP email and password.'
      });
    }

    const user = await db.users.findOne((u) => u.email.toLowerCase() === email.toLowerCase());

    // If user exists in seed, verify password or allow demo pass
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
      const isDemoPass = password === 'LuxurySecret2026' || isMatch;

      if (!isDemoPass && !isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid VIP credentials. Please verify your password.'
        });
      }

      const token = generateToken(user);

      return res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'vip',
          tier: user.tier || 'VIP Diamond Tier',
          token
        }
      });
    }

    // Dynamic demo login for any new client email
    const dynamicUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role: 'vip',
      tier: 'VIP Diamond Tier'
    };

    const token = generateToken(dynamicUser);

    res.json({
      success: true,
      message: `Welcome, ${dynamicUser.name}!`,
      data: {
        ...dynamicUser,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new VIP Member
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required registration fields.'
      });
    }

    const existingUser = await db.users.findOne((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A VIP membership already exists with this email address.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: 'vip',
      tier: 'VIP Diamond Member',
      createdAt: new Date().toISOString()
    };

    await db.users.create(newUser);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'VIP induction completed successfully.',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tier: newUser.tier,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const { password, ...userData } = user;
    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

