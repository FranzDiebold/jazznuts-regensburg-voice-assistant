const {
  listToText,
  listToVisual,
  randomize,
  getConcertDaysText,
  getConcertDaysVisual,
} = require("./util");

const speechContents = {
  WELCOME: () => {
    return randomize([
      "Willkommen bei den Jazznuts. Du kannst mich zum Beispiel über die nächsten Konzerte befragen.",
      "Hallo und willkommen bei den Jazznuts. Du kannst mich beispielsweise über die nächsten Konzerte befragen.",
    ]);
  },
  NEXT_CONCERT_DATE: (nextConcert) => {
    const dates = getConcertDaysText(nextConcert);
    const title = nextConcert.title
      ? `Der Titel ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`
      : "Der Titel steht leider noch nicht fest.";
    return [
      `Unsere nächsten Konzerte finden am ${dates} im ${nextConcert.location} statt.`,
      title,
    ].join(" ");
  },
  NEXT_CONCERT_TITLE: (nextConcert) => {
    const dates = getConcertDaysText(nextConcert);
    const title = nextConcert.title
      ? `Der Titel unserer nächsten Konzerte ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`
      : "Der Titel unserer nächsten Konzerte steht leider noch nicht fest. Wir wissen allerdings schon wann sie stattfinden.";
    return [
      title,
      `Sie finden am ${dates} im ${nextConcert.location} statt.`,
    ].join(" ");
  },
  NEXT_CONCERT_LOCATION: (nextConcert) => {
    const dates = getConcertDaysText(nextConcert);
    const title = nextConcert.title
      ? `Der Titel ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`
      : "Der Titel steht leider noch nicht fest.";
    return [
      `Unsere nächsten Konzerte finden im ${nextConcert.location} statt, und zwar am ${dates}.`,
      title,
    ].join(" ");
  },
  NEXT_CONCERT_PRICE: (nextConcert) => {
    const prices = nextConcert.prices;
    if (prices) {
      return [
        `Die Preise im Vorverkauf sind <say-as interpret-as="unit">${prices.advance.reduced}€</say-as> ermäßigt und <say-as interpret-as="unit">${prices.advance.regular}€</say-as> regulär.`,
        `An der Abendkasse sind die Preise <say-as interpret-as="unit">${prices.boxOffice.reduced}€</say-as> ermäßigt und <say-as interpret-as="unit">${prices.boxOffice.regular}€</say-as> regulär.`,
      ].join(" ");
    } else {
      return "Die Preise für die nächsten Konzerte stehen leider noch nicht fest.";
    }
  },
  NO_INFORMATION_FOR_NEXT_CONCERT_YET: () =>
    "Leider stehen derzeit weder die Termine noch der Titel der nächsten Konzerte fest. Frage mich einfach in ein paar Tagen noch einmal, dann weiß ich wahrscheinlich mehr.",
  TIME_UNTIL_NEXT_CONCERT: (timeDifference) => {
    return `Es sind noch ${timeDifference} bis zum nächsten Jazznuts Konzert! Um dir die Zeit bis dahin zu verkürzen kannst du uns auf Instagram (@jazznuts.regensburg) oder Facebook (@jazznuts) folgen!`;
  },
  LAST_CONCERT_TITLE: (concert) =>
    `Der Titel des letzten Konzertes, im ${concert.semesterText} ${concert.year} war <break strength="medium"/> <prosody volume="loud">${concert.title}</prosody>.`,
  LAST_CONCERT_SONG_LIST: (concert) => {
    const songList = listToText(concert.songs);
    return `Im letzten Konzert ${concert.title} wurden folgende Lieder gesungen: ${songList}.`;
  },
  PAST_SEMESTER_TITLE: (concert) =>
    `Der Konzertitel im ${concert.semesterText} ${concert.year} war <break strength="medium"/> <prosody volume="loud">${concert.title}</prosody>.`,
  PAST_SEMESTER_SONG_LIST: (concert) => {
    if (!concert.songs || concert.songs.length === 0) {
      return `Für das Konzert ${concert.title} im ${concert.semesterText} ${concert.year} habe ich leider keine Liederliste.`;
    }
    const songList = listToText(concert.songs);
    return `Beim Konzert ${concert.title} im ${concert.semesterText} ${concert.year} wurden folgende Lieder gesungen: ${songList}.`;
  },
  NO_INFORMATION_FOR_PAST_SEMESTER: (semester, year) =>
    `Es tut mir leid. Leider habe ich keine Informationen zum ${semester} ${year}.`,
  LIST_PAST_SEMESTERS_TITLES: (concerts) => {
    const semesterYearConcertTitleList = listToText(
      concerts.map(
        (concert) =>
          `im ${concert.semesterText} ${concert.year} ${concert.title}`
      )
    );
    return `Die Konzerttitel in den vergangenen Semestern waren: ${semesterYearConcertTitleList}.`;
  },
  RESERVATION_INFO: () =>
    "Karten kannst du auf www.jazznuts.de reservieren. Reservierte Karten müssen bis spätestens 30 Minuten vor Konzertbeginn abgeholt werden.",
  BUY_TICKETS_INFO: () =>
    'Karten im Vorverkauf gibt es in der Mensa der Uni und <say-as interpret-as="characters">OTH</say-as> Regensburg sowie an der Tourist-Info.',
  REDUCED_PRICE_INFO: () =>
    "Für die Ermäßigung berechtigt sind Schüler, Studierende, Azubis, Kinder bis 7 Jahren, Senioren und Menschen mit Behinderung.",
  ABOUT: () =>
    [
      "Die Jazznuts sind der A-cappella-Chor an der Uni Regensburg.",
      "Wir lieben es, moderne Pop- und Rocksongs zu singen. Den Chor gibt es seit 1995. Jedes Semester veranstalten wir eigene Konzerte und treten bei Festen am Regensburger Campus auf.",
      'Aktuell sind etwa 120 Sängerinnen und Sänger bei den Jazznuts aktiv – überwiegend Studierende der Uni und <say-as interpret-as="characters">OTH</say-as> Regensburg, aber auch Doktoranden, Bedienstete, Externe und Ehemalige.',
    ].join(" "),
  HELP: () =>
    "Du kannst mich über die nächsten oder vergangene Konzerte der Jazznuts befragen. Was möchtest du wissen?",
  CANCEL_STOP: () => {
    return randomize(["Ok. Bis bald!", "Tschö!"]);
  },
  REPROMPT: () => {
    const repromptText = randomize([
      "Kann ich dir noch weiterhelfen?",
      "Hast du sonst noch Fragen zu den Jazznuts Konzerten?",
    ]);
    return `<break time="1200ms"/> ${repromptText}`;
  },
};

const visualContents = {
  CONCERT: (concert) => {
    const textList = [
      `${concert.semesterText} ${concert.year}`,
      `Termine: ${getConcertDaysVisual(concert)}`,
      `Ort: ${concert.location}`,
    ];
    return {
      title: concert.title,
      imageUrl: concert.imageUrl,
      text: textList.join("  \n"),
    };
  },
  CONCERT_SONG_LIST: (concert) => {
    if (!concert.songs || concert.songs.length === 0) {
      return null;
    }
    const songList = listToVisual(concert.songs);
    return {
      title: concert.title,
      imageUrl: concert.imageUrl,
      text: `Liederliste im ${concert.semesterText} ${concert.year}:  \n${songList}`,
    };
  },
  LIST_PAST_SEMESTERS_TITLES: (concerts, generalData) => {
    return {
      title: "Konzerttitel der vergangenen Semester:",
      imageUrl: generalData.images.choir,
      text: listToVisual(
        concerts.map(
          (concert) =>
            `${concert.semesterText} ${concert.year}: ${concert.title}`
        )
      ),
    };
  },
  RESERVATION_INFO: (generalData, concert) => {
    return {
      title: "Jazznuts Online Reservierung",
      imageUrl: concert ? concert.imageUrl : undefined,
      text: "Reservierte Karten müssen bis spätestens 19:30 Uhr am Konzerttag abgeholt werden.",
      buttonText: generalData.online.reservation.label,
      buttonUrl: generalData.online.reservation.url,
    };
  },
  ABOUT: (generalData) => {
    return {
      title: "Jazznuts",
      imageUrl: generalData.images.choir,
      text: "Der A-cappella-Chor an der Uni Regensburg",
      buttonText: generalData.online.website.label,
      buttonUrl: generalData.online.website.url,
    };
  },
  HELP: (generalData) => {
    const exampleQuestions = [
      "Wann sind die nächsten Konzerte?",
      "Was war der Titel des letzten Konzerts?",
      "Was war das Thema im Wintersemester 2017?",
      "Welche Lieder wurden im Sommer 2019 gesungen?",
      "Wie lange ist es noch bis zum nächsten Konzert?",
      "Wo kann ich Karten kaufen?",
      "Kann ich Karten reservieren?",
    ];
    return {
      title: "Was kannst du mich fragen?",
      imageUrl: generalData.images.logo,
      text: listToVisual(exampleQuestions),
    };
  },
};

module.exports = {
  speechContents,
  visualContents,
};
