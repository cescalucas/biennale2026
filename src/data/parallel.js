// Exposições paralelas em museus e instituições + galerias comerciais durante a Bienal
export const PARALLEL = [
  // Pinault Collection
  { id: 'pdogana', name: 'Lorna Simpson — Third Person', org: 'Punta della Dogana · Pinault Collection', curator: 'Emma Lavigne', address: 'Dorsoduro, Punta della Dogana', dates: '29 mar – 22 nov 2026', note: '~50 obras. Primeira retrospectiva europeia.', zone: 'L', x: 545, y: 600 },
  { id: 'pdogana2', name: 'Paulo Nazareth — Algebra', org: 'Punta della Dogana · Pinault Collection', curator: 'Fernanda Brenner', address: 'Dorsoduro, Punta della Dogana', dates: '29 mar – 22 nov 2026', zone: 'L', x: 560, y: 608 },
  { id: 'grassi', name: 'Michael Armitage — The Promise of Change', org: 'Palazzo Grassi · Pinault Collection', address: 'Campo San Samuele 3231', dates: '29 mar 2026 – 10 jan 2027', zone: 'S', x: 470, y: 495 },
  { id: 'grassi2', name: 'Amar Kanwar — Co-travellers', org: 'Palazzo Grassi · Pinault Collection', curator: 'Jean-Marie Gallais', address: 'Campo San Samuele 3231', dates: '29 mar 2026 – 10 jan 2027', zone: 'S', x: 480, y: 508 },
  // Fondazione Prada
  { id: 'prada', name: 'Helter Skelter — Arthur Jafa & Richard Prince', org: 'Fondazione Prada', curator: 'Nancy Spector', address: "Ca' Corner della Regina · Santa Croce 2215", dates: '9 mai – 23 nov 2026', zone: 'P', x: 330, y: 430 },
  // Querini Stampalia
  { id: 'querini', name: 'The Dreamer · Ding Yi · Nigel Cooke · Hans Hartung', org: 'Fondazione Querini Stampalia', address: 'Santa Maria Formosa · Castello 5252', dates: '5 mai – 22 nov 2026', note: 'Quatro mostras simultâneas + Pavilhão da Geórgia.', zone: 'Z', x: 600, y: 510 },
  // Peggy Guggenheim
  { id: 'peggy', name: 'Peggy Guggenheim in London', org: 'Peggy Guggenheim Collection', curator: 'Gražina Subelytė · Simon Grant', address: 'Palazzo Venier dei Leoni · Dorsoduro 701', dates: '25 abr – 19 out 2026', zone: 'C', x: 512, y: 585 },
  // Fondazione Giorgio Cini (San Giorgio)
  { id: 'horst', name: 'Horst P. Horst — The Geometry of Grace', org: 'Fondazione Giorgio Cini', address: 'Isola di San Giorgio Maggiore', dates: '6 mai – 27 set 2026', zone: 'J', x: 655, y: 660 },
  { id: 'baselitz', name: "Georg Baselitz — Eroi d'Oro", org: 'Fondazione Giorgio Cini', address: 'Isola di San Giorgio Maggiore', dates: 'durante a Bienal', zone: 'J', x: 665, y: 670 },
  { id: 'cini-vetro', name: 'Le Stanze del Vetro', org: 'Fondazione Giorgio Cini', address: 'Isola di San Giorgio Maggiore', dates: '19 abr – 22 nov 2026', zone: 'J', x: 670, y: 655 },
  { id: 'homofaber', name: 'Homo Faber 2026: An Island of Light', org: 'Michelangelo Foundation', address: 'Isola di San Giorgio Maggiore', zone: 'J', x: 650, y: 670 },
  // SMAC
  { id: 'boetti', name: 'Alighiero Boetti — retrospectiva', org: 'SMAC · San Marco Art Centre', address: 'Procuratie Vecchie · Piazza San Marco', dates: '7 mai – 22 nov 2026', zone: 'M', x: 610, y: 540 },
  // V-A-C Zattere
  { id: 'vac', name: 'Time, Forward!', org: 'V-A-C Foundation · Zattere', address: 'Palazzo delle Zattere · Dorsoduro 1401', dates: '23 abr – 6 set 2026', zone: 'T', x: 430, y: 612 },
  // Louis Vuitton
  { id: 'louisv', name: 'Lu Yang — DOKU The Illusion', org: 'Espace Louis Vuitton Venezia', curator: 'Claire Staebler', address: 'Calle del Ridotto 1351 · San Marco', dates: '8 mai – 4 out 2026', note: 'Entrada gratuita. 10h30–19h.', zone: 'M', x: 585, y: 560 },

  // Blockbusters
  { id: 'kapoor', name: 'Anish Kapoor — Palazzo Manfrin', org: 'Anish Kapoor Foundation · Palazzo Manfrin', address: 'Cannaregio · Palazzo Manfrin', dates: '6 maio – 9 agosto 2026', note: '~100 modelos arquitetônicos + nova "At the Edge of the World" suspensa.', highlight: true, zone: 'R', x: 395, y: 280 },
  { id: 'abramovic', name: 'Marina Abramović — Transforming Energy', org: "Gallerie dell'Accademia di Venezia", curator: 'Shai Baitel (MAM Shanghai)', address: 'Dorsoduro · Campo della Carità', dates: '6 maio – 19 outubro 2026', note: 'Primeira mulher viva celebrada em grande mostra na Accademia.', highlight: true, zone: 'C', x: 500, y: 595 },
  { id: 'jr', name: 'JR — Il Gesto', org: "Palazzo Ca' da Mosto · The Venice Venice Hotel", address: "Ca' da Mosto · Grand Canal", dates: 'durante a Bienal 2026', note: 'Primeira incursão de JR em tapeçaria. Releitura das "Bodas de Caná" de Veronese.', highlight: true, zone: 'O', x: 460, y: 380 },
  { id: 'saville', name: 'Jenny Saville · retrospectiva', org: "Ca' Pesaro · Galleria Internazionale d'Arte Moderna", curator: 'Elisabetta Barisoni', address: "Santa Croce · Ca' Pesaro", dates: 'até 22 novembro 2026', zone: 'P', x: 355, y: 415 },
  { id: 'fabre', name: 'Jan Fabre — The Quiet Source', org: 'Scuola Grande di San Rocco', curator: 'Giacinto Di Pietrantonio · Katerina Koskina', address: 'Campo San Rocco · San Polo', dates: '9 maio – 22 novembro 2026', note: 'Primeiro artista vivo a intervir no espaço de Tintoretto.', zone: 'P', x: 300, y: 440 },
  { id: 'wurm', name: 'Erwin Wurm · solo', org: 'Museo Fortuny', curator: 'Elisabetta Barisoni · Cristina Da Roit', address: 'Palazzo Fortuny · San Marco', dates: '6 maio – 22 novembro 2026', zone: 'M', x: 495, y: 495 },
  { id: 'cragg', name: 'Tony Cragg — Ocean of Drops', org: "Fondazione Berengo · Ca' Tron", address: "Ca' Tron · Santa Croce", dates: '5 maio – 22 novembro 2026', zone: 'P', x: 325, y: 395 },
  { id: 'wong', name: 'Matthew Wong — Interiors', org: 'Palazzo Tiepolo Passi', curator: 'John Cheim', address: 'Palazzo Tiepolo Passi · San Polo', dates: '6 maio – 1 novembro 2026', note: '~35 obras raramente vistas ou inéditas (2015–2019).', zone: 'P', x: 380, y: 440 },
  { id: 'boafo', name: 'Amoako Boafo · solo', org: 'Museo di Palazzo Grimani', address: 'Palazzo Grimani · Castello', dates: '6 maio – 22 novembro 2026', note: 'Primeira mostra solo na Itália.', zone: 'Z', x: 625, y: 495 },
  // Berggruen
  { id: 'kosuth', name: 'Joseph Kosuth — The-exchange-value-of-language', org: 'Casa dei Tre Oci · Berggruen Arts & Culture', curator: 'Mario Codognato · Adriana Rispoli', address: 'Casa dei Tre Oci · Giudecca', dates: '29 março – 22 novembro 2026', zone: 'T', x: 455, y: 670 },
  { id: 'strange', name: 'Strange Rules · Protocol Art', org: 'Palazzo Diedo · Berggruen Arts & Culture', curator: 'Mat Dryhurst · Holly Herndon · Hans Ulrich Obrist · Adriana Rispoli', address: 'Palazzo Diedo · Cannaregio', dates: '4 maio – 22 novembro 2026', note: '~30 artistas: Herndon, Dryhurst, Parreno, Paglen, Avery Singer, Hito Steyerl, Lynn Hershman Leeson e mais.', highlight: true, zone: 'R', x: 415, y: 265 },
  { id: 'floyer', name: 'Ceal Floyer — Unfinished', org: 'Palazzo Diedo · Berggruen', curator: 'Ann Gallagher · Jonathan Watkins', address: 'Palazzo Diedo · Cannaregio', dates: 'maio – outubro 2026 · datas selecionadas', note: 'Mostra póstuma da artista, falecida em dez. 2025.', zone: 'R', x: 425, y: 275 },
  // TBA21
  { id: 'ocean', name: 'Tide of Returns', org: 'Ocean Space · TBA21–Academy', address: 'Chiesa di San Lorenzo · Castello', dates: '28 março – 11 outubro 2026', note: 'Repatriates Collective do Pacífico Norte, Austrália, África, Europa, América Latina.', zone: 'Z', x: 680, y: 475 },
  // Sandretto, Dries Van Noten
  { id: 'sandretto', name: 'Matt Copson — Fanfare/Lament', org: 'Fondazione Sandretto Re Rebaudengo · Isola di San Giacomo', curator: 'Hans Ulrich Obrist', address: 'Isola di San Giacomo · laguna norte', dates: 'inaugural · abre 7 maio 2026', note: 'Nova sede permanente. Capela de Hugh Hayden + obras permanentes de Claire Fontaine, Goshka Macuga, Pamela Rosenkranz, Thomas Schütte.', highlight: true, zone: 'J', x: 740, y: 660 },
  { id: 'dvn', name: 'The Only True Protest Is Beauty', org: 'Fondazione Dries Van Noten · Palazzo Pisani Moretta', address: 'Palazzo Pisani Moretta · Grand Canal', dates: '25 abril – 4 outubro 2026', note: 'Inaugural; +200 obras/objetos de 50 criadores.', zone: 'S', x: 435, y: 480 },
  // Demais museus
  { id: 'saytour', name: 'Patrick Saytour — Fold and Time', org: "Palazzo Vendramin Grimani · Fondazione dell'Albero d'Oro", curator: 'Daniela Ferretti', address: 'Palazzo Vendramin Grimani', dates: '18 abril – 22 novembro 2026', zone: 'P', x: 365, y: 430 },
  { id: 'vanmechelen', name: 'Koen Vanmechelen — We Thought We Were Alone', org: 'Palazzo Rota Ivancich', curator: 'James Putnam', address: 'Castello · Palazzo Rota Ivancich', dates: '9 maio – 22 novembro 2026', zone: 'Z', x: 655, y: 475 },
  { id: 'kantarovsky', name: 'Sanya Kantarovsky — Basic Failure', org: 'Palazzo Loredan · Istituto Veneto', address: 'Campo Santo Stefano · San Marco', dates: '6 maio – 22 novembro 2026', zone: 'M', x: 510, y: 530 },
  { id: 'salle', name: 'David Salle · nova série de pinturas', org: "Palazzo Cini · Fondazione Cini", address: 'San Vio · Dorsoduro 864', dates: '5 maio – 27 setembro 2026', note: 'Pinturas via modelo de IA treinado em séries dos anos 1990.', zone: 'C', x: 525, y: 585 },
  { id: 'chihuly', name: 'CHIHULY: Venice 2026', org: 'Dale Chihuly', address: 'Palazzo Franchetti + Palazzo Querini alla Carità + Palazzo Balbi-Valier', dates: '5 maio – 14 novembro 2026', note: '30 anos depois de "Chihuly Over Venice". "Gold Tower" 9 m + duas esculturas no Grand Canal.', highlight: true, zone: 'C', x: 515, y: 560 },
  { id: 'berengo', name: 'Bertil Vallien · Transparent Boundaries + Martin Janecký · Dreamers', org: 'Fondazione Berengo · Palazzo Franchetti', curator: 'Jean Blanchaert', address: 'Palazzo Franchetti · San Marco', dates: '5 maio – 22 novembro 2026', zone: 'C', x: 520, y: 570 },
  { id: 'correr', name: 'Bizhan Bassiri — Il Nottambulo del Pensiero Magmatico', org: 'Museo Correr', address: 'Piazza San Marco', dates: '27 fev – 22 nov 2026', zone: 'M', x: 600, y: 550 },
  { id: 'mocenigo', name: 'Mouna Rebeiz — Le Tarbouche', org: 'Museo di Palazzo Mocenigo', curator: 'Roberta Semeraro', address: 'Santa Croce · Palazzo Mocenigo', dates: '20 mai – 8 nov 2026', zone: 'P', x: 380, y: 410 },
  { id: 'punch', name: 'Darkness Visible · The Long Shadow of Dictatorship', org: 'Spazio Punch · Giudecca', curator: 'Victoria Noorthoorn (MAM Buenos Aires) · Patricio Orellana', address: 'Giudecca', dates: '6 mai – 22 nov 2026', note: 'Marca os 50 anos do golpe na Argentina (1976).', zone: 'T', x: 340, y: 680 },
  { id: 'thetis', name: 'Venice 20.26', org: 'Spazio Thetis · Arsenale Nord', curator: 'Manuela Sandri', address: 'Arsenale Nord', dates: 'abril – outubro 2026', note: '5 artistas italianos.', zone: 'A', x: 835, y: 395 },
  { id: 'mauri', name: "Fabio Mauri — L'Esperimento Del Tempo", org: 'Galleria Michela Rizzo · Palazzo Palumbo Fossati', address: 'San Marco 2597', dates: '6 maio – 29 agosto 2026', zone: 'M', x: 495, y: 540 },
  { id: 'still-lifes', name: 'Picasso · Morandi · Parmiggiani — Still Lifes', org: 'Fondazione Bevilacqua La Masa', address: 'Galleria di Piazza San Marco', dates: '7 mai – 25 jul 2026', zone: 'M', x: 610, y: 545 },
  { id: 'collettiva', name: '108ª Collettiva Giovani Artisti', org: 'Fondazione Bevilacqua La Masa · SS. Cosma e Damiano', address: 'Giudecca', dates: '5 mai – 28 jun 2026', note: '37 artistas com menos de 30 anos.', zone: 'T', x: 300, y: 680 },
  { id: 'tillmans', name: 'Wolfgang Tillmans — Outta Love', org: 'Stallmann · Venezia', address: 'Galeria · Veneza', dates: '7 mai – 30 jun 2026', zone: 'M', x: 580, y: 585 },
  { id: 'goliath', name: 'Gabrielle Goliath — Elegy', org: "Chiesa di Sant'Antonin", address: "Castello · Salizada Sant'Antonin", dates: '4 maio – 31 julho 2026', note: 'Mostra independente após cancelamento do Pavilhão sul-africano.', highlight: true, zone: 'Z', x: 695, y: 525 },

  // Galerias comerciais
  { id: 'gal-yukhnovich', name: 'Flora Yukhnovich — Egg', org: 'Victoria Miro Venice', address: 'Il Capricorno · Castello 2288', dates: '5 mai – 4 jul 2026', note: 'Primeira individual em Veneza da pintora britânica.', zone: 'M', x: 645, y: 520 },
  { id: 'gal-mutu', name: 'Wangechi Mutu', org: 'Victoria Miro Venice', address: 'Il Capricorno · Castello 2288', dates: '18 jul – 5 set 2026', note: 'Artista também convidada para a mostra principal da Bienal.', zone: 'M', x: 645, y: 520 },
  { id: 'gal-chicago', name: 'Judy Chicago — The Materiality of Judy Chicago', org: 'Galleria Alberta Pane', address: 'Calle dei Guardiani · Dorsoduro 2403H', dates: '8 mai – 22 nov 2026', note: 'Esculturas inéditas em vidro, bronze e alumínio produzidas com Studio Berengo e Corning Museum.', zone: 'T', x: 405, y: 605 },
  { id: 'gal-noble', name: 'Paul Noble — The Declining Figure', org: 'Galleria Caterina Tognon', address: 'San Marco 2671', dates: '7 mai – 5 set 2026', note: 'Em diálogo com Henry Moore. Inclui peça NEST (2004).', zone: 'M', x: 545, y: 545 },
  { id: 'gal-cescon', name: 'Stefano Cescon — Subsidere', org: 'Marignana Arte', address: 'Rio Terà dei Catecumeni · Dorsoduro', dates: 'desde 27 mar 2026', zone: 'T', x: 460, y: 615 },
  { id: 'gal-rossi', name: 'Rosanna Rossi — Xilografie e un dipinto', org: 'Marina Bastianello Gallery', address: 'Mestre / Venezia', dates: 'abertura 6 mai 2026', note: 'Sessenta anos de pesquisa da artista sarda.', zone: 'M', x: 555, y: 590 },
  { id: 'gal-193', name: '193 Gallery · programa do Sul Global', org: '193 Gallery', address: 'Salizada San Samuele 3336/3337', dates: '5 mai – 27 jun 2026 (e mais)', note: 'Nova sede ao lado do Palazzo Grassi com foco em África, Caribe, América Latina e Sudeste Asiático.', zone: 'S', x: 450, y: 515 },
];
