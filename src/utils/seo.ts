export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  h1: string;
  breadcrumb?: { name: string; path: string }[];
}

export const BASE_CANONICAL_URL = 'https://sandracarlos.pt';

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: 'Sandra Carlos | Consultoria Imobiliária e Arquitetura de Autor',
    description: 'Consultoria imobiliária de excelência e curadoria de imóveis de autor em Lisboa e Sintra. Encontre propriedades exclusivas com Sandra Carlos.',
    canonicalPath: '/',
    ogType: 'website',
    h1: 'Sandra Carlos &bull; Consultoria Imobiliária de Autor',
  },
  sobre: {
    title: 'Sobre Sandra Carlos | Consultoria Imobiliária Exclusiva',
    description: 'Conheça a visão de Sandra Carlos na consultoria imobiliária. Rigor arquitetónico, sustentabilidade e gestão discreta de património. Contacte-nos.',
    canonicalPath: '/sobre',
    ogType: 'profile',
    h1: 'Sobre Sandra Carlos &bull; Consultoria & Visão Arquitetónica',
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Sobre Sandra Carlos', path: '/sobre' },
    ],
  },
  casas: {
    title: 'Casas e Propriedades de Autor | Sandra Carlos Consultoria Imobiliária',
    description: 'Explore o portfólio exclusivo de moradias e apartamentos de luxo em Lisboa, Sintra e Comporta com a consultora Sandra Carlos. Agende a sua visita.',
    canonicalPath: '/casas',
    ogType: 'website',
    h1: 'Casas & Propriedades de Autor &bull; Portfólio Selecionado',
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Casas', path: '/casas' },
    ],
  },
  dicas: {
    title: 'Dicas para Comprar e Vender Casas | Sandra Carlos Consultoria Imobiliária',
    description: 'Artigos, análises de mercado e dicas exclusivas de Sandra Carlos para comprar, vender e valorizar imóveis em Portugal com rigor e tranquilidade.',
    canonicalPath: '/dicas',
    ogType: 'blog',
    h1: 'Dicas & Guia Imobiliário &bull; Sandra Carlos',
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Dicas', path: '/dicas' },
    ],
  },
  contacto: {
    title: 'Contacto | Sandra Carlos Consultoria Imobiliária em Lisboa',
    description: 'Entre em contacto com Sandra Carlos Consultoria Imobiliária para aconselhamento patrimonial, venda e aquisição de imóveis de autor em Portugal.',
    canonicalPath: '/contacto',
    ogType: 'website',
    h1: 'Contacto &bull; Sandra Carlos Consultoria Imobiliária',
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Contacto', path: '/contacto' },
    ],
  },
  '404': {
    title: 'Página Não Encontrada | Sandra Carlos Consultoria Imobiliária',
    description: 'A página que procura não existe ou foi movida. Regresse à página inicial de Sandra Carlos Consultoria Imobiliária e descubra o nosso portfólio.',
    canonicalPath: '/404',
    ogType: 'website',
    h1: '404 &bull; Página Não Encontrada',
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Erro 404', path: '/404' },
    ],
  },
};

/**
 * Updates DOM head elements dynamically to ensure on-page SEO compliance.
 */
export function applySEO(pageKey: string): void {
  const config = SEO_CONFIG[pageKey] || SEO_CONFIG.home;
  const fullCanonicalUrl = `${BASE_CANONICAL_URL}${config.canonicalPath === '/' ? '' : config.canonicalPath}`;

  // 1. Update Title
  document.title = config.title;

  // 2. Update or create Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Update or create Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // 4. Update OpenGraph Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:url', fullCanonicalUrl);
  setMetaProperty('og:type', config.ogType || 'website');
  setMetaProperty('og:site_name', 'Sandra Carlos Consultoria Imobiliária');
  setMetaProperty('og:locale', 'pt_PT');

  // 5. Update or create Schema.org JSON-LD Structured Data
  let scriptSchema = document.getElementById('schema-structured-data') as HTMLScriptElement | null;
  if (!scriptSchema) {
    scriptSchema = document.createElement('script');
    scriptSchema.id = 'schema-structured-data';
    scriptSchema.type = 'application/ld+json';
    document.head.appendChild(scriptSchema);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': `${BASE_CANONICAL_URL}/#organization`,
        name: 'Sandra Carlos Consultoria Imobiliária',
        url: BASE_CANONICAL_URL,
        description: config.description,
        telephone: '+351 965881547',
        email: 'sandra.carlos@expertimo.eu',
        priceRange: '€€€€',
        identifier: 'AMI 15766',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lisboa',
          addressCountry: 'PT',
        },
        areaServed: ['Lisboa', 'Sintra', 'Cascais', 'Comporta'],
        sameAs: ['https://instagram.com/sandracarlosimobiliaria'],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_CANONICAL_URL}/#website`,
        url: BASE_CANONICAL_URL,
        name: 'Sandra Carlos Consultoria Imobiliária',
        publisher: {
          '@id': `${BASE_CANONICAL_URL}/#organization`,
        },
      },
      ...(config.breadcrumb
        ? [
            {
              '@type': 'BreadcrumbList',
              itemListElement: config.breadcrumb.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: `${BASE_CANONICAL_URL}${item.path === '/' ? '' : item.path}`,
              })),
            },
          ]
        : []),
    ],
  };

  scriptSchema.textContent = JSON.stringify(structuredData);
}
