import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify this is a cron invocation
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Warm the cache by hitting the main endpoint
    const baseUrl = `https://${req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/media-kit`);

    if (!response.ok) {
      throw new Error(`Refresh failed: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      ok: true,
      lastUpdated: data.lastUpdated,
      statsCount: data.stats?.length ?? 0,
    });
  } catch (error) {
    console.error('Cron refresh failed:', error);
    return res.status(500).json({ ok: false, error: String(error) });
  }
}
