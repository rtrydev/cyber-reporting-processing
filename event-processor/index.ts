import {
    AzureFunction,
    Context
} from "@azure/functions"
import { InboundEvent } from "./models/inbound-event";
import { DatabaseProvider } from "./database/database-provider";
import { EventValidator } from "./validators/event-validator";
import { EventProcessor } from "./processors/event-processor";

export const trigger: AzureFunction = async (context: Context, message: InboundEvent) => {
    context.log(`Processing message: ${JSON.stringify(message)}`);

    const eventValidator = new EventValidator();

    if (!eventValidator.validateEvent(message)) {
        context.log(`Event message was invalid`);

        return;
    }

    const eventProcessor = new EventProcessor();
    const processedEvent = eventProcessor.processEvent(message);

    context.log(`Adding processed event to db: ${JSON.stringify(processedEvent)}`);

    const dbProvider = new DatabaseProvider();
    const db = dbProvider.getDatabase();

    await db.items.create(processedEvent);
};
