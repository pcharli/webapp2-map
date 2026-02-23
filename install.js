// Variable pour stocker l'événement d'installation
let deferredPrompt;

export function initInstall() {
  const installContainer = document.getElementById('install');
  const installBtn = document.getElementById('install-btn');

  // Par défaut, on cache le bouton au chargement
  installContainer.classList.add('hidden');

  // Écouter l'événement que le navigateur envoie si l'app est installable
  window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher Chrome d'afficher sa propre bannière automatique
    e.preventDefault();
    // Stocker l'événement pour l'utiliser plus tard
    deferredPrompt = e;
    // Afficher notre propre bouton
    installContainer.classList.remove('hidden');
  });

  // Action au clic sur le bouton
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Afficher la boîte de dialogue d'installation native
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('L\'utilisateur a installé l\'app');
      // On cache le bouton définitivement
      installContainer.classList.add('hidden');
      deferredPrompt = null;
    } else {
      console.log('L\'utilisateur a refusé');
      // On laisse le bouton affiché (ne rien faire)
    }
  });

  // Si l'application est déjà installée, on cache le bouton
  window.addEventListener('appinstalled', () => {
    installContainer.classList.add('hidden');
    deferredPrompt = null;
    console.log('PWA installée avec succès');
  });
}