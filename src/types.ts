export type PageType = 'home' | 'sobre' | 'casas' | 'dicas' | 'contacto' | '404';

export interface TipArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  categories: string[];
  excerpt: string;
  content: string[];
  checklist?: string[];
  image: string;
  readTime: string;
  featured?: boolean;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  typology: string;
  area: string;
  description: string;
  image: string;
  secondaryImages?: string[];
  architecturalHighlights: string[];
  year: string;
  price?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
