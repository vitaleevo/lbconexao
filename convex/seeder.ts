import { mutation } from "./_generated/server";

export const populate = mutation({
    args: {},
    handler: async (ctx) => {
        // 1. News (Posts) from LB Conexão actual activities
        const samplePosts = [
            {
                title: "Segunda Edição da Imersão Jurídica 2025: Transformação da Mentalidade Jurídica",
                slug: "segunda-edicao-imersao-juridica-2025",
                excerpt: "Luanda acolheu um encontro histórico de magistrados, advogados e estudantes para debater o futuro do direito em Angola.",
                content: "<p>O Royal Plaza Hotel em Talatona foi o palco da 2ª Edição da Imersão Jurídica organizada pela LB Conexão Jurídica. O evento reuniu nomes sonantes do judiciário para discutir a transformação da mentalidade jurídica no país.</p><p>Entre os temas abordados, destacaram-se as problemáticas das providências cautelares no Processo do Trabalho e os desafios da contabilidade em escritórios de advogados.</p>",
                author: "Luís Bastos",
                readTime: "8 min",
                published: true,
                featured: true,
                coverImage: ""
            },
            {
                title: "A Problemática das Providências Cautelares no CPT",
                slug: "problematica-providencias-cautelares-cpt",
                excerpt: "Uma análise técnica sobre a celeridade e eficácia das medidas cautelares no Direito do Trabalho angolano.",
                content: "<p>Durante a nossa mais recente imersão, debatemos a fundo como o Código de Processo do Trabalho lida com as providências cautelares. A necessidade de uma justiça mais rápida é um grito comum entre os operadores do direito.</p>",
                author: "LB Conexão Jurídica",
                readTime: "5 min",
                published: true,
                featured: false,
                coverImage: ""
            },
            {
                title: "Inauguração da Nova Plataforma Digital LB Conexão",
                slug: "inauguracao-plataforma-digital-lb",
                excerpt: "Estamos a digitalizar a conexão entre profissionais do direito em toda Angola com o lançamento do nosso novo portal informativo.",
                content: "<p>É com orgulho que apresentamos a nova face digital da LB Conexão. Um portal dedicado a notícias, eventos e networking para a comunidade jurídica angolana. Este é apenas o início de uma nova era de literacia jurídica digital.</p>",
                author: "Equipa LB Conexão",
                readTime: "4 min",
                published: true,
                featured: false,
                coverImage: ""
            }
        ];

        for (const post of samplePosts) {
            const existing = await ctx.db.query("posts").withIndex("by_slug", q => q.eq("slug", post.slug)).unique();
            if (!existing) {
                await ctx.db.insert("posts", post);
            }
        }

        // 2. Events from LB Conexão
        const sampleEvents = [
            {
                title: "Masterclass: Estratégias de Defesa no Contencioso Administrativo",
                description: "Sessão intensiva sobre as melhores práticas e estratégias de defesa no contexto jurídico angolano.",
                date: "A definir",
                time: "18:00 - 20:30",
                location: "Instituto Sapiens / Online",
                type: "Masterclass",
                mode: "Híbrido",
                price: "Sob consulta",
                status: "upcoming",
                featured: true,
                includedItems: ["Certificado", "Material de Apoio", "Networking"],
                coverImage: ""
            },
            {
                title: "Formação Intensiva em Direito do Trabalho na Prática",
                description: "Programa aprofundado focado na aplicação real do Direito do Trabalho no contexto empresarial angolano.",
                date: "01 - 06 de Junho",
                time: "17:00 - 20:00",
                location: "Instituto Sapiens, Luanda",
                type: "Formação",
                mode: "Presencial",
                price: "Sob consulta",
                status: "upcoming",
                featured: true,
                includedItems: ["Certificado de Participação", "Casos Práticos", "Coffee Break"],
                coverImage: ""
            },
            {
                title: "Formação Especial em Sociedades Comerciais",
                description: "Capacitação técnica sobre constituição, gestão e funcionamento de sociedades comerciais em Angola.",
                date: "06 - 11 de Julho",
                time: "17:00 - 20:00",
                location: "Instituto Sapiens, Luanda",
                type: "Formação",
                mode: "Presencial",
                price: "Sob consulta",
                status: "upcoming",
                featured: false,
                includedItems: ["Certificado", "Modelos de Contratos", "Manual de Boas Práticas"],
                coverImage: ""
            },
            {
              title: "IMERSÃO JURÍDICA: Imergir para forma. Ermergir para Transformar",
              description: "O Maior Palco Jurídico Angolano de volta para uma edição histórica.",
              date: "24 de Abril",
              time: "14:00 - 18:30",
              location: "Palácio da Justiça, Luanda",
              type: "Imersão",
              mode: "Presencial",
              price: "Sob consulta",
              status: "upcoming",
              featured: true,
              includedItems: ["Certificado", "Networking VIP", "Material Exclusivo"],
              coverImage: ""
            },
            {
                title: "Imersão em Direito Imobiliário e Sucessório",
                description: "Workshop focado em regularização de terras, escrituras públicas e gestão de heranças no contexto imobiliário.",
                date: "A definir",
                time: "14:00 - 20:00",
                location: "Luanda, Angola",
                type: "Imersão",
                mode: "Presencial",
                price: "Sob consulta",
                status: "upcoming",
                featured: false,
                includedItems: ["Consultoria Coletiva", "Checklist de Documentação", "Networking VIP"],
                coverImage: ""
            },
            {
              title: "Conferência Anual de Legal Tech Angola 2024",
              description: "Discutindo o futuro da tecnologia e inovação no sector jurídico angolano.",
              date: "08 de Abril",
              time: "08:30 - 18:00",
              location: "Hotel Epic Sana, Luanda",
              type: "Conferência",
              mode: "Presencial",
              price: "Sob consulta",
              status: "upcoming",
              featured: true,
              includedItems: ["Acesso Completo", "Coffee Break", "Brindes Exclusivos"],
              coverImage: ""
            }
        ];

        for (const event of sampleEvents) {
            await ctx.db.insert("events", event);
        }

        return "Data populated with actual LB Conexão content from social and media search.";
    },
});
