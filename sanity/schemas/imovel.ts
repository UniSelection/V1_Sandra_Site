export default {
  name: 'imovel',
  title: 'Imóvel',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título do Imóvel', type: 'string' },
    { name: 'preco', title: 'Preço (€)', type: 'number' },
    { name: 'localizacao', title: 'Localização', type: 'string' },
    { name: 'descricao', title: 'Descrição', type: 'text' },
    { 
      name: 'galeria', 
      title: 'Fotografias', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }] 
    },
  ],
}