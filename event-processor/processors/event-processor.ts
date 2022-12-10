import { InboundEvent } from "../models/inbound-event";
import { ReportingEvent } from "../models/reporting-event";
import {EventTypes} from "../enums/event-types";

export class EventProcessor {
    public processEvent(event: InboundEvent): ReportingEvent {
        const result: ReportingEvent = {
            user_id: event.Value.UserId,
            username: event.Value.Username,
            timestamp: event.Value.UnixTimeStamp,
            event_type: EventTypes[event.Event],
            old_role: event.Value.OldRole,
            new_role: event.Value.NewRole
        }

        return result;
    }
}
