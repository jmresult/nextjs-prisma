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
    if (req.method.toUpperCase() === "POST" && (contentType.includes('x-www-form-urlencoded') || contentType.includes('application/json') )) {
        let body: RequestQuery = req.body
        let header = req.headers, query = req.query
        res.setHeader('just-me', "I love You")
        res.setHeader("access-control-allow-origin", "*")
        res.setHeader('content-type', 'application/json')
        res.json({status: "ok", header, body, query});
    }else {
        res.send('')
    }
};

/*

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    let body: RequestQuery;
    const contentType = event.headers['content-type'] ? event.headers['content-type'] : "";
    if (event.httpMethod.toLowerCase() === "post") {
        if (contentType.includes('x-www-form-urlencoded')) {
            body = url.parse(event.body.length > 0 ? "https://www.google.com/?" + event.body : "https://www.google.com/?", true).query
        } else if (contentType.includes('application/json')) {
            body = event.body.length > 0 ? JSON.parse(event.body) : {}
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({type: "error", msg: 'forbidden'}),
                headers: {
                    "access-control-allow-origin": "*",
                    'content-type': 'application/json'
                }
            };
        }
        const tools = new Tools(body)
        if (body.data) body = JSON.parse(tools.base64Decode(body.data))
        else if (body.raw) body = JSON.parse(tools.base64Decode(body.raw))

        if (body.type && body.username && body.nametype && body.userid) {
            if (body.username.length < 4) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({type: "error", msg: 'Invalid request'}),
                    headers: {
                        "access-control-allow-origin": "*",
                        'content-type': 'application/json',
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    }
                };
            }
            let res = await tools.post_result();
            await tools.closeConnection();

            return {
                statusCode: 200,
                body: JSON.stringify(res),
                headers: {
                    "access-control-allow-origin": "*",
                    'content-type': 'application/json',
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*"
                }
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({type: "error", msg: 'methods not allowed'}),
                headers: {
                    "access-control-allow-origin": "*",
                    'content-type': 'application/json'
                }
            };
        }
    } else {
        return {
            statusCode: 401,
            body: ""
        };
    }
};


export {handler};*/
