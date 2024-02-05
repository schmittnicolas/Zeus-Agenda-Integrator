const API_URL = getScriptSecret('API_URL');
const GROUP_ID = getScriptSecret('SCIA_GROUP_ID');
const ACCES_TOKEN = getScriptSecret('ACCES_TOKEN');

const EVENTS_ROUTE = API_URL + '/filter/displayable';
const EVENT_DETAILS_ROUTE = '/details';

const HEADERS = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + ACCES_TOKEN,
};

async function getEvents(startDate, endDate) {
    try {
        Logger.log(`Getting all courses between ${startDate} and ${endDate}`);
        
        const request = UrlFetchApp.getRequest(`${EVENTS_ROUTE}?groups=${GROUP_ID}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
            headers: HEADERS,
            method: 'GET',
            muteHttpExceptions: false,
        });

        console.log(request);

        const response = UrlFetchApp.fetch(`${EVENTS_ROUTE}?groups=${GROUP_ID}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
            headers: HEADERS,
            method: 'GET',
            muteHttpExceptions: false,
        });

        return await JSON.parse(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

async function getDetailFromEvent(eventId) {
    try {
        Logger.log(`Getting details for course with id : ${eventId}`);

        const response = UrlFetchApp.fetch(`${API_URL}/${eventId}` + EVENT_DETAILS_ROUTE, {
            headers: HEADERS,
            methode: 'GET',
        });

        return await JSON.parse(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

async function getEventList(startDate, endDate) {
    try {
        const events = await getEvents(startDate, endDate);

        if (Array.isArray(events) && events.length > 0) {
            const eventList = await Promise.all(events.map(async e => {
                const eventDetail = await getDetailFromEvent(e.idReservation);
                return new Event(e, eventDetail);
            }));

            return eventList;
        } else {
            console.log("No events or invalid response format.");
            return [];
        }
    } catch (error) {
        console.error('Error fetching or processing events:', error);
        return [];
    }
}


