import { db } from '../config/db.js';

// @desc    Submit Concierge Contact Inquiry
// @route   POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    await db.messages.create(newMessage);

    res.status(201).json({
      success: true,
      message: 'Your correspondence has been received by the Maison Concierge.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Subscribe to VIP Newsletter
// @route   POST /api/contact/newsletter
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Welcome to Cherry Blossom VIP Circle! Enjoy 20% off with code BLOSSOM20.',
      code: 'BLOSSOM20'
    });
  } catch (error) {
    next(error);
  }
};

