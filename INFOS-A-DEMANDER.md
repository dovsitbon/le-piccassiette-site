# Le Piccassiette : infos à demander au bistro

Pour chaque réponse, le fichier à modifier est indiqué entre parenthèses.

1. **Son prénom (ou ceux des patrons) et l'histoire du nom « Piccassiette ».** Une fiche en ligne cite Bastien et Omar : à confirmer. Picassiette, pique-assiette, la mosaïque d'éclats d'assiettes… d'où vient le nom ? (`locales/fr.json`, `locales/en.json`)
2. **La carte complète, les plats du moment et les prix.** Sandwichs (lesquels ?), banh mi (garnitures ?), bo bun, salade, plat du jour, tartiflette (quand ?), planches (contenu, tailles), boissons. (`data/carte.json`, `data/plat-du-jour.json`)
3. **La liste des rhums arrangés** (parfums du moment, prix au verre, à la bouteille ?). (`data/carte.json → parfums`)
4. **Les horaires exacts.** Le lundi est-il fermé ? (une fiche en ligne l'indique ouvert de 9 h 30 à 22 h). Fermetures de fin d'année, congés. (`data/horaires.json`, `data/annonces.json`)
5. **La privatisation** : possible ? Pour combien de personnes, quels jours, conditions ? (`locales/*.json → blocks.privat`, FAQ)
6. **Un portable pour WhatsApp** (le 03 22 22 00 15 est un fixe). (`data/site.json → whatsapp`)
7. **L'e-mail** qui recevra les commandes et les réservations (lepiccassiette.amiens@gmail.com, celle de Facebook ?). À mettre dans la variable Vercel `ORDER_NOTIFY_EMAIL`, avec une clé Resend (`RESEND_API_KEY`).
8. **Des photos** : la façade, la salle (et sa mosaïque si elle existe), le bar et les bocaux de rhum, le bo bun, le banh mi, un sandwich, la tartiflette, une planche. Liste détaillée et noms de fichiers : `assets/A-PHOTOGRAPHIER.md`.
9. **Le logo** de l'enseigne, s'il en existe un (sinon on garde le logo typographique). (`public/logo.svg`, `public/logo-light.svg`)
10. **Le SIRET** (et le nom du responsable de la publication) pour les mentions légales. (`data/site.json → legal`)
11. **Les moyens de paiement** (carte, espèces, titres-restaurant ?) et l'accord pour le paiement en ligne plus tard (Stripe, déjà prévu, désactivé).
12. **L'accord pour reprendre quelques vrais avis Google** sur le site. (`data/avis.json`)
13. **Le parking le plus proche** à conseiller. (`locales/*.json → infos.accessText`)
14. **Instagram** : y a-t-il un compte ? (`data/site.json → instagram`)
