import type {NextApiRequest, NextApiResponse} from "next";
import {RequestQuery, Tools} from "../../tools";

process.env.TZ = "Africa/Lagos";
// @ts-ignore
String.prototype._replace = function (searchValue: string | RegExp | [], replaceValue: string | RegExp | []): string {
    if (typeof searchValue === "string") return this.replaceAll(searchValue, replaceValue)
    if (Array.isArray(searchValue)) {
        if (Array.isArray(replaceValue)) {
            if (searchValue.length === replaceValue.length) {
                let main = this;
                for (let i = 0; i < searchValue.length; i++) {
                    main = main.replaceAll(searchValue[i], replaceValue[i])
                }
                return main;
            } else {
                return this;
            }
        } else {
            let main = this;
            for (let s of searchValue) {
                main = main.replaceAll(s, replaceValue)
            }
            return main;
        }
    } else {
        return this;
    }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const contentType = req.headers['content-type'] ? req.headers['content-type'] : "";
    if (req.method.toUpperCase() === "POST" && (contentType.includes('x-www-form-urlencoded') || contentType.includes('application/json'))) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        let body: RequestQuery = req.body
        const tools = new Tools(body)
        if (body.data) body = JSON.parse(tools.base64Decode(body.data))
        else if (body.raw) body = JSON.parse(tools.base64Decode(body.raw))

        if (body.type && body.username && body.nametype && body.userid) {
            if (body.username.length < 4) return res.json({type: "error", msg: 'Invalid request'})

            let resources = await tools.post_result();
            await tools.closeConnection();

            return res.json(resources)
        } else {
            res.json({type: "error", msg: 'methods not allowed'});
        }
    } else {
        if (req.method.toUpperCase() === "POST") {
            res.json({type: "error", msg: 'forbidden'})
        } else {
            res.status(401)
        }
    }
}
