import express from "express";
const app = express();
app.use(express.json());

// ✅ Webhook verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_verify_token"; // must match dashboard
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook verification failed");
    res.sendStatus(403);
  }
});

// 📬 Handle webhook events (comments, messages, etc.)
app.post("/webhook", (req, res) => {
  console.log("📩 Received webhook event:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
