import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify this is a cron invocation
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const baseUrl = `https://${req.headers.host}`;

    // Warm both caches in parallel
    const [mediaKitRes, youtubeRes] = await Promise.all([
      fetch(`${baseUrl}/api/media-kit`),
      fetch(`${baseUrl}/api/youtube-stats`),
    ]);

    if (!mediaKitRes.ok) {
      throw new Error(`Media kit refresh failed: ${mediaKitRes.status}`);
    }

    const mediaKitData = await mediaKitRes.json();
    const youtubeData = youtubeRes.ok ? await youtubeRes.json() : null;

    return res.status(200).json({
      ok: true,
      mediaKit: {
        lastUpdated: mediaKitData.lastUpdated,
        statsCount: mediaKitData.stats?.length ?? 0,
      },
      youtube: youtubeData
        ? { totalViews: youtubeData.totalViews, videoCount: youtubeData.videoCount }
        : { error: 'Failed to refresh' },
    });
  } catch (error) {
    console.error('Cron refresh failed:', error);
    return res.status(500).json({ ok: false, error: String(error) });
  }
}
