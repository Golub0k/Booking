/**
 * @title - adjustDatesByTimezone
 * @description - добавить таймзону для отчета "Бронирование помещений"
 */

function adjustDatesByTimezone(inputArray, timezoneHours) {
  return inputArray.map((item) => {
    const adjustedItem = { ...item };

    // Функция для коррекции даты на указанное количество часов
    function adjustDate(dateString) {
      const date = new Date(dateString);
      date.setHours(date.getHours() + timezoneHours);
      return date.toISOString();
    }

    // Коррекция дат в installationDates
    adjustedItem.installationDates = adjustedItem.installationDates.map((dateRange) => ({
      startTime: adjustDate(dateRange.startTime),
      endTime: adjustDate(dateRange.endTime),
    }));

    // Коррекция дат в eventDates
    adjustedItem.eventDates = adjustedItem.eventDates.map((dateRange) => ({
      startTime: adjustDate(dateRange.startTime),
      endTime: adjustDate(dateRange.endTime),
    }));

    // Коррекция дат в deinstallationDates
    adjustedItem.deinstallationDates = adjustedItem.deinstallationDates.map((dateRange) => ({
      startTime: adjustDate(dateRange.startTime),
      endTime: adjustDate(dateRange.endTime),
    }));

    // Коррекция minDate и maxDate
    adjustedItem.minDate = adjustDate(adjustedItem.minDate);
    adjustedItem.maxDate = adjustDate(adjustedItem.maxDate);

    return adjustedItem;
  });
}
