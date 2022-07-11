const { data } = require("./data");

function listToText(list, conjunction = "und") {
  list = list.filter((item) => !!item);
  if (!list || list.length === 0) {
    return "";
  } else if (list.length === 1) {
    return list[0].replace(/[^\w\säöüß,-]/gi, "");
  } else {
    return `${list.slice(0, list.length - 1).join(", ")} ${conjunction} ${
      list.slice(-1)[0]
    }`.replace(/[^\w\säöüß,-]/gi, "");
  }
}

function listToVisual(list, itemSeparator = "  \n") {
  return list.filter((item) => !!item).join(itemSeparator);
}

function getSemesterText(semesterValue) {
  return semesterValue === "summer" ? "Sommersemester" : "Wintersemester";
}

function getConcerts() {
  return data.concerts.map((concert) => {
    concert["semesterText"] = getSemesterText(concert.semester);
    concert.dates = concert.dates.sort((dateA, dateB) =>
      dateA < dateB ? -1 : 1
    );
    return concert;
  });
}

function getOrderedConcertsList() {
  return getConcerts().sort(
    (concertA, concertB) =>
      new Date(concertB.dates[0]) - new Date(concertA.dates[0])
  );
}

function randomize(array) {
  const randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
}

function getNextConcert() {
  const latestConcert = getOrderedConcertsList()[0];
  const now = new Date();
  const latestConcertLastDate = new Date(
    `${latestConcert.dates.slice(-1)[0]}T${latestConcert.time}:00+02:00`
  );
  if (now < latestConcertLastDate) {
    return latestConcert;
  } else {
    return null;
  }
}

function getConcertsBySemesterAndYearMap() {
  return getConcerts().reduce((concertsBySemesterAndYearMap, concert) => {
    concertsBySemesterAndYearMap[`${concert.semester}-${concert.year}`] =
      concert;
    return concertsBySemesterAndYearMap;
  }, {});
}

function getPastConcerts() {
  const now = new Date();
  return getConcerts()
    .filter((concert) => {
      const concertLastDate = new Date(
        `${concert.dates.slice(-1)[0]}T${concert.time}:00+02:00`
      );
      return now > concertLastDate;
    })
    .reverse();
}

function getLastConcert() {
  return getPastConcerts().slice(-1)[0];
}

function getConcertBySemesterAndYear(semester, year) {
  return getConcertsBySemesterAndYearMap()[`${semester}-${year}`];
}

function getYear(yearValue) {
  let year = Math.floor(yearValue);
  if (year < 50) {
    year += 2000;
  } else if (year < 100) {
    year += 1900;
  }
  return year;
}

function getWeekdayText(date) {
  const weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return weekdays[date.getDay()];
}

function getMonthText(date) {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return months[date.getMonth()];
}

function getConcertDaysText(concert) {
  return listToText(
    concert.dates
      .map((dateString) => new Date(dateString))
      .map(
        (date) =>
          `${getWeekdayText(date)}, den ${date.getDate()}. ${getMonthText(
            date
          )}`
      ),
    "und am"
  );
}

function getConcertDaysVisual(concert) {
  return concert.dates
    .map((dateString) => new Date(dateString))
    .map(
      (date) =>
        `${getWeekdayText(date)}, ${date.getDate()}. ${getMonthText(date)}`
    )
    .join(" und ");
}

function timeDifferenceToText(dateString, timeString) {
  const now = new Date();
  const date = new Date(`${dateString}T${timeString}:00+02:00`);
  let deltaMinutes = (date.getTime() - now.getTime()) / (1000 * 60);

  const deltaDays = Math.floor(deltaMinutes / (60 * 24));
  deltaMinutes %= 60 * 24;
  const deltaHours = Math.floor(deltaMinutes / 60);
  deltaMinutes = Math.floor(deltaMinutes % 60);

  const timeDifferenceList = [
    deltaDays > 0 ? `${deltaDays} Tage` : null,
    deltaHours > 0 ? `${deltaHours} Stunden` : null,
    deltaMinutes > 0 ? `${deltaMinutes} Minuten` : null,
  ];

  return listToText(timeDifferenceList);
}

module.exports = {
  listToText,
  listToVisual,
  randomize,
  getSemesterText,
  getNextConcert,
  getConcertBySemesterAndYear,
  getPastConcerts,
  getLastConcert,
  getYear,
  getConcertDaysText,
  getConcertDaysVisual,
  timeDifferenceToText,
};
