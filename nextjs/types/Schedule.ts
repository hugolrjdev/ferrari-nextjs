import { PaymentSituation } from "./PaymentSituation";
import { Person } from "./Person";
import { ScheduleService } from "./ScheduleService";
import { TimeOption } from "./TimeOption";
import { Address } from "./Address";

export type Schedule = {
    id: number;
    personId: number;
    timeOptionId: number;
    paymentSituationId: number;
    billingAddressId: number;
    scheduleAt: string;
    total: number;
    installments: number;
    person: Person;
    scheduleService?: ScheduleService[];
    timeOption?: TimeOption;
    address?: Address;
    paymentSituation?: PaymentSituation;
}