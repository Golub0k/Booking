/**
 * @title - convertDateFormat
 * @description - Функция для преобразования даты
 */

function convertDateFormat(inputDate) {
  // Разделите дату и смещение времени
  const parts = inputDate.split(' ');
  const datePart = parts[0];
  const offsetPart = parts[1];

  // Создайте новую дату из даты без смещения
  const newDate = new Date(datePart);

  // Если есть смещение времени, добавьте его к новой дате
  if (offsetPart) {
    const offsetHours = parseInt(offsetPart, 10);
    newDate.setHours(newDate.getHours() + offsetHours);
  }

  // Преобразуйте дату в формат "2023-09-12T00:00:00.000Z"
  const isoString = newDate.toISOString();

  return isoString;
}
