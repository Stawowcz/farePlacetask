//generation of dates which i set in filters, as well as days which I need to get to do assertions
export function generateRandomDate() {
  const currentDate = new Date();
  const randomOffsetStart = Math.floor(Math.random() * 5) + 1;
  const randomOffsetEnd = randomOffsetStart + Math.floor(Math.random() * 5) + 1;
  const randomOffsetStartUpdated = Math.floor(Math.random() * 5) + 1;
  const randomOffsetEndUpdated = randomOffsetStartUpdated + Math.floor(Math.random() * 5) + 1;

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() + randomOffsetStart);

  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + randomOffsetEnd);

  const startDateUpdated = new Date(currentDate);
  startDateUpdated.setDate(currentDate.getDate() + randomOffsetStartUpdated);

  const endDateUpdated = new Date(currentDate);
  endDateUpdated.setDate(currentDate.getDate() + randomOffsetEndUpdated);

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    startDateDay: startDate.getDate(),
    endDateDay: endDate.getDate(),
    startDateDayUpdated: startDateUpdated.getDate(),
    endDateDayUpdated: endDateUpdated.getDate(),
    startDateUpdated: startDateUpdated.toISOString().slice(0, 10),
    endDateUpdated: endDateUpdated.toISOString().slice(0, 10),
  };
}

//changing of date format which are needed for assertions
export function formatDateForDisplay(date: string): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export function generateRandomCity(cities:string) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

//counter for increase the adults
export function generateRandomNumber2to6() {
  return Math.floor(Math.random() * 5) + 2;
}
//counter to decrease the adults
export function generateRandomNumber0to3() {
  return Math.floor(Math.random() * 4);
}