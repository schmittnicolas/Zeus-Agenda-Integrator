class Event {
    constructor(event, eventDetail) {
        this.startTime = new Date(event.startDate);
        this.endTime = new Date(event.endDate);

        this.validateTimeRange();

        this.title = event.name;
        this.description = this.buildDescription(event, eventDetail);

        this.modifyForOnlineEvent(event, eventDetail);
    };

    validateTimeRange() {
        if (!(this.startTime instanceof Date) || !(this.endTime instanceof Date) || this.endTime <= this.startTime) {
            throw new Error('Invalid time range for event');
        };
    };

    buildDescription(event, eventDetail) {
        const formattedStartTime = this.startTime.toLocaleString();
        const formattedEndTime = this.endTime.toLocaleString();

        const roomList = this.getRoomsList(event.rooms);
        const teachersList = this.getTeachersList(event.teachers);
        const groupsList = this.getGroupsList(event.groups);

        return `
            ${makeBold('Date de début :')} ${formattedStartTime}\n
            ${makeBold('Date de fin :')} ${formattedEndTime}\n
            ${makeBold("Type d'activité :")} ${event.typeName}\n
            ${makeBold("Salle(s) :")} ${roomList}\n
            ${makeBold('Enseignant(s) :')} ${teachersList}\n
            ${makeBold('Groupe(s) :')} ${groupsList}\n
        `;
    };

    getRoomsList(rooms) {
        return rooms.map(room => `${room.name} (${room.capacity} places)`).join(', ');
    }

    getTeachersList(teachers) {
        return teachers.map(teacher => `${teacher.firstname} ${teacher.name}`).join(', ');
    }

    getGroupsList(groups) {
        return groups.map(group => group.name).join(', ');
    }

    modifyForOnlineEvent(event, eventDetail) {
        if (event.isOnline === true) {
            this.title = '💻 ' + event.name;
            this.description += `${makeBold('Lien :')} ${eventDetail.url}\n`;
        } else {
            this.title = '📚 ' + event.name;
            if (eventDetail.url) {
                this.title = '💻📚' + event.name;
                this.description += `${makeBold('Lien :')} ${eventDetail.url}\n`;
            }
        }
    };

    getDuration() {
        return this.endTime - this.startTime;
    };

    format() {
        return `${this.title} from ${this.startTime.toLocaleString()} to ${this.endTime.toLocaleString()}`;
    };
}
