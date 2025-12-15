import { 
  WORDPRESS_CONFIG, 
  WordPressPost, 
  WordPressPage, 
  WordPressMedia, 
  WordPressMenu 
} from './config';

// Función base para hacer peticiones a la API de WordPress
async function fetchWordPressAPI(endpoint: string, options: RequestInit = {}) {
  const isClient = typeof window !== 'undefined';
  const baseUrl = isClient ? '/api/proxy/wordpress' : WORDPRESS_CONFIG.baseUrl;
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      ...WORDPRESS_CONFIG.defaultHeaders,
      ...options.headers,
    },
    next: {
      revalidate: WORDPRESS_CONFIG.cache.revalidate,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from WordPress API:', error);
    throw error;
  }
}

// Función base para hacer peticiones a la API de WordPress con headers
async function fetchWordPressAPIWithHeaders(endpoint: string, options: RequestInit = {}) {
  const isClient = typeof window !== 'undefined';
  const baseUrl = isClient ? '/api/proxy/wordpress' : WORDPRESS_CONFIG.baseUrl;
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      ...WORDPRESS_CONFIG.defaultHeaders,
      ...options.headers,
    },
    next: {
      revalidate: WORDPRESS_CONFIG.cache.revalidate,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const headers = {
      total: response.headers.get('X-WP-Total'),
      totalPages: response.headers.get('X-WP-TotalPages'),
    };
    
    return { data, headers };
  } catch (error) {
    console.error('Error fetching from WordPress API:', error);
    throw error;
  }
}

// Funciones para obtener posts
export async function getPosts(params: {
  per_page?: number;
  page?: number;
  categories?: string;
  tags?: string;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}): Promise<WordPressPost[]> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.posts}${queryString ? `?${queryString}` : ''}`;
  
  return await fetchWordPressAPI(endpoint);
}

// Función para obtener posts con información de paginación
export async function getPostsWithPagination(params: {
  per_page?: number;
  page?: number;
  categories?: string;
  tags?: string;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}): Promise<{
  posts: WordPressPost[];
  total: number;
  totalPages: number;
}> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.posts}${queryString ? `?${queryString}` : ''}`;
  
  const { data, headers } = await fetchWordPressAPIWithHeaders(endpoint);
  
  return {
    posts: data,
    total: parseInt(headers.total || '0', 10),
    totalPages: parseInt(headers.totalPages || '0', 10),
  };
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchWordPressAPI(`${WORDPRESS_CONFIG.endpoints.posts}?slug=${slug}`);
  return posts.length > 0 ? posts[0] : null;
}

export async function getPostById(id: number): Promise<WordPressPost> {
  return await fetchWordPressAPI(`${WORDPRESS_CONFIG.endpoints.posts}/${id}`);
}

// Funciones para obtener páginas
export async function getPages(params: {
  per_page?: number;
  page?: number;
  parent?: number;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}): Promise<WordPressPage[]> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.pages}${queryString ? `?${queryString}` : ''}`;
  
  return await fetchWordPressAPI(endpoint);
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  const pages = await fetchWordPressAPI(`${WORDPRESS_CONFIG.endpoints.pages}?slug=${slug}`);
  return pages.length > 0 ? pages[0] : null;
}

export async function getPageById(id: number): Promise<WordPressPage> {
  return await fetchWordPressAPI(`${WORDPRESS_CONFIG.endpoints.pages}/${id}`);
}

// Funciones para obtener media
export async function getMediaById(id: number): Promise<WordPressMedia> {
  return await fetchWordPressAPI(`${WORDPRESS_CONFIG.endpoints.media}/${id}`);
}

export async function getMedia(params: {
  per_page?: number;
  page?: number;
  media_type?: string;
  mime_type?: string;
} = {}): Promise<WordPressMedia[]> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.media}${queryString ? `?${queryString}` : ''}`;
  
  return await fetchWordPressAPI(endpoint);
}

// Funciones para obtener menús (requiere plugin como WP REST API Menus)
export async function getMenus(): Promise<WordPressMenu[]> {
  try {
    return await fetchWordPressAPI('/wp-json/wp-api-menus/v2/menus');
  } catch {
    console.warn('Menu endpoint not available. Consider installing WP REST API Menus plugin.');
    return [];
  }
}

export async function getMenuBySlug(slug: string): Promise<WordPressMenu | null> {
  try {
    const menu = await fetchWordPressAPI(`/wp-json/wp-api-menus/v2/menus/${slug}`);
    return menu;
  } catch {
    console.warn('Menu endpoint not available. Consider installing WP REST API Menus plugin.');
    return null;
  }
}

// Función para obtener categorías
export async function getCategories(params: {
  per_page?: number;
  page?: number;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.categories}${queryString ? `?${queryString}` : ''}`;
  
  return await fetchWordPressAPI(endpoint);
}

// Función para obtener tags
export async function getTags(params: {
  per_page?: number;
  page?: number;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  const endpoint = `${WORDPRESS_CONFIG.endpoints.tags}${queryString ? `?${queryString}` : ''}`;
  
  return await fetchWordPressAPI(endpoint);
}

// Función helper para obtener la imagen destacada de un post/página
export async function getFeaturedImage(mediaId: number): Promise<WordPressMedia | null> {
  if (!mediaId) return null;
  
  try {
    return await getMediaById(mediaId);
  } catch (error) {
    console.error('Error fetching featured image:', error);
    return null;
  }
}

// Función helper para limpiar el contenido HTML de WordPress
export function cleanWordPressContent(content: string): string {
  // Remover tags HTML básicos pero mantener estructura
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .trim();
}

// Función helper para extraer excerpt limpio
export function getCleanExcerpt(excerpt: string, maxLength: number = 160): string {
  const cleanText = excerpt
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim();
    
  if (cleanText.length <= maxLength) return cleanText;
  
  return cleanText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}