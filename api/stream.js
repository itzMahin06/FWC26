// api/stream.js
export default async function handler(req, res) {
  const { url } = req.query;

  // 1. Validate parameter
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    // 2. Fetch the target raw HTTP stream stream from the remote IP address
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Error fetching stream source');
    }

    const contentType = response.headers.get('content-type') || '';
    const isManifest = url.includes('.m3u8') || url.includes('.m3u') || contentType.includes('mpegurl') || contentType.includes('application/vnd.apple.mpegurl');

    // 3. CASE A: If loading the manifest text playlist file, rewrite paths
    if (isManifest) {
      let data = await response.text();

      // Parse host configurations dynamically to preserve subdirectories
      const parsedUrl = new URL(url);
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname.substring(0, parsedUrl.pathname.lastIndexOf('/'))}`;

      const lines = data.split('\n');
      const rewrittenLines = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
          return line; // Return metadata configuration untouched
        }
        
        let absoluteSegmentUrl = trimmed;
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          // Resolve relative video chunks seamlessly back to source IP
          absoluteSegmentUrl = trimmed.startsWith('/') 
            ? `${parsedUrl.protocol}//${parsedUrl.host}${trimmed}`
            : `${baseUrl}/${trimmed}`;
        }

        // Pipe chunk back inside this secure HTTPS function proxy
        return `/api/stream?url=${encodeURIComponent(absoluteSegmentUrl)}`;
      });

      res.setHeader('Content-Type', 'application/x-mpegURL');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.status(200).send(rewrittenLines.join('\n'));
    } 
    
    // 4. CASE B: Video chunks / TS Media stream bytes
    else {
      res.setHeader('Content-Type', contentType || 'video/MP2T');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');

      // Universal conversion preventing Serverless / Edge execution crashes
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      return res.status(200).send(uint8Array);
    }

  } catch (error) {
    return res.status(500).json({ error: 'Proxy initialization failed' });
  }
}
