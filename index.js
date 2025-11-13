import express from "express";
const app = express();

app.use(express.json());

// ✅ Step 1: Webhook Verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_verify_token"; // same token as Meta dashboard
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Step 2: Handle Instagram Webhook Events
app.post("/webhook", (req, res) => {
  console.log("📩 Received webhook event:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ Step 3: Instagram Business Login Redirect Handler
app.get("/auth/callback", (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("❌ No code provided!");
  }

  console.log("✅ Received Instagram OAuth code:", code);
  res.send("✅ Login successful! You can close this window now.");
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
