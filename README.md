# Séminaire RCF-ArTec 2020 - API base hybride

Pour conformer aux besoins de l’atelier RCF-ArTeC 2020, nous proposons une base de données ‘hybride’ qui rassemble des informations venant de plusieurs bases créés dans le cadre du projet des registres de la Comédie Française. Ces données portent uniquement sur la période entre septembre de 1715 et décembre de 1743

Si vous souhaitez interroger directement cette  base, vous trouverez tout ce qui vous est nécessaire à la création de votre propre instance [ici](https://github.com/seminaire-artec-rcf/db).

Nous proposons également un API pour cette nouvelle ressource, dont les détails sont documentés ci-dessous.


## Les requêtes générales

Ne donnant accès qu'a un échantillon de nos données, cet API diffère un peu de la norme en ce qu’il vous permet de assez facilement comprendre le schéma de la base. Les requêtes qui suivent vous permettent de récupérer toutes les rangées de chacun de ses huit tableaux.

### *auteurs*

Tout à fait ce qu’on attendrait d’une telle requête à ce nom - elle cherche l'entièreté de la liste des auteurs des pièces jouées à la Comédie Française pendant cette période.

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/auteurs

```

#### Exemple de réponse

```
[ ...

  {
        "id": 1,
        "prenom": "Jean-François",
        "nom": "Regnard",
        "pseudonyme": "Regnard (Jean-François)",
        "naissance": 1655,
        "mort": 1709,
        "notes_bnf": "Poète comique, auteur de récits de voyages et de comédies",
        "pseudos_alternatifs": "M. R *** (1655-1709)/Sieur R ** (1655-1709)/Sieur R. T. D. F. (1655-1709)",
        "liens_info": [
            "http://data.bnf.fr/ark:/12148/cb11921388k"
        ],
        "liens_icono": [
            "http://commons.wikimedia.org/wiki/Special:FilePath/JFRegnard.jpg?width=300",
            "http://gallica.bnf.fr/ark:/12148/bpt6k6471404f.thumbnail"
        ],
        "genre": "M"
    },
    
    ...
    
     {
        "id": 14,
        "prenom": null,
        "nom": null,
        "pseudonyme": "Florent Carton dit Dancourt",
        "naissance": 1661,
        "mort": 1725,
        "notes_bnf": "Acteur, sociétaire de la Comédie française (1685-1718). - Auteur dramatique",
        "pseudos_alternatifs": "D' Ancourt (1661-1725)/Florent Carton (1661-1725)/Florent Carton Dancourt (1661-1725)/Florent Carton d' Ancourt (1661-1725)",
        "liens_info": [
            "http://data.bnf.fr/ark:/12148/cb119972824"
        ],
        "liens_icono": [
            "http://gallica.bnf.fr/ark:/12148/bpt6k5626211b.thumbnail",
            "http://gallica.bnf.fr/ark:/12148/btv1b8530906q.thumbnail"
        ],
        "genre": "M"
    },
    
   .....]

```

### *comediens*

Tous les comédiens qui étaient actifs pendant cette période.

#### Exemple de requête


```
curl https://api-hybride.cfregisters.org/comediens

```

#### Exemple de réponse

```
[
    {
        "id": 1,
        "pseudonyme": "Abeille",
        "numero_pseudo": 0,
        "titre": "Mademoiselle",
        "prenom": null,
        "nom": "Abeille",
        "alias": null,
        "statut": "O",
        "entree": null,
        "societariat": null,
        "depart": null,
        "debut": [
            1742
        ],
        "dates": "1742 (Mouhy)",
        "notes": null
    },
    {
        "id": 4,
        "pseudonyme": "Armand",
        "numero_pseudo": 0,
        "titre": "Monsieur",
        "prenom": "François Armand",
        "nom": "Huget (ou Haquet) ,dit",
        "alias": null,
        "statut": "S",
        "entree": 1723,
        "societariat": 1724,
        "depart": 1765,
        "debut": [],
        "dates": "1723-1724-1765",
        "notes": null
    }, 
    
    ... ]

```

### *pièces*

Toutes les pièces jouées à la CF pendant cette période.

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/pieces

```

#### Exemple de réponse

```
[
    {
        "id": 18,
        "id_auteur": [
            1
        ],
        "titre": "Démocrite amoureux",
        "genre": "comédie",
        "actes": 5,
        "prose_vers": "vers",
        "prologue": false,
        "musique_danse_machine": false,
        "titre_alternatif": null,
        "date_de_creation": "1700-01-12T08:00:00.000Z"
    },
    {
        "id": 1345,
        "id_auteur": [
            19
        ],
        "titre": "Trois frères rivaux (Les)",
        "genre": "comédie",
        "actes": 1,
        "prose_vers": "vers",
        "prologue": false,
        "musique_danse_machine": false,
        "titre_alternatif": null,
        "date_de_creation": "1713-08-04T07:00:00.000Z"
    }, 
    
    ... ]

```

### **images**

Les données viennent originalement des [registres des recettes journalières](https://www.cfregisters.org/fr/registres/registres-des-recettes) ; ces registres ont été numérisés pendant la phase I du projet et cette requête cherche les images.

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/images

```

#### Exemple de réponse

```
[
    {
        "id": 51442,
        "id_registre": 24778,
        "url": "http://images.cfregisters.org/M119_02_R90/M119_02_R90_017r.jpg",
        "orientation": "recto"
    },
    {
        "id": 51443,
        "id_registre": 24778,
        "url": "http://images.cfregisters.org/M119_02_R90/M119_02_R90_018v.jpg",
        "orientation": "verso"
    },
    {
        "id": 51444,
        "id_registre": 24779,
        "url": "http://images.cfregisters.org/M119_02_R90/M119_02_R90_019r.jpg",
        "orientation": "recto"
    },
    
    ... ]

```

### *lagrange*

La base Lagrange est une ressource incroyablement riche où vous pouvez trouver énormément de documents et d'images liées à la CF. Dans la base, ces documents sont mis en lien avec les auteurs.

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/lagrange

```

#### Exemple de réponse

```
[ ...
   {
        "id": "\"00000104\"",
        "type": "Spectacle",
        "titre": "Les Femmes savantes",
        "titre_alternatif": null,
        "soustitre": "comédie en 5 actes en vers",
        "url": "http://lagrange.comedie-francaise.fr/notice?ref=00000104&id=555&p=1",
        "id_auteur": 2
    },
    {
        "id": "\"00000234\"",
        "type": "Spectacle",
        "titre": "Monsieur de Pourceaugnac",
        "titre_alternatif": null,
        "soustitre": "comédie-ballet en 3 actes en prose",
        "url": "http://lagrange.comedie-francaise.fr/notice?ref=00000234&id=555&p=1",
        "id_auteur": 2
    },
  ... ]

```

### *registres*

Les recettes aussi bien que d'autres détails de chaque séance à la CF.

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/registres

```

#### Exemple de réponse

```
[
    {
        "id": 24778,
        "date": "1727-04-21T07:00:00.000Z",
        "jour": "Lundi",
        "saison": "1727-1728",
        "recettes": 815,
        "semainier": "Dumirail",
        "notes": null,
        "ouverture": true,
        "cloture": false,
        "page_de_gauche": null
    },
    {
        "id": 24779,
        "date": "1727-04-22T07:00:00.000Z",
        "jour": "Mardi",
        "saison": "1727-1728",
        "recettes": 263,
        "semainier": "Dumirail",
        "notes": null,
        "ouverture": false,
        "cloture": false,
        "page_de_gauche": null
    },
    
  ... ]

```

### *pieces-registres*

Ces données mettent en lien les registres avec les pièces qui ont été jouées pendant chaque séance (deux, en règle général).

#### Exemple de requête


```
curl https://api-hybride.cfregisters.org/pieces-registres

```
#### Exemple de réponse

```
[
    {
        "id": 37742,
        "id_registre": 25056,
        "id_piece": 5158,
        "debut": false,
        "reprise": false,
        "ordre": 1,
        "gratuit": false,
        "notes_public": null,
        "notes_lieu": null,
        "notes_representation": null
    },
    {
        "id": 37743,
        "id_registre": 25056,
        "id_piece": 5181,
        "debut": true,
        "reprise": false,
        "ordre": 2,
        "gratuit": false,
        "notes_public": null,
        "notes_lieu": null,
        "notes_representation": null
    },
    
  ... ]
  
```

### ventes

Donne la division par type des billets vendus chaque séance. Il est important de noter que les billets se vendaient pas séance, et non par pièce.

#### Exemple de requête


```
curl https://api-hybride.cfregisters.org/ventes

```

#### Exemple de réponse

```
[
    {
        "id_registre": 24778,
        "id_place": 87,
        "description": "Billet à",
        "loge": false,
        "billets_vendus": 39,
        "prix_par_billet": 201,
        "recettes": 258
    },
    {
        "id_registre": 24778,
        "id_place": 88,
        "description": "Billet à",
        "loge": false,
        "billets_vendus": 181,
        "prix_par_billet": 1,
        "recettes": 181
    },
    
   ... ]


```

## Les recherches par identité

Nous voulons souvent extraire une seule rangée d’un tableau - une seule instance. Les requêtes qui suivent permettent cela, mais requièrent que vous fournissez un paramètre: l'identifiant numérique propre à cette entrée.

### *auteur*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/auteur/51

```
#### Exemple de réponse

```
{
    "id": 51,
    "prenom": "Pierre de",
    "nom": "Marivaux",
    "pseudonyme": "Marivaux (Pierre de)",
    "naissance": 1688,
    "mort": 1763,
    "notes_bnf": "Auteur dramatique et romancier. - Membre de l'Académie française (1743)",
    "pseudos_alternatifs": "M ** (1688-1763)/M. D *** (1688-1763)/M. de M ... (1688-1763)/Pierre Carlet de Chamblain de Marivaux (1688-1763)",
    "liens_info": [
        "http://data.bnf.fr/ark:/12148/cb119146220"
    ],
    "liens_icono": [
        "http://commons.wikimedia.org/wiki/Special:FilePath/Marivaux.jpeg?width=300",
        "http://gallica.bnf.fr/ark:/12148/bpt6k2065344.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/bpt6k206535h.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/bpt6k25796c.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/bpt6k298444w.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/bpt6k5488208n.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/bpt6k56539159.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/btv1b105090612.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/btv1b8409631g.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/btv1b8409632w.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/btv1b8422270k.thumbnail",
        "http://gallica.bnf.fr/ark:/12148/btv1b84222710.thumbnail"
    ],
    "genre": "M"
}

```

### *comedien*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/comedien/4

```
#### Exemple de réponse

```
{
    "id": 4,
    "pseudonyme": "Armand",
    "numero_pseudo": 0,
    "titre": "Monsieur",
    "prenom": "François Armand",
    "nom": "Huget (ou Haquet) ,dit",
    "alias": null,
    "statut": "S",
    "entree": 1723,
    "societariat": 1724,
    "depart": 1765,
    "debut": [],
    "dates": "1723-1724-1765",
    "notes": null
}

```

### *pièce*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/piece/5155

```
#### Exemple de réponse

```
{
    "id": 5155,
    "id_auteur": [
        2
    ],
    "titre": "Médecin malgré lui (Le) / Le Médecin forcé (titre alt.)",
    "genre": "comédie",
    "actes": 3,
    "prose_vers": "prose",
    "prologue": false,
    "musique_danse_machine": true,
    "titre_alternatif": null,
    "date_de_creation": null
}

```
Oui, c'est vrai que ici le titre alternatif n'est pas du tout au bon endroit - les données ne sont malheureusement pas complètement systématiques...

### *image*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/image/51451

```
#### Exemple de réponse

```
{
    "id": 51451,
    "id_registre": 24782,
    "url": "http://images.cfregisters.org/M119_02_R90/M119_02_R90_026v.jpg",
    "orientation": "verso"
}

```

### *registre*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/registre/27649

```
#### Exemple de réponse

```
{
    "id": 27649,
    "date": "1725-09-01T07:00:00.000Z",
    "jour": "Samedi",
    "saison": "1725-1726",
    "recettes": 897,
    "semainier": "Lavoy",
    "notes": "On a donné relâche au théâtre pendant deux jours",
    "ouverture": false,
    "cloture": false,
    "page_de_gauche": null
}

```

### *piece-registre*

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/piece-registre/40506

```
#### Exemple de réponse

```
{
    "id": 40506,
    "id_registre": 27205,
    "id_piece": 5127,
    "debut": false,
    "reprise": false,
    "ordre": 1,
    "gratuit": false,
    "notes_public": "L'ambassadeur du Grand Seigneur",
    "notes_lieu": null,
    "notes_representation": null
}

```

## La recherche par collection

Nous voulons souvent trouver tous les entrées qui partagent un attribue. Pendant que nous pouvons accomplir cela en filtrant les exemples après avoir tout cherché, il est parfois utile de limiter la recherche au niveau de l'api. Les voies qui suivent font cela pour deux cas d'utilisage courant. Comme celles de la catégorie précédente, ces requêtes demandant aussi des paramètres.

### *oeuvres*

Cette requête cherche toutes les pièces écrites par un auteur dont on spécifie l'identité

#### Exemple de requête

```
curl https://api-hybride.cfregisters.org/oeuvres/262

```
#### Exemple de réponse

```
[
    {
        "id": 5499,
        "id_auteur": [
            262
        ],
        "titre": "Cléarque, tyran d'Héraclée",
        "genre": "tragédie",
        "actes": 5,
        "prose_vers": "vers",
        "prologue": false,
        "musique_danse_machine": false,
        "titre_alternatif": null,
        "date_de_creation": "1717-11-26T08:00:00.000Z"
    },
    {
        "id": 5524,
        "id_auteur": [
            262
        ],
        "titre": "Habis",
        "genre": "tragédie",
        "actes": 5,
        "prose_vers": "vers",
        "prologue": false,
        "musique_danse_machine": false,
        "titre_alternatif": null,
        "date_de_creation": "1714-04-17T07:00:00.000Z"
    },
    {
        "id": 5839,
        "id_auteur": [
            262
        ],
        "titre": "Sémiramis",
        "genre": "tragédie",
        "actes": 5,
        "prose_vers": "vers",
        "prologue": false,
        "musique_danse_machine": false,
        "titre_alternatif": null,
        "date_de_creation": "1716-02-01T08:00:00.000Z"
    }
]


```

### documents

Cette requête cherche tous les documents de la base Lagrange liés à un auteur dont on spécifie l'identité

#### Exemple de requête

```
https://api-hybride.cfregisters.org/documents/2

```


#### Exemple de réponse

```
[
    {
        "id": "BIB00039162",
        "type": "Archive",
        "titre": "Sganarelle",
        "titre_alternatif": "ou Le Cocu imaginaire",
        "soustitre": "comédie en un acte et en vers",
        "url": "http://lagrange.comedie-francaise.fr/notice?ref=BIB00039162&id=555&p=1",
        "id_auteur": 2
    },
    {
        "id": "BIB00039329",
        "type": "Archive",
        "titre": "Paroles de théâtre",
        "titre_alternatif": "Molière-Jouvet",
        "soustitre": "lecture-spectacle",
        "url": "http://lagrange.comedie-francaise.fr/notice?ref=BIB00039329&id=555&p=1",
        "id_auteur": 2
    },
  
  ... ]

```

## Les requêtes ciblés


