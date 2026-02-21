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
                title: "Masterclass: Contabilidade Jurídica para Escritórios de Advogados",
                description: "Aprenda a gerir as finanças do seu escritório com foco nas particularidades fiscais e contributivas de Angola.",
                date: "25 de Maio, 2025",
                time: "10:00 - 13:00",
                location: "Centro de Conferências de Talatona, Luanda",
                type: "Workshop",
                mode: "Presencial",
                price: "25.000 AKZ",
                status: "upcoming",
                featured: true,
                includedItems: ["Certificado", "Apostila de Gestão Financeira", "Planilha de Fluxo de Caixa para Advogados"],
                coverImage: ""
            },
            {
                title: "Conferência Online: Responsabilidade Criminal das Pessoas Coletivas",
                description: "Um debate necessário sobre como as empresas angolanas podem prevenir crimes corporativos e garantir o compliance.",
                date: "12 de Junho, 2025",
                time: "18:30 - 20:30",
                location: "Plataforma de Eventos LB (Online)",
                type: "Palestra",
                mode: "Online",
                price: "10.000 AKZ",
                status: "upcoming",
                featured: false,
                includedItems: ["Acesso à gravação", "Certificado Digital"],
                coverImage: ""
            },
            {
                title: "Imersão Jurídica V: Edição Especial de Networking",
                description: "O evento de referência para a classe jurídica volta com foco total em parcerias e expansão de mercado para jovens advogados.",
                date: "15 de Outubro, 2025",
                time: "08:30 - 17:00",
                location: "Hotel Epic Sana, Luanda",
                type: "Imersão",
                mode: "Presencial",
                price: "50.000 AKZ",
                status: "upcoming",
                featured: true,
                includedItems: ["Acesso VIP", "Lunch Buffet", "Participação em Talk-shows", "Networking Session"],
                coverImage: ""
            }
        ];

        for (const event of sampleEvents) {
            await ctx.db.insert("events", event);
        }

        return "Data populated with actual LB Conexão content from social and media search.";
    },
});
