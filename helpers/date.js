import moment from "moment";

export const constructDate = stringDate => {
  let resultDate;
  const date = new Date(moment(stringDate));
  const months = [
    "янв",
    "февр",
    "марта",
    "апр",
    "мая",
    "июня",
    "июля",
    "авг",
    "сент",
    "окт",
    "нояб",
    "дек"
  ];

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  resultDate = `${date.getDate()} ${
    months[date.getMonth()]
  }, ${date.getFullYear()} в ${date.getHours()}:${minutes}`;

  return resultDate;
};
