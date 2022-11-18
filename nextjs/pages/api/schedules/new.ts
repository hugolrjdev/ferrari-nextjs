import { format, parse } from "date-fns";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ScheduleSession } from "../../../types/ScheduleSession";
import { sessionOptions } from "../../../ultils/session";

export default withIronSessionApiRoute(
    async(req:NextApiRequest, res: NextApiResponse) => {
        const schedule = {
            scheduleAt:  format(parse(req.body.scheduleAt, 'yyyy-MM-dd', new Date()),'yyyy-MM-dd')
        } as ScheduleSession;

        req.session.schedule = schedule;
        await req.session.save();
        res.status(200).json(req.session.schedule);

    }, sessionOptions
)