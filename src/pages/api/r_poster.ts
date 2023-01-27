import type {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toUpperCase() === "POST") {
        let header = req.headers, body = req.body, query = req.query
        res.json({status: "ok", header, body, query});
    }
};
