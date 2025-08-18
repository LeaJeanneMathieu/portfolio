// Système de défilement des projets avec vitesse contrôlée et reprise du scroll corrigée
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== SYSTÈME DE CHANGEMENT DE COULEUR ===');
    
    // Configuration des thèmes de couleur
    const colorThemes = {
        default: {
            background: 'url("assets/fond1.png")',
            textColor: '#aaa37f',
            mouseIcon: 'assets/icone.png'
        },
        color1: {
            background: 'url("assets/fond2.png")',
            textColor: '#E8A8A0',
            mouseIcon: 'assets/icon2.png'
        },
        color2: {
            background: 'url("assets/fond3.png")',
            textColor: '#B5B2EA',
            mouseIcon: 'assets/icon3.png'
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
        
        console.log(`🎨 Changement vers le thème: ${themeName}`);
        
        // Changer le background du header
        if (header) {
            header.style.backgroundImage = theme.background;
            console.log('✅ Background du header mis à jour');
        }
        
        // Changer la couleur du nom
        if (heroName) {
            heroName.style.color = theme.textColor;
            console.log('✅ Couleur du nom mise à jour');
        }
        
        // Changer l'icône de souris
        if (mouseIcon) {
            mouseIcon.src = theme.mouseIcon;
            console.log('✅ Icône de souris mise à jour');
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
            console.log('✅ Couleurs et ombre du bouton menu mises à jour');
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
            console.log('✅ Couleur et ombre de la bordure du menu mises à jour');
        }
        
        if (menuLinks.length > 0) {
            menuLinks.forEach(link => {
                link.style.setProperty('--hover-color', theme.textColor);
                // Ajouter une ombre colorée au survol
                link.style.setProperty('--hover-shadow', `0 4px 15px ${theme.textColor}50`);
            });
            console.log('✅ Couleurs et ombres des liens du menu mises à jour');
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
            console.log('✅ Classes de thème de la section hero mises à jour');
        }
        
        // Mettre à jour l'état actif des boutons
        colorButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.color === themeName) {
                btn.classList.add('active');
            }
        });
        
        // Sauvegarder le choix dans le localStorage
        localStorage.setItem('selectedTheme', themeName);
        console.log('💾 Thème sauvegardé dans le localStorage');
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
        console.log('🔄 Thème restauré:', savedTheme);
    } else {
        // Appliquer le thème par défaut
        changeColorTheme('default');
        console.log('🎯 Thème par défaut appliqué');
    }
    
    console.log('✅ Système de changement de couleur activé');
    console.log('=== FIN DU SYSTÈME DE COULEUR ===');
});

// =======================
// Gestion des modales des projets
// =======================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== SYSTÈME DE MODALES DES PROJETS ===');
    
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectFigures = document.querySelectorAll('.project__figure');
    const projectDetails = document.querySelectorAll('.project-details');

    console.log('🔍 Éléments trouvés:', {
        modal: projectModal,
        closeBtn: modalClose,
        figures: projectFigures.length,
        details: projectDetails.length
    });

    // Ouvrir la modale au clic sur un projet
    projectFigures.forEach(figure => {
        figure.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            console.log('🖱️ Clic sur le projet:', projectId);
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
        console.log('🚀 Ouverture de la modale pour le projet:', projectId);
        console.log('🚀 Type de projectId:', typeof projectId);
        
        // Masquer tous les détails des projets
        projectDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        // Afficher les détails du projet sélectionné
        const selectedProject = document.querySelector(`.project-details[data-project="${projectId}"]`);
        console.log('📋 Projet sélectionné:', selectedProject);
        
        if (selectedProject) {
            selectedProject.classList.add('active');
            console.log('✅ Projet activé');
        } else {
            console.log('❌ Projet non trouvé');
        }

        // Afficher la modale
        if (projectModal) {
            projectModal.classList.add('show');
            console.log('✅ Modale affichée');
            
            // Appliquer les couleurs du projet
            console.log('🎨 Appel de applyProjectColors avec:', projectId);
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
        console.log('🔒 Fermeture de la modale');
        
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
    
    console.log('✅ Système de modales activé');
    console.log('=== FIN DU SYSTÈME DE MODALES ===');
    
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
        console.log('🎨 Projet détecté:', projectId);
        if (projectColors[projectId]) {
            const colors = projectColors[projectId];
            content.style.borderColor = colors.background;
            content.style.boxShadow = `0 20px 60px ${colors.background}`;
            info.style.color = colors.text;
            console.log('✅ Couleurs appliquées:', colors);
        } else {
            // Couleur par défaut
            content.style.borderColor = 'rgba(233, 175, 163, 0.9)';
            content.style.boxShadow = '0 20px 60px rgba(233, 175, 163, 0.9)';
            info.style.color = '#8B4513';
            console.log('⚠️ Couleurs par défaut appliquées');
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMaquetteModal() {
        const modal = document.querySelector('.maquette-zoom-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
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
        console.log('🔍 Recherche des couleurs pour le projet:', projectId);
        console.log('🔍 projectColors disponibles:', Object.keys(projectColors));
        
        const colors = projectColors[projectId];
        if (!colors) {
            console.log('❌ Aucune couleur trouvée pour le projet:', projectId);
            return;
        }
        
        console.log('🎨 Application des couleurs pour le projet:', projectId, colors);
        console.log('🎨 Couleur primaire:', colors.primary);
        console.log('🎨 Couleur de ligne:', colors.line);
        
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
});

// =======================
// Animation des stickers de la section contact
// =======================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== SYSTÈME D\'ANIMATION DES STICKERS ===');
    
    // Observer l'intersection de la section contact
    const contactSection = document.querySelector('#contact');
    
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🎬 Section contact visible, lancement des animations des stickers');
                    
                    // Ajouter la classe pour déclencher les animations
                    contactSection.classList.add('stickers-animate');
                    
                    // Arrêter l'observation après le premier déclenchement
                    contactObserver.unobserve(contactSection);
                    
                    console.log('✅ Animations des stickers activées');
                }
            });
        }, {
            threshold: 0.3, // Déclencher quand 30% de la section est visible
            rootMargin: '0px 0px -100px 0px' // Déclencher un peu avant
        });
        
        contactObserver.observe(contactSection);
        console.log('👁️ Observateur des stickers configuré');
    } else {
        console.log('❌ Section contact non trouvée');
    }
    
    console.log('✅ Système d\'animation des stickers activé');
    console.log('=== FIN DU SYSTÈME DES STICKERS ===');
});
