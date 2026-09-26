// Roteiro pessoal: chegada no domingo, saída na quinta às 20h, ingresso semanal da Bienal.
// Cada etapa pode apontar para um venueId — a página puxa horário, preço, link de ingresso e
// avisa automaticamente se o local fecha naquele dia da semana ou se a mostra já terá encerrado.
// weekday: 0=dom … 6=sáb.

export const TRIP = {
  title: 'Domingo → quinta',
  subtitle: 'Cinco dias em Veneza, três deles na Bienal, com o ingresso semanal',
  departure: 'quinta-feira, 20h',
  tickets: [
    {
      label: 'Bienal · ingresso semanal',
      value: '€50 · 7 dias consecutivos, entradas ilimitadas em Giardini e Arsenale',
      detail:
        'Compra só online (labiennale.org / Vivaticket). Cobre terça (Giardini), quarta (Arsenale · Corderie) e quinta (Arsenale · pavilhões + volta aos Giardini). O ingresso de 3 dias consecutivos (€40, ter–qui) cobre exatamente o mesmo; o semanal só vale a pena se você chegar cedo no domingo e quiser já entrar.',
      url: 'https://www.labiennale.org/en/tickets',
    },
    {
      label: 'Vaporetto · passe ACTV 7 dias',
      value: '€65 · ilimitado, inclui linha 20 (San Servolo) e Lido',
      detail: 'Alternativa: 72h por €45 (seg–qua) e avulsos na quinta. Bilhete avulso custa €9,50, então o passe se paga em 7 trechos. Compre no app AVM Venezia Official ou nas máquinas da estação.',
      url: 'https://actv.avmspa.it/en',
    },
    {
      label: 'Aeroporto · saída na quinta',
      value: 'Voo às 20h → sair do Arsenale até 16h',
      detail:
        'Alilaguna linha Blu sai da parada Arsenale (ou San Zaccaria) direto para Marco Polo em ~1h15 (€15). Deixe as malas no hotel ou num depósito perto de San Zaccaria. Se a saída for de trem, a linha 1 leva de Arsenale à estação em 40 min: dá para ficar na Bienal até o fechamento.',
      url: 'https://www.alilaguna.it/en',
    },
  ],
  checklist: [
    { text: 'Comprar o ingresso semanal da Bienal online (não há venda na bilheteria)', url: 'https://www.labiennale.org/en/tickets' },
    { text: 'Reservar o Giardino Mistico do Pavilhão do Vaticano (CoopCulture) para o domingo à tarde', venueId: 'vaticano' },
    { text: 'Comprar Anish Kapoor · Palazzo Manfrin (€15) para o domingo à tarde', venueId: 'kapoor' },
    { text: 'Comprar o bilhete Pinault (Dogana + Grassi, €20) para segunda de manhã', venueId: 'pdogana' },
    { text: 'Reservar horário na Peggy Guggenheim para segunda ao meio-dia (até 19 out)', venueId: 'peggy' },
    { text: 'Abramović na Accademia: só se cortar os Giardini às 16h30 na terça — ingresso pela TicketOne (até 19 out)', venueId: 'abramovic' },
    { text: 'Se chegar até 30 set e cedo: reservar faixa horária do Homo Faber (San Giorgio) para domingo', venueId: 'homofaber' },
    { text: 'Baixar o app AVM Venezia e carregar o passe de vaporetto', url: 'https://actv.avmspa.it/en' },
    { text: 'Combinar com o hotel onde deixar as malas na quinta (ou depósito em San Zaccaria)' },
  ],
  days: [
    {
      weekday: 0,
      name: 'Domingo',
      theme: 'Chegada · Cannaregio, a dois passos da estação',
      why: 'Ônibus e Alilaguna chegam a Piazzale Roma e a Guglie, já em Cannaregio. As três mostras mais comentadas fora da Bienal ficam a 10 minutos dali e abrem no domingo: Kapoor (fecha só às segundas), Palazzo Diedo (só qui–dom) e o Vaticano. Se a chegada for tarde, corte o Vaticano e comece pelo Kapoor.',
      steps: [
        { time: 'chegada', title: 'Check-in e passe de vaporetto', detail: 'Do aeroporto: ônibus ACTV 5 / ATVO até Piazzale Roma (25 min) ou Alilaguna Arancio até Guglie. Compre o passe ACTV de 7 dias já na chegada.' },
        { time: '13h30', venueId: 'vaticano', title: 'Pavilhão do Vaticano · Giardino Mistico', detail: 'Carmelitas Descalços, ao lado da estação. Reserva prévia obrigatória pela CoopCulture. Brian Eno, Patti Smith, FKA Twigs e mais 21 artistas em paisagem sonora. ~1h.' },
        { time: '14h45', venueId: 'kapoor', title: 'Anish Kapoor · Palazzo Manfrin', detail: 'Rio Terà San Leonardo, 5 min a pé. Compre antes online. ~100 maquetes e a nova "At the Edge of the World". Última entrada 17h30.' },
        { time: '16h15', venueId: 'strange', title: 'Strange Rules · Palazzo Diedo', detail: '10 min a pé pela Fondamenta della Misericordia. Herndon & Dryhurst, Parreno, Paglen, Steyerl, Hershman Leeson. Abre só qui–dom, até 19h.' },
        { time: '17h30', venueId: 'gaza', title: 'Gaza — No Words · Palazzo Mora', detail: 'Strada Nova, gratuito, fecha às 18h. Mostra pequena, cabe em 25 min. Se estiver cansado, deixe para a volta de outro dia (fecha às terças).' },
        { time: '19h00', title: 'Jantar na Fondamenta della Misericordia', detail: 'Vino Vero, Paradiso Perduto ou Al Timon. Trecho mais tranquilo de Veneza, perfeito para a primeira noite.' },
      ],
      optional: [
        { venueId: 'homofaber', title: 'Homo Faber · San Giorgio (só até 30 set)', detail: 'Se chegar de manhã e a data permitir, vale a tarde inteira: reserve faixa horária, shuttle gratuito de San Zaccaria a cada 30 min. Nesse caso empurre Kapoor e Diedo para o fim do dia.' },
        { venueId: 'saville', title: 'Jenny Saville · Ca’ Pesaro', detail: 'A 10 min de Strada Nova pela Ponte de Rialto ou traghetto de Santa Sofia. €10, fecha às 18h e às segundas.' },
      ],
    },
    {
      weekday: 1,
      name: 'Segunda',
      theme: 'Bienal fechada · dia Pinault em Dorsoduro',
      why: 'Segunda é o único dia em que Giardini e Arsenale fecham, junto com os museus estatais, os MUVE e a Querini. A Pinault Collection, a Peggy Guggenheim, o Fortuny e a Prada, ao contrário, fecham às terças. É a combinação perfeita para o dia de hoje: um único bilhete de €20 cobre as quatro mostras Pinault.',
      steps: [
        { time: '10h00', venueId: 'pdogana', title: 'Punta della Dogana · Lorna Simpson', detail: 'Chegue na abertura (vaporetto linha 1 até Salute). Primeira retrospectiva europeia, ~50 obras. Guarde o bilhete: vale também para o Palazzo Grassi.' },
        { time: '10h45', venueId: 'pdogana2', title: 'Paulo Nazareth · Algebra', detail: 'No mesmo prédio, curadoria de Fernanda Brenner. Duas mostras em ~1h45 no total.' },
        { time: '12h00', venueId: 'peggy', title: 'Peggy Guggenheim Collection', detail: '5 minutos a pé pelas Zattere. Reserve o horário online. Coleção permanente + "Peggy Guggenheim in London". Termina em 19 de outubro.' },
        { time: '13h30', title: 'Almoço nas Zattere', detail: 'Fondamenta Zattere ao sol, de frente para a Giudecca. Gelato na Nico depois.' },
        { time: '14h30', venueId: 'grassi', title: 'Palazzo Grassi · Michael Armitage', detail: 'Atravesse a Ponte dell’Accademia e siga até Campo San Samuele (15 min). Entrada com o bilhete da manhã.' },
        { time: '15h15', venueId: 'grassi2', title: 'Amar Kanwar · Co-travellers', detail: 'Mesmo palácio. Saia por volta das 16h.' },
        { time: '16h15', venueId: 'wurm', title: 'Erwin Wurm · Museo Fortuny', detail: '5 minutos a pé. Última entrada 17h, fecha às 18h. Fortuny fecha às terças, então é hoje ou nunca.' },
        { time: '17h30', venueId: 'louisv', title: 'San Marco a pé · Lu Yang no Espace Louis Vuitton', detail: 'Do Fortuny a San Marco são 10 min. Gratuito, aberto até 19h (só até 4 out). No caminho, Chihuly no Palazzo Franchetti e na Ponte dell’Accademia.' },
        { time: '19h00', title: 'Aperitivo em San Marco / Castello', detail: 'Riva degli Schiavoni ao pôr do sol. Recolha cedo: amanhã começa a maratona da Bienal.' },
      ],
      optional: [
        { venueId: 'prada', title: 'Fondazione Prada · Helter Skelter', detail: 'Se preferir Jafa & Prince ao Wurm: vaporetto até San Stae, entrada com faixa horária até 17h. Conteúdo explícito. Fecha às terças.' },
        { venueId: 'fabre', title: 'Jan Fabre · Scuola Grande di San Rocco', detail: 'Aberta todos os dias até 17h30. Pode encaixar entre Grassi e Fortuny se andar rápido (Campo San Rocco fica a 12 min do Grassi).' },
        { venueId: 'kantarovsky', title: 'Sanya Kantarovsky · Palazzo Loredan', detail: 'Campo Santo Stefano, gratuito até 17h30, fecha às terças. Fica no caminho entre o Grassi e o Fortuny.' },
      ],
    },
    {
      weekday: 2,
      name: 'Terça',
      theme: 'Bienal, dia 1 · Giardini',
      why: 'Primeiro dia da Bienal com o ingresso semanal. Os Giardini pedem o dia inteiro: o Padiglione Centrale abriga o núcleo de "In Minor Keys" e os pavilhões nacionais históricos ficam todos aqui. Chegue antes da abertura para pegar a mostra principal vazia. O que não couber hoje volta na quinta.',
      steps: [
        { time: '09h40', title: 'Vaporetto até Giardini', detail: 'Linha 1 ou 2 até a parada Giardini. Fila menor na entrada de Sant’Elena, se estiver longa. O horário de abertura depende da data (veja o quadro acima).' },
        { time: 'abertura', venueId: 'centrale', title: 'Padiglione Centrale · In Minor Keys', detail: 'Comece pela mostra principal. Otobong Nkanga reveste as colunas da entrada com tijolos venezianos. Reserve ~2h.' },
        { time: '12h30', title: 'Almoço', detail: 'Café dos Giardini (caro) ou saia 10 min até a Via Garibaldi: Ostaria del Garanghelo, El Refolo. Com o ingresso semanal você entra e sai à vontade.' },
        { time: '13h45', title: 'Pavilhões nacionais · circuito 1', detail: 'Brasil (Varejão e Paulino), Estados Unidos, Grã-Bretanha (Lubaina Himid), Alemanha, França (Yto Barrada), Países Nórdicos, Áustria (Holzinger).' },
        { time: '15h45', title: 'Pavilhões nacionais · circuito 2', detail: 'Japão, Coreia, Holanda, Bélgica, Espanha, Hungria, Grécia, Egito, Venezuela, Uruguai. Anote o que ficou de fora: a quinta tem uma janela para voltar.' },
        { time: 'fechamento', title: 'Saída pelo Riva · Via Garibaldi', detail: 'Aperitivo em Castello. Jantar cedo: amanhã é o Arsenale.' },
      ],
      optional: [
        { venueId: 'abramovic', title: 'Marina Abramović · Accademia', detail: 'Aberta até 19h (venda até 18h) de terça a domingo. Só cabe se você cortar os Giardini às 16h30: a linha 1 chega à Accademia em ~25 min. Termina em 19 out.' },
        { venueId: 'taiwan', title: 'Taiwan · Palazzo delle Prigioni', detail: 'Ao lado do Palazzo Ducale, gratuito, horário da Bienal. Bom para a volta de vaporetto até San Zaccaria.' },
      ],
    },
    {
      weekday: 3,
      name: 'Quarta',
      theme: 'Bienal, dia 2 · Arsenale: Corderie e Tese delle Vergini',
      why: 'O Arsenale é a maior sede e agora tem dois dias. Hoje é o dia da mostra principal nas Corderie, sem pressa, mais o Giardino e as Tese delle Vergini (Itália, China, Israel). Os pavilhões das Artiglierie e das Sale d’Armi ficam para quinta. Na saída, os colaterais gratuitos de Castello.',
      steps: [
        { time: 'abertura', title: 'Arsenale · Corderie', detail: 'Entre pelo Campo della Tana na abertura. As Corderie (300 m de mostra principal) merecem ~3h com calma, incluindo os vídeos longos.' },
        { time: '13h00', title: 'Almoço no Arsenale', detail: 'Café no Giardino delle Vergini, ou volte 8 min a pé à Via Garibaldi. O ingresso permite reentrada.' },
        { time: '14h00', venueId: 'italia', title: 'Tese delle Vergini · Itália, China, Israel', detail: 'Chiara Camoni no Pavilhão da Itália, depois China (Dream Stream), Israel e o Giardino delle Vergini. ~2h.' },
        { time: '16h15', venueId: 'hongkong', title: 'Hong Kong e Macao · Campo della Tana', detail: 'Na frente da saída do Arsenale, gratuitos: "Fermata" (Hong Kong) e "Jacone’s Polyphony" (Macao).' },
        { time: '17h00', venueId: 'ocean', title: 'Ocean Space · Tide of Returns', detail: 'Chiesa di San Lorenzo, 10 min a pé. Gratuito, aberto de quarta a domingo até 18h. Só até 11 de outubro.' },
        { time: '18h00', venueId: 'wales', title: 'Riva degli Schiavoni · Pietà', detail: 'Se ainda estiverem abertos (horário da Bienal): Wales, Aotearoa Nova Zelândia e Zimbábue dividem o complexo da Pietà. Jantar em Castello ou volte a San Marco.' },
      ],
      optional: [
        { venueId: 'cazaquistao', title: 'Cazaquistão · Museo Storico Navale', detail: 'Ao lado da entrada do Arsenale. Confirme no local se o pavilhão exige o ingresso do museu.' },
        { venueId: 'catalunha', title: 'Catalunha, Escócia e Islândia · San Pietro di Castello', detail: 'Docks Cantieri Cucchini e Olivolo ficam 10 min a leste do Arsenale. Bom trecho para quem quer sair do circuito.' },
      ],
    },
    {
      weekday: 4,
      name: 'Quinta',
      theme: 'Bienal, dia 3 · pavilhões do Arsenale, volta aos Giardini e saída',
      why: 'Terceiro dia de Bienal e o ingresso semanal faz o serviço: manhã nas Artiglierie e Sale d’Armi (Marrocos, Arábia Saudita, Irlanda, Omã e mais 20 países), almoço na Via Garibaldi e uma volta aos Giardini para o que ficou de fora na terça. A Alilaguna Blu sai da parada Arsenale direto para o aeroporto.',
      steps: [
        { time: '09h30', title: 'Malas', detail: 'Deixe as malas no hotel ou num depósito perto de San Zaccaria / Arsenale para não voltar ao outro lado da cidade.' },
        { time: 'abertura', venueId: 'marrocos', title: 'Arsenale · Artiglierie e Sale d’Armi', detail: 'Estreia do Marrocos (Amina Agueznay), Arábia Saudita (Dana Awartani), Irlanda (Isabel Nolan), Omã, Argentina, Chile, Panamá, Turquia, Emirados, Filipinas e os demais. ~3h.' },
        { time: '13h00', title: 'Almoço na Via Garibaldi', detail: 'Cicchetti rápidos: o tempo hoje é curto.' },
        { time: '13h45', venueId: 'centrale', title: 'Giardini · o que faltou na terça', detail: 'Linha 1 ou 10 min a pé. Volte aos pavilhões que ficaram de fora ou reveja o Padiglione Centrale. Até ~15h30.' },
        { time: '15h45', title: 'Vaticano em Castello (se não viu no domingo)', detail: 'Complesso di Santa Maria Ausiliatrice, Fondamenta S. Gioacchin, a 5 min da Via Garibaldi. Segunda sede do pavilhão, sem reserva.' },
        { time: '16h00', title: 'Rumo ao aeroporto (voo às 20h)', detail: 'Alilaguna linha Blu na parada Arsenale, direto para Marco Polo em ~1h15 (€15): chegada por volta de 17h30. Se for de trem, linha 1 até Ferrovia leva 40 min e você pode ficar na Bienal até o fechamento.' },
      ],
      optional: [
        { venueId: 'macao', title: 'Últimos colaterais do Campo della Tana', detail: 'Se não deu na quarta: Hong Kong e Macao ficam a 2 min da parada Arsenale.' },
        { venueId: 'gaza', title: 'Gaza — No Words · Palazzo Mora', detail: 'Se a saída for de trem: Strada Nova fica no caminho da estação (linha 1 até Ca’ d’Oro), aberto até 18h.' },
      ],
    },
  ],
};

// Horário oficial da Bienal em função da data (Giardini/Arsenale).
export function biennaleHoursOn(date) {
  const autumn = new Date('2026-09-29T00:00:00');
  if (date >= autumn) return '10h–18h (última entrada 17h45)';
  return '11h–19h (última entrada 18h45) · Arsenale até 20h sex e sáb';
}
