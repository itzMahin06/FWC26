// api/stream.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Error fetching stream source');
    }

    // Determine if it's a playlist (.m3u8) or a video segment (.ts)
    const contentType = response.headers.get('content-type') || '';
    
    if (url.includes('.m3u8') || url.includes('.m3u') || contentType.includes('mpegurl')) {
      let data = await response.text();

      // Find the base URL path of the stream server to handle relative links
      const parsedUrl = new URL(url);
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname.substring(0, parsedUrl.pathname.lastIndexOf('/'))}`;

      // Line-by-line manifest processing to map chunks back to our proxy
      const lines = data.split('\n');
      const rewrittenLines = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
          return line; // Leave metadata lines untouched
        }
        
        let absoluteSegmentUrl = trimmed;
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          // Handle relative segment paths (e.g., "segment1.ts" -> "http://ip/path/segment1.ts")
          absoluteSegmentUrl = trimmed.startsWith('/') 
            ? `${parsedUrl.protocol}//${parsedUrl.host}${trimmed}`
            : `${baseUrl}/${trimmed}`;
        }

        // Force the segment chunk to load via this exact Vercel API proxy securely
        return `/api/stream?url=${encodeURIComponent(absoluteSegmentUrl)}`;
      });

      res.setHeader('Content-Type', 'application/x-mpegURL');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.status(200).send(rewrittenLines.join('\n'));
    } else {
      // It's a binary video chunk (.ts file). Pipe the video data directly to Chrome.
      res.setHeader('Content-Type', contentType || 'video/MP2T');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      const arrayBuffer = await response.arrayBuffer();
      return res.status(200).send(Buffer.from(arrayBuffer));
    }

  } catch (error) {
    return res.status(500).json({ error: 'Proxy server error connecting to stream' });
  }
}
