# Le Piccassiette : contenu du site (à valider)

Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`. Tout ce qui manque est marqué **à remplir**.

## À faire valider en priorité

- **Titre du hero** : retenu « Midi gourmand, soir à l'apéro. » Deux autres options : « Le bistro qui a du caractère. » / « Bo bun, banh mi et rhums arrangés. »
- **Les prix** : aucun n'est connu. Le site affiche « Prix à l'ardoise » tant qu'ils ne sont pas dans `data/carte.json`. « à partir de » s'affiche pour les plats dont le prix varie (banh mi, sandwich, planche, verres, rhum arrangé).
- **La carte** : plats repris des thèmes des avis Google (sandwichs, bo bun, banh mi, tartiflette, apéro, rhums arrangés). Les descriptions sont génériques : garnitures, sauces, contenu des planches à préciser.
- **Les rhums arrangés** : la liste des parfums est vide (`data/carte.json → parfums`), le site dit « la liste est à l'ardoise ».
- **Les horaires** : ceux du brief. Une fiche en ligne indique aussi le lundi 9 h 30 – 22 h : à confirmer.
- **La privatisation** (anniversaires) : présentée comme « on regarde ce qui est possible ». À confirmer.
- **L'accès et le stationnement** : texte général (centre-ville, parkings publics à proximité). Nom du parking le plus proche à ajouter.
- **Les patrons** : une fiche en ligne cite Bastien et Omar. Ni leur nom ni l'histoire du nom ne sont sur le site pour l'instant.
- **La note Google** : 4,8/5 sur 53 avis, relevée le 2026-11-10 (à mettre à jour dans `data/site.json`).
- **Les avis** : aucun avis n'est affiché ni inventé. Avec l'accord du bistro, de vrais avis Google peuvent être ajoutés dans `data/avis.json`.
- **Le paiement** : la FAQ dit « sur place ». Cartes acceptées, espèces, titres-restaurant : à préciser.

## Référencement (balises title / description)

**FR** · Bistro, bo bun, banh mi et rhums arrangés à Amiens | Le Piccassiette

> Le Piccassiette, bistro du 9 rue Duméril à Amiens : sandwichs, bo bun et banh mi le midi, à emporter ou sur place, apéro, planches et rhums arrangés maison le soir. 4,8/5 sur Google.

**EN** · Bistro, bo bun, banh mi and infused rum in Amiens | Le Piccassiette

> Le Piccassiette, a neighbourhood bistro at 9 rue Duméril in Amiens: sandwiches, bo bun and banh mi at lunch, to take away or eat in, then drinks, sharing boards and house-infused rum in the evening. Rated 4.8/5 on Google.

## Horaires (data/horaires.json)

- Lundi : fermé
- Mardi : 09:30 – 22:00
- Mercredi : 09:30 – 14:30
- Jeudi : 09:30 – 22:00
- Vendredi : 09:30 – 23:30
- Samedi : 10:30 – 15:00
- Dimanche : fermé

## La carte et les prix (data/carte.json)

### Le midi / Lunch

| Plat (FR) | Dish (EN) | Prix | Commande en ligne | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Banh mi | Banh mi | **à remplir** | oui | Fait maison | Baguette croustillante, garniture marinée, crudités croquantes et herbes fraîches. Le sandwich vietnamien, fait ici. | Crusty baguette, marinated filling, crunchy pickled veg and fresh herbs. The Vietnamese sandwich, made right here. |
| Bo bun | Bo bun | **à remplir** | oui | Fait maison | Vermicelles de riz, crudités, herbes, cacahuètes et sauce maison. Frais, copieux, et ça se mange aussi au bureau. | Rice vermicelli, raw veg, herbs, peanuts and our own sauce. Fresh, generous, and it travels well to the office. |
| Le sandwich du moment | Sandwich of the moment | **à remplir** | oui | Fait maison | Un sandwich maison dont la recette tourne au gré du marché. Demandez celui du jour. | A home-made sandwich whose recipe follows the market. Ask what today's is. |
| La grande salade | The big salad | **à remplir** | oui |  | Une salade composée bien garnie, pour manger frais sans rester sur sa faim. | A well-loaded mixed salad, for a fresh lunch that still fills you up. |

### Plats du moment / Seasonal dishes

| Plat (FR) | Dish (EN) | Prix | Commande en ligne | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Le plat du jour | Dish of the day | **à remplir** | oui | Fait maison | Le plat chaud écrit sur l'ardoise ce matin. Un coup de fil et on vous dit ce que c'est. | The hot dish chalked on the board this morning. Give us a ring and we'll tell you what it is. |
| Tartiflette | Tartiflette | **à remplir** | oui | Selon la saison | Pommes de terre, reblochon fondant, lardons et oignons. Elle revient dès qu'il fait froid. | Potatoes, melting reblochon cheese, bacon and onions. It's back as soon as the weather turns cold. |

### Apéro / Drinks

| Plat (FR) | Dish (EN) | Prix | Commande en ligne | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| La planche à partager | Sharing board | **à remplir** | non | À partager | De quoi grignoter à plusieurs avec un verre. Petite ou grande, selon l'appétit de la tablée. | Something to nibble on with a drink. Small or large, depending on how hungry the table is. |
| Vins, bières et softs | Wine, beer and soft drinks | **à remplir** | non |  | Au verre ou à la bouteille, pour accompagner la planche ou finir la semaine. | By the glass or by the bottle, with a board or to wrap up the week. |

### Rhums arrangés / Infused rum

| Plat (FR) | Dish (EN) | Prix | Commande en ligne | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Rhum arrangé maison | House-infused rum | **à remplir** | non | Fait maison | Fruits, épices et rhum, laissés à macérer des semaines dans nos bocaux. Servi au verre. | Fruit, spices and rum, left to steep for weeks in our jars. Served by the glass. |

Rhums arrangés du moment : **à remplir**

## Textes du site

### nav

- `nav.skip`
  - FR : Aller au contenu
  - EN : Skip to content
- `nav.home`
  - FR : Le Piccassiette, accueil
  - EN : Le Piccassiette, home
- `nav.menu`
  - FR : Menu
  - EN : Menu
- `nav.close`
  - FR : Fermer le menu
  - EN : Close menu
- `nav.lang`
  - FR : Langue
  - EN : Language
- `nav.call`
  - FR : Appeler
  - EN : Call
- `nav.route`
  - FR : Itinéraire
  - EN : Directions
- `nav.midi`
  - FR : Le midi
  - EN : Lunch
- `nav.apero`
  - FR : L'apéro
  - EN : Drinks
- `nav.carte`
  - FR : La carte
  - EN : The menu
- `nav.infos`
  - FR : Infos
  - EN : Info
- `nav.orderCta`
  - FR : Commander pour midi
  - EN : Order for lunch
- `nav.orderShort`
  - FR : Commander
  - EN : Order
- `nav.facebook`
  - FR : Le Piccassiette sur Facebook
  - EN : Le Piccassiette on Facebook

### announce

- `announce.close`
  - FR : Fermer le bandeau
  - EN : Close banner

### intro

- `intro.skip`
  - FR : Passer
  - EN : Skip

### status

- `status.open`
  - FR : Ouvert maintenant
  - EN : Open now
- `status.closed`
  - FR : Fermé en ce moment
  - EN : Closed right now
- `status.until`
  - FR : jusqu'à {time}
  - EN : until {time}
- `status.opens`
  - FR : ouvre {day} à {time}
  - EN : opens {day} at {time}
- `status.today`
  - FR : aujourd'hui
  - EN : today
- `status.tomorrow`
  - FR : demain
  - EN : tomorrow

### hero

- `hero.eyebrow`
  - FR : Bistro · Midi & apéro · Rue Duméril, Amiens
  - EN : Bistro · Lunch & drinks · Rue Duméril, Amiens
- `hero.title`
  - FR : Midi gourmand, soir à l'apéro.
  - EN : Big lunches, easy evenings.
- `hero.sub`
  - FR : Bo bun, banh mi et sandwichs maison à midi. Planches et rhums arrangés quand le soleil se couche.
  - EN : Bo bun, banh mi and home-made sandwiches at lunchtime. Sharing boards and infused rum once the sun goes down.
- `hero.ctaOrder`
  - FR : Commander pour midi
  - EN : Order for lunch
- `hero.ctaMenu`
  - FR : Voir la carte
  - EN : See the menu
- `hero.rating`
  - FR : {value}/5
  - EN : {value}/5
- `hero.ratingCount`
  - FR : {count} avis Google
  - EN : {count} Google reviews
- `hero.ratingNote`
  - FR : Note Google relevée le {date}
  - EN : Google rating checked on {date}
- `hero.photoNote`
  - FR : Emplacement de la photo principale : la façade ou un bo bun, à prendre sur place
  - EN : Main photo slot: the shopfront or a bo bun, to be shot on site

### tiles

- `tiles.title`
  - FR : Ce qu'on sert
  - EN : What we serve
- `tiles.items.sandwichs`
  - FR : Sandwichs
  - EN : Sandwiches
- `tiles.items.bobun`
  - FR : Bo bun
  - EN : Bo bun
- `tiles.items.banhmi`
  - FR : Banh mi
  - EN : Banh mi
- `tiles.items.moment`
  - FR : Plats du moment
  - EN : Seasonal dishes
- `tiles.items.apero`
  - FR : Apéro & planches
  - EN : Drinks & boards
- `tiles.items.rhums`
  - FR : Rhums arrangés
  - EN : Infused rum

### services

- `services.title`
  - FR : En bref
  - EN : In short
- `services.items[0].title`
  - FR : Le midi à emporter
  - EN : Lunch to take away
- `services.items[0].text`
  - FR : Commandez en ligne, passez prendre.
  - EN : Order online, pick it up.
- `services.items[1].title`
  - FR : L'apéro
  - EN : Evening drinks
- `services.items[1].text`
  - FR : Planches et verres, mardi, jeudi et vendredi soir.
  - EN : Boards and glasses, Tuesday, Thursday and Friday nights.
- `services.items[2].title`
  - FR : Rhums arrangés maison
  - EN : House-infused rum
- `services.items[2].text`
  - FR : Macérés ici, servis au verre.
  - EN : Steeped here, served by the glass.
- `services.items[3].title`
  - FR : 03 22 22 00 15
  - EN : 03 22 22 00 15
- `services.items[3].text`
  - FR : Une question ? On décroche.
  - EN : A question? We pick up.

### today

- `today.eyebrow`
  - FR : Plat du moment
  - EN : Dish of the moment
- `today.title`
  - FR : Aujourd'hui à l'ardoise
  - EN : On the board today
- `today.noEntry`
  - FR : Demandez l'ardoise.
  - EN : Ask about the board.
- `today.priceBoard`
  - FR : Prix à l'ardoise
  - EN : Price on the board
- `today.call`
  - FR : Appeler le bistro
  - EN : Call the bistro

### blocks

- `blocks.midi.eyebrow`
  - FR : Le midi
  - EN : Lunch
- `blocks.midi.title`
  - FR : Rapide et gourmand.
  - EN : Quick, and properly good.
- `blocks.midi.text`
  - FR : Banh mi, bo bun, sandwich du moment. Commandez avant de partir du bureau, c'est prêt quand vous arrivez.
  - EN : Banh mi, bo bun, sandwich of the moment. Order before you leave the office and it's ready when you arrive.
- `blocks.midi.cta`
  - FR : Commander
  - EN : Order
- `blocks.apero.eyebrow`
  - FR : L'apéro
  - EN : Evening drinks
- `blocks.apero.title`
  - FR : Une planche, un rhum arrangé, et la semaine est finie.
  - EN : A board, an infused rum, and the week is done.
- `blocks.apero.text`
  - FR : Le soir, le bistro change d'humeur. Les bocaux sortent, les planches arrivent. Jusqu'à 23 h 30 le vendredi.
  - EN : In the evening the bistro changes mood. The jars come out, the boards land on the tables. Until 11:30 pm on Fridays.
- `blocks.apero.cta`
  - FR : Voir la carte
  - EN : See the menu
- `blocks.privat.eyebrow`
  - FR : Privatiser
  - EN : Private hire
- `blocks.privat.title`
  - FR : Un anniversaire ? Le bistro est à vous.
  - EN : A birthday? The bistro is yours.
- `blocks.privat.text`
  - FR : Pot de départ, anniversaire, retrouvailles. Dites-nous la date et le nombre, on regarde ce qui est possible.
  - EN : Leaving drinks, birthdays, reunions. Tell us the date and how many of you, and we'll see what we can do.
- `blocks.privat.cta`
  - FR : Nous contacter
  - EN : Get in touch

### reviews

- `reviews.eyebrow`
  - FR : Ils en parlent
  - EN : What people say
- `reviews.title`
  - FR : Noté {value}/5 par {count} clients sur Google.
  - EN : Rated {value}/5 by {count} guests on Google.
- `reviews.text`
  - FR : Ce qui revient le plus : le bo bun, le banh mi, les sandwichs, la tartiflette, les rhums arrangés et l'accueil.
  - EN : What comes up most: the bo bun, the banh mi, the sandwiches, the tartiflette, the infused rum and the welcome.
- `reviews.cta`
  - FR : Lire les avis sur Google
  - EN : Read the Google reviews

### infos

- `infos.eyebrow`
  - FR : Infos pratiques
  - EN : Practical info
- `infos.title`
  - FR : Rue Duméril, en plein centre.
  - EN : Rue Duméril, right in the centre.
- `infos.address`
  - FR : Adresse
  - EN : Address
- `infos.phone`
  - FR : Téléphone
  - EN : Phone
- `infos.hours`
  - FR : Horaires
  - EN : Opening hours
- `infos.access`
  - FR : Accès et stationnement
  - EN : Getting here and parking
- `infos.accessText`
  - FR : En plein centre-ville d'Amiens. Le plus simple : à pied, à vélo ou en bus. Plusieurs parkings publics du centre sont à quelques minutes de marche.
  - EN : Right in the centre of Amiens. Easiest on foot, by bike or by bus. Several public car parks in the centre are a few minutes' walk away.
- `infos.route`
  - FR : Itinéraire
  - EN : Directions
- `infos.mapTitle`
  - FR : Le Piccassiette sur la carte
  - EN : Le Piccassiette on the map
- `infos.days[0]`
  - FR : Lundi
  - EN : Monday
- `infos.days[1]`
  - FR : Mardi
  - EN : Tuesday
- `infos.days[2]`
  - FR : Mercredi
  - EN : Wednesday
- `infos.days[3]`
  - FR : Jeudi
  - EN : Thursday
- `infos.days[4]`
  - FR : Vendredi
  - EN : Friday
- `infos.days[5]`
  - FR : Samedi
  - EN : Saturday
- `infos.days[6]`
  - FR : Dimanche
  - EN : Sunday
- `infos.closed`
  - FR : Fermé
  - EN : Closed

### faq

- `faq.eyebrow`
  - FR : Questions
  - EN : Questions
- `faq.title`
  - FR : Les questions qu'on nous pose.
  - EN : The questions we get asked.
- `faq.items[0].q`
  - FR : Quels sont vos horaires ?
  - EN : What are your opening hours?
- `faq.items[0].a`
  - FR : Mardi et jeudi de 9 h 30 à 22 h, mercredi de 9 h 30 à 14 h 30, vendredi de 9 h 30 à 23 h 30 et samedi de 10 h 30 à 15 h. Fermé le dimanche et le lundi. Les fermetures exceptionnelles sont annoncées en haut du site.
  - EN : Tuesday and Thursday 9:30 am to 10 pm, Wednesday 9:30 am to 2:30 pm, Friday 9:30 am to 11:30 pm and Saturday 10:30 am to 3 pm. Closed on Sundays and Mondays. Any extra closures are announced at the top of the site.
- `faq.items[1].q`
  - FR : Comment commander pour midi ?
  - EN : How do I order for lunch?
- `faq.items[1].a`
  - FR : Choisissez vos plats et votre heure de retrait dans le formulaire « Commander pour midi », ou appelez le 03 22 22 00 15. Vous passez prendre, vous payez sur place.
  - EN : Pick your dishes and a pickup time in the “Order for lunch” form, or call 03 22 22 00 15. You collect, you pay on site.
- `faq.items[2].q`
  - FR : Combien de temps faut-il pour préparer une commande ?
  - EN : How long does an order take?
- `faq.items[2].a`
  - FR : Comptez au moins 20 minutes. Le formulaire ne propose que les heures encore possibles, entre 11 h 30 et 14 h.
  - EN : Allow at least 20 minutes. The form only offers times that are still possible, between 11:30 am and 2 pm.
- `faq.items[3].q`
  - FR : Faut-il réserver pour l'apéro ?
  - EN : Do I need to book for drinks?
- `faq.items[3].a`
  - FR : Ce n'est pas obligatoire, mais c'est plus sûr le vendredi soir et dès que vous venez à plusieurs. Le formulaire « Réserver pour l'apéro » prend deux minutes.
  - EN : You don't have to, but it's safer on Friday nights and whenever you come as a group. The “Book for drinks” form takes two minutes.
- `faq.items[4].q`
  - FR : Comment payer ?
  - EN : How do I pay?
- `faq.items[4].a`
  - FR : Sur place, au retrait de la commande ou en fin de repas.
  - EN : On site, when you collect your order or at the end of your meal.
- `faq.items[5].q`
  - FR : Peut-on privatiser le bistro pour un anniversaire ?
  - EN : Can we hire the bistro for a birthday?
- `faq.items[5].a`
  - FR : On en parle volontiers. Laissez la date et le nombre de personnes dans le formulaire apéro, ou appelez-nous : on regarde ensemble ce qui est possible.
  - EN : We're happy to talk about it. Leave the date and number of guests in the drinks form, or call us, and we'll see together what's possible.

### order

- `order.eyebrow`
  - FR : Le midi à emporter
  - EN : Lunch to take away
- `order.title`
  - FR : Commander pour midi
  - EN : Order for lunch
- `order.intro`
  - FR : Vos plats, votre heure, votre nom. On prépare, vous passez prendre, vous payez sur place.
  - EN : Your dishes, your time, your name. We cook, you collect, you pay on site.
- `order.itemsTitle`
  - FR : Vos plats
  - EN : Your dishes
- `order.dish`
  - FR : Plat
  - EN : Dish
- `order.quantity`
  - FR : Quantité
  - EN : Quantity
- `order.addLine`
  - FR : Ajouter un plat
  - EN : Add a dish
- `order.removeLine`
  - FR : Retirer ce plat
  - EN : Remove this dish
- `order.pickupTitle`
  - FR : Retrait
  - EN : Pickup
- `order.day`
  - FR : Jour
  - EN : Day
- `order.time`
  - FR : Heure de retrait
  - EN : Pickup time
- `order.today`
  - FR : Aujourd'hui
  - EN : Today
- `order.tomorrow`
  - FR : Demain
  - EN : Tomorrow
- `order.noSlots`
  - FR : Plus de créneau ce jour-là. Choisissez un autre jour.
  - EN : No slots left that day. Pick another day.
- `order.noDays`
  - FR : Aucun créneau de retrait dans les prochains jours. Appelez-nous.
  - EN : No pickup slots in the next few days. Give us a call.
- `order.prefsTitle`
  - FR : Remarques
  - EN : Notes
- `order.prefs.noCoriander`
  - FR : Sans coriandre
  - EN : No coriander
- `order.prefs.veggie`
  - FR : Version végé si possible
  - EN : Veggie if possible
- `order.prefs.mild`
  - FR : Pas trop épicé
  - EN : Not too spicy
- `order.message`
  - FR : Une précision, une allergie ?
  - EN : Anything to add, any allergy?
- `order.messagePh`
  - FR : Ex. : sans cacahuètes, couverts en plus…
  - EN : E.g. no peanuts, extra cutlery…
- `order.contactTitle`
  - FR : Vos coordonnées
  - EN : Your details
- `order.name`
  - FR : Nom
  - EN : Name
- `order.phone`
  - FR : Téléphone
  - EN : Phone
- `order.email`
  - FR : E-mail (facultatif)
  - EN : Email (optional)
- `order.emailHint`
  - FR : Pour recevoir le récapitulatif.
  - EN : To get a summary of your order.
- `order.total`
  - FR : Total
  - EN : Total
- `order.totalNote`
  - FR : Les prix sont à l'ardoise : le total exact vous est donné au retrait.
  - EN : Prices are on the board: you'll get the exact total when you collect.
- `order.submit`
  - FR : Envoyer la commande
  - EN : Send my order
- `order.sending`
  - FR : Envoi…
  - EN : Sending…
- `order.payNote`
  - FR : Paiement sur place, au retrait.
  - EN : Pay on site when you collect.
- `order.payOnline`
  - FR : Payer en ligne
  - EN : Pay online
- `order.callTitle`
  - FR : Plus simple au téléphone ?
  - EN : Easier by phone?
- `order.callText`
  - FR : Pendant les heures d'ouverture, on décroche.
  - EN : During opening hours, we pick up.
- `order.callCta`
  - FR : Appeler
  - EN : Call
- `order.whatsapp`
  - FR : Envoyer sur WhatsApp
  - EN : Send on WhatsApp
- `order.errors.lines`
  - FR : Choisissez au moins un plat.
  - EN : Choose at least one dish.
- `order.errors.day`
  - FR : Choisissez un jour.
  - EN : Choose a day.
- `order.errors.time`
  - FR : Choisissez une heure de retrait.
  - EN : Choose a pickup time.
- `order.errors.name`
  - FR : Indiquez votre nom.
  - EN : Please enter your name.
- `order.errors.phone`
  - FR : Indiquez un numéro de téléphone valide.
  - EN : Please enter a valid phone number.
- `order.errors.email`
  - FR : Cette adresse e-mail ne semble pas valide.
  - EN : This email address doesn't look right.
- `order.errors.send`
  - FR : La commande n'est pas partie. Appelez-nous, c'est plus sûr.
  - EN : Your order didn't go through. Please call us to be safe.
- `order.done.title`
  - FR : C'est noté !
  - EN : Got it!
- `order.done.text`
  - FR : Votre commande est partie au bistro. On vous rappelle s'il y a un souci.
  - EN : Your order is on its way to the bistro. We'll call you if there's a problem.
- `order.done.pendingTitle`
  - FR : Dernière étape : un appel
  - EN : One last step: a call
- `order.done.pendingText`
  - FR : La commande en ligne n'est pas encore branchée. Appelez-nous pour la confirmer, voici le récapitulatif.
  - EN : Online ordering isn't connected yet. Please call us to confirm, here's your summary.
- `order.done.mail`
  - FR : Le récapitulatif part à {email}.
  - EN : A summary is on its way to {email}.
- `order.done.again`
  - FR : Nouvelle commande
  - EN : New order
- `order.mail.subject`
  - FR : Commande du midi
  - EN : Lunch order
- `order.mail.title`
  - FR : Nouvelle commande à emporter
  - EN : New takeaway order
- `order.mail.lines`
  - FR : Plats
  - EN : Dishes
- `order.mail.pickup`
  - FR : Retrait
  - EN : Pickup
- `order.mail.prefs`
  - FR : Remarques
  - EN : Notes
- `order.mail.total`
  - FR : Total estimé
  - EN : Estimated total
- `order.mail.name`
  - FR : Nom
  - EN : Name
- `order.mail.phone`
  - FR : Téléphone
  - EN : Phone
- `order.mail.email`
  - FR : E-mail
  - EN : Email
- `order.mail.message`
  - FR : Message
  - EN : Message
- `order.mail.lang`
  - FR : Langue du client
  - EN : Customer language
- `order.mail.confirmSubject`
  - FR : Votre commande au Piccassiette
  - EN : Your order at Le Piccassiette
- `order.mail.confirmIntro`
  - FR : Bonjour {name}, merci pour votre commande ! La voici :
  - EN : Hello {name}, thanks for your order! Here it is:
- `order.mail.confirmOutro`
  - FR : Le Piccassiette · 9 rue Duméril, Amiens · 03 22 22 00 15. Paiement sur place, au retrait.
  - EN : Le Piccassiette · 9 rue Duméril, Amiens · +33 3 22 22 00 15. Pay on site when you collect.

### resa

- `resa.eyebrow`
  - FR : Le soir
  - EN : Evenings
- `resa.title`
  - FR : Réserver pour l'apéro
  - EN : Book for drinks
- `resa.intro`
  - FR : Une table pour l'apéro, un groupe, un anniversaire : dites-nous quand et combien.
  - EN : A table for drinks, a group, a birthday: tell us when and how many.
- `resa.date`
  - FR : Date
  - EN : Date
- `resa.time`
  - FR : Heure d'arrivée
  - EN : Arrival time
- `resa.guests`
  - FR : Nombre de personnes
  - EN : Number of guests
- `resa.occasion`
  - FR : Une occasion ? (anniversaire, pot de départ…)
  - EN : Any occasion? (birthday, leaving drinks…)
- `resa.occasionPh`
  - FR : Ex. : anniversaire, on voudrait privatiser…
  - EN : E.g. birthday, we'd like to hire the place…
- `resa.name`
  - FR : Nom
  - EN : Name
- `resa.phone`
  - FR : Téléphone
  - EN : Phone
- `resa.email`
  - FR : E-mail (facultatif)
  - EN : Email (optional)
- `resa.emailHint`
  - FR : Pour recevoir la confirmation de votre demande.
  - EN : To get a copy of your request.
- `resa.submit`
  - FR : Envoyer la demande
  - EN : Send my request
- `resa.sending`
  - FR : Envoi…
  - EN : Sending…
- `resa.note`
  - FR : Le bistro vous rappelle pour confirmer.
  - EN : The bistro will call you back to confirm.
- `resa.noTimes`
  - FR : Pas d'apéro ce jour-là : choisissez un mardi, un jeudi ou un vendredi.
  - EN : No evening drinks that day: pick a Tuesday, Thursday or Friday.
- `resa.errors.date`
  - FR : Choisissez une date.
  - EN : Choose a date.
- `resa.errors.time`
  - FR : Choisissez une heure.
  - EN : Choose a time.
- `resa.errors.guests`
  - FR : Indiquez le nombre de personnes.
  - EN : Enter the number of guests.
- `resa.errors.name`
  - FR : Indiquez votre nom.
  - EN : Please enter your name.
- `resa.errors.phone`
  - FR : Indiquez un numéro de téléphone valide.
  - EN : Please enter a valid phone number.
- `resa.errors.email`
  - FR : Cette adresse e-mail ne semble pas valide.
  - EN : This email address doesn't look right.
- `resa.errors.send`
  - FR : La demande n'est pas partie. Appelez-nous, c'est plus sûr.
  - EN : Your request didn't go through. Please call us to be safe.
- `resa.done.title`
  - FR : Demande envoyée !
  - EN : Request sent!
- `resa.done.text`
  - FR : Le bistro vous rappelle pour confirmer la table.
  - EN : The bistro will call you back to confirm your table.
- `resa.done.pendingTitle`
  - FR : Dernière étape : un appel
  - EN : One last step: a call
- `resa.done.pendingText`
  - FR : Les réservations en ligne ne sont pas encore branchées. Appelez-nous pour confirmer, voici le récapitulatif.
  - EN : Online booking isn't connected yet. Please call us to confirm, here's your summary.
- `resa.done.mail`
  - FR : Une copie part à {email}.
  - EN : A copy is on its way to {email}.
- `resa.done.again`
  - FR : Nouvelle demande
  - EN : New request
- `resa.mail.subject`
  - FR : Réservation apéro
  - EN : Drinks booking
- `resa.mail.title`
  - FR : Nouvelle demande pour l'apéro
  - EN : New drinks request
- `resa.mail.date`
  - FR : Date
  - EN : Date
- `resa.mail.time`
  - FR : Heure
  - EN : Time
- `resa.mail.guests`
  - FR : Personnes
  - EN : Guests
- `resa.mail.occasion`
  - FR : Occasion
  - EN : Occasion
- `resa.mail.name`
  - FR : Nom
  - EN : Name
- `resa.mail.phone`
  - FR : Téléphone
  - EN : Phone
- `resa.mail.email`
  - FR : E-mail
  - EN : Email
- `resa.mail.lang`
  - FR : Langue du client
  - EN : Customer language
- `resa.mail.confirmSubject`
  - FR : Votre demande au Piccassiette
  - EN : Your request at Le Piccassiette
- `resa.mail.confirmIntro`
  - FR : Bonjour {name}, merci ! Votre demande est bien arrivée :
  - EN : Hello {name}, thank you! Your request has arrived:
- `resa.mail.confirmOutro`
  - FR : Ce n'est pas encore une confirmation : le bistro vous rappelle. Le Piccassiette · 9 rue Duméril, Amiens · 03 22 22 00 15.
  - EN : This isn't a confirmation yet: the bistro will call you back. Le Piccassiette · 9 rue Duméril, Amiens · +33 3 22 22 00 15.

### footer

- `footer.tagline`
  - FR : Bistro de quartier, rue Duméril. Le midi on mange, le soir on trinque.
  - EN : Neighbourhood bistro on rue Duméril. At lunch we eat, in the evening we raise a glass.
- `footer.menu`
  - FR : La carte
  - EN : The menu
- `footer.order`
  - FR : Commander pour midi
  - EN : Order for lunch
- `footer.legal`
  - FR : Mentions légales
  - EN : Legal notice
- `footer.rights`
  - FR : © {year} Le Piccassiette, Amiens
  - EN : © {year} Le Piccassiette, Amiens

### gallery

- `gallery.eyebrow`
  - FR : En vrai
  - EN : For real
- `gallery.title`
  - FR : Rue Duméril, sans filtre.
  - EN : Rue Duméril, no filter.
- `gallery.intro`
  - FR : Des assiettes servies au Piccassiette, photographiées par le bistro et ses clients.
  - EN : Plates served at Le Piccassiette, photographed by the bistro and its guests.
- `gallery.note`
  - FR : Photos publiées sur la page Facebook et la fiche Google du bistro.
  - EN : Photos published on the bistro's Facebook page and Google listing.

### carte (textes autour de la carte)

- `carte.eyebrow`
  - FR : La carte
  - EN : The menu
- `carte.title`
  - FR : De quoi tenir jusqu'au soir.
  - EN : Enough to keep you going till evening.
- `carte.intro`
  - FR : Le midi, on mange. Le soir, on trinque. Les prix sont sur la carte, en vrai texte, pas en photo floue.
  - EN : At lunch we eat. In the evening we raise a glass. Prices are right here in real text, not in a blurry photo.
- `carte.seeFull`
  - FR : Toute la carte
  - EN : Full menu
- `carte.tabsLabel`
  - FR : Rubriques de la carte
  - EN : Menu sections
- `carte.tabs.midi`
  - FR : Le midi
  - EN : Lunch
- `carte.tabs.moment`
  - FR : Plats du moment
  - EN : Seasonal dishes
- `carte.tabs.apero`
  - FR : Apéro
  - EN : Drinks
- `carte.tabs.rhums`
  - FR : Rhums arrangés
  - EN : Infused rum
- `carte.priceOnSite`
  - FR : Prix à l'ardoise
  - EN : Price on the board
- `carte.from`
  - FR : à partir de {price}
  - EN : from {price}
- `carte.add`
  - FR : Commander
  - EN : Order
- `carte.addLabel`
  - FR : Ajouter {name} à la commande du midi
  - EN : Add {name} to your lunch order
- `carte.allergens`
  - FR : Allergènes : la liste est disponible au comptoir. Une allergie ? Dites-le à la commande.
  - EN : Allergens: the list is available at the counter. Got an allergy? Tell us when you order.
- `carte.checked`
  - FR : Carte mise à jour le {date}.
  - EN : Menu updated on {date}.
- `carte.rhumsTitle`
  - FR : Les parfums du moment
  - EN : Flavours of the moment
- `carte.rhumsEmpty`
  - FR : Ils changent au fil des bocaux : la liste est à l'ardoise, derrière le bar.
  - EN : They change as the jars come and go: the list is on the board behind the bar.
- `carte.abuse`
  - FR : L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
  - EN : Please drink responsibly.

## Pages

### La carte / The menu

- `pages.carte.slug`
  - FR : carte
  - EN : menu
- `pages.carte.title`
  - FR : La carte
  - EN : The menu
- `pages.carte.metaTitle`
  - FR : La carte : bo bun, banh mi, sandwichs, apéro et rhums arrangés | Le Piccassiette, Amiens
  - EN : Menu: bo bun, banh mi, sandwiches, drinks and infused rum | Le Piccassiette, Amiens
- `pages.carte.metaDescription`
  - FR : La carte du Piccassiette, bistro rue Duméril à Amiens : banh mi, bo bun, sandwichs et plats du moment le midi, planches et rhums arrangés maison le soir.
  - EN : The menu at Le Piccassiette, a bistro on rue Duméril in Amiens: banh mi, bo bun, sandwiches and seasonal dishes at lunch, sharing boards and house-infused rum in the evening.
- `pages.carte.eyebrow`
  - FR : Le Piccassiette · Amiens
  - EN : Le Piccassiette · Amiens
- `pages.carte.lead`
  - FR : Le midi, l'apéro, les rhums arrangés. Tout est là, avec les prix.
  - EN : Lunch, drinks, infused rum. It's all here, with the prices.

### Commander et réserver / Order and book

- `pages.commander.slug`
  - FR : commander
  - EN : order
- `pages.commander.title`
  - FR : Commander et réserver
  - EN : Order and book
- `pages.commander.metaTitle`
  - FR : Commander pour midi et réserver l'apéro | Le Piccassiette, Amiens
  - EN : Order lunch and book evening drinks | Le Piccassiette, Amiens
- `pages.commander.metaDescription`
  - FR : Commandez votre bo bun, banh mi ou sandwich à emporter pour midi, ou réservez une table pour l'apéro au Piccassiette, 9 rue Duméril à Amiens.
  - EN : Order your bo bun, banh mi or sandwich to take away for lunch, or book a table for evening drinks at Le Piccassiette, 9 rue Duméril, Amiens.
- `pages.commander.eyebrow`
  - FR : Le Piccassiette · Amiens
  - EN : Le Piccassiette · Amiens
- `pages.commander.lead`
  - FR : Deux formulaires, deux minutes. Ou un appel au 03 22 22 00 15.
  - EN : Two forms, two minutes. Or a call on +33 3 22 22 00 15.

### Bo bun et banh mi à Amiens / Bo bun and banh mi in Amiens

- `pages.midi.slug`
  - FR : bo-bun-banh-mi-amiens
  - EN : bo-bun-banh-mi-in-amiens
- `pages.midi.title`
  - FR : Bo bun et banh mi à Amiens
  - EN : Bo bun and banh mi in Amiens
- `pages.midi.metaTitle`
  - FR : Bo bun et banh mi à Amiens, sur place ou à emporter | Le Piccassiette
  - EN : Bo bun and banh mi in Amiens, eat in or take away | Le Piccassiette
- `pages.midi.metaDescription`
  - FR : Envie d'un bo bun ou d'un banh mi à Amiens ? Le Piccassiette, rue Duméril, les prépare chaque midi, sur place ou à emporter. Commande en ligne.
  - EN : Craving a bo bun or a banh mi in Amiens? Le Piccassiette on rue Duméril makes them every lunchtime, to eat in or take away. Order online.
- `pages.midi.eyebrow`
  - FR : Le midi rue Duméril
  - EN : Lunch on rue Duméril
- `pages.midi.lead`
  - FR : Un bol de bo bun, un banh mi qui craque. À midi, en centre-ville d'Amiens, le Piccassiette s'occupe de votre pause déjeuner.
  - EN : A bowl of bo bun, a banh mi with a proper crunch. At lunchtime in central Amiens, Le Piccassiette takes care of your break.
- `pages.midi.sections[0].h`
  - FR : Le bo bun
  - EN : The bo bun
- `pages.midi.sections[0].p`
  - FR : Des vermicelles de riz, des crudités, des herbes fraîches, des cacahuètes et une sauce maison. C'est frais, c'est copieux, et c'est l'un des plats que nos clients citent le plus.
  - EN : Rice vermicelli, raw veg, fresh herbs, peanuts and our own sauce. Fresh, generous, and one of the dishes our guests mention most.
- `pages.midi.sections[1].h`
  - FR : Le banh mi
  - EN : The banh mi
- `pages.midi.sections[1].p`
  - FR : Le sandwich vietnamien : une baguette croustillante, une garniture marinée, des légumes croquants et des herbes. On le prépare ici, à la commande.
  - EN : The Vietnamese sandwich: a crusty baguette, a marinated filling, crunchy veg and herbs. We make it here, to order.
- `pages.midi.sections[2].h`
  - FR : Sur place ou à emporter
  - EN : Eat in or take away
- `pages.midi.sections[2].p`
  - FR : Installez-vous au bistro ou commandez en ligne : vous choisissez votre heure de retrait entre 11 h 30 et 14 h, vous passez prendre et vous payez sur place.
  - EN : Grab a seat at the bistro or order online: choose a pickup time between 11:30 am and 2 pm, collect it and pay on site.
- `pages.midi.sections[3].h`
  - FR : Et aussi
  - EN : Also on
- `pages.midi.sections[3].p`
  - FR : Le sandwich du moment, une grande salade, le plat du jour et, quand il fait froid, la tartiflette.
  - EN : The sandwich of the moment, a big salad, the dish of the day and, when it gets cold, tartiflette.
- `pages.midi.cta`
  - FR : Commander pour midi
  - EN : Order for lunch

### Apéro et rhums arrangés à Amiens / Drinks and infused rum in Amiens

- `pages.apero.slug`
  - FR : apero-rhum-arrange-amiens
  - EN : drinks-infused-rum-amiens
- `pages.apero.title`
  - FR : Apéro et rhums arrangés à Amiens
  - EN : Drinks and infused rum in Amiens
- `pages.apero.metaTitle`
  - FR : Apéro et rhums arrangés maison à Amiens | Le Piccassiette, bistro
  - EN : Evening drinks and house-infused rum in Amiens | Le Piccassiette, bistro
- `pages.apero.metaDescription`
  - FR : Un apéro à Amiens ? Planches à partager et rhums arrangés maison au Piccassiette, rue Duméril. Le mardi et le jeudi jusqu'à 22 h, le vendredi jusqu'à 23 h 30.
  - EN : Drinks in Amiens? Sharing boards and house-infused rum at Le Piccassiette, rue Duméril. Tuesday and Thursday until 10 pm, Friday until 11:30 pm.
- `pages.apero.eyebrow`
  - FR : Le soir rue Duméril
  - EN : Evenings on rue Duméril
- `pages.apero.lead`
  - FR : Des bocaux de rhum qui macèrent derrière le bar, des planches à partager, une ambiance de bistro de quartier. L'apéro, version Piccassiette.
  - EN : Jars of rum steeping behind the bar, boards to share, a proper neighbourhood bistro feel. Evening drinks, Piccassiette style.
- `pages.apero.sections[0].h`
  - FR : Les rhums arrangés maison
  - EN : House-infused rum
- `pages.apero.sections[0].p`
  - FR : Des fruits, des épices, du rhum, et beaucoup de patience. Les parfums changent au fil des bocaux : demandez ceux du moment, on vous fait goûter.
  - EN : Fruit, spices, rum and a lot of patience. The flavours change as the jars come and go: ask what's on, we'll let you taste.
- `pages.apero.sections[1].h`
  - FR : Les planches
  - EN : Sharing boards
- `pages.apero.sections[1].p`
  - FR : De quoi grignoter à plusieurs avec un verre de vin, une bière ou un soft. Petite ou grande, selon la tablée.
  - EN : Something to nibble on together with a glass of wine, a beer or a soft drink. Small or large, depending on the table.
- `pages.apero.sections[2].h`
  - FR : Quand venir
  - EN : When to come
- `pages.apero.sections[2].p`
  - FR : Le mardi et le jeudi jusqu'à 22 h, le vendredi jusqu'à 23 h 30. Le vendredi soir, mieux vaut réserver.
  - EN : Tuesday and Thursday until 10 pm, Friday until 11:30 pm. On Friday nights, booking is a good idea.
- `pages.apero.sections[3].h`
  - FR : Un anniversaire, un pot de départ ?
  - EN : A birthday, leaving drinks?
- `pages.apero.sections[3].p`
  - FR : Le bistro peut accueillir votre groupe. Dites-nous la date et le nombre de personnes, on regarde ensemble.
  - EN : The bistro can welcome your group. Tell us the date and the number of guests, and we'll work it out together.
- `pages.apero.cta`
  - FR : Réserver pour l'apéro
  - EN : Book for drinks

### Mentions légales / Legal notice

- `pages.legal.slug`
  - FR : mentions-legales
  - EN : legal
- `pages.legal.title`
  - FR : Mentions légales
  - EN : Legal notice
- `pages.legal.metaTitle`
  - FR : Mentions légales | Le Piccassiette
  - EN : Legal notice | Le Piccassiette
- `pages.legal.editor`
  - FR : Éditeur du site
  - EN : Publisher
- `pages.legal.siret`
  - FR : SIRET
  - EN : SIRET (company number)
- `pages.legal.director`
  - FR : Directeur de la publication
  - EN : Publication director
- `pages.legal.host`
  - FR : Hébergement
  - EN : Hosting
- `pages.legal.data`
  - FR : Données personnelles
  - EN : Personal data
- `pages.legal.dataText`
  - FR : Les informations envoyées par les formulaires (nom, téléphone, e-mail, commande ou réservation) servent uniquement à traiter votre demande. Elles ne sont ni revendues ni utilisées à d'autres fins. Pour les consulter ou les faire supprimer : {email}.
  - EN : The information sent through the forms (name, phone, email, order or booking) is only used to handle your request. It is never sold or used for anything else. To see it or have it deleted: {email}.
- `pages.legal.photos`
  - FR : Photos et textes
  - EN : Photos and text
- `pages.legal.photosText`
  - FR : Photos, logo et textes : Le Piccassiette. Toute reproduction sans accord est interdite.
  - EN : Photos, logo and text: Le Piccassiette. No reproduction without permission.
- `pages.legal.toConfirm`
  - FR : à remplir
  - EN : to be completed

## Textes alternatifs des photos (accessibilité, Google Images)

- `alt.hero`
  - FR : La façade bleu canard du Piccassiette, 9 rue Duméril à Amiens : bar, sandwicherie, snack
  - EN : The teal shopfront of Le Piccassiette, 9 rue Duméril, Amiens: bar, sandwich shop, snacks
- `alt.facade`
  - FR : L'enseigne du Piccassiette éclairée le soir, rue Duméril
  - EN : Le Piccassiette's sign lit up in the evening, rue Duméril
- `alt.banh-mi`
  - FR : Photo d'illustration : deux banh mi garnis
  - EN : Illustrative photo: two filled banh mi
- `alt.bo-bun`
  - FR : Un bo bun aux nems servi au Piccassiette
  - EN : A bo bun with spring rolls at Le Piccassiette
- `alt.sandwich`
  - FR : Photo d'illustration : un sandwich baguette garni
  - EN : Illustrative photo: a filled baguette sandwich
- `alt.salade`
  - FR : Une grande salade composée du Piccassiette
  - EN : A big mixed salad at Le Piccassiette
- `alt.plat-du-jour`
  - FR : Porc grillé, riz et nems, un plat du jour du Piccassiette
  - EN : Grilled pork, rice and spring rolls, a dish of the day at Le Piccassiette
- `alt.tartiflette`
  - FR : Photo d'illustration : un gratin de pommes de terre au fromage
  - EN : Illustrative photo: a cheesy potato gratin
- `alt.planche`
  - FR : Photo d'illustration : une planche de charcuterie et de fromages
  - EN : Illustrative photo: a charcuterie and cheese board
- `alt.verres`
  - FR : Une bière et une assiette au comptoir du Piccassiette
  - EN : A beer and a plate at the counter of Le Piccassiette
- `alt.rhums-arranges`
  - FR : Photo d'illustration : un bocal de fruits en macération
  - EN : Illustrative photo: a jar of steeping fruit
- `alt.salle`
  - FR : Soirée en terrasse devant le Piccassiette
  - EN : An evening on the terrace outside Le Piccassiette
- `alt.equipe`
  - FR : L'équipe du Piccassiette derrière le bar
  - EN : The Le Piccassiette team behind the bar
- `alt.tuile-moment`
  - FR : L'ardoise du jour du Piccassiette : tartiflette salade
  - EN : Le Piccassiette's daily board: tartiflette with salad
- `alt.tuile-apero`
  - FR : Une bière au comptoir du Piccassiette
  - EN : A beer at the counter of Le Piccassiette
- `alt.riz-porc-cacahuetes`
  - FR : Riz, porc caramélisé, cacahuètes et herbes fraîches au Piccassiette
  - EN : Rice, caramelised pork, peanuts and fresh herbs at Le Piccassiette
- `alt.salade-raviolis`
  - FR : Salade, raviolis grillés et sauce pimentée au Piccassiette
  - EN : Salad, grilled dumplings and chilli sauce at Le Piccassiette
- `alt.poisson-salade`
  - FR : Filet de poisson sur lit de salade au Piccassiette
  - EN : Fish fillet on a bed of salad at Le Piccassiette
- `alt.carpaccio`
  - FR : Carpaccio de bœuf, avocat et parmesan au Piccassiette
  - EN : Beef carpaccio, avocado and parmesan at Le Piccassiette
- `alt.salade-frites`
  - FR : Salade au thon et frites servie au bar du Piccassiette
  - EN : Tuna salad and fries served at the bar of Le Piccassiette
- `alt.ardoise-bo-bun`
  - FR : L'ardoise du Piccassiette : bo bun aux crevettes saté et nems
  - EN : Le Piccassiette's board: shrimp satay bo bun and spring rolls
- `alt.salade-ecrevisses`
  - FR : Salade aux écrevisses du Piccassiette
  - EN : Crayfish salad at Le Piccassiette
