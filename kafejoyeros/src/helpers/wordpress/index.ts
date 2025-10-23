// Exportar todas las funciones y tipos de WordPress
export * from './config';
export * from './api';

// Re-exportar las funciones más comunes para fácil acceso
export {
  getPosts,
  getPostsWithPagination,
  getPostBySlug,
  getPostById,
  getPages,
  getPageBySlug,
  getPageById,
  getMediaById,
  getMedia,
  getMenus,
  getMenuBySlug,
  getCategories,
  getTags,
  getFeaturedImage,
  cleanWordPressContent,
  getCleanExcerpt,
} from './api';

export {
  WORDPRESS_CONFIG,
  type WordPressPost,
  type WordPressPage,
  type WordPressMedia,
  type WordPressMenu,
  type WordPressMenuItem,
} from './config';