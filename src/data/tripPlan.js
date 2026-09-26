// Roteiro pessoal: chegada no domingo, saída na quinta às 20h, ingresso semanal da Bienal.
// Cada etapa pode apontar para um venueId — a página puxa horário, preço, link de ingresso e
// avisa automaticamente se o local fecha naquele dia da semana ou se a mostra já terá encerrado.
// weekday: 0=dom … 6=sáb.

export const TRIP = {
  title: 'Domingo → quinta',
  subtitle: 'Cinco dias em Veneza com o ingresso semanal da Bienal',
  departure: 'quinta-feira, 20h',
  tickets: [
    {
      label: 'Bienal · ingresso semanal',
      value: '€50 · 7 dias consecutivos, entradas ilimitadas em Giardini e Arsenale',
      detail:
        'Compra só online (labiennale.org / Vivaticket). Ative-o na terça: cobre terça (Giardini), quarta (Arsenale) e uma volta rápida na quinta se faltar algo. O ingresso de 3 dias (€40, ter–qui) também serviria; o semanal dá folga para entrar no domingo à tarde, se chegar cedo.',
      url: 'https://www.labiennale.org/en/tickets',
    },
    {
      label: 'Vaporetto · passe ACTV 7 dias',
      value: '€65 · ilimitado, inclui linha 20 (San Servolo) e Lido',
      detail: 'Alternativa: 72h por €45 (seg–qua) e caminhar na quinta. Bilhete avulso custa €9,50, então o passe se paga em 7 trechos. Compre no app AVM Venezia Official ou nas máquinas da estação.',
      url: 'https://actv.avmspa.it/en',
    },
    {
      label: 'Aeroporto · saída na quinta',
      value: 'Voo às 20h → sair de Cannaregio até 16h30',
      detail:
        'Alilaguna linha Arancio sai de Guglie (Cannaregio) direto para Marco Polo em ~65 min (€15). Ou vaporetto até Piazzale Roma + ônibus ACTV 5 / ATVO (20–25 min, €10). Se a saída for de trem, a estação Santa Lucia fica a 5 min a pé do roteiro da quinta: dá para aproveitar até 19h.',
      url: 'https://www.alilaguna.it/en',
    },
  ],
  checklist: [
    { text: 'Comprar o ingresso semanal da Bienal online (não há venda na bilheteria)', url: 'https://www.labiennale.org/en/tickets' },
    { text: 'Comprar o bilhete Pinault (Dogana + Grassi, €20) para segunda de manhã', venueId: 'pdogana' },
    { text: 'Reservar horário na Peggy Guggenheim para segunda ao meio-dia (até 19 out)', venueId: 'peggy' },
    { text: 'Reservar visita ao Giardino Mistico do Pavilhão do Vaticano (CoopCulture) para quinta', venueId: 'vaticano' },
    { text: 'Comprar Anish Kapoor · Palazzo Manfrin (€15) para quinta às 10h', venueId: 'kapoor' },
    { text: 'Abramović na Accademia: ingresso pela TicketOne para quinta à tarde (até 19 out)', venueId: 'abramovic' },
    { text: 'Se chegar até 30 set: reservar faixa horária do Homo Faber (San Giorgio) para domingo', venueId: 'homofaber' },
    { text: 'Baixar o app AVM Venezia e carregar o passe de vaporetto', url: 'https://actv.avmspa.it/en' },
  ],
  days: [
    {
      weekday: 0,
      name: 'Domingo',
      theme: 'Chegada · San Marco a pé',
      why: 'Dia de chegada, sem correria. Tudo neste trecho é gratuito ou aberto até tarde, e fica num raio de 10 minutos a pé de San Marco. A Bienal abre hoje, mas guarde as sedes para terça e quarta, quando os museus privados fecham.',
      steps: [
        { time: 'chegada', title: 'Check-in e passe de vaporetto', detail: 'Do aeroporto: Alilaguna (linha Blu ou Arancio) ou ônibus até Piazzale Roma. Compre o passe ACTV de 7 dias já na chegada.' },
        { time: '15h00', venueId: 'chihuly', title: 'Chihuly no Grand Canal', detail: 'As esculturas ficam ao ar livre na Ponte dell’Accademia e no Palazzo Franchetti: primeiro contato com a cidade sem fila nem ingresso.' },
        { time: '15h30', venueId: 'berengo', title: 'Vidro de Murano no Palazzo Franchetti', detail: 'Vallien e Janecký, gratuito, no mesmo palácio. Fecha às terças, por isso entra hoje.' },
        { time: '16h15', venueId: 'kantarovsky', title: 'Sanya Kantarovsky · Palazzo Loredan', detail: 'Campo Santo Stefano, 3 minutos a pé. Gratuito e fecha às 17h30 (e às terças).' },
        { time: '17h15', venueId: 'louisv', title: 'Lu Yang · Espace Louis Vuitton', detail: 'Calle del Ridotto, atrás de San Marco. Gratuito, aberto até 19h todos os dias. Só até 4 de outubro.' },
        { time: '18h00', venueId: 'erlich', title: 'Leandro Erlich · Negozio Olivetti', detail: 'Na própria Piazza San Marco, última entrada 18h. É bem do FAI, com ingresso pago; se preferir, deixe para outro dia — mas atenção: fecha às segundas.' },
        { time: '19h00', title: 'Aperitivo e jantar em San Marco / Castello', detail: 'Riva degli Schiavoni ao pôr do sol. Recolha cedo: terça e quarta são dias longos.' },
      ],
      optional: [
        { venueId: 'homofaber', title: 'Homo Faber · San Giorgio (só até 30 set)', detail: 'Se a chegada for antes do fim de setembro, vale a tarde inteira: reserve faixa horária, shuttle gratuito de San Zaccaria a cada 30 min.' },
        { venueId: 'correr', title: 'Bizhan Bassiri · Museo Correr', detail: 'Aberto todos os dias até 18h; entra no bilhete dos Musei di Piazza San Marco (€35), então só compensa se for visitar o Palazzo Ducale.' },
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
        { time: '18h00', title: 'Rialto ao entardecer', detail: 'Cicchetti nos bacari perto do mercado (All’Arco, Cantina Do Mori). Amanhã começa cedo.' },
      ],
      optional: [
        { venueId: 'prada', title: 'Fondazione Prada · Helter Skelter', detail: 'Se preferir Jafa & Prince ao Wurm: vaporetto até San Stae, entrada com faixa horária até 17h. Conteúdo explícito. Fecha às terças.' },
        { venueId: 'fabre', title: 'Jan Fabre · Scuola Grande di San Rocco', detail: 'Aberta todos os dias até 17h30. Pode encaixar entre Grassi e Fortuny se andar rápido (Campo San Rocco fica a 12 min do Grassi).' },
        { venueId: 'saytour', title: 'Patrick Saytour · Palazzo Vendramin Grimani', detail: 'Abre de quinta a segunda, então segunda é uma boa janela para quem gosta de Supports/Surfaces. €12.' },
      ],
    },
    {
      weekday: 2,
      name: 'Terça',
      theme: 'Giardini · mostra principal e pavilhões históricos',
      why: 'Primeiro dia da Bienal com o ingresso semanal. Os Giardini pedem o dia inteiro: o Padiglione Centrale abriga o núcleo de "In Minor Keys" e os pavilhões nacionais históricos ficam todos aqui. Chegue antes da abertura para pegar a mostra principal vazia.',
      steps: [
        { time: '09h40', title: 'Vaporetto até Giardini', detail: 'Linha 1 ou 2 até a parada Giardini. Fila menor na entrada de Sant’Elena, se estiver longa. O horário de abertura depende da data (veja o quadro acima).' },
        { time: 'abertura', venueId: 'centrale', title: 'Padiglione Centrale · In Minor Keys', detail: 'Comece pela mostra principal. Otobong Nkanga reveste as colunas da entrada com tijolos venezianos. Reserve ~2h.' },
        { time: '12h30', title: 'Almoço', detail: 'Café dos Giardini (caro) ou saia 10 min até a Via Garibaldi: Ostaria del Garanghelo, El Refolo. Com o ingresso semanal você entra e sai à vontade.' },
        { time: '13h45', title: 'Pavilhões nacionais · circuito 1', detail: 'Brasil (Varejão e Paulino), Estados Unidos, Grã-Bretanha (Lubaina Himid), Alemanha, França (Yto Barrada), Países Nórdicos, Áustria (Holzinger).' },
        { time: '15h45', title: 'Pavilhões nacionais · circuito 2', detail: 'Japão, Coreia, Holanda, Bélgica, Espanha, Hungria, Grécia, Egito, Venezuela, Uruguai. Deixe os menores para o fim: fecham junto com o parque.' },
        { time: 'fechamento', title: 'Saída pelo Riva · Via Garibaldi', detail: 'Aperitivo em Castello. Se sobrar fôlego, os pavilhões da cidade em Castello (Pietà, Palazzo Zorzi) já terão fechado; guarde-os para amanhã.' },
      ],
      optional: [
        { venueId: 'abramovic', title: 'Marina Abramović · Accademia', detail: 'Aberta até 19h (venda até 18h) de terça a domingo. Se sair dos Giardini às 17h, a linha 1 chega à Accademia em ~25 min. Alternativa: quinta à tarde, como no roteiro.' },
      ],
    },
    {
      weekday: 3,
      name: 'Quarta',
      theme: 'Arsenale · Corderie e os colaterais de Castello',
      why: 'O Arsenale é a maior sede: Corderie (continuação da mostra principal), Artiglierie, Sale d’Armi e Tese delle Vergini. Em 2026 abriga também Irlanda, Marrocos, Arábia Saudita e Omã. Na saída, vários Eventos Colaterais gratuitos ficam a poucos metros do portão.',
      steps: [
        { time: 'abertura', title: 'Arsenale · Corderie', detail: 'Entre pelo Campo della Tana na abertura. As Corderie (300 m de mostra principal) merecem ~2h30 sem pressa.' },
        { time: '12h30', title: 'Almoço no Arsenale', detail: 'Café no Giardino delle Vergini, ou volte 8 min a pé à Via Garibaldi. O ingresso permite reentrada.' },
        { time: '13h30', venueId: 'italia', title: 'Tese delle Vergini · Itália, China, Israel', detail: 'Chiara Camoni no Pavilhão da Itália, depois China (Dream Stream) e os países das Tese. ~1h30.' },
        { time: '15h00', venueId: 'marrocos', title: 'Artiglierie e Sale d’Armi', detail: 'Estreia do Marrocos (Amina Agueznay), Arábia Saudita (Dana Awartani), Irlanda (Isabel Nolan), Omã, Argentina, Chile, Panamá e demais países. Até ~16h30.' },
        { time: '16h30', venueId: 'hongkong', title: 'Hong Kong e Macao · Campo della Tana', detail: 'Na frente da saída do Arsenale, gratuitos: "Fermata" (Hong Kong) e "Jacone’s Polyphony" (Macao).' },
        { time: '17h00', venueId: 'ocean', title: 'Ocean Space · Tide of Returns', detail: 'Chiesa di San Lorenzo, 10 min a pé. Gratuito, aberto de quarta a domingo até 18h. Só até 11 de outubro.' },
        { time: '18h00', venueId: 'wales', title: 'Riva degli Schiavoni · Pietà', detail: 'Se ainda estiverem abertos (horário da Bienal): Wales, Aotearoa Nova Zelândia e Zimbábue dividem o complexo da Pietà. Jantar em Castello ou volte a San Marco.' },
      ],
      optional: [
        { venueId: 'cazaquistao', title: 'Cazaquistão · Museo Storico Navale', detail: 'Ao lado da entrada do Arsenale. Confirme no local se o pavilhão exige o ingresso do museu.' },
        { venueId: 'catalunha', title: 'Catalunha e Escócia · San Pietro di Castello', detail: 'Docks Cantieri Cucchini e Olivolo ficam 10 min a leste do Arsenale, junto com o pavilhão da Islândia. Bom trecho para quem quer sair do circuito.' },
        { venueId: 'taiwan', title: 'Taiwan · Palazzo delle Prigioni', detail: 'Ao lado do Palazzo Ducale, gratuito, no caminho de volta a San Marco.' },
      ],
    },
    {
      weekday: 4,
      name: 'Quinta',
      theme: 'Cannaregio · Kapoor, Berggruen e a saída',
      why: 'Cannaregio concentra três das mostras mais comentadas do ano e fica colado à estação e a Piazzale Roma, de onde saem ônibus e barcos para o aeroporto. Palazzo Diedo só abre de quinta a domingo, então hoje é o dia. Deixe as malas no hotel ou no depósito da estação.',
      steps: [
        { time: '10h00', venueId: 'kapoor', title: 'Anish Kapoor · Palazzo Manfrin', detail: 'Compre antes online. ~100 maquetes e a nova "At the Edge of the World". Reserve 1h15.' },
        { time: '11h30', venueId: 'strange', title: 'Strange Rules · Palazzo Diedo', detail: '5 minutos a pé. Herndon & Dryhurst, Parreno, Paglen, Steyerl, Hershman Leeson. Abre só qui–dom.' },
        { time: '13h00', title: 'Almoço na Fondamenta della Misericordia', detail: 'Vino Vero, Paradiso Perduto ou Al Timon. Trecho mais tranquilo de Veneza.' },
        { time: '14h15', venueId: 'vaticano', title: 'Pavilhão do Vaticano · Giardino Mistico', detail: 'Carmelitas Descalços, junto à estação. Reserva prévia obrigatória pela CoopCulture. Brian Eno, Patti Smith, FKA Twigs e mais 21 artistas em paisagem sonora.' },
        { time: '15h30', venueId: 'gaza', title: 'Gaza — No Words · Palazzo Mora', detail: 'Strada Nova, gratuito, 10 min a pé. Colateral do Palestine Museum US.' },
        { time: '16h30', title: 'Rumo ao aeroporto (voo às 20h)', detail: 'Alilaguna Arancio na parada Guglie, a 5 min do Palazzo Mora, direto para Marco Polo (~65 min). Ou 10 min a pé até Piazzale Roma e ônibus 5 / ATVO. Chegada ao aeroporto por volta de 17h45.' },
      ],
      optional: [
        { venueId: 'abramovic', title: 'Marina Abramović · Accademia (se a saída for de trem)', detail: 'Com saída às 20h da Santa Lucia dá para trocar o Vaticano/Palazzo Mora pela Accademia: linha 1 de Ca’ d’Oro até Accademia (20 min), última venda 18h, volta de vaporetto até a estação em 25 min.' },
        { venueId: 'saville', title: 'Jenny Saville · Ca’ Pesaro', detail: 'A 10 min de Strada Nova pela Ponte de Rialto (ou traghetto em Santa Sofia). €10, fecha às 18h.' },
        { title: 'Volta rápida ao Arsenale ou Giardini', detail: 'O ingresso semanal ainda vale: se sobrou algo importante na terça ou quarta, a linha 1 leva de Ca’ d’Oro aos Giardini em 30 min.' },
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
