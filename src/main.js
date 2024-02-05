const epitaCalendarId = getScriptSecret('EPITA_CALENDAR_ID');
const TIME_FRAME_IN_DAYS = 31;

const startDate = new Date();
const endDate = new Date(startDate.getTime() + TIME_FRAME_IN_DAYS * 24 * 60 * 60 * 1000);


async function startSynchronisation() {
  agenda = new Agenda(startDate, endDate, epitaCalendarId);
  agenda.clearEventsInTimeFrame();

  await getEventList(startDate, endDate)
    .then(eventList => {
      Logger.log(`There is ${eventList.length} courses to add for the selected period`);

      for (let i = 0; i < eventList.length; i++) {
        let event = eventList[i];
        Logger.log(`Adding the following event to the calendar : ` + event.format());
        agenda.addEvent(event);
      };
    })
    .catch(error => {
      Logger.log(`Error fetching event list: ${error}`);
    });
}