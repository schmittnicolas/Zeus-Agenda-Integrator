class Agenda {
    constructor(startDate, endDate, calendarId) {
        this.calendar = CalendarApp.getCalendarById(calendarId);
        Logger.log('The selected calendar is named "%s".', this.calendar.getName());

        this.startDate = startDate;
        this.endDate = endDate;
        this.deleteAllDay = true;
    }

    clearEventsInTimeFrame() {
        var events = this.calendar.getEvents(this.startDate, this.endDate);
        Logger.log(`Removing ${events.length} courses between ${this.startDate} and ${this.endDate} in ${this.calendar.getName()}`)

        for (var i = 0; i < events.length; i++) {
            events[i].deleteEvent();
        }
    }

    addEvent(event) {
        var calendarEvent = this.calendar.createEvent(event.title, event.startTime, event.endTime, { description: event.description });
        Logger.log('Event successfully created with ID: ' + calendarEvent.getId());
    }
}