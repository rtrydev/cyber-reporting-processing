import { EventTypes } from "../enums/event-types";
import { InboundEvent } from "../models/inbound-event";

export class EventValidator {
    validateEvent(event: InboundEvent) {
        if (!event || !event.Event || !event.Value) {
            console.log("Event does not have proper form");

            return false;
        }

        const eventTypes = []
        for (let eventTypesKey in EventTypes) {
            eventTypes.push(eventTypesKey);
        }

        const hasUserId = !!event.Value.UserId;
        const hasTimeStamp = !!event.Value.UnixTimeStamp;
        const hasUsername = !!event.Value.Username;
        const hasKnownEventType = eventTypes.some(eventType => eventType === event.Event)

        return hasUserId && hasTimeStamp && hasUsername && hasKnownEventType;
    }
}
