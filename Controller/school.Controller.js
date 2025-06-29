const db = require('../Database/db');
const { calculateDistance } = require('../Utils/distance');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Insert into DB
  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );
    res.status(201).json({ message: 'School added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error.' });
  }
};


exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  try {
    const [schools] = await db.execute('SELECT * FROM schools');

    const result = schools.map(school => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );

      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });

    // Sort by distance (ascending)
    result.sort((a, b) => a.distance - b.distance);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching schools' });
  }
};