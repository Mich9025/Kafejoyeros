// WordPress API Configuration

// Interfaces para tipos específicos
export interface WordPressMeta {
  [key: string]: string | number | boolean | null;
}

export interface WordPressACF {
  [key: string]: string | number | boolean | object | null;
}

export const WORDPRESS_CONFIG = {
  // Base URL de tu instalación de WordPress
  baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://yellowgreen-deer-888686.hostingersite.com',
  
  // Endpoints de la API REST de WordPress
  endpoints: {
    posts: '/wp-json/wp/v2/posts',
    pages: '/wp-json/wp/v2/pages',
    media: '/wp-json/wp/v2/media',
    menus: '/wp-json/wp/v2/menus',
    categories: '/wp-json/wp/v2/categories',
    tags: '/wp-json/wp/v2/tags',
  },
  
  // Configuración de cache
  cache: {
    revalidate: 3600, // 1 hora en segundos
  },
  
  // Headers por defecto
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

// Tipos de datos de WordPress
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: WordPressMeta[];
  categories: number[];
  tags: number[];
  acf?: WordPressACF; // Advanced Custom Fields
}

export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: WordPressMeta[];
  acf?: WordPressACF;
}

export interface WordPressMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: WordPressMeta[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
  source_url: string;
}

export interface WordPressMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  items?: WordPressMenuItem[];
}

export interface WordPressMenuItem {
  id: number;
  title: {
    rendered: string;
  };
  url: string;
  attr_title: string;
  description: string;
  type: string;
  type_label: string;
  object: string;
  object_id: number;
  parent: number;
  menu_order: number;
  target: string;
  classes: string[];
  xfn: string[];
  invalid: boolean;
  meta: WordPressMeta[];
}