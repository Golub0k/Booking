/**
 * @title - prepareEquipments
 * @description - Подготовить данные для отчета "Бронирование оборудования"
 */

function prepareEquipments(data) {
  // Создаем объект, чтобы группировать данные по уникальному "bookingId" и "name"
  const groupedData = {};

  // Перебираем каждый объект из входных данных
  for (const item of data) {
    const { bookingId, equipment, quantity } = item;
    const key = `${bookingId}_${equipment.name}`;

    // Если для данного "bookingId" и "name" уже есть данные, то складываем "quantity"
    if (groupedData.hasOwnProperty(key)) {
      groupedData[key].sum += quantity;
    } else {
      groupedData[key] = {
        name: equipment.name,
        nomenclatureNumber: equipment.nomenclatureNumber,
        availableQuantity: equipment.availableQuantity === null ? '-' : equipment.availableQuantity,
        sum: quantity,
      };
    }
  }

  // Преобразуем объект groupedData в массив с элементами
  const result = Object.values(groupedData);

  // Оставляем только элементы с максимальной суммой для каждого "name" в "equipment"
  const nameToDataMap = {};
  for (const item of result) {
    const { name, sum } = item;
    if (!nameToDataMap.hasOwnProperty(name) || sum > nameToDataMap[name].sum) {
      nameToDataMap[name] = item;
    }
  }
  const filteredResult = Object.values(nameToDataMap);

  // Добавляем поле "free" с разницей между "availableQuantity" и суммой "quantity"
  for (const item of filteredResult) {
    const { availableQuantity, sum } = item;
    item.free = availableQuantity === '-' ? '-' : availableQuantity - sum;
  }

  return filteredResult;
}
