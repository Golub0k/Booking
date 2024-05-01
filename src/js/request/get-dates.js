/**
 * @title - getDates
 * @description - Подготовить данные об изменениях в списке организаторов
 */

function getDates(oldData, newData) {
  const result = [];

  const stages = ['installationDates', 'eventDates', 'deinstallationDates'];

  function formatDates(dateObj) {
    const startTime = formatDate(dateObj.startTime);
    const endTime = formatDate(dateObj.endTime);
    return `${startTime} - ${endTime}`;
  }

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    date.setHours(date.getHours() + 3);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${padZero(day)}.${padZero(month)}.${year} ${padZero(hours)}:${padZero(minutes)}`;
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
  }

  function getStageName(stage) {
    switch (stage) {
      case 'installationDates':
        return 'Монтаж';
      case 'eventDates':
        return 'Мероприятие';
      case 'deinstallationDates':
        return 'Демонтаж';
      default:
        return '';
    }
  }

  for (const stage of stages) {
    const oldDates = oldData[stage];
    const newDates = newData[stage];

    if (oldDates.length > newDates.length) {
      for (let i = 0; i < oldDates.length; i++) {
        const oldValue = formatDates(oldDates[i]);
        const newValue = i < newDates.length ? formatDates(newDates[i]) : null;
        result.push({
          stage: getStageName(stage),
          oldValue: oldValue,
          newValue: newValue,
        });
      }
    } else {
      for (let i = 0; i < newDates.length; i++) {
        const newValue = formatDates(newDates[i]);
        const oldValue = i < oldDates.length ? formatDates(oldDates[i]) : null;
        result.push({
          stage: getStageName(stage),
          oldValue: oldValue,
          newValue: newValue,
        });
      }
    }
  }

  return result;
}
