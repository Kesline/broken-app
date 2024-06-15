const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 60, // limit each IP to 60 requests per windowMs
  message: 'Too many requests from this IP, please try again after an hour',
});

// Apply rate limiter to all requests
app.use(limiter);

// Middleware to parse JSON bodies
app.use(express.json());

// Validate request body
const validateBody = [
  body('developers').isArray().withMessage('developers must be an array'),
  body('developers.*').isString().withMessage('Each developer must be a string'),
];

// Route handler for POST /
app.post('/', validateBody, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract developers array from request body
  const { developers } = req.body;

  try {
    // Fetch GitHub user information for each developer
    const promises = developers.map(async (username) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio } = response.data;
        return { name, bio };
      } catch (error) {
        // Handle GitHub API errors (e.g., user not found, rate limit exceeded)
        if (error.response && error.response.status === 404) {
          return { name: username, bio: 'User not found' };
        } else if (error.response && error.response.status === 403) {
          // Rate limit exceeded or other API errors
          return { name: username, bio: 'API rate limit exceeded or other error' };
        } else {
          throw error; // Propagate other unexpected errors
        }
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    res.json(results);
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
