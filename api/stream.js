// api/stream.js
export default async function handler(req, res) {
  // Get the target stream URL from the query parameter (?url=...)
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    // Fetch the insecure HTTP m3u8 playlist from the backend server
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Error fetching the live stream source');
    }

    // Set headers to mask it as a secure HTTPS stream for Chrome
    res.setHeader('Content-Type', 'application/x-mpegURL');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    const data = await response.text();
    
    // Return the playlist data to your custom HLS player
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy server failed to parse stream connection' });
  }
}
