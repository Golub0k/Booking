/**
 * @title - convertForDownload
 * @description - Подготовить полученные данные для отчета "Продажи по менеджерам"
 */

function convertForDownload(initialData, curatorsArr) {
  let transformedData = [];

  if (curatorsArr.length == 0) {
    initialData.forEach((item) => {
      item.curators.forEach((curator) => {
        if (item.organizers.length == 0) {
          let transformedItem = {};
          transformedItem.id = item.id;
          transformedItem.user = curator.user.fullName;
          transformedItem.number = item.number;
          transformedItem.name = item.name;
          transformedItem.totalEventCostWithDiscountOrMarkup = item.totalEventCostWithDiscountOrMarkup;
          transformedItem.industry = item.eventIndustry.name;
          transformedItem.type = item.eventType.name;
          transformedItem.installationStart = item.installationStart;
          transformedItem.installationEnd = item.installationEnd;
          transformedItem.eventStart = item.eventStart;
          transformedItem.eventEnd = item.eventEnd;
          transformedItem.deinstallationStart = item.deinstallationStart;
          transformedItem.deinstallationEnd = item.deinstallationEnd;
          transformedItem.createdAt = item.createdAt;
          transformedItem.state = item.state;

          transformedData.push(transformedItem);
        } else {
          item.organizers.forEach((organizer) => {
            let transformedItem = {};
            transformedItem.id = item.id;
            transformedItem.user = curator.user.fullName;
            transformedItem.number = item.number;
            transformedItem.name = item.name;
            transformedItem.totalEventCostWithDiscountOrMarkup = item.totalEventCostWithDiscountOrMarkup;
            transformedItem.industry = item.eventIndustry.name;
            transformedItem.type = item.eventType.name;
            transformedItem.installationStart = item.installationStart;
            transformedItem.installationEnd = item.installationEnd;
            transformedItem.eventStart = item.eventStart;
            transformedItem.eventEnd = item.eventEnd;
            transformedItem.deinstallationStart = item.deinstallationStart;
            transformedItem.deinstallationEnd = item.deinstallationEnd;
            transformedItem.createdAt = item.createdAt;
            transformedItem.state = item.state;
            transformedItem.partner = [];

            transformedData.forEach((dataItem) => {
              if (dataItem.user === curator.user.fullName && dataItem.name === item.name) {
                transformedItem.partner = dataItem.partner.concat(organizer.partner.name);
                transformedData.splice(transformedData.indexOf(dataItem), 1);
              }
            });

            transformedItem.partner.push(organizer.partner.name);
            transformedData.push(transformedItem);
          });
        }
      });
    });
  } else {
    initialData.forEach((item) => {
      item.curators.forEach((curator) => {
        if (curatorsArr.includes(curator.userId)) {
          if (item.organizers.length == 0) {
            let transformedItem = {};
            transformedItem.id = item.id;
            transformedItem.user = curator.user.fullName;
            transformedItem.number = item.number;
            transformedItem.name = item.name;
            transformedItem.totalEventCostWithDiscountOrMarkup = item.totalEventCostWithDiscountOrMarkup;
            transformedItem.type = item.eventType.name;
            transformedItem.installationStart = item.installationStart;
            transformedItem.installationEnd = item.installationEnd;
            transformedItem.eventStart = item.eventStart;
            transformedItem.eventEnd = item.eventEnd;
            transformedItem.deinstallationStart = item.deinstallationStart;
            transformedItem.deinstallationEnd = item.deinstallationEnd;
            transformedItem.createdAt = item.createdAt;
            transformedItem.state = item.state;
            transformedItem.industry = item.eventIndustry.name;
            transformedData.push(transformedItem);
          } else {
            item.organizers.forEach((organizer) => {
              let transformedItem = {};
              transformedItem.id = item.id;
              transformedItem.user = curator.user.fullName;
              transformedItem.number = item.number;
              transformedItem.name = item.name;
              transformedItem.totalEventCostWithDiscountOrMarkup = item.totalEventCostWithDiscountOrMarkup;
              transformedItem.industry = item.eventIndustry.name;
              transformedItem.type = item.eventType.name;
              transformedItem.installationStart = item.installationStart;
              transformedItem.installationEnd = item.installationEnd;
              transformedItem.eventStart = item.eventStart;
              transformedItem.eventEnd = item.eventEnd;
              transformedItem.deinstallationStart = item.deinstallationStart;
              transformedItem.deinstallationEnd = item.deinstallationEnd;
              transformedItem.createdAt = item.createdAt;
              transformedItem.state = item.state;
              transformedItem.partner = [];

              transformedData.forEach((dataItem) => {
                if (dataItem.user === curator.user.fullName && dataItem.name === item.name) {
                  transformedItem.partner = dataItem.partner.concat(organizer.partner.name);
                  transformedData.splice(transformedData.indexOf(dataItem), 1);
                }
              });

              transformedItem.partner.push(organizer.partner.name);
              transformedData.push(transformedItem);
            });
          }
        }
      });
    });
  }

  transformedData.forEach((item) => {
    item.partner = Array.from(new Set(item.partner)).join(', ');
  });
  return transformedData;
}
