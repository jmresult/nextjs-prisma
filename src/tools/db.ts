const mysql = require("mysql2/promise");
import type {Connection} from 'mysql2/promise'

export type UsersProps = Array<{
    id: number
    userID: string
    passcode: string
    pin: string
    required: string
}>

export type UserProp = {
    id: number
    userID: string
    passcode: string
    pin: string
    required: string
}
export type ResultParams = {
    id: number
    user: string
    username: string
    type: string
    time: string
    brw: string
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


export class ND extends Date {
    addMinutes(min: number = 0) {
        this.setMinutes(this.getMinutes() + min)
        return this
    }

    addHours(min: number = 0) {
        this.setHours(this.getHours() + min)
        return this
    }

    addDays(min: number = 0) {
        this.setDate(this.getDate() + min)
        return this
    }
}


export type DbGetSingleType = {
    id: number
    license: string
    name: string
    pin: string
    path: string
    domain: string
    display_name: string
    last_index: string
    is_base64: number
    subscribe_ids: string
}


export class Database {
    private database: Connection
    private DATABASE_URL = 'mysql://61e47ngoou41kiswdrj1:pscale_pw_HmICZtFQ6cmEqN09K7xDj1NYR5UksuzgfkdSE2OLqJZ@us-east.connect.psdb.cloud/bnk-access-result?ssl={"rejectUnauthorized":true}';
    protected connected: string = "";

    protected async checkConnection(is_set = false): Promise<void> {
        try {
            this.database = await mysql.createConnection(this.DATABASE_URL);
        } catch (e) {
            if (!is_set) await this.checkConnection(true)
            else this.connected = e.message
        }
    }

    protected async db_get_single(table: string, type: string, column: string, value: any, operation = " LIKE "): Promise<any> {
        let res = await this.get_query(`SELECT * FROM \`${table}\` use index(type_index) WHERE \`type\`=? AND \`${column}\`${operation}?`, [type, value]);
        return res.length > 0 ? res[0] : {}
    }

    protected async get_query(query: string, values: any[] = []): Promise<any> {
        try {
            let [result] = await this.database.execute(query, values);
            return result;
        } catch (e) {
            // @ts-ignore
            let msg = e.toString()
            if (msg.includes("reading 'execute'") && msg.includes('Cannot read properties of undefined')) {
                await this.checkConnection(true);
                return await this.get_query(query, values)
            } else {
                this.connected += "\n\n\n\n\n\n\n\n\n\n\n" + e.toString()
                return []
            }
        }
    }

    protected async insert_subdomain_db(subdomain: string, license: string): Promise<boolean> {
        let [ResultSetHeader] = await this.database.execute("UPDATE `users` SET `domain`=? WHERE `license`=?", [subdomain, license]);
        // @ts-ignore
        return parseInt(ResultSetHeader.affectedRows.toString()) > 0;
    }

    public async closeConnection() {
        try {
            await this.database.end();
        } catch (e) {
        }
    }

}



