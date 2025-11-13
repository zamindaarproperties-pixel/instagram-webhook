import express from "express";
const app = express();
app.use(express.json());

// ✅ Webhook Verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_verify_token"; // use the same token in Meta Dashboard
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

// 📬 Handle incoming events (comments, DMs, etc.)
app.post("/webhook", (req, res) => {
  console.log("📩 Received webhook event:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(10000, () => console.log("🚀 Server running on port 10000"));
