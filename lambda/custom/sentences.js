const {
    listToText,
    randomize,
    getConcertDaysText,
} = require('./util');

const sentences = {
    WELCOME: () => {
        return randomize([
            'Willkommen bei den Jazznuts. Du kannst mich zum Beispiel über die nächsten Konzerte befragen.',
            'Hallo und willkommen bei den Jazznuts. Du kannst mich beispielsweise über die nächsten Konzerte befragen.'
        ]);
    },
    NEXT_CONCERT_DATE: (nextConcert) => {
        const dates = getConcertDaysText(nextConcert);
        return [
            `Unsere nächsten Konzerte finden am ${dates} jeweils um <say-as interpret-as="time">${nextConcert.time}</say-as> im ${nextConcert.location} statt.`,
            `Der Titel ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`,
        ].join(' ');
    },
    NEXT_CONCERT_TITLE: (nextConcert) => {
        const dates = getConcertDaysText(nextConcert);
        return [
            `Der Titel unserer nächsten Konzerte ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`,
            `Sie finden am ${dates} jeweils um <say-as interpret-as="time">${nextConcert.time}</say-as> im ${nextConcert.location} statt.`,
        ].join(' ');
    },
    NEXT_CONCERT_LOCATION: (nextConcert) => {
        const dates = getConcertDaysText(nextConcert);
        return [
            `Unsere nächsten Konzerte finden im ${nextConcert.location} statt, und zwar am ${dates} jeweils um <say-as interpret-as="time">${nextConcert.time}</say-as>.`,
            `Der Titel ist <break strength="medium"/> <prosody volume="loud">${nextConcert.title}</prosody>.`,
        ].join(' ');
    },
    NEXT_CONCERT_PRICE: (nextConcert) => {
        const prices = nextConcert.prices;
        return [
            `Die Preise im Vorverkauf sind <say-as interpret-as="unit">${prices.advance.reduced}€</say-as> ermäßigt und <say-as interpret-as="unit">${prices.advance.regular}€</say-as> regulär.`,
            `An der Abendkasse sind die Preise <say-as interpret-as="unit">${prices.boxOffice.reduced}€</say-as> ermäßigt und <say-as interpret-as="unit">${prices.boxOffice.regular}€</say-as> regulär.`,
        ].join(' ');
    },
    NO_INFORMATION_FOR_NEXT_CONCERT_YET: () =>
        'Leider stehen derzeit weder die Termine noch der Titel der nächsten Konzerte fest. Frage mich einfach in ein paar Tagen noch einmal, dann weiß ich wahrscheinlich mehr.',
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
        const semesterYearConcertTitleList = listToText(concerts.map(concert => `im ${concert.semesterText} ${concert.year} ${concert.title}`));
        return `Die Konzerttitel in den vergangenen Semestern waren: ${semesterYearConcertTitleList}.`;
    },
    RESERVATION_INFO: () => 
        'Karten kannst du auf www.jazznuts.de reservieren. Reservierte Karten müssen bis spätestens <say-as interpret-as="time">19:30</say-as> am Konzerttag abgeholt werden.',
    BUY_TICKETS_INFO: () =>
        'Karten im Vorverkauf gibt es in der Mensa der Uni und <say-as interpret-as="characters">OTH</say-as> Regensburg sowie an der Tourist-Info.',
    REDUCED_PRICE_INFO: () =>
        'Für die Ermäßigung berechtigt sind Schüler, Studierende, Azubis, Kinder bis 7 Jahren, Senioren und Menschen mit Behinderung.',
    ABOUT: () =>
        [
            'Die Jazznuts sind der A-cappella-Chor an der Uni Regensburg.',
            'Wir lieben es, moderne Pop- und Rocksongs zu singen. Den Chor gibt es seit 1995. Jedes Semester veranstalten wir eigene Konzerte und treten bei Festen am Regensburger Campus auf.',
            'Aktuell sind etwa 110 Sängerinnen und Sänger bei den Jazznuts aktiv – überwiegend Studierende der Uni und <say-as interpret-as="characters">OTH</say-as> Regensburg, aber auch Doktoranden, Bedienstete, Externe und Ehemalige.',
        ].join(' '),
    HELP: () =>
        'Du kannst mich über die nächsten oder vergangene Konzerte der Jazznuts befragen. Was möchtest du wissen?',
    CANCEL_STOP: () => {
        return randomize([
            'Ok. Bis bald!',
            'Tschö!'
        ]);
    },
    REPROMPT: () => {
        const repromptText = randomize([
            'Kann ich dir noch weiterhelfen?',
            'Hast du sonst noch Fragen zu den Jazznuts Konzerten?',
        ]);
        return `<break time="1200ms"/> ${repromptText}`;
    },
};

module.exports = {
    sentences,
};
