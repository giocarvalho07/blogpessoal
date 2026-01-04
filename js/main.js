document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos do DOM ---
    const htmlElement = document.documentElement;
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeNameSpan = document.getElementById('theme-name');

    // --- Lógica do Dark Mode (Versão Simplificada) ---

    // Função para ATUALIZAR a aparência dos botões conforme o tema
    const updateThemeUI = () => {
        const isDark = htmlElement.classList.contains('dark');
        if (isDark) {
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
            if (themeNameSpan) themeNameSpan.textContent = 'Light';
        } else {
            themeToggleLightIcon.classList.add('hidden');
            themeToggleDarkIcon.classList.remove('hidden');
            if (themeNameSpan) themeNameSpan.textContent = 'Dark';
        }
    };

    // AO CARREGAR A PÁGINA: Verifica o localStorage. O HTML já é 'dark' por padrão.
    // Só precisamos mudar se o usuário salvou o tema 'light' anteriormente.
    if (localStorage.getItem('theme') === 'light') {
        htmlElement.classList.remove('dark');
    }
    updateThemeUI(); // Atualiza a UI dos botões no carregamento

    // Função para ALTERNAR o tema ao clicar
    const toggleTheme = () => {
        const isDark = htmlElement.classList.contains('dark');
        if (isDark) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeUI(); // Atualiza a UI dos botões após a troca
    };

    // Adiciona o evento de clique aos botões
    darkModeToggle.addEventListener('click', toggleTheme);
    darkModeToggleMobile.addEventListener('click', toggleTheme);

    // --- Lógica do Menu Hambúrguer ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Lógica da Rolagem Suave (Smooth Scroll) ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Lógica do Carrossel ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;
    if (carouselItems.length > 0) {
        setInterval(() => {
            carouselItems[currentItem].classList.remove('active', 'opacity-100');
            carouselItems[currentItem].classList.add('opacity-0');

            currentItem = (currentItem + 1) % carouselItems.length;

            carouselItems[currentItem].classList.add('active', 'opacity-100');
            carouselItems[currentItem].classList.remove('opacity-0');
        }, 5000);
    }

    // --- Lógica de Atraso nos Botões de Contato (Novo) ---
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const btnEmail = document.getElementById('btn-email');

    const handleContactClick = (event, element, originalContent) => {
        event.preventDefault();
        
        // Evita cliques múltiplos
        if (element.classList.contains('loading')) return;
        element.classList.add('loading');

        // Altera o conteúdo para Loading (mantendo o estilo)
        element.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Carregando...
        `;

        const targetUrl = element.getAttribute('href');
        const targetTarget = element.getAttribute('target');

        setTimeout(() => {
            if (targetTarget === '_blank') {
                window.open(targetUrl, '_blank');
            } else {
                window.location.href = targetUrl;
            }
            
            // Restaura o botão após o redirecionamento
            element.innerHTML = originalContent;
            element.classList.remove('loading');
        }, 3000); // 3 segundos de delay
    };

    if (btnWhatsapp) {
        const originalContent = btnWhatsapp.innerHTML;
        btnWhatsapp.addEventListener('click', (e) => handleContactClick(e, btnWhatsapp, originalContent));
    }

    if (btnEmail) {
        const originalContent = btnEmail.innerHTML;
        btnEmail.addEventListener('click', (e) => handleContactClick(e, btnEmail, originalContent));
    }


    // --- Lógica de Tradução ---
    const translations = {
        'pt-BR': {
            'nav-about': 'Sobre',
            'nav-experience': 'Experiência',
            'nav-skills': 'Competências',
            'nav-courses': 'Cursos',
            'nav-mentoring': 'Mentoria',
            'nav-lectures': 'Palestras',
            'nav-contact': 'Fale Comigo',
            'back-button': 'Voltar',
            'hero-title': 'Software Engineer <span class="text-gray-500 !dark:text-gray-400">|</span> Full Stack Developer',
            'about-title': 'Sobre',
            'about-text-1': 'Engenheiro de Software com experiência sólida no desenvolvimento de aplicações web robustas e escaláveis. Especialista no ecossistema Java (Spring Framework) e em tecnologias de front-end modernas como Angular. Focado em entregar código de alta qualidade, seguindo boas práticas de arquitetura e metodologias ágeis para resolver problemas complexos de negócio.',
            'lectures-title': 'Palestras e <span class="text-gray-500 !dark:text-gray-400">Apresentações</span>',
            'lectures-page-title': 'Palestras e Apresentações',
            'lectures-text-1': 'Aqui listarei as palestras e workshops que ministrei, com links para os materiais e gravações, quando disponíveis. Conteúdo em breve.',
            'community-title': 'Comunidade <span class="text-gray-500 !dark:text-gray-400">Tech</span>',
            'community-text-1': 'Em breve, mais informações sobre as comunidades de tecnologia das quais participo e recomendo. Este é um espaço para compartilhar conhecimento e fortalecer o networking.',
            'community-button': 'Conhecer mais',
            'experience-title': 'Experiência Profissional',
            'job-title-1': 'Software Engineer',
            'company-1': 'Banco Bradesco',
            'period-1': 'Ago 2025 – Atual',
            'description-1': 'Especialista em modernização de sistemas, atuando desde a sustentação de mainframes até a construção de arquiteturas seguras em microsserviços na nuvem Azure, com foco em IAM, práticas de SRE e metodologias ágeis.',
            'job-title-2': 'Full Stack Developer',
            'company-2': 'Tokio Marine Seguradora',
            'period-2': 'Jun 2025 – Jul 2025',
            'description-2': 'Desenvolvimento full-stack e modernização de plataformas críticas, com domínio em Java/Spring, arquiteturas de microsserviços e frontends modernos, integrando práticas de DevOps/SRE e governança técnica para garantir a escalabilidade e observabilidade de sistemas de alta complexidade.',
            'job-title-3': 'Software Analyst',
            'company-3': 'Getnet',
            'period-3': 'Mar 2024 – Fev 2025',
            'description-3': 'Liderei a implantação global de governança via JIRA e o desenvolvimento de soluções full-stack (Java/Spring, React/Vue) integradas a pipelines de dados, unindo a gestão ágil de squads à entrega estratégica de KPIs e automação para áreas de negócio.',
            'job-title-4': 'Software Engineer',
            'company-4': 'Itaú Unibanco',
            'period-4': 'Mar 2020 – Fev 2024',
            'description-4': 'Desenvolvimento de soluções escaláveis em nuvem (AWS), unindo a modernização de sistemas críticos (PIX/Mainframe) ao desenvolvimento de microsserviços (Java/Spring, Angular) orientados a eventos.',
            'job-title-5': 'Developer',
            'company-5': 'Plataforma Verde',
            'period-5': 'Dez 2019 – Mar 2020',
            'description-5': 'Desenvolvedor Python focado em soluções SaaS e Blockchain, com expertise em arquitetura de dados e visualização estratégica (Power BI) para gestão ESG e monitoramento de clientes B2B em ambientes ágeis.',
            'education-title': 'Formação Acadêmica',
            'degree-1': 'Bacharelado em Sistemas de Informação',
            'university-1': 'Centro Universitário de Maringá (UniCesumar)',
            'education-period-1': 'Concluído em 2021',
            'postgrad-title': 'Pós-graduação em...',
            'postgrad-university': 'Instituição...',
            'postgrad-period': 'Em breve',
            'skills-title': 'Principais Competências',
            'backend-title': 'Back-end',
            'frontend-title': 'Front-end',
            'database-title': 'Banco de Dados',
            'tools-title': 'Ferramentas e Metodologias',
            'contact-me-title': 'Fale Comigo',
            'contact-name': 'Nome',
            'contact-email': 'Email',
            'contact-message': 'Mensagem',
            'contact-placeholder-name': 'Seu nome completo',
            'contact-placeholder-email': 'seu.email@exemplo.com',
            'contact-placeholder-message': 'Deixe sua mensagem aqui...',
            'contact-send': 'Enviar Mensagem',
            'contact-whatsapp-prompt': 'Prefere um contato mais direto?',
            'contact-whatsapp-button': 'Fale pelo WhatsApp',
            'contact-email-button': 'E-mail',
            'footer-text': '© 2025 Giovanni Carvalho Mendes. Todos os direitos reservados.',
            'courses-page-title': 'Cursos Gratuitos',
            'courses-page-text-1': 'Uma seleção de cursos e materiais gratuitos que considero de grande valor para quem está começando ou se aprofundando na área de tecnologia.',
            'mentoring-page-title': 'Mentoria',
            'mentoring-page-text-1': 'Interessado em mentoria de carreira ou técnica? Em breve, abrirei horários para conversarmos sobre seus desafios e objetivos profissionais.',
            'mentoring-button': 'Saiba mais',
            'mobile-dark-mode-toggle': 'Mudar para',
            'theme-name-dark': 'Dark',
            'theme-name-light': 'Light',
            'contact-prompt': 'Entre em contato:',
        },
        'en': {
            'nav-about': 'About',
            'nav-experience': 'Experience',
            'nav-skills': 'Skills',
            'nav-courses': 'Courses',
            'nav-mentoring': 'Mentoring',
            'nav-lectures': 'Lectures',
            'nav-contact': 'Contact Me',
            'back-button': 'Back',
            'hero-title': 'Software Engineer <span class="text-gray-500 !dark:text-gray-400">|</span> Full Stack Developer',
            'about-title': 'About Me',
            'about-text-1': 'Software Engineer with solid experience in developing robust and scalable web applications. Specialist in the Java ecosystem (Spring Framework) and modern front-end technologies like Angular. Focused on delivering high-quality code, following good architecture practices and agile methodologies to solve complex business problems.',
            'lectures-title': 'Lectures and <span class="text-gray-500 !dark:text-gray-400">Presentations</span>',
            'lectures-page-title': 'Lectures and Presentations',
            'lectures-text-1': 'Here I will list the lectures and workshops I have given, with links to materials and recordings, when available. Content coming soon.',
            'community-title': 'Tech <span class="text-gray-500 !dark:text-gray-400">Community</span>',
            'community-text-1': 'More information about the tech communities I participate in and recommend will be available soon. This is a space to share knowledge and strengthen networking.',
            'community-button': 'Learn more',
            'experience-title': 'Professional Experience',
            'job-title-1': 'Software Engineer',
            'company-1': 'Banco Bradesco',
            'period-1': 'Aug 2025 – Present',
            'description-1': 'Specialist in system modernization, working from mainframe support to building secure microservices architectures in the Azure cloud, focusing on IAM, SRE practices, and agile methodologies.',
            'job-title-2': 'Full Stack Developer',
            'company-2': 'Tokio Marine Seguradora',
            'period-2': 'Jun 2025 – Jul 2025',
            'description-2': 'Full-stack development and modernization of critical platforms, with expertise in Java/Spring, microservices architectures, and modern frontends, integrating DevOps/SRE practices and technical governance to ensure scalability and observability of highly complex systems.',
            'job-title-3': 'Software Analyst',
            'company-3': 'Getnet',
            'period-3': 'Mar 2024 – Feb 2025',
            'description-3': 'Led global governance implementation via JIRA and full-stack solution development (Java/Spring, React/Vue) integrated with data pipelines, combining agile squad management with strategic KPI delivery and automation for business areas.',
            'job-title-4': 'Software Engineer',
            'company-4': 'Itaú Unibanco',
            'period-4': 'Mar 2020 – Feb 2024',
            'description-4': 'Development of scalable cloud solutions (AWS), combining the modernization of critical systems (PIX/Mainframe) with the development of event-driven microservices (Java/Spring, Angular).',
            'job-title-5': 'Developer',
            'company-5': 'Plataforma Verde',
            'period-5': 'Dec 2019 – Mar 2020',
            'description-5': 'Python developer focused on SaaS and Blockchain solutions, with expertise in data architecture and strategic visualization (Power BI) for ESG management and B2B client monitoring in agile environments.',
            'education-title': 'Academic Background',
            'degree-1': 'Bachelor in Information Systems',
            'university-1': 'University Center of Maringá (UniCesumar)',
            'education-period-1': 'Completed in 2021',
            'postgrad-title': 'Post-graduation in...',
            'postgrad-university': 'Institution...',
            'postgrad-period': 'Coming soon',
            'skills-title': 'Main Skills',
            'backend-title': 'Back-end',
            'frontend-title': 'Front-end',
            'database-title': 'Database',
            'tools-title': 'Tools and Methodologies',
            'contact-me-title': 'Contact Me',
            'contact-name': 'Name',
            'contact-email': 'Email',
            'contact-message': 'Message',
            'contact-placeholder-name': 'Your full name',
            'contact-placeholder-email': 'your.email@example.com',
            'contact-placeholder-message': 'Leave your message here...',
            'contact-send': 'Send Message',
            'contact-whatsapp-prompt': 'Prefer a more direct contact?',
            'contact-whatsapp-button': 'Chat via WhatsApp',
            'contact-email-button': 'E-mail',
            'footer-text': '© 2025 Giovanni Carvalho Mendes. All rights reserved.',
            'courses-page-title': 'Free Courses',
            'courses-page-text-1': 'A selection of free courses and materials that I consider of great value for those starting or deepening in the technology area.',
            'mentoring-page-title': 'Mentoring',
            'mentoring-page-text-1': 'Interested in career or technical mentoring? Soon, I will open slots to discuss your professional challenges and goals.',
            'mentoring-button': 'Learn more',
            'mobile-dark-mode-toggle': 'Switch to',
            'theme-name-dark': 'Dark',
            'theme-name-light': 'Light',
            'contact-prompt': 'Contact Me:',
        },
        'es': {
            'nav-about': 'Acerca de',
            'nav-experience': 'Experiencia',
            'nav-skills': 'Habilidades',
            'nav-courses': 'Cursos',
            'nav-mentoring': 'Mentoría',
            'nav-lectures': 'Charlas',
            'nav-contact': 'Contáctame',
            'back-button': 'Volver',
            'hero-title': 'Ingeniero de Software <span class="text-gray-500 !dark:text-gray-400">|</span> Desarrollador Full Stack',
            'about-title': 'Acerca de mí',
            'about-text-1': 'Ingeniero de Software con sólida experiencia en el desarrollo de aplicaciones web robustas e escalables. Especialista en el ecosistema Java (Spring Framework) y en tecnologías front-end modernas como Angular. Enfocado en entregar código de alta calidad, siguiendo buenas prácticas de arquitectura y metodologías ágiles para resolver problemas de negocio complejos.',
            'lectures-title': 'Charlas y <span class="text-gray-500 !dark:text-gray-400">Presentaciones</span>',
            'lectures-page-title': 'Charlas y Presentaciones',
            'lectures-text-1': 'Aquí listaré las charlas y talleres que he impartido, con enlaces a los materiales y grabaciones, cuando estén disponibles. Contenido próximamente.',
            'community-title': 'Comunidad <span class="text-gray-500 !dark:text-gray-400">Tecnológica</span>',
            'community-text-1': 'Próximamente, más información sobre las comunidades tecnológicas en las que participo y recomiendo. Este es un espacio para compartir conocimientos y fortalecer el networking.',
            'community-button': 'Saber más',
            'experience-title': 'Experiencia Profesional',
            'job-title-1': 'Ingeniero de Software',
            'company-1': 'Banco Bradesco',
            'period-1': 'Ago 2025 – Actual',
            'description-1': 'Especialista en modernización de sistemas, actuando desde el soporte de mainframes hasta la construcción de arquitecturas seguras en microservicios en la nube de Azure, con enfoque en IAM, prácticas de SRE y metodologías ágiles.',
            'job-title-2': 'Desarrollador Full Stack',
            'company-2': 'Tokio Marine Seguradora',
            'period-2': 'Jun 2025 – Jul 2025',
            'description-2': 'Desarrollo full-stack y modernización de plataformas críticas, con dominio en Java/Spring, arquitecturas de microservicios y frontends modernos, integrando prácticas de DevOps/SRE y gobernanza técnica para garantizar la escalabilidad y observabilidad de sistemas de alta complejidad.',
            'job-title-3': 'Analista de Software',
            'company-3': 'Getnet',
            'period-3': 'Mar 2024 – Feb 2025',
            'description-3': 'Lideré la implementación global de gobernanza a través de JIRA y el desarrollo de soluciones full-stack (Java/Spring, React/Vue) integradas con pipelines de datos, uniendo la gestión ágil de equipos a la entrega estratégica de KPIs y automatización para áreas de negocio.',
            'job-title-4': 'Ingeniero de Software',
            'company-4': 'Itaú Unibanco',
            'period-4': 'Mar 2020 – Feb 2024',
            'description-4': 'Desarrollo de soluciones escalables en la nube (AWS), uniendo la modernización de sistemas críticos (PIX/Mainframe) con el desarrollo de microservicios (Java/Spring, Angular) orientados a eventos.',
            'job-title-5': 'Desarrollador',
            'company-5': 'Plataforma Verde',
            'period-5': 'Dic 2019 – Mar 2020',
            'description-5': 'Desarrollador Python enfocado en soluciones SaaS y Blockchain, con experiencia en arquitectura de datos y visualización estratégica (Power BI) para la gestión ESG y el monitoreo de clientes B2B en entornos ágiles.',
            'education-title': 'Formación Académica',
            'degree-1': 'Licenciatura en Sistemas de Información',
            'university-1': 'Centro Universitario de Maringá (UniCesumar)',
            'education-period-1': 'Concluido en 2021',
            'skills-title': 'Habilidades Principales',
            'backend-title': 'Back-end',
            'frontend-title': 'Front-end',
            'database-title': 'Base de Datos',
            'tools-title': 'Herramientas y Metodologías',
            'contact-me-title': 'Contáctame',
            'contact-name': 'Nombre',
            'contact-email': 'Correo electrónico',
            'contact-message': 'Mensaje',
            'contact-placeholder-name': 'Tu nombre completo',
            'contact-placeholder-email': 'tu.email@ejemplo.com',
            'contact-placeholder-message': 'Deja tu mensaje aquí...',
            'contact-send': 'Enviar Mensagem',
            'contact-whatsapp-prompt': '¿Prefieres un contacto más directo?',
            'contact-whatsapp-button': 'Chatear por WhatsApp',
            'contact-email-button': 'E-mail',
            'footer-text': '© 2025 Giovanni Carvalho Mendes. Todos los derechos reservados.',
            'courses-page-title': 'Cursos Gratuitos',
            'courses-page-text-1': 'Una selección de cursos y materiales gratuitos que considero de gran valor para quienes se inician o profundizan en el área de la tecnología.',
            'mentoring-page-title': 'Mentoría',
            'mentoring-page-text-1': '¿Interesado en mentoría profesional o técnica? Próximamente, abriré espacios para conversar sobre tus desafíos y objetivos profesionales.',
            'mentoring-button': 'Saber más',
            'mobile-dark-mode-toggle': 'Cambiar a',
            'theme-name-dark': 'Oscuro',
            'theme-name-light': 'Claro',
            'contact-prompt': 'Contáctame:',
        }
    };

    window.translatePage = (lang) => {
        if (lang === 'pt-br') {
            lang = 'pt-BR';
        }
        const currentTranslations = translations[lang];
        if (!currentTranslations) {
            console.warn(`No translations found for language: ${lang}`);
            return;
        }

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (currentTranslations[key]) {
                // Handle specific cases like input placeholders
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', currentTranslations[key]);
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', currentTranslations[key]);
                } else {
                    // Se o botão estiver em loading, não atualiza o texto para não remover o spinner
                    if (!element.classList.contains('loading')) {
                        element.innerHTML = currentTranslations[key];
                    }
                }
            }
        });

        // Update the lang attribute of the html tag
        document.documentElement.lang = lang;

        // Store the selected language in localStorage
        localStorage.setItem('selectedLanguage', lang);
    };

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt-BR'; // Default to Portuguese
    translatePage(savedLanguage);
});
