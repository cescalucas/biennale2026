// Roteiro pessoal: chegada no domingo, saída na quinta às 20h, ingresso semanal da Bienal.
// Cada etapa pode apontar para um venueId — a página puxa horário, preço, link de ingresso e
// avisa automaticamente se o local fecha naquele dia da semana ou se a mostra já terá encerrado.
// weekday: 0=dom … 6=sáb.

export const TRIP = {
  title: 'Sábado à noite → quinta',
  subtitle: 'Chegada no sábado à noite, cinco dias inteiros em Veneza, três deles na Bienal, com o ingresso semanal',
  departure: 'quinta-feira, 20h',
  // Dia 0: chegada no sábado à noite (sem programação)
  arrivalDay: {
    name: 'Sábado',
    theme: 'Chegada à noite · Londra Palace',
    stay: 'londra',
    steps: [
      { time: 'noite', title: 'Aeroporto → Londra Palace', detail: 'Alilaguna linha Blu até San Zaccaria (~1h15, €15; compre no app). Opera até por volta da meia-noite — confira o último horário para o seu voo. Táxi aquático até o cais do hotel leva ~30 min e é a opção segura para chegadas tardias.' },
      { time: 'no caminho', title: 'Passe de vaporetto', detail: 'Compre o passe ACTV de 7 dias no app AVM Venezia Official ainda no aeroporto; ele começa a valer na primeira validação, domingo de manhã.' },
      { time: 'ao chegar', title: 'Jantar leve e descanso', detail: 'Riva degli Schiavoni e Campo Santa Maria Formosa têm bacari abertos até tarde. Amanhã começa às 10h em Cannaregio.' },
    ],
  },
  hotels: [
    {
      id: 'londra',
      name: 'Londra Palace',
      nights: 'sáb · dom · seg · ter',
      address: 'Riva degli Schiavoni, Castello 4171',
      note: 'Parada San Zaccaria na porta (linhas 1, 2, Alilaguna Blu). Arsenale a 10 min a pé, Giardini a 20 min pelo Riva, Piazza San Marco a 3 min. Base ideal para os dias de Bienal.',
      mapsQuery: 'Londra Palace, Riva degli Schiavoni 4171, Venezia',
    },
    {
      id: 'jw',
      name: 'JW Marriott Venice Resort & Spa',
      nights: 'qua · qui',
      address: 'Isola delle Rose, laguna sul',
      note: 'Ilha privada: o acesso é só pelo shuttle gratuito do hotel a partir de San Marco Giardinetti (~20 min, saídas regulares; confirme a grade na reserva). Conte 30–40 min porta a porta até San Zaccaria/Arsenale. O hotel organiza táxi aquático direto da ilha ao aeroporto (~40 min).',
      mapsQuery: 'JW Marriott Venice Resort & Spa, Isola delle Rose, Venezia',
    },
  ],
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
      value: 'Voo às 20h → sair do Arsenale às 15h15, táxi aquático do JW às 16h30',
      detail:
        'As malas ficam no JW Marriott, então a volta é pela ilha: linha 1 Arsenale → San Marco (10 min), shuttle do hotel (20 min), malas e táxi aquático direto para Marco Polo (~40 min; reserve na recepção na véspera). Chegada por volta de 17h15. Alternativa mais barata: levar as malas de manhã para o depósito de San Zaccaria e pegar a Alilaguna Blu no Arsenale às 16h (~1h15, €15).',
      url: 'https://www.alilaguna.it/en',
    },
  ],
  checklist: [
    { text: 'Comprar o ingresso semanal da Bienal online (não há venda na bilheteria)', url: 'https://www.labiennale.org/en/tickets' },
    { text: 'Comprar Anish Kapoor · Palazzo Manfrin (€15) para o domingo às 10h', venueId: 'kapoor' },
    { text: 'Reservar o Giardino Mistico do Pavilhão do Vaticano (CoopCulture) para o domingo às 11h30', venueId: 'vaticano' },
    { text: 'Abramović na Accademia: ingresso pela TicketOne para o domingo às 16h30 (até 19 out)', venueId: 'abramovic' },
    { text: 'Comprar o bilhete Pinault (Dogana + Grassi, €20) para segunda de manhã', venueId: 'pdogana' },
    { text: 'Reservar horário na Peggy Guggenheim para segunda ao meio-dia (até 19 out)', venueId: 'peggy' },
    { text: 'Se a viagem for até 30 set: reservar faixa horária do Homo Faber (San Giorgio) — cabe no domingo no lugar da Accademia', venueId: 'homofaber' },
    { text: 'Baixar o app AVM Venezia e carregar o passe de vaporetto', url: 'https://actv.avmspa.it/en' },
    { text: 'Pedir ao JW Marriott a grade do shuttle San Marco ↔ Isola delle Rose e reservar o táxi aquático para o aeroporto na quinta às 16h30' },
    { text: 'Combinar a transferência das malas na quarta: deixar no Londra Palace até o fim do dia ou pedir ao JW que recolha (serviço pago)' },
  ],
  days: [
    {
      weekday: 0,
      name: 'Domingo',
      theme: 'Cannaregio de manhã · Abramović à tarde',
      stay: 'londra',
      why: 'Dia inteiro, e o único em que Palazzo Diedo (qui–dom) e a Accademia (fechada às segundas) cabem juntos. Manhã em Cannaregio com as três mostras mais comentadas fora da Bienal — Kapoor, Vaticano e Palazzo Diedo — e tarde na Accademia com Marina Abramović. Tudo aberto no domingo.',
      steps: [
        { time: '09h30', title: 'Vaporetto até Cannaregio', detail: 'Linha 1 de San Zaccaria a San Marcuola (~25 min) ou linha 2 a Ferrovia. Café na Fondamenta della Misericordia antes de abrir.' },
        { time: '10h00', venueId: 'kapoor', title: 'Anish Kapoor · Palazzo Manfrin', detail: 'Rio Terà San Leonardo, ao lado de Guglie. Compre antes online. ~100 maquetes e a nova "At the Edge of the World". Reserve 1h15.' },
        { time: '11h30', venueId: 'vaticano', title: 'Pavilhão do Vaticano · Giardino Mistico', detail: 'Carmelitas Descalços, 8 min a pé, junto à estação. Reserva prévia obrigatória pela CoopCulture. Brian Eno, Patti Smith, FKA Twigs e mais 21 artistas em paisagem sonora. ~1h.' },
        { time: '12h45', title: 'Almoço na Fondamenta della Misericordia', detail: 'Vino Vero, Paradiso Perduto ou Al Timon. 12 min a pé pelo Ghetto.' },
        { time: '14h00', venueId: 'strange', title: 'Strange Rules · Palazzo Diedo', detail: 'Herndon & Dryhurst, Parreno, Paglen, Steyerl, Hershman Leeson. Abre só qui–dom. ~1h15.' },
        { time: '15h20', venueId: 'gaza', title: 'Gaza — No Words · Palazzo Mora', detail: 'Strada Nova, gratuito, 8 min a pé. Mostra pequena, 25 min. Fecha às terças.' },
        { time: '16h00', title: 'Linha 1 de Ca\u2019 d\u2019Oro até Accademia', detail: 'Parada ao lado do Palazzo Mora; ~20 min pelo Grand Canal.' },
        { time: '16h30', venueId: 'abramovic', title: 'Marina Abramović · Gallerie dell\u2019Accademia', detail: 'Venda de ingressos até 18h, museu até 19h. Compre antes pela TicketOne. "Transforming Energy" com Rhythm 0 e Pietà em diálogo com Ticiano. Termina em 19 out.' },
        { time: '18h15', venueId: 'louisv', title: 'Volta a pé por Santo Stefano · Lu Yang no Espace Louis Vuitton', detail: 'Da Accademia a San Marco são 15 min. Gratuito, aberto até 19h (só até 4 out). No caminho, Chihuly na Ponte dell\u2019Accademia e Palazzo Franchetti.' },
        { time: '19h15', title: 'Jantar perto do hotel', detail: 'San Marco → Riva degli Schiavoni, 5 min. Amanhã começa às 10h em Punta della Dogana.' },
      ],
      optional: [
        { venueId: 'homofaber', title: 'Homo Faber · San Giorgio (só até 30 set)', detail: 'Se a data permitir, troque a Accademia pela ilha: shuttle gratuito de San Zaccaria a cada 30 min, reserva de faixa horária obrigatória.' },
        { venueId: 'saville', title: 'Jenny Saville · Ca\u2019 Pesaro', detail: 'A 10 min de Strada Nova pela Ponte de Rialto ou traghetto de Santa Sofia. €10, fecha às 18h e às segundas. Cabe no lugar do Palazzo Mora.' },
        { venueId: 'kantarovsky', title: 'Sanya Kantarovsky · Palazzo Loredan', detail: 'Campo Santo Stefano, gratuito até 17h30, fecha às terças. Se sair da Accademia cedo, fica no caminho.' },
        { venueId: 'erlich', title: 'Leandro Erlich · Negozio Olivetti', detail: 'Piazza San Marco, última entrada 18h, fecha às segundas. Cabe se você sair da Accademia às 17h30; bem do FAI com ingresso pago.' },
      ],
    },
    {
      weekday: 1,
      name: 'Segunda',
      theme: 'Bienal fechada · dia Pinault em Dorsoduro',
      stay: 'londra',
      why: 'Segunda é o único dia em que Giardini e Arsenale fecham, junto com os museus estatais, os MUVE e a Querini. A Pinault Collection, a Peggy Guggenheim, o Fortuny e a Prada, ao contrário, fecham às terças. É a combinação perfeita para o dia de hoje: um único bilhete de €20 cobre as quatro mostras Pinault.',
      steps: [
        { time: '10h00', venueId: 'pdogana', title: 'Punta della Dogana · Lorna Simpson', detail: 'Linha 1 de San Zaccaria a Salute: 7 minutos. Chegue na abertura. Primeira retrospectiva europeia, ~50 obras. Guarde o bilhete: vale também para o Palazzo Grassi.' },
        { time: '10h45', venueId: 'pdogana2', title: 'Paulo Nazareth · Algebra', detail: 'No mesmo prédio, curadoria de Fernanda Brenner. Duas mostras em ~1h45 no total.' },
        { time: '12h00', venueId: 'peggy', title: 'Peggy Guggenheim Collection', detail: '5 minutos a pé pelas Zattere. Reserve o horário online. Coleção permanente + "Peggy Guggenheim in London". Termina em 19 de outubro.' },
        { time: '13h30', title: 'Almoço nas Zattere', detail: 'Fondamenta Zattere ao sol, de frente para a Giudecca. Gelato na Nico depois.' },
        { time: '14h30', venueId: 'grassi', title: 'Palazzo Grassi · Michael Armitage', detail: 'Atravesse a Ponte dell\u2019Accademia e siga até Campo San Samuele (15 min). Entrada com o bilhete da manhã.' },
        { time: '15h15', venueId: 'grassi2', title: 'Amar Kanwar · Co-travellers', detail: 'Mesmo palácio. Saia por volta das 16h.' },
        { time: '16h15', venueId: 'wurm', title: 'Erwin Wurm · Museo Fortuny', detail: '5 minutos a pé. Última entrada 17h, fecha às 18h. Fortuny fecha às terças, então é hoje ou nunca.' },
        { time: '17h30', venueId: 'berengo', title: 'Vidro de Murano no Palazzo Franchetti · Chihuly', detail: 'Do Fortuny ao Campo Santo Stefano são 8 min. Vallien e Janecký, gratuito até 18h, fecha às terças. Na saída, as esculturas de Chihuly na Ponte dell\u2019Accademia com a luz do fim de tarde.' },
        { time: '19h00', title: 'Aperitivo no Riva, jantar perto do hotel', detail: 'Riva degli Schiavoni ao pôr do sol, a 3 min do Londra Palace. Recolha cedo: amanhã começa a maratona da Bienal.' },
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
      stay: 'londra',
      why: 'Primeiro dia da Bienal com o ingresso semanal. Os Giardini pedem o dia inteiro: o Padiglione Centrale abriga o núcleo de "In Minor Keys" e os pavilhões nacionais históricos ficam todos aqui. Chegue antes da abertura para pegar a mostra principal vazia. O que não couber hoje volta na quinta.',
      steps: [
        { time: '09h30', title: 'Do hotel aos Giardini', detail: 'A pé pelo Riva degli Schiavoni são 20 min agradáveis; de vaporetto, linha 1 de San Zaccaria a Giardini, 2 paradas. Fila menor na entrada de Sant\u2019Elena, se estiver longa. O horário de abertura depende da data (veja o quadro acima).' },
        { time: 'abertura', venueId: 'centrale', title: 'Padiglione Centrale · In Minor Keys', detail: 'Comece pela mostra principal. Otobong Nkanga reveste as colunas da entrada com tijolos venezianos. Reserve ~2h.' },
        { time: '12h30', title: 'Almoço', detail: 'Café dos Giardini (caro) ou saia 10 min até a Via Garibaldi: Ostaria del Garanghelo, El Refolo. Com o ingresso semanal você entra e sai à vontade.' },
        { time: '13h45', title: 'Pavilhões nacionais · circuito 1', detail: 'Brasil (Varejão e Paulino), Estados Unidos, Grã-Bretanha (Lubaina Himid), Alemanha, França (Yto Barrada), Países Nórdicos, Áustria (Holzinger).' },
        { time: '15h45', title: 'Pavilhões nacionais · circuito 2', detail: 'Japão, Coreia, Holanda, Bélgica, Espanha, Hungria, Grécia, Egito, Venezuela, Uruguai. Anote o que ficou de fora: a quinta tem uma janela para voltar.' },
        { time: 'fechamento', title: 'Volta a pé pelo Riva · Via Garibaldi', detail: 'Aperitivo em Castello e 20 min de caminhada até o hotel. À noite, deixe as malas prontas: amanhã é dia de trocar de hotel.' },
      ],
      optional: [
        { venueId: 'abramovic', title: 'Marina Abramović · Accademia', detail: 'Aberta até 19h (venda até 18h) de terça a domingo. Só cabe se você cortar os Giardini às 16h30: a linha 1 chega à Accademia em ~25 min. Termina em 19 out.' },
        { venueId: 'taiwan', title: 'Taiwan · Palazzo delle Prigioni', detail: 'Ao lado do Palazzo Ducale, gratuito, horário da Bienal. Bom para a volta de vaporetto até San Zaccaria.' },
      ],
    },
    {
      weekday: 3,
      name: 'Quarta',
      theme: 'Bienal, dia 2 · Arsenale, e mudança para o JW Marriott',
      stay: 'jw',
      why: 'Dia de troca de hotel, por isso o Arsenale (a 10 min a pé do Londra Palace) é perfeito: check-out de manhã, malas guardadas no Londra Palace, dia inteiro nas Corderie e nas Tese delle Vergini, e no fim da tarde o shuttle do JW Marriott em San Marco Giardinetti. Os pavilhões das Artiglierie e das Sale d\u2019Armi ficam para quinta.',
      steps: [
        { time: '09h15', title: 'Check-out no Londra Palace, malas na bagageria', detail: 'Peça para guardar as malas até as 17h30. Alternativa sem volta ao hotel: o JW Marriott recolhe a bagagem no Londra Palace (serviço pago, combine na véspera).' },
        { time: 'abertura', title: 'Arsenale · Corderie', detail: '10 min a pé pelo Riva até o Campo della Tana. As Corderie (300 m de mostra principal) merecem ~3h com calma, incluindo os vídeos longos.' },
        { time: '13h00', title: 'Almoço no Arsenale', detail: 'Café no Giardino delle Vergini, ou volte 8 min a pé à Via Garibaldi. O ingresso permite reentrada.' },
        { time: '14h00', venueId: 'italia', title: 'Tese delle Vergini · Itália, China, Israel', detail: 'Chiara Camoni no Pavilhão da Itália, depois China (Dream Stream), Israel e o Giardino delle Vergini. ~2h.' },
        { time: '16h15', venueId: 'hongkong', title: 'Hong Kong e Macao · Campo della Tana', detail: 'Na frente da saída do Arsenale, gratuitos: "Fermata" (Hong Kong) e "Jacone\u2019s Polyphony" (Macao).' },
        { time: '17h00', venueId: 'wales', title: 'Riva degli Schiavoni · Pietà', detail: 'No caminho de volta ao hotel (horário da Bienal, até 18h): Wales, Aotearoa Nova Zelândia e Zimbábue dividem o complexo da Pietà, a 3 min do Londra Palace.' },
        { time: '17h45', title: 'Malas e shuttle para a Isola delle Rose', detail: 'Pegue as malas no Londra Palace e caminhe 8 min até San Marco Giardinetti, o cais do shuttle do JW Marriott (~20 min de travessia). Check-in, jantar no resort e noite tranquila.' },
      ],
      optional: [
        { venueId: 'ocean', title: 'Ocean Space · Tide of Returns', detail: 'Chiesa di San Lorenzo, 10 min do Arsenale. Gratuito, qua–dom até 18h, só até 11 out. Cabe se você sair do Arsenale às 16h e deixar a Pietà para quinta.' },
        { venueId: 'cazaquistao', title: 'Cazaquistão · Museo Storico Navale', detail: 'Ao lado da entrada do Arsenale. Confirme no local se o pavilhão exige o ingresso do museu.' },
        { venueId: 'catalunha', title: 'Catalunha, Escócia e Islândia · San Pietro di Castello', detail: 'Docks Cantieri Cucchini e Olivolo ficam 10 min a leste do Arsenale. Bom trecho para quem quer sair do circuito.' },
      ],
    },
    {
      weekday: 4,
      name: 'Quinta',
      theme: 'Bienal, dia 3 · pavilhões do Arsenale, volta aos Giardini e saída',
      stay: 'jw',
      why: 'Terceiro dia de Bienal: manhã nas Artiglierie e Sale d\u2019Armi (Marrocos, Arábia Saudita, Irlanda, Omã e mais 20 países), almoço na Via Garibaldi e uma volta aos Giardini para o que ficou de fora na terça. Como as malas ficam na ilha, a saída é pelo JW Marriott: shuttle até a ilha e táxi aquático direto ao aeroporto.',
      steps: [
        { time: '08h30', title: 'Check-out e shuttle do JW Marriott', detail: 'Deixe as malas na bagageria do resort e pegue o primeiro shuttle da manhã para San Marco Giardinetti (~20 min). Dali, linha 1 de San Marco/San Zaccaria até Arsenale (10 min) ou 15 min a pé.' },
        { time: 'abertura', venueId: 'marrocos', title: 'Arsenale · Artiglierie e Sale d\u2019Armi', detail: 'Estreia do Marrocos (Amina Agueznay), Arábia Saudita (Dana Awartani), Irlanda (Isabel Nolan), Omã, Argentina, Chile, Panamá, Turquia, Emirados, Filipinas e os demais. ~3h.' },
        { time: '13h00', title: 'Almoço na Via Garibaldi', detail: 'Cicchetti rápidos: o tempo hoje é curto.' },
        { time: '13h45', venueId: 'centrale', title: 'Giardini · o que faltou na terça', detail: 'Linha 1 ou 10 min a pé. Volte aos pavilhões que ficaram de fora ou reveja o Padiglione Centrale. Até ~15h00.' },
        { time: '15h15', title: 'Giardini → San Marco → shuttle', detail: 'Linha 1 de Giardini a San Marco (15 min) e shuttle do JW em Giardinetti por volta de 15h45 (confirme o horário exato na recepção). Chegada à ilha ~16h10.' },
        { time: '16h30', title: 'Táxi aquático da Isola delle Rose ao aeroporto (voo às 20h)', detail: 'Reservado na véspera pela recepção: ~40 min direto ao cais de Marco Polo, chegada por volta de 17h15. Alternativa econômica: malas no depósito de San Zaccaria de manhã e Alilaguna Blu do Arsenale às 16h (~1h15, €15).' },
      ],
      optional: [
        { title: 'Vaticano em Castello (se não viu no domingo)', detail: 'Complesso di Santa Maria Ausiliatrice, Fondamenta S. Gioacchin, a 5 min da Via Garibaldi. Segunda sede do pavilhão, sem reserva. Encaixe no lugar da volta aos Giardini.' },
        { venueId: 'macao', title: 'Últimos colaterais do Campo della Tana', detail: 'Se não deu na quarta: Hong Kong e Macao ficam a 2 min da parada Arsenale.' },
        { title: 'Saída de trem?', detail: 'Se a volta for pela estação Santa Lucia, mantenha o desvio pela ilha para as malas e pegue a linha 2 de San Marco a Ferrovia (30 min). Dá para ficar na Bienal até 16h30.' },
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
