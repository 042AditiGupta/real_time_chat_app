// ❌ BEFORE
const res = await axios.post(
  `${BASE_URL}/api/v1/user/register`,
  user,
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }
);

// ✅ AFTER
const res = await axios.post('/api/v1/user/register', user);