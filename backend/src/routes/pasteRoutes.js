import express from "express";
import Paste from "../models/Paste.js";
import { getNow } from "../utils/now.js";

const router = express.Router();

/* HEALTH CHECK */
router.get("/healthz", async (req, res) => {
  try {
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

/* CREATE PASTE */
router.post("/pastes", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && ttl_seconds < 1) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && max_views < 1) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const now = getNow(req);

  const paste = await Paste.create({
    content,
    expiresAt: ttl_seconds ? new Date(now.getTime() + ttl_seconds * 1000) : null,
    maxViews: max_views ?? null
  });

  console.log("Saved paste in DB:", paste._id);

  res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/p/${paste._id}`
  });
});

/* FETCH PASTE (API) */
router.get("/pastes/:id", async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "View limit reached" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.views,
    expires_at: paste.expiresAt
  });
});

/* VIEW PASTE (HTML) */
router.get("/p/:id", async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).send("Not Found");

  const now = getNow(req);

  if (
    (paste.expiresAt && now > paste.expiresAt) ||
    (paste.maxViews !== null && paste.views >= paste.maxViews)
  ) {
    return res.status(404).send("Not Found");
  }

  res.status(200).send(`
    <html>
      <body>
        <pre>${paste.content.replace(/</g, "&lt;")}</pre>
      </body>
    </html>
 `);
});

export default router;
