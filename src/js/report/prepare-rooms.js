/**
 * @title - prepareRooms
 * @description - Подготовить данные для отчета "Бронирование помещений"
 */

function prepareRooms(dateFrom, dateTo, rooms, data) {
  const resultArray = [];
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  while (startDate <= endDate) {
    const formattedDate = startDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const dateEntry = {
      date: formattedDate,
      rooms: rooms.map((name) => ({ name, booking: '' })),
    };

    resultArray.push(dateEntry);
    startDate.setDate(startDate.getDate() + 1);
  }

  data.forEach((event) => {
    const eventDate = new Date(event.minDate);
    eventDate.setHours(0, 0, 0, 0);
    while (eventDate <= new Date(event.maxDate)) {
      const formattedEventDate = eventDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const dateEntry = resultArray.find((entry) => entry.date === formattedEventDate);

      if (dateEntry) {
        dateEntry.rooms.forEach((room) => {
          if (event.rooms.some((eventRoom) => eventRoom.room.name === room.name)) {
            // Форматируем даты начала и окончания ваших интервалов
            const installationDates = event.installationDates.map((dateRange) => ({
              startTime: new Date(dateRange.startTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
              endTime: new Date(dateRange.endTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            }));

            const eventDates = event.eventDates.map((dateRange) => ({
              startTime: new Date(dateRange.startTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
              endTime: new Date(dateRange.endTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            }));

            const deinstallationDates = event.deinstallationDates.map((dateRange) => ({
              startTime: new Date(dateRange.startTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
              endTime: new Date(dateRange.endTime).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            }));

            // Проверяем, что eventDate находится в одном из массивов дат
            const isInstallationDate = installationDates.some(
              (dateRange) => formattedEventDate >= dateRange.startTime && formattedEventDate <= dateRange.endTime,
            );

            const isEventDate = eventDates.some(
              (dateRange) => formattedEventDate >= dateRange.startTime && formattedEventDate <= dateRange.endTime,
            );

            const isDeinstallationDate = deinstallationDates.some(
              (dateRange) => formattedEventDate >= dateRange.startTime && formattedEventDate <= dateRange.endTime,
            );
            if (isInstallationDate || isEventDate || isDeinstallationDate) {
              if (room.booking) {
                room.booking += '; ' + event.event.name;
                if (event.event.state === 'pre_booking') {
                  room.booking += ' (предварительная бронь)';
                } else if (event.event.state === 'check_out') {
                  room.booking += ' (проведено)';
                }
              } else {
                room.booking = event.event.name;
                if (event.event.state === 'pre_booking') {
                  room.booking += ' (предварительная бронь)';
                } else if (event.event.state === 'check_out') {
                  room.booking += ' (проведено)';
                }
              }
            }
          }
        });
      }

      eventDate.setDate(eventDate.getDate() + 1);
    }
  });

  data.forEach((event) => {
    event.installationDates.forEach((installation) => {
      const installationDate = new Date(installation.startTime);
      installationDate.setHours(0, 0, 0, 0);
      while (installationDate <= new Date(installation.endTime)) {
        const formattedInstallationDate = installationDate.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dateEntry = resultArray.find((entry) => entry.date === formattedInstallationDate);

        if (dateEntry) {
          dateEntry.rooms.forEach((room) => {
            if (event.rooms.some((eventRoom) => eventRoom.room.name === room.name)) {
              if (
                !room.booking.endsWith('(предварительная бронь)') &&
                !room.booking.endsWith('(проведено)') &&
                !room.booking.endsWith('(монтаж)')
              ) {
                room.booking += ' (монтаж)';
              }
            }
          });
        }

        installationDate.setDate(installationDate.getDate() + 1);
      }
    });

    event.eventDates.forEach((eventDate) => {
      const startDate = new Date(eventDate.startTime);
      startDate.setHours(0, 0, 0, 0);
      while (startDate <= new Date(eventDate.endTime)) {
        const formattedStartDate = startDate.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dateEntry = resultArray.find((entry) => entry.date === formattedStartDate);

        if (dateEntry) {
          dateEntry.rooms.forEach((room) => {
            if (event.rooms.some((eventRoom) => eventRoom.room.name === room.name)) {
              if (
                !room.booking.endsWith('(предварительная бронь)') &&
                !room.booking.endsWith('(проведено)') &&
                !room.booking.endsWith('(проведение)')
              ) {
                if (room.booking.endsWith('(монтаж)')) {
                  room.booking = room.booking.replace('(монтаж)', '(монтаж + проведение)');
                } else if (room.booking.endsWith('(монтаж + проведение)')) {
                  room.booking = room.booking.replace('(монтаж + проведение)', '(монтаж + проведение)');
                } else {
                  room.booking += ' (проведение)';
                }
              }
            }
          });
        }

        startDate.setDate(startDate.getDate() + 1);
      }
    });

    event.deinstallationDates.forEach((deinstallation) => {
      const deinstallationDate = new Date(deinstallation.startTime);
      deinstallationDate.setHours(0, 0, 0, 0);
      while (deinstallationDate <= new Date(deinstallation.endTime)) {
        const formattedDeinstallationDate = deinstallationDate.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dateEntry = resultArray.find((entry) => entry.date === formattedDeinstallationDate);

        if (dateEntry) {
          dateEntry.rooms.forEach((room) => {
            if (event.rooms.some((eventRoom) => eventRoom.room.name === room.name)) {
              if (
                !room.booking.endsWith('(предварительная бронь)') &&
                !room.booking.endsWith('(проведено)') &&
                !room.booking.endsWith('(демонтаж)')
              ) {
                if (room.booking.endsWith('(проведение)')) {
                  room.booking = room.booking.replace('(проведение)', '(проведение + демонтаж)');
                } else if (room.booking.endsWith('(монтаж + проведение)')) {
                  room.booking = room.booking.replace('(монтаж + проведение)', '(монтаж + проведение + демонтаж)');
                } else if (room.booking.endsWith('(монтаж + проведение + демонтаж)')) {
                  room.booking = room.booking.replace(
                    '(монтаж + проведение + демонтаж)',
                    '(монтаж + проведение + демонтаж)',
                  );
                } else if (room.booking.endsWith('(проведение + демонтаж)')) {
                  room.booking = room.booking.replace('(проведение + демонтаж)', '(проведение + демонтаж)');
                } else {
                  room.booking += ' (демонтаж)';
                }
              }
            }
          });
        }

        deinstallationDate.setDate(deinstallationDate.getDate() + 1);
      }
    });
  });

  resultArray.forEach((entry) => {
    entry.rooms.forEach((room) => {
      if (room.booking.includes(';')) {
        room.booking = room.booking.replace(/\([^)]+\)/g, '');
        room.booking += '(конфликт)';
      }
    });
  });

  return resultArray;
}
