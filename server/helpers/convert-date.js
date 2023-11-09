function convertDate(date) {
  // Создаем объект Date из строки
  const dateObject = new Date(date);

  // Получаем компоненты даты
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Так как месяцы начинаются с 0, добавляем 1
  const day = dateObject.getDate();

  // Получаем компоненты времени
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // Форматируем дату в нужном формате
  const formattedDate = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${day
    .toString()
    .padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year} `;
  return formattedDate;
}
module.exports = convertDate;
