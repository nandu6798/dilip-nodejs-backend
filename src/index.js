const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SPRING_BOOT_URL = 'http://springboot-svc.demo-project.svc.cluster.local:8080';

app.get('/api/tasks', async (req, res) => {
  try {
    const response = await axios.get(`${SPRING_BOOT_URL}/tasks`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const response = await axios.post(`${SPRING_BOOT_URL}/tasks`, { title });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.listen(3001, () => {
  console.log('Node.js backend running on port 3001');
});
