
import { NextRequest, NextResponse } from 'next/server';
import { WORDPRESS_CONFIG } from '@/helpers/wordpress/config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const path = (await params).path;
  const pathString = path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();


  // Special handling for menus as they might be in a different path structure or need plugin support
  // But for now, we just proxy everything under /wp-json/wp/v2/ basically via the config structure, 
  // actually wait, let's look at how the helper constructs URLs.
  // The helper does `${WORDPRESS_CONFIG.endpoints.posts}` which is `/wp-json/wp/v2/posts`.
  // So if we request `/api/proxy/wordpress/posts`, path is `['posts']`.
  // We want to map that to `${WORDPRESS_CONFIG.baseUrl}/wp-json/wp/v2/posts`.
  
  // However, some endpoints might be different, e.g. menus might be /wp-json/wp-api-menus/v2/menus
  // Let's make the proxy more flexible or stick to the specific matching.
  // Since the caught path is `[...path]`, if we call `/api/proxy/wordpress/wp/v2/posts`, path is `['wp', 'v2', 'posts']`.
  // That seems safer: let the client specify the full path relative to wp-json or similar.
  
  // Implemented Strategy:
  // Client calls: /api/proxy/wordpress/posts -> path=['posts']
  // We construct: WORDPRESS_CONFIG.baseUrl + /wp-json/wp/v2/ + path.join('/')
  // This assumes all our proxied requests are under /wp-json/wp/v2/.
  // But wait, the menu one is `/wp-json/wp-api-menus/v2/menus`.
  
  // Better Strategy:
  // Let the proxy handle the full path after `wp-json`. 
  // But our helper uses `endpoints` config which has `/wp-json/...` included.
  
  // Let's try to match the helper's behavior.
  // In `api.ts`, we will change the `baseUrl` to `/api/proxy/wordpress`.
  // And the endpoint remains `/wp-json/wp/v2/posts`.
  // So the full URL requested by client will be `/api/proxy/wordpress/wp-json/wp/v2/posts`.
  // So `path` will be `['wp-json', 'wp', 'v2', 'posts']`.
  // So we just need to join them and append to the REAL base URL.
  
  // Wait, `WORDPRESS_CONFIG.baseUrl` includes the protocol and domain.
  // We want to replace that protocol and domain with the proxied one.
  // Target URL = WORDPRESS_CONFIG.baseUrl (cleaned of /wp-json if needed? No, baseUrl is usually root) + '/' + path.join('/')
  
  // Let's verify `WORDPRESS_CONFIG.baseUrl`. It is `https://api.kafejoyeros.com`.
  // So if path is `['wp-json', 'wp', 'v2', 'posts']`, 
  // Target is `https://api.kafejoyeros.com/wp-json/wp/v2/posts`.
  
  // IMPORTANT: Next.js 15 App Router param constraints.
  // `params` is a Promise now in newer Next.js versions but let's check the user's version. 
  // It is Next 15.
  
  try {
    const targetUrl = `${WORDPRESS_CONFIG.baseUrl}/${pathString}${searchParams ? `?${searchParams}` : ''}`;
    
    // Forward headers if needed, but usually we just want to fetch public data.
    // We might need to forward some specific headers possibly? 
    // For public readonly access, standard fetch is usually fine.
    
    const response = await fetch(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': request.headers.get('Authorization') || '', // If we needed auth
      },
      next: { revalidate: 60 } // Cache proxy responses
    });

    if (!response.ok) {
       return NextResponse.json(
         { error: `WordPress API Error: ${response.statusText}` }, 
         { status: response.status }
       );
    }
    
    const data = await response.json();
    
     // Forward pagination headers
    const headers = new Headers();
    if (response.headers.get('X-WP-Total')) {
      headers.set('X-WP-Total', response.headers.get('X-WP-Total')!);
    }
    if (response.headers.get('X-WP-TotalPages')) {
      headers.set('X-WP-TotalPages', response.headers.get('X-WP-TotalPages')!);
    }

    return NextResponse.json(data, { headers });
    
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
