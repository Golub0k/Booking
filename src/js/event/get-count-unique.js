/**
 * @title - countUniqueValues
 * @description - Функция для уникальных мероприятий в массиве
 */

function countUniqueValues(initialData) {
  // Создаем пустой объект для подсчета уникальных значений
  let uniqueValues = {};

  // Проходим по каждому элементу массива
  for (let i = 0; i < initialData.length; i++) {
    // Если значение уже есть в объекте, увеличиваем его счетчик на 1
    if (uniqueValues[initialData[i]]) {
      uniqueValues[initialData[i]]++;
    } else {
      // Если значение отсутствует в объекте, добавляем его со счетчиком равным 1
      uniqueValues[initialData[i]] = 1;
    }
  }

  // Считаем количество уникальных значений
  let count = Object.keys(uniqueValues).length;

  // Возвращаем результат
  return count;
}
