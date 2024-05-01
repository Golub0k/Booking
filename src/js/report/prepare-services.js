/**
 * @title - prepareServices
 * @description - Подготовить данные для отчета "Бронирование доп услуг"
 */

function prepareServices(data) {
  // Создаем объект для хранения результата
  const resultMap = {};

  // Итерируемся по каждому объекту
  data.forEach((obj) => {
    const { eventId, additionalService, quantity } = obj;
    const { name, servicesType, unit } = additionalService;

    // Создаем уникальный ключ для группировки по "eventId" и "name" в "additionalService"
    const key = `${eventId}_${name}`;

    // Проверяем, есть ли уже такой ключ в объекте resultMap
    if (!resultMap.hasOwnProperty(key)) {
      // Если нет, то добавляем объект с исходными значениями
      resultMap[key] = {
        nameService: name,
        type: servicesType.name,
        unit: unit,
        sum: quantity,
      };
    } else {
      // Если ключ уже есть, то складываем значение "quantity" к существующему объекту
      resultMap[key].sum += quantity;
    }
  });

  // Преобразуем объект resultMap в массив окончательных результатов
  const resultArray = Object.values(resultMap);

  // Функция для нахождения элемента с максимальным значением "sum" для каждого "name" в "additionalService"
  const filterMaxSum = (array) => {
    const filteredArray = [];
    const nameMap = {};

    array.forEach((obj) => {
      const { nameService, sum } = obj;

      if (!nameMap.hasOwnProperty(nameService) || sum > nameMap[nameService].sum) {
        nameMap[nameService] = obj;
      }
    });

    for (const name in nameMap) {
      filteredArray.push(nameMap[name]);
    }

    return filteredArray;
  };

  // Оставляем только элементы с максимальными значениями суммы для каждого "name" в "additionalService"
  const finalResult = filterMaxSum(resultArray);

  return finalResult;
}
