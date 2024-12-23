const mongoose = require('mongoose');
const axios = require('axios');

// Replace with your MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/your_database';
const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your server URL

// Test data to seed
const testData = [
  {
    // Add your test data structure here
    name: 'Test Item 1',
    description: 'Description 1'
  },
  {
    name: 'Test Item 2',
    description: 'Description 2'
  }
];

async function testDatabaseSeeding() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Test database connection
    const collections = await mongoose.connection.db.collections();
    console.log('Available collections:', collections.map(c => c.collectionName));

    // Test API endpoint for seeding
    const seedResponse = await axios.post(`${API_BASE_URL}/seed`, testData);
    console.log('Seeding response:', seedResponse.data);

    // Verify seeded data
    const verifyResponse = await axios.get(`${API_BASE_URL}/items`);
    console.log('Verification response:', verifyResponse.data);

    // Optional: Clean up test data
    // await mongoose.connection.db.dropDatabase();
    // console.log('Test database cleaned');

  } catch (error) {
    console.error('Testing failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testDatabaseSeeding();