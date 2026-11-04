-- ═══════════════════════════════════════════════════════════════════════════
-- OJO STUDIO — Projetos do site atual (ojo-studio.com)
-- Extraídos via browser em novembro/2026
--
-- Como usar:
--   1. Execute schema.sql primeiro (tabelas + RLS + storage)
--   2. Execute este arquivo no SQL Editor do Supabase
--   3. As imagens apontam para o CDN do Squarespace (site atual).
--      Após subir imagens próprias no bucket "portfolio", atualize os
--      campos cover_image e images com as novas URLs do Supabase Storage.
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO projects (
  slug, title, client, category, year,
  cover_image, images,
  excerpt, description,
  featured, published, order_index,
  locale_pt, locale_en
) VALUES

-- ─── 1. Plane Aviation Brasil ───────────────────────────────────────────────
(
  'plane-aviation-brasil',
  'Plane Aviation Brasil',
  'Plane Aviation Group',
  ARRAY['Branding', 'Arquitetura de Marca', 'Identidade Visual'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/cf74909d-c4be-469d-9dd0-15297d1e77cd/2026+VIsion+Jet+Lifestyle_17.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/41e631a7-aeb2-4ce3-8f4e-70b0b56830cd/janela+avi%C3%A3o.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/04ba3c05-533f-422a-970d-0ddb94bbc4fb/airport+digital+banner_LE_upscale_prime.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/53260950-6b62-49df-a660-def97aa59b82/fachada+1.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/6ed292b9-a22d-428f-847a-f3dd28324bc2/cubo+aeroporto.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/d5d2a914-83bf-48bf-8ce7-b1fe6f7a94ff/fachada+2.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/9adcd0cf-50fe-481d-ab06-07f63c2f2922/caneca+termica.png'
  ],
  'Como transformamos uma revendedora de aeronaves brasileira em uma holding de aviação executiva de alto luxo.',
  'A OJO Studio reorganizou a arquitetura de portfólio da Plane Aviation Group para superar a dependência internacional e a fragmentação de mercado. Estruturamos uma marca mãe forte e submarcas verticais com propósitos claros, convertendo uma operação técnica em um ecossistema de desejo, autoridade e confiança. Apesar de ostentar mais de duas décadas de história sólida como representante exclusiva da Cirrus Aircraft no Brasil, a Plane Aviation enfrentava um risco estratégico silencioso: o mercado a enxergava estritamente como uma concessionária da marca americana, eclipsando suas outras capacidades de negócio.',
  true, true, 0,
  '{"title": "Plane Aviation Brasil", "excerpt": "Como transformamos uma revendedora de aeronaves brasileira em uma holding de aviação executiva de alto luxo.", "description": "A OJO Studio reorganizou a arquitetura de portfólio da Plane Aviation Group para superar a dependência internacional e a fragmentação de mercado. Estruturamos uma marca mãe forte e submarcas verticais com propósitos claros, convertendo uma operação técnica em um ecossistema de desejo, autoridade e confiança."}',
  '{"title": "Plane Aviation Brasil", "excerpt": "How we transformed a Brazilian aircraft dealer into a high-luxury executive aviation holding company.", "description": "OJO Studio reorganized the Plane Aviation Group portfolio architecture to overcome international dependency and market fragmentation. We structured a strong parent brand and vertical sub-brands with clear purposes, converting a technical operation into an ecosystem of desire, authority and trust."}'
),

-- ─── 2. BMW Brand Identity ──────────────────────────────────────────────────
(
  'bmw-brand-identity',
  'BMW Brand Identity',
  'BMW / BECC Agency',
  ARRAY['Brand Identity', 'Redesign', 'Identidade Visual'],
  2023,
  'https://images.squarespace-cdn.com/content/67042407036253616faf60fc/fd1bbefa-a6ec-463f-b694-e1a6d08d7e14/98ec3be9-9671-446e-9629-0b69b5e5735c.jpg',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/a1ac31f2-597d-4cfa-8636-a853d205edc0/7de135dc-1762-404c-a1d9-1fd8047643df.jpg',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/e88cab46-72e7-4c08-b232-c8e10c1c1bc5/bmw-w.png',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/86d2b588-b460-4a51-8f3a-8947eeaaa84c/a544088f-ad10-485a-b247-05a82893224c.jpg',
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/6e35f3c8-c739-45bb-8ba5-3511621414dc/20954faf-2d63-447e-9fa8-cde81daf05b4.jpg'
  ],
  'Pela primeira vez desde 1998, BMW, BMW M e BMW i passaram por uma revisão completa de suas identidades visuais.',
  'Uma colaboração com a BECC Agency, liderada pelo CEO Leif Geuder, focada em alinhar a marca às necessidades modernas de comunicação. A identidade redesenhada simplificou logotipos, otimizou a tipografia corporativa e introduziu um sistema de cores reimaginado, refletindo o compromisso da BMW com a centralidade no cliente. O projeto conquistou o Red Dot Award, destacando-se por inovação excepcional em design de marca.',
  true, true, 1,
  '{"title": "BMW Brand Identity", "excerpt": "Pela primeira vez desde 1998, BMW, BMW M e BMW i passaram por uma revisão completa de suas identidades visuais.", "description": "Uma colaboração com a BECC Agency liderada pelo CEO Leif Geuder, focada em alinhar a marca às necessidades modernas de comunicação. A identidade redesenhada simplificou logotipos, otimizou a tipografia corporativa e introduziu um sistema de cores reimaginado. O projeto conquistou o Red Dot Award."}',
  '{"title": "BMW Brand Identity", "excerpt": "For the first time since 1998, BMW, BMW M and BMW i underwent a comprehensive redesign of their visual identities.", "description": "A collaboration with BECC Agency led by CEO Leif Geuder, focused on aligning the brand with modern communication needs. The redesigned identity simplified logos, optimized the corporate typeface and introduced a reimagined color system. The project earned a Red Dot Award."}'
),

-- ─── 3. IM Motors ───────────────────────────────────────────────────────────
(
  'im-motors',
  'IM Motors',
  'SAIC / IM Motors',
  ARRAY['Brand Identity', 'Naming', 'Posicionamento'],
  2023,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/524442fa-0887-48c5-91a6-38799ceb76a3/IM_Galery07.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/524442fa-0887-48c5-91a6-38799ceb76a3/IM_Galery07.png?format=2500w'
  ],
  'Antes do lançamento do primeiro veículo, definimos o posicionamento, naming e identidade visual da IM Motors.',
  'Uma nova estrela elétrica nasce. Antes do primeiro quilômetro percorrido, a OJO Studio definiu o posicionamento, o naming e a identidade visual da IM Motors. Uma marca criada para competir com os gigantes do mercado de veículos elétricos premium, com uma linguagem visual que comunica sofisticação tecnológica e desejo genuíno.',
  false, true, 2,
  '{"title": "IM Motors", "excerpt": "Antes do lançamento do primeiro veículo, definimos o posicionamento, naming e identidade visual da IM Motors.", "description": "Uma nova estrela elétrica nasce. Antes do primeiro quilômetro percorrido, a OJO Studio definiu o posicionamento, o naming e a identidade visual da IM Motors. Uma marca criada para competir com os gigantes do mercado de veículos elétricos premium."}',
  '{"title": "IM Motors", "excerpt": "Before its first vehicle launch, we defined IM Motors'' positioning, naming and visual identity.", "description": "A new electric star is born. Before its first mile driven, OJO Studio defined IM Motors'' positioning, naming and visual identity. A brand created to compete with the giants of the premium electric vehicle market."}'
),

-- ─── 4. DVNR / Dentsu Virtual Humans ────────────────────────────────────────
(
  'dentsu-virtual-humans',
  'Dentsu Virtual Humans',
  'Dentsu',
  ARRAY['AI', 'Virtual Humans', 'Tecnologia'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1728681844128-4KKBT051A4OMNH474EL4/002.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1728681844128-4KKBT051A4OMNH474EL4/002.png?format=2500w'
  ],
  'Utilizamos IA de ponta para criar embaixadores de marca virtuais hiper-realistas, indistinguíveis da vida real.',
  'Implementando os Humanos de IA Mais Realistas do Mundo. Aproveitamos a IA de ponta para criar embaixadores de marca virtuais hiper-realistas que são indistinguíveis da vida real. Não é CGI: é uma solução escalável para presença e interação de marca consistente globalmente, 24/7. Uma solução que maximiza o alcance digital e protege a marca de dependências de talentos humanos.',
  false, true, 3,
  '{"title": "Dentsu Virtual Humans", "excerpt": "Utilizamos IA de ponta para criar embaixadores de marca virtuais hiper-realistas, indistinguíveis da vida real.", "description": "Implementando os Humanos de IA Mais Realistas do Mundo. Uma solução escalável para presença e interação de marca consistente globalmente, 24/7. Não é CGI: é tecnologia que maximiza o alcance digital e protege a marca de dependências de talentos humanos."}',
  '{"title": "Dentsu Virtual Humans", "excerpt": "We leveraged cutting-edge AI to create hyper-realistic virtual brand ambassadors indistinguishable from real life.", "description": "Deploying the World''s Most Realistic AI Humans. A scalable solution for 24/7, globally consistent brand presence and interaction. This is not CGI — it''s technology that maximizes digital footprint and protects brands from human talent dependencies."}'
),

-- ─── 5. Virtual Avatars ─────────────────────────────────────────────────────
(
  'virtual-avatars',
  'Virtual Avatars',
  'Dentsu',
  ARRAY['AI', 'Avatar', 'Tecnologia'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1728684735669-OXKBDRNWZIGQ9KTU1A7X/dc.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1728684735669-OXKBDRNWZIGQ9KTU1A7X/dc.png?format=2500w'
  ],
  'Avatares virtuais com IA para representação de marca em escala global.',
  'Desenvolvemos avatares de IA para representação de marca consistente e escalável. Uma solução de próxima geração para presença digital de 24 horas, com capacidade de interação em múltiplos idiomas e fusos horários simultaneamente.',
  false, true, 4,
  '{"title": "Virtual Avatars", "excerpt": "Avatares virtuais com IA para representação de marca em escala global.", "description": "Desenvolvemos avatares de IA para representação de marca consistente e escalável. Uma solução de próxima geração para presença digital de 24 horas, com capacidade de interação em múltiplos idiomas e fusos horários simultaneamente."}',
  '{"title": "Virtual Avatars", "excerpt": "AI-powered virtual avatars for global-scale brand representation.", "description": "We developed AI avatars for consistent and scalable brand representation. A next-generation solution for 24/7 digital presence, with the ability to interact in multiple languages and time zones simultaneously."}'
),

-- ─── 6. Hublot Holographic Try-On ───────────────────────────────────────────
(
  'hublot-holographic',
  'Hublot Holographic Try-On',
  'Hublot',
  ARRAY['Experiência', 'Holografia', 'Varejo'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1731415757608-ABFZ2JJGVDNTDSW8DWVP/hub.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/1731415757608-ABFZ2JJGVDNTDSW8DWVP/hub.png?format=2500w'
  ],
  'Revolucionamos o ponto de venda com tecnologia holográfica de nova geração para experiências de prova sem fricção.',
  'POS Holográfico para converter tráfego em transações de alto valor. Revolucionamos a experiência de ponto de venda com tecnologia de Holographic Try-On de próxima geração. Eliminamos a fricção e elevamos o luxo ao permitir que os clientes visualizem instantaneamente os produtos sem estoque físico. Aumento dramático de engajamento e conversão de vendas na loja.',
  false, true, 5,
  '{"title": "Hublot Holographic Try-On", "excerpt": "Revolucionamos o ponto de venda com tecnologia holográfica de nova geração para experiências de prova sem fricção.", "description": "POS Holográfico para converter tráfego em transações de alto valor. Permitimos que os clientes visualizem instantaneamente os produtos sem estoque físico, aumentando engajamento e conversão de vendas."}',
  '{"title": "Hublot Holographic Try-On", "excerpt": "We revolutionized the point-of-sale with next-generation holographic technology for frictionless try-on experiences.", "description": "Holographic POS to convert foot traffic into high-value transactions. We allow customers to instantly visualize products without physical inventory, dramatically increasing engagement and sales conversion in-store."}'
),

-- ─── 7. Montblanc VR Experience ─────────────────────────────────────────────
(
  'montblanc-vr',
  'Montblanc VR Experience',
  'Montblanc',
  ARRAY['VR', 'Experiência', 'Brand'],
  2023,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/9fddb51b-9307-4046-b9f5-25705cae258e/montblanc.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/9fddb51b-9307-4046-b9f5-25705cae258e/montblanc.png?format=2500w'
  ],
  'Imersão global de marca: transportamos o cliente ao coração do legado Montblanc por meio de Realidade Virtual.',
  'Desenvolvemos uma experiência de Realidade Virtual mundial e escalável que leva os clientes diretamente ao coração da Montblanc. Uma imersão em VR que reforça os valores de craftsmanship, herança e exclusividade da marca, criando conexão emocional profunda em qualquer lugar do mundo.',
  false, true, 6,
  '{"title": "Montblanc VR Experience", "excerpt": "Imersão global de marca: transportamos o cliente ao coração do legado Montblanc por meio de Realidade Virtual.", "description": "Desenvolvemos uma experiência de VR mundial e escalável que leva os clientes diretamente ao coração da Montblanc. Uma imersão que reforça os valores de craftsmanship, herança e exclusividade da marca, criando conexão emocional profunda em qualquer lugar do mundo."}',
  '{"title": "Montblanc VR Experience", "excerpt": "Global brand immersion: we transport customers to the core of Montblanc''s legacy through Virtual Reality.", "description": "We deployed a worldwide, scalable Virtual Reality experience that takes customers directly into the heart of Montblanc. A VR immersion reinforcing the brand''s values of craftsmanship, heritage and exclusivity, creating deep emotional connection anywhere in the world."}'
),

-- ─── 8. Ferrero ─────────────────────────────────────────────────────────────
(
  'ferrero',
  'Ferrero',
  'Ferrero',
  ARRAY['Social Media', 'Conteúdo', 'Marketing'],
  2023,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/45057d1d-5721-43f6-8c1c-4847d29af409/ferrero_Cover.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/45057d1d-5721-43f6-8c1c-4847d29af409/ferrero_Cover.png?format=2500w'
  ],
  'Estratégia de social media, compartilhamento e modelo de viralidade de produto.',
  'Desenvolvemos uma estratégia de conteúdo e compartilhamento comprovada para impulsionar a viralidade dos produtos Ferrero. Um modelo que transforma o produto em canal de mídia, gerando engajamento orgânico e alcance exponencial nas plataformas digitais.',
  false, true, 7,
  '{"title": "Ferrero", "excerpt": "Estratégia de social media, compartilhamento e modelo de viralidade de produto.", "description": "Desenvolvemos uma estratégia de conteúdo e compartilhamento comprovada para impulsionar a viralidade dos produtos Ferrero. Um modelo que transforma o produto em canal de mídia, gerando engajamento orgânico e alcance exponencial nas plataformas digitais."}',
  '{"title": "Ferrero", "excerpt": "Social media strategy, sharing, and a proven model for driving product virality.", "description": "We developed a proven content and sharing strategy to drive Ferrero product virality. A model that turns the product into a media channel, generating organic engagement and exponential reach on digital platforms."}'
),

-- ─── 9. Subway AR Secret Menu ───────────────────────────────────────────────
(
  'subway-secret-menu',
  'Subway Secret Menu (AR)',
  'Subway',
  ARRAY['AR', 'Varejo', 'Marketing'],
  2022,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/8089645b-e4b3-48e7-aef3-609870934b40/subway.jpeg?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/8089645b-e4b3-48e7-aef3-609870934b40/subway.jpeg?format=2500w'
  ],
  'Para trazer clientes de volta ao Subway após a pandemia, criamos um Menu Secreto em Realidade Aumentada.',
  'Para trazer clientes de volta ao Subway pós-pandemia, a OJO Studio criou o Menu Secreto: uma experiência exclusiva in-store em Realidade Aumentada. Clientes escaneiam QR codes para acessar ofertas ocultas e receitas secretas disponíveis apenas nas lojas. A estratégia aumentou o tráfego nas lojas, gerou repeat visits e criou engajamento genuíno com a marca. Uma ativação de baixo custo e alto retorno que transformou visitas estáticas em eventos memoráveis.',
  false, true, 8,
  '{"title": "Subway Secret Menu (AR)", "excerpt": "Para trazer clientes de volta ao Subway após a pandemia, criamos um Menu Secreto em Realidade Aumentada.", "description": "Clientes escaneiam QR codes para acessar ofertas ocultas e receitas secretas disponíveis apenas nas lojas. A estratégia aumentou o tráfego, gerou repeat visits e criou engajamento genuíno. Uma ativação de baixo custo e alto retorno que transformou visitas estáticas em eventos memoráveis."}',
  '{"title": "Subway Secret Menu (AR)", "excerpt": "To bring customers back to Subway after the pandemic, we created an AR Secret Menu.", "description": "Customers scan QR codes to access hidden deals and secret recipes available only at Subway locations. The strategy increased store traffic, drove repeat visits and created genuine brand engagement. A low-cost, high-return activation that transformed static visits into memorable events."}'
),

-- ─── 10. OJO Cubed / Configuradores ─────────────────────────────────────────
(
  'configuradores-3d',
  'Configuradores 3D',
  'Diversos clientes',
  ARRAY['3D', 'Configurador', 'Experiência'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/93d71a15-614f-47c6-9549-bfbacca912e6/bmw2.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/93d71a15-614f-47c6-9549-bfbacca912e6/bmw2.png?format=2500w'
  ],
  'Configuradores imersivos customizados que permitem personalizar e visualizar produtos complexos em 3D.',
  'Do produto à experiência imersiva. Nossos Configuradores 3D e Imersivos desenvolvidos sob medida permitem que clientes personalizem e visualizem profundamente produtos e serviços complexos. Reduzimos drasticamente a hesitação de compra e aumentamos o valor médio do pedido. Vendemos a visão, não apenas as características.',
  false, true, 9,
  '{"title": "Configuradores 3D", "excerpt": "Configuradores imersivos customizados que permitem personalizar e visualizar produtos complexos em 3D.", "description": "Do produto à experiência imersiva. Nossos Configuradores 3D desenvolvidos sob medida permitem que clientes personalizem e visualizem profundamente produtos e serviços complexos, reduzindo hesitação de compra e aumentando o valor médio do pedido."}',
  '{"title": "3D Configurators", "excerpt": "Custom-engineered immersive configurators that let customers personalize and visualize complex products in 3D.", "description": "From product to immersive experience. Our custom-engineered 3D Configurators allow customers to deeply personalize and visualize complex products and services, drastically reducing purchase hesitation and increasing average order value."}'
),

-- ─── 11. Nespresso Trade Success ─────────────────────────────────────────────
(
  'nespresso-trade',
  'Nespresso Trade Success',
  'Nespresso',
  ARRAY['B2B', 'Trade Marketing', 'Plataforma'],
  2023,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/5c621c44-bdd0-481d-bd4e-1efe59e30c54/nespressoBG.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/5c621c44-bdd0-481d-bd4e-1efe59e30c54/nespressoBG.png?format=2500w'
  ],
  'Desenvolvemos uma plataforma estratégica para capacitar as equipes de trade da Nespresso com ferramentas de nova geração.',
  'Elevando o sucesso de trade. Desenvolvemos uma plataforma estratégica para capacitar as equipes de trade da Nespresso com as ferramentas e insights necessários para maximizar performance e elevar o sucesso B2B. Um investimento nas pessoas e no resultado financeiro, otimizando o canal de trade para eficiência máxima.',
  false, true, 10,
  '{"title": "Nespresso Trade Success", "excerpt": "Desenvolvemos uma plataforma estratégica para capacitar as equipes de trade da Nespresso com ferramentas de nova geração.", "description": "Elevando o sucesso de trade. Uma plataforma estratégica com as ferramentas e insights necessários para maximizar performance e elevar o sucesso B2B da Nespresso. Um investimento nas pessoas e no resultado financeiro."}',
  '{"title": "Nespresso Trade Success", "excerpt": "We developed a strategic platform to empower Nespresso''s trade teams with next-gen tools.", "description": "Elevating Trade Success. A strategic platform with the tools and insights necessary to maximize performance and elevate B2B success for Nespresso. An investment in your people and your bottom line."}'
),

-- ─── 12. Merkle Emerging Experiences ─────────────────────────────────────────
(
  'merkle-emerging',
  'Merkle Emerging Experiences',
  'Merkle',
  ARRAY['Estratégia', 'Tecnologia', 'Digital'],
  2023,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/9edce753-3910-41c8-9911-4f10e901f9d2/exp.png?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/9edce753-3910-41c8-9911-4f10e901f9d2/exp.png?format=2500w'
  ],
  'Iniciativa estratégica para mapear e prototipar a próxima onda de comunicação digital para a Merkle.',
  'Experiências Emergentes: uma visão estratégica do futuro do digital. Uma iniciativa de alto nível para mapear e prototipar a próxima onda de comunicação digital. Entregamos um roteiro claro e acionável para integrar tecnologias futuras ao mix de marketing atual. Não siga tendências: defina-as.',
  false, true, 11,
  '{"title": "Merkle Emerging Experiences", "excerpt": "Iniciativa estratégica para mapear e prototipar a próxima onda de comunicação digital para a Merkle.", "description": "Experiências Emergentes: uma visão estratégica do futuro do digital. Mapeamos e prototipamos a próxima onda de comunicação digital, entregando um roteiro claro e acionável para integrar tecnologias futuras ao mix de marketing atual."}',
  '{"title": "Merkle Emerging Experiences", "excerpt": "A strategic initiative to map and prototype the next wave of digital communication for Merkle.", "description": "Emerging Experiences: A Strategic Glimpse into the Future of Digital. A high-level initiative to map and prototype the next wave of digital communication, delivering a clear roadmap for integrating future-forward technologies into the current marketing stack."}'
),

-- ─── 13. Merkle AR Hosts ─────────────────────────────────────────────────────
(
  'merkle-ar-hosts',
  'Merkle AR Hosts',
  'Merkle',
  ARRAY['AR', 'Eventos', 'Ativação'],
  2024,
  'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/139d1818-41fb-433a-920f-7d202e1cad68/1701088581904.gif?format=1000w',
  ARRAY[
    'https://images.squarespace-cdn.com/content/v1/67042407036253616faf60fc/139d1818-41fb-433a-920f-7d202e1cad68/1701088581904.gif?format=2500w'
  ],
  'AR Hosts: a ferramenta definitiva de ativação para eventos, usando apresentadores em Realidade Aumentada.',
  'AR Hosts: a ferramenta definitiva de ativação em eventos. Apresentadores em Realidade Aumentada que transformam qualquer evento em uma experiência memorável e compartilhável. Uma solução que combina tecnologia de ponta com narrativa de marca para criar momentos únicos que os participantes levam consigo.',
  false, true, 12,
  '{"title": "Merkle AR Hosts", "excerpt": "AR Hosts: a ferramenta definitiva de ativação para eventos, usando apresentadores em Realidade Aumentada.", "description": "Apresentadores em Realidade Aumentada que transformam qualquer evento em uma experiência memorável e compartilhável. Uma solução que combina tecnologia de ponta com narrativa de marca para criar momentos únicos."}',
  '{"title": "Merkle AR Hosts", "excerpt": "AR Hosts: the ultimate event activation tool using Augmented Reality hosts.", "description": "Augmented Reality hosts that transform any event into a memorable, shareable experience. A solution that combines cutting-edge technology with brand storytelling to create unique moments that attendees carry with them."}'
);

-- ═══════════════════════════════════════════════════════════════════════════
-- Verificação rápida (opcional — execute separado):
-- SELECT slug, title, client, published, featured, order_index FROM projects ORDER BY order_index;
-- ═══════════════════════════════════════════════════════════════════════════
