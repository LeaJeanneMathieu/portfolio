// Système de défilement des projets avec vitesse contrôlée et reprise du scroll corrigée
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration des thèmes de couleur
    const colorThemes = {
        default: {
            background: 'url("assets/fond1.png")',
            textColor: '#aaa37f',
            mouseIcon: 'assets/icone.png',
            accentColor: '#aaa37f',
            projectsTitle: '#aaa37f',
            projectsIntro: '#aaa37f',
            contactIntro: '#aaa37f',
            socialText: '#aaa37f',
            buttonBg: 'linear-gradient(135deg, #aaa37f 0%, #BAB38F 50%, #aaa37f 100%)',
            buttonBorder: '#9A936F',
            projectsLine: 'linear-gradient(90deg, #aaa37f, #BAB38F)',
            pencilLine: 'linear-gradient(90deg, #aaa37f 0%, #BAB38F 50%, #aaa37f 100%)',
            socialBg: 'rgba(170, 163, 127, 0.9)',
            socialBorder: 'rgba(170, 163, 127, 0.5)',
            buttonShadow: 'rgba(170, 163, 127, 0.4)',
            scrollbarThumb: 'rgba(170, 163, 127, 0.6)',
            scrollbarThumbHover: 'rgba(170, 163, 127, 0.8)',
            scrollbarThumbActive: 'rgba(170, 163, 127, 1)',
            scrollbarBorder: 'rgba(170, 163, 127, 0.3)',
            scrollbarBorderHover: 'rgba(170, 163, 127, 0.5)',
            stickers: {
                coeur: 'assets/sticker1-green.png',
                cachet: 'assets/sticker2-green.png',
                lettre: 'assets/sticker3-green.png'
            },
            signature: 'assets/signature green.png'
        },
        color1: {
            background: 'url("assets/fond2.png")',
            textColor: '#E8A8A0',
            mouseIcon: 'assets/icon2.png',
            accentColor: ' rgba(255, 112, 112, 1)',
            projectsTitle: ' rgba(255, 112, 112, 1)',
            projectsIntro: ' rgba(255, 112, 112, 1)',
            contactIntro: ' rgba(255, 112, 112, 1)',
            socialText: ' rgba(255, 112, 112, 1)',
            buttonBg: 'linear-gradient(135deg, #E8A8A0 0%, #F0B8B0 50%, #E8A8A0 100%)',
            buttonBorder: '#D49A90',
            projectsLine: 'linear-gradient(90deg, #E8A8A0, #F0B8B0)',
            pencilLine: 'linear-gradient(90deg, #E8A8A0 0%, #F0B8B0 50%, #E8A8A0 100%)',
            socialBg: 'rgba(232, 168, 160, 0.9)',
            socialBorder: 'rgba(232, 168, 160, 0.5)',
            buttonShadow: 'rgba(232, 168, 160, 0.4)',
            scrollbarThumb: 'rgba(232, 168, 160, 0.6)',
            scrollbarThumbHover: 'rgba(232, 168, 160, 0.8)',
            scrollbarThumbActive: 'rgba(232, 168, 160, 1)',
            scrollbarBorder: 'rgba(232, 168, 160, 0.3)',
            scrollbarBorderHover: 'rgba(232, 168, 160, 0.5)',
            stickers: {
                coeur: 'assets/sr.png',
                cachet: 'assets/sticker7.png',
                lettre: 'assets/sticker10.png'
            },
            signature: 'assets/signature.png'
        },
        color2: {
            background: 'url("assets/fond3.png")',
            textColor: '#B5B2EA',
            mouseIcon: 'assets/icon3.png',
            accentColor: '#B5B2EA',
            projectsTitle: '#B5B2EA',
            projectsIntro: '#B5B2EA',
            contactIntro: '#B5B2EA',
            socialText: '#B5B2EA',
            buttonBg: 'linear-gradient(135deg, #B5B2EA 0%, #C5C2F0 50%, #B5B2EA 100%)',
            buttonBorder: '#A5A2DA',
            projectsLine: 'linear-gradient(90deg, #B5B2EA, #C5C2F0)',
            pencilLine: 'linear-gradient(90deg, #B5B2EA 0%, #C5C2F0 50%, #B5B2EA 100%)',
            socialBg: 'rgba(181, 178, 234, 0.9)',
            socialBorder: 'rgba(181, 178, 234, 0.5)',
            buttonShadow: 'rgba(181, 178, 234, 0.4)',
            scrollbarThumb: 'rgba(181, 178, 234, 0.6)',
            scrollbarThumbHover: 'rgba(181, 178, 234, 0.8)',
            scrollbarThumbActive: 'rgba(181, 178, 234, 1)',
            scrollbarBorder: 'rgba(181, 178, 234, 0.3)',
            scrollbarBorderHover: 'rgba(181, 178, 234, 0.5)',
            stickers: {
                coeur: 'assets/sticker1-violet.png',
                cachet: 'assets/sticker2-violet.png',
                lettre: 'assets/sticker3-violet.png'
            },
            signature: 'assets/signature violet.png'
        }
    };
    
    // Éléments à modifier
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const heroName = document.querySelector('.hero__name');
    const mouseIcon = document.querySelector('.role-icon');
    const colorButtons = document.querySelectorAll('.color-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Nouveaux éléments à colorer
    const projectsTitle = document.querySelector('.projects-title');
    const projectsIntro = document.querySelector('.projects__intro h2');
    const contactIntro = document.querySelector('.contact-intro');
    const socialText = document.querySelector('.social-text');
    const contactButton = document.querySelector('.button');
    
    // Gestion du menu mobile
    let isMenuOpen = false;
    
    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            menuItems.style.opacity = '1';
            menuItems.style.visibility = 'visible';
            menuItems.style.transform = 'translateY(0)';
            menuToggle.style.transform = 'scale(1.1) rotate(5deg)';
        } else {
            menuItems.style.opacity = '0';
            menuItems.style.visibility = 'hidden';
            menuItems.style.transform = 'translateY(-10px)';
            menuToggle.style.transform = 'scale(1) rotate(0deg)';
        }
    }
    
    // Ajouter l'événement de clic sur le menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            isMenuOpen = false;
            menuItems.style.opacity = '0';
            menuItems.style.visibility = 'hidden';
            menuItems.style.transform = 'translateY(-10px)';
            menuToggle.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Fermer le menu quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !menuItems.contains(e.target)) {
            isMenuOpen = false;
            menuItems.style.opacity = '0';
            menuItems.style.visibility = 'hidden';
            menuItems.style.transform = 'translateY(-10px)';
            menuToggle.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // Fermer le menu sur mobile avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            menuItems.style.opacity = '0';
            menuItems.style.visibility = 'hidden';
            menuItems.style.transform = 'translateY(-10px)';
            menuToggle.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    

    
    // Fonction pour changer le thème
    function changeColorTheme(themeName) {
        const theme = colorThemes[themeName];
        if (!theme) return;
        
        // Changer le background du header
        if (header) {
            header.style.backgroundImage = theme.background;
        }
        
        // Changer la couleur du nom
        if (heroName) {
            heroName.style.color = theme.textColor;
        }
        
        // Changer l'icône de souris
        if (mouseIcon) {
            mouseIcon.src = theme.mouseIcon;
        }
        
        // Changer les couleurs du menu
        if (menuToggle) {
            menuToggle.style.borderColor = theme.textColor;
            menuToggle.style.color = theme.textColor;
            
            // Fond plus contrasté pour les thèmes rose et violet
            if (themeName === 'color1' || themeName === 'color2') {
                menuToggle.style.background = 'rgba(255, 255, 255, 0.98)'; // Plus opaque
                menuToggle.style.backdropFilter = 'blur(20px)'; // Effet de flou plus prononcé
            } else {
                menuToggle.style.background = 'rgba(255, 255, 255, 0.95)';
                menuToggle.style.backdropFilter = 'blur(15px)';
            }
            
            // Ajouter une ombre colorée au bouton
            menuToggle.style.boxShadow = `
                0 4px 15px rgba(0, 0, 0, 0.15),
                0 0 0 4px rgba(255, 255, 255, 0.9),
                0 0 20px ${theme.textColor}50
            `;
        }
        
        if (menuItems) {
            menuItems.style.borderColor = theme.textColor;
            menuItems.style.borderWidth = '4px'; // Bordure plus épaisse pour plus de visibilité
            
            // Fond plus contrasté pour les thèmes rose et violet
            if (themeName === 'color1' || themeName === 'color2') {
                menuItems.style.background = 'rgba(255, 255, 255, 0.98)'; // Plus opaque
                menuItems.style.backdropFilter = 'blur(20px)'; // Effet de flou plus prononcé
            } else {
                menuItems.style.background = 'rgba(255, 255, 255, 0.95)';
                menuItems.style.backdropFilter = 'blur(15px)';
            }
            
            // Ajouter une ombre colorée à la liste
            menuItems.style.boxShadow = `
                0 8px 25px rgba(0, 0, 0, 0.15),
                0 0 0 2px rgba(255, 255, 255, 0.9),
                0 0 30px ${theme.textColor}40
            `;

        }
        
        if (menuLinks.length > 0) {
            menuLinks.forEach(link => {
                link.style.setProperty('--hover-color', theme.textColor);
                // Ajouter une ombre colorée au survol
                link.style.setProperty('--hover-shadow', `0 4px 15px ${theme.textColor}50`);
            });

        }
        
        // Mettre à jour les classes de thème sur la section hero pour le contour en pointillés
        if (heroSection) {
            // Supprimer toutes les classes de thème existantes
            heroSection.classList.remove('theme-color1', 'theme-color2');
            
            // Ajouter la classe de thème appropriée
            if (themeName === 'color1') {
                heroSection.classList.add('theme-color1');
            } else if (themeName === 'color2') {
                heroSection.classList.add('theme-color2');
            }

        }
        
        // Colorer les titres des projets
        if (projectsTitle) {
            projectsTitle.style.color = theme.projectsTitle;

        }
        
        // Colorer l'intro des projets
        if (projectsIntro) {
            projectsIntro.style.color = theme.projectsIntro;

        }
        
        // Colorer l'intro du contact
        if (contactIntro) {
            contactIntro.style.color = theme.contactIntro;

        }
        
        // Colorer le texte des réseaux sociaux
        if (socialText) {
            socialText.style.color = theme.socialText;

        }
        
        // Colorer le bouton de contact
        if (contactButton) {
            contactButton.style.background = theme.buttonBg;
            contactButton.style.borderColor = theme.buttonBorder;
            contactButton.style.boxShadow = `
                0 8px 25px ${theme.buttonShadow},
                0 4px 15px ${theme.buttonShadow},
                inset 0 2px 0 rgba(255, 255, 255, 0.6)
            `;

        }
        
        // Colorer la ligne sous "Mes projets"
        const projectsLineStyle = document.createElement('style');
        projectsLineStyle.id = 'projects-line-style';
        projectsLineStyle.textContent = `
            .projects-title::before {
                background: ${theme.projectsLine} !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldProjectsLineStyle = document.querySelector('#projects-line-style');
        if (oldProjectsLineStyle) oldProjectsLineStyle.remove();
        
        document.head.appendChild(projectsLineStyle);
        
        // Colorer la ligne animée dans "À propos"
        const pencilLineStyle = document.createElement('style');
        pencilLineStyle.id = 'pencil-line-style';
        pencilLineStyle.textContent = `
            .pencil-underline {
                background: ${theme.pencilLine} !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldPencilLineStyle = document.querySelector('#pencil-line-style');
        if (oldPencilLineStyle) oldPencilLineStyle.remove();
        
        document.head.appendChild(pencilLineStyle);
        
        // Colorer les logos des réseaux sociaux
        const socialStyle = document.createElement('style');
        socialStyle.id = 'social-style';
        socialStyle.textContent = `
            .social a {
                background: ${theme.socialBg} !important;
                border-color: ${theme.socialBorder} !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldSocialStyle = document.querySelector('#social-style');
        if (oldSocialStyle) oldSocialStyle.remove();
        
        document.head.appendChild(socialStyle);
        
        // Changer les stickers selon le thème
        if (theme.stickers) {
            const stickerCoeur = document.querySelector('.sticker-coeur');
            const stickerCachet = document.querySelector('.sticker-cachet');
            const stickerLettre = document.querySelector('.sticker-lettre');
            
            if (stickerCoeur) {
                stickerCoeur.src = theme.stickers.coeur;
            }
            
            if (stickerCachet) {
                stickerCachet.src = theme.stickers.cachet;
            }
            
            if (stickerLettre) {
                stickerLettre.src = theme.stickers.lettre;
            }
        }
        
        // Changer la signature selon le thème
        if (theme.signature) {
            const signature = document.querySelector('.signature-absolute');
            if (signature) {
                signature.src = theme.signature;
            }
        }
        
        // Appliquer les couleurs aux variables CSS personnalisées
        document.documentElement.style.setProperty('--clr-primary', theme.textColor);
        document.documentElement.style.setProperty('--clr-accent', theme.accentColor);
        document.documentElement.style.setProperty('--clr-projects-title', theme.projectsTitle);
        document.documentElement.style.setProperty('--clr-projects-intro', theme.projectsIntro);
        document.documentElement.style.setProperty('--clr-accent-strong', theme.contactIntro);
        
        // Appliquer les couleurs de scrollbar des projets
        const projectsScrollbarStyle = document.createElement('style');
        projectsScrollbarStyle.id = 'projects-scrollbar-style';
        projectsScrollbarStyle.textContent = `
            .projects-cover::-webkit-scrollbar-thumb {
                background: ${theme.scrollbarThumb} !important;
                border-color: ${theme.scrollbarBorder} !important;
            }
            .projects-cover::-webkit-scrollbar-thumb:hover {
                background: ${theme.scrollbarThumbHover} !important;
                border-color: ${theme.scrollbarBorderHover} !important;
            }
            .projects-cover::-webkit-scrollbar-thumb:active {
                background: ${theme.scrollbarThumbActive} !important;
            }
            .projects-cover {
                scrollbar-color: ${theme.scrollbarThumb} transparent !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldProjectsScrollbarStyle = document.querySelector('#projects-scrollbar-style');
        if (oldProjectsScrollbarStyle) oldProjectsScrollbarStyle.remove();
        
        document.head.appendChild(projectsScrollbarStyle);
        
        // Mettre à jour l'état actif des boutons
        colorButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.color === themeName) {
                btn.classList.add('active');
            }
        });
        
        // Sauvegarder le choix dans le localStorage
        localStorage.setItem('selectedTheme', themeName);
    }
    
    // Ajouter les événements aux boutons de couleur
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = this.dataset.color;
            changeColorTheme(selectedTheme);
        });
    });
    
    // Restaurer le thème sauvegardé au chargement
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && colorThemes[savedTheme]) {
        changeColorTheme(savedTheme);
    } else {
        // Appliquer le thème par défaut
        changeColorTheme('default');
    }
});

// =======================
// Gestion des modales des projets
// =======================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectFigures = document.querySelectorAll('.project__figure');
    const projectDetails = document.querySelectorAll('.project-details');

    // Ouvrir la modale au clic sur un projet
    projectFigures.forEach(figure => {
        figure.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Fermer la modale avec le bouton de fermeture
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    // Fermer la modale en cliquant à l'extérieur
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    function openProjectModal(projectId) {
        // Masquer tous les détails des projets
        projectDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        // Afficher les détails du projet sélectionné
        const selectedProject = document.querySelector(`.project-details[data-project="${projectId}"]`);
        
        if (selectedProject) {
            selectedProject.classList.add('active');
        }

        // Afficher la modale
        if (projectModal) {
            projectModal.classList.add('show');
            
            // Appliquer les couleurs du projet
            applyProjectColors(projectId);
            
            // Animation d'ouverture fluide
            animateModalOpen();
        }
        
        // Bloquer le scroll de la page avec la classe CSS
        document.body.classList.add('modal-open');
        
        // Empêcher la propagation du scroll de la modale vers la page
        preventModalScrollPropagation();
        
        // Focus sur le bouton de fermeture pour l'accessibilité
        if (modalClose) {
            modalClose.focus();
        }
    }

    function closeProjectModal() {
        // Lancer l'animation de fermeture
        animateModalClose(() => {
            // Une fois l'animation terminée, masquer la modale
            if (projectModal) {
                projectModal.classList.remove('show');
            }
            
            // Restaurer le scroll de la page
            document.body.classList.remove('modal-open');
            
            // Réactiver le scroll normal
            removeModalScrollPrevention();
            
            // Masquer tous les détails des projets
            projectDetails.forEach(detail => {
                detail.classList.remove('active');
            });
        });
    }
    
    // Fonction pour empêcher la propagation du scroll
    function preventModalScrollPropagation() {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            // Empêcher seulement la propagation, pas le scroll lui-même
            modalContent.addEventListener('wheel', preventScrollPropagation, { passive: false });
            modalContent.addEventListener('touchmove', preventScrollPropagation, { passive: false });
        }
    }
    
    // Fonction pour réactiver le scroll normal
    function removeModalScrollPrevention() {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.removeEventListener('wheel', preventScrollPropagation);
            modalContent.removeEventListener('touchmove', preventScrollPropagation);
        }
    }
    
    // Fonction pour empêcher seulement la propagation du scroll
    function preventScrollPropagation(e) {
        // Permettre le scroll dans la modale
        const modalContent = e.currentTarget;
        const scrollTop = modalContent.scrollTop;
        const scrollHeight = modalContent.scrollHeight;
        const clientHeight = modalContent.clientHeight;
        
        // Si on est au début et qu'on scroll vers le haut, empêcher la propagation
        if (scrollTop <= 0 && e.deltaY < 0) {
            e.preventDefault();
            e.stopPropagation();
        }
        // Si on est à la fin et qu'on scroll vers le bas, empêcher la propagation
        else if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
            e.preventDefault();
            e.stopPropagation();
        }
        // Sinon, permettre le scroll normal dans la modale
        // mais empêcher la propagation vers la page
        e.stopPropagation();
    }
    

    
    // =======================
    // Ouverture simple des maquettes en grand
    // =======================
    
    // Configuration des couleurs par projet
    const projectColors = {
        '1': {
            primary: '#B8C5D1',      // Gris pastel pour UrbanHeaven
            secondary: '#D1D9E3',    // Gris très pastel
            accent: '#5A6B7A',       // Gris moyen
            background: 'rgba(184, 197, 209, 0.25)',
            modalBg: 'rgba(184, 197, 209, 0.15)',
            scrollbar: '#B8C5D1',
            line: '#B8C5D1'
        },
        '2': {
            primary: '#52603A',      // Vert foncé pour GreenWave
            secondary: '#7A8A5A',    // Vert moyen
            accent: '#3A4A2A',       // Vert très foncé
            background: 'rgba(82, 96, 58, 0.25)',
            modalBg: 'rgba(82, 96, 58, 0.15)',
            scrollbar: '#52603A',
            line: '#52603A'
        },
        '3': {
            primary: '#976730',      // Marron doré pour Luxuria
            secondary: '#B8863A',    // Marron doré plus clair
            accent: '#6B4A20',       // Marron doré foncé
            background: 'rgba(151, 103, 48, 0.25)',
            modalBg: 'rgba(151, 103, 48, 0.15)',
            scrollbar: '#976730',
            line: '#976730'
        },
        '4': {
            primary: '#001A4E',      // Bleu foncé pour NovaTech
            secondary: '#1A2B6B',    // Bleu moyen
            accent: '#000B2E',       // Bleu très foncé
            background: 'rgba(0, 26, 78, 0.25)',
            modalBg: 'rgba(0, 26, 78, 0.15)',
            scrollbar: '#001A4E',
            line: '#001A4E'
        }
    };
    
    // Créer la modale
    function createMaquetteModal() {
        if (document.querySelector('.maquette-zoom-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'maquette-zoom-modal';
        modal.innerHTML = `
            <div class="maquette-zoom-content">
                <button class="maquette-zoom-close" title="Fermer" aria-label="Fermer la modale">×</button>
                <div class="maquette-zoom-scroll">
                    <img class="maquette-zoom-img" src="" alt="Maquette en grand">
                </div>
                <div class="maquette-zoom-info">Cliquez en dehors ou appuyez sur Échap pour fermer</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bouton de fermeture
        const closeBtn = modal.querySelector('.maquette-zoom-close');
        closeBtn.addEventListener('click', closeMaquetteModal);
        
        // Événements pour fermer la modale
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeMaquetteModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeMaquetteModal();
            }
        });
    }
    
    function openMaquetteModal(imgSrc, projectId) {
        const modal = document.querySelector('.maquette-zoom-modal');
        const img = modal.querySelector('.maquette-zoom-img');
        const content = modal.querySelector('.maquette-zoom-content');
        const info = modal.querySelector('.maquette-zoom-info');
        
        img.src = imgSrc;
        
        // Attendre que l'image soit chargée pour ajuster l'affichage
        img.onload = function() {
            // Réinitialiser le scroll
            const scrollContainer = modal.querySelector('.maquette-zoom-scroll');
            scrollContainer.scrollTop = 0;
            scrollContainer.scrollLeft = 0;
        };
        
        // Appliquer la couleur du projet
        if (projectColors[projectId]) {
            const colors = projectColors[projectId];
            content.style.borderColor = colors.background;
            content.style.boxShadow = `0 20px 60px ${colors.background}`;
            info.style.color = colors.text;
        } else {
            // Couleur par défaut
            content.style.borderColor = 'rgba(233, 175, 163, 0.9)';
            content.style.boxShadow = '0 20px 60px rgba(233, 175, 163, 0.9)';
            info.style.color = '#8B4513';
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Lancer l'animation d'ouverture
        animateMaquetteModalOpen();
    }
    
    function closeMaquetteModal() {
        // Lancer l'animation de fermeture
        animateMaquetteModalClose(() => {
            // Une fois l'animation terminée, masquer la modale
            const modal = document.querySelector('.maquette-zoom-modal');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // =======================
    // Animation fluide de la modale de zoom des maquettes
    // =======================
    
    function animateMaquetteModalOpen() {
        const modal = document.querySelector('.maquette-zoom-modal');
        const content = modal.querySelector('.maquette-zoom-content');
        const img = modal.querySelector('.maquette-zoom-img');
        
        if (!modal || !content || !img) return;
        
        // État initial - simple et élégant
        content.style.transform = 'scale(0.8) translateY(40px)';
        content.style.opacity = '0';
        content.style.filter = 'blur(2px)';
        
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        
        // Animation fluide
        let startTime = null;
        const duration = 450; // Légèrement plus long que les modales de projets
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Courbe d'easing simple et élégante
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Animation du contenu
            const scale = 0.8 + (0.2 * easeOut);
            const translateY = 40 - (40 * easeOut);
            const opacity = easeOut;
            const blur = 2 - (2 * easeOut);
            
            content.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            content.style.opacity = opacity;
            content.style.filter = `blur(${blur}px)`;
            
            // Animation de l'arrière-plan
            const backdropBlur = 8 * easeOut;
            const bgOpacity = 0.1 + (0.8 * easeOut);
            modal.style.backdropFilter = `blur(${backdropBlur}px)`;
            modal.style.backgroundColor = `rgba(0, 0, 0, ${bgOpacity})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation terminée, nettoyer les styles
                content.style.transform = '';
                content.style.opacity = '';
                content.style.filter = '';
                modal.style.backdropFilter = '';
                modal.style.backgroundColor = '';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // =======================
    // Animation de fermeture de la modale de zoom des maquettes
    // =======================
    
    function animateMaquetteModalClose(callback) {
        const modal = document.querySelector('.maquette-zoom-modal');
        const content = modal.querySelector('.maquette-zoom-content');
        
        if (!modal || !content) {
            // Si les éléments n'existent pas, exécuter le callback immédiatement
            if (callback) callback();
            return;
        }
        
        // État initial - partir de l'état final de l'ouverture
        content.style.transform = 'scale(1) translateY(0px)';
        content.style.opacity = '1';
        content.style.filter = 'blur(0px)';
        
        modal.style.backdropFilter = 'blur(8px)';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        
        // Animation de fermeture (inverse de l'ouverture)
        let startTime = null;
        const duration = 350; // Légèrement plus rapide que l'ouverture
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Courbe d'easing pour la fermeture (plus rapide au début)
            const easeIn = Math.pow(progress, 2);
            
            // Animation du contenu (inverse de l'ouverture)
            const scale = 1 - (0.2 * easeIn); // De 1 à 0.8
            const translateY = 0 + (40 * easeIn); // De 0 à 40px
            const opacity = 1 - easeIn; // De 1 à 0
            const blur = 0 + (2 * easeIn); // De 0 à 2px
            
            content.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            content.style.opacity = opacity;
            content.style.filter = `blur(${blur}px)`;
            
            // Animation de l'arrière-plan (inverse de l'ouverture)
            const backdropBlur = 8 - (8 * easeIn); // De 8 à 0
            const bgOpacity = 0.9 - (0.8 * easeIn); // De 0.9 à 0.1
            modal.style.backdropFilter = `blur(${backdropBlur}px)`;
            modal.style.backgroundColor = `rgba(0, 0, 0, ${bgOpacity})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation terminée, nettoyer les styles et exécuter le callback
                content.style.transform = '';
                content.style.opacity = '';
                content.style.filter = '';
                modal.style.backdropFilter = '';
                modal.style.backgroundColor = '';
                
                // Exécuter le callback pour continuer la fermeture
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Fonction pour empêcher le scroll
    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // Ajouter les événements sur les maquettes
    function addMaquetteEvents() {
        const maquettes = document.querySelectorAll('.maquette-full');
        maquettes.forEach(maquette => {
            maquette.addEventListener('click', function() {
                const imgSrc = this.src;
                
                // Détecter le projet en fonction de l'image
                let projectId = 'default';
                if (imgSrc.includes('projet1')) projectId = '1';
                else if (imgSrc.includes('projet2')) projectId = '2';
                else if (imgSrc.includes('projet3')) projectId = '3';
                else if (imgSrc.includes('projet4')) projectId = '4';
                
                openMaquetteModal(imgSrc, projectId);
            });
        });
    }
    
    // Initialiser le système
    createMaquetteModal();
    addMaquetteEvents();
    
    // =======================
    // Application des couleurs par projet
    // =======================
    
    function applyProjectColors(projectId) {
        const colors = projectColors[projectId];
        if (!colors) {
            return;
        }
        
        // Appliquer les couleurs aux éléments de la modale
        const modalContent = document.querySelector('.modal-content');
        const projectModal = document.querySelector('.project-modal');
        const projectHeader = document.querySelector('.project-details.active .project-header h2');
        const projectCategory = document.querySelector('.project-details.active .project-category');
        const projectLinks = document.querySelectorAll('.project-details.active .project-link');
        const modalClose = document.querySelector('.modal-close');
        
        // Fond de la modale
        if (projectModal) {
            projectModal.style.background = `linear-gradient(135deg, ${colors.modalBg} 0%, rgba(255, 248, 234, 0.85) 100%)`;
        }
        
        // Contenu de la modale
        if (modalContent) {
            modalContent.style.borderColor = colors.primary;
            modalContent.style.boxShadow = `0 20px 60px ${colors.primary}40`;
            modalContent.style.background = `rgba(255, 255, 255, 0.92)`;
        }
        
        // Titre principal
        if (projectHeader) {
            projectHeader.style.color = colors.primary;
        }
        
        // Catégorie
        if (projectCategory) {
            projectCategory.style.background = colors.background;
            projectCategory.style.borderColor = colors.primary;
            projectCategory.style.color = colors.accent;
        }
        
        // Tous les titres h3 et h4
        const allTitles = document.querySelectorAll('.project-details.active h3, .project-details.active h4');
        allTitles.forEach(title => {
            if (title.tagName === 'H3') {
                title.style.color = colors.primary;
            } else if (title.tagName === 'H4') {
                title.style.color = colors.accent;
            }
        });
        
        // Boutons de liens
        if (projectLinks.length > 0) {
            projectLinks.forEach(link => {
                link.style.background = colors.primary;
                link.style.borderColor = colors.primary;
                link.style.color = 'white';
            });
        }
        
        // Bouton de fermeture
        if (modalClose) {
            modalClose.style.borderColor = colors.primary;
            modalClose.style.color = colors.primary;
            modalClose.style.background = `rgba(255, 255, 255, 0.95)`;
        }
        
        // Titre de la maquette
        const maquetteTitle = document.querySelector('.project-details.active .project-maquette h3');
        if (maquetteTitle) {
            maquetteTitle.style.color = colors.primary;
        }
        
        // Contour et style de la maquette
        const maquetteImg = document.querySelector('.project-details.active .maquette-full');
        if (maquetteImg) {
            maquetteImg.style.borderColor = colors.primary;
            maquetteImg.style.boxShadow = `0 10px 30px ${colors.primary}40, 0 0 0 2px rgba(255, 255, 255, 0.8)`;
        }
        
        // Ligne décorative sous le titre principal (via CSS custom property)
        document.documentElement.style.setProperty('--project-line-color', colors.line);
        
        // Puces des listes (éléments à côté du texte)
        const listItems = document.querySelectorAll('.project-details.active .project-description li');
        listItems.forEach(li => {
            li.style.setProperty('--project-bullet-color', colors.primary);
        });
        
        // Appliquer les couleurs aux puces via CSS
        const style = document.createElement('style');
        style.textContent = `
            .project-details.active .project-description li::before {
                color: ${colors.primary} !important;
            }
            .project-details.active .project-header::after {
                background: ${colors.line} !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldStyle = document.querySelector('#project-colors-style');
        if (oldStyle) oldStyle.remove();
        
        style.id = 'project-colors-style';
        document.head.appendChild(style);
        
        // Scrollbar personnalisée
        const modalScrollbar = document.querySelector('.modal-content');
        if (modalScrollbar) {
            modalScrollbar.style.setProperty('--scrollbar-color', colors.scrollbar);
        }
        
        // Appliquer les couleurs CSS personnalisées
        document.documentElement.style.setProperty('--project-primary', colors.primary);
        document.documentElement.style.setProperty('--project-secondary', colors.secondary);
        document.documentElement.style.setProperty('--project-accent', colors.accent);
        document.documentElement.style.setProperty('--project-scrollbar', colors.scrollbar);
    }
    
    // =======================
    // Animation fluide de la modale
    // =======================
    
    function animateModalOpen() {
        const modalContent = document.querySelector('.modal-content');
        const modalOverlay = document.querySelector('.project-modal');
        
        if (!modalContent || !modalOverlay) return;
        
        // État initial - simple et élégant
        modalContent.style.transform = 'scale(0.9) translateY(30px)';
        modalContent.style.opacity = '0';
        modalContent.style.filter = 'blur(1px)';
        
        modalOverlay.style.backdropFilter = 'blur(0px)';
        modalOverlay.style.backgroundColor = 'rgba(233, 175, 163, 0.1)';
        
        // Animation fluide
        let startTime = null;
        const duration = 400; // 400ms pour un effet rapide et dynamique
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Courbe d'easing simple et élégante
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Animation du contenu
            const scale = 0.9 + (0.1 * easeOut);
            const translateY = 30 - (30 * easeOut);
            const opacity = easeOut;
            const blur = 1 - (1 * easeOut);
            
            modalContent.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            modalContent.style.opacity = opacity;
            modalContent.style.filter = `blur(${blur}px)`;
            
            // Animation de l'arrière-plan
            const backdropBlur = 10 * easeOut;
            const bgOpacity = 0.1 + (0.85 * easeOut);
            modalOverlay.style.backdropFilter = `blur(${backdropBlur}px)`;
            modalOverlay.style.backgroundColor = `rgba(233, 175, 163, ${bgOpacity})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation terminée, nettoyer les styles
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
                modalContent.style.filter = '';
                modalOverlay.style.backdropFilter = '';
                modalOverlay.style.backgroundColor = '';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // =======================
    // Animation de fermeture de la modale
    // =======================
    
    function animateModalClose(callback) {
        const modalContent = document.querySelector('.modal-content');
        const modalOverlay = document.querySelector('.project-modal');
        
        if (!modalContent || !modalOverlay) {
            // Si les éléments n'existent pas, exécuter le callback immédiatement
            if (callback) callback();
            return;
        }
        
        // État initial - partir de l'état final de l'ouverture
        modalContent.style.transform = 'scale(1) translateY(0px)';
        modalContent.style.opacity = '1';
        modalContent.style.filter = 'blur(0px)';
        
        modalOverlay.style.backdropFilter = 'blur(10px)';
        modalOverlay.style.backgroundColor = 'rgba(233, 175, 163, 0.95)';
        
        // Animation de fermeture (inverse de l'ouverture)
        let startTime = null;
        const duration = 300; // Légèrement plus rapide que l'ouverture pour un effet dynamique
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Courbe d'easing pour la fermeture (plus rapide au début)
            const easeIn = Math.pow(progress, 2);
            
            // Animation du contenu (inverse de l'ouverture)
            const scale = 1 - (0.1 * easeIn); // De 1 à 0.9
            const translateY = 0 + (30 * easeIn); // De 0 à 30px
            const opacity = 1 - easeIn; // De 1 à 0
            const blur = 0 + (1 * easeIn); // De 0 à 1px
            
            modalContent.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            modalContent.style.opacity = opacity;
            modalContent.style.filter = `blur(${blur}px)`;
            
            // Animation de l'arrière-plan (inverse de l'ouverture)
            const backdropBlur = 10 - (10 * easeIn); // De 10 à 0
            const bgOpacity = 0.95 - (0.85 * easeIn); // De 0.95 à 0.1
            modalOverlay.style.backdropFilter = `blur(${backdropBlur}px)`;
            modalOverlay.style.backgroundColor = `rgba(233, 175, 163, ${bgOpacity})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation terminée, nettoyer les styles et exécuter le callback
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
                modalContent.style.filter = '';
                modalOverlay.style.backdropFilter = '';
                modalOverlay.style.backgroundColor = '';
                
                // Exécuter le callback pour continuer la fermeture
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(animate);
    }
});

// =======================
// Animation des stickers de la section contact
// =======================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Observer l'intersection de la section contact
    const contactSection = document.querySelector('#contact');
    
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajouter la classe pour déclencher les animations
                    contactSection.classList.add('stickers-animate');
                } else {
                    // Retirer la classe pour réinitialiser les animations
                    contactSection.classList.remove('stickers-animate');
                }
            });
        }, {
            threshold: 0.3, // Déclencher quand 30% de la section est visible
            rootMargin: '0px 0px -100px 0px' // Déclencher un peu avant
        });
        
        contactObserver.observe(contactSection);
    }
});
