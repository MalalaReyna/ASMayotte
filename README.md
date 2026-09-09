# Frontend du frontoffice A&S Mayotte
 
## Variables d'environnement
À mettre dans `.env` :
- `FRONT_URL={url_du_front}`
- `NEXT_PUBLIC_API_URL={url_api_backend}`
- `NEXT_PUBLIC_BACK_URL={url_backend}`
- `AUTH_SECRET={valeur_random_cryptage_jwt}`
- `ANTHROPIC_API_KEY={claude_platform_api_key}`
- `AUTH_TRUST_AUTH=true`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY={clé_public_stripe}`

## Parcours fonctionnels
### Création d'entreprise
Le parcours de création passe par le wizard `(/wizard)`.
Les étapes du formulaire récupèrent les données métiers depuis le back, puis envoient la demande de création et la session de paiement.
La page de réponse vérifie ensuite le paiement côté API avant d’afficher le succès ou l’échec.

### Modification d'entreprise
La page “modifier mon entreprise” est une page de présentation reliée aux contenus servis par le back.
Elle prépare le futur parcours de modification d’entreprise et reprend la même logique de contenu dynamique que les autres services.

### Gestion administrative
Cette partie sert de point d’entrée pour le flux “wizard puis génération de contrat”.
Le contrat est généré via l’endpoint interne `/api/contracts/generate`, qui appelle Claude et retourne un HTML/CSS de contrat à partir des données envoyées.
Mais il faut encore l'adapter

### Réponse aux marchés publics
La page “réponse marché public” est alimentée par le back pour les contenus de service.
Elle s’appuie aussi sur des données dynamiques pour guider la constitution du dossier et la mise en avant de l’expérience marchés.

## Ce qui est déjà dynamique avec le back
- Les contenus des pages services sont récupérés dynamiquement via `getServiceBySlug` / `getAllServices`.
- Le wizard de création d’entreprise charge les juridictions légales et les secteurs d’activité depuis l’API.
- La création d’entreprise envoie la demande au back et récupère la session de paiement.
- La vérification du paiement est faite côté API via `/verify-session`.
- La génération de contrat passe déjà par Claude via l’endpoint `/api/contracts/generate`.
- Les sections marchés publics utilisent aussi des données d’activité chargées depuis l’API.

## Point important
Le login admin doit être une page séparée du login actuel.
Le back doit donc exposer un nouveau endpoint dédié pour l’authentification admin, afin de ne pas mélanger le flux frontoffice et le flux admin.
