/**
 * HyperDB JS Client
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 */

export class HyperDB {
    public address: string;

    constructor(address: string = "http://localhost:8765") {
        this.address = address;
    }

    async http(url: string = "", method: string = "GET", body: string = ""): Promise<any> {
        return await (await fetch(this.address + "/" + url, body == "" ? { method } : { method, body })).text();
    }

    status = {
        PONG: "PONG",
        TRUE: "YES",
        OK: "OK",
    };

    async ping(): Promise<boolean> {
        return await this.http("ping") === this.status.PONG;
    }

    async version(): Promise<string> {
        return await this.http();
    }

    async has(key: string): Promise<boolean> {
        return await this.http(`has/${key}`) === this.status.TRUE;
    }

    async get(key: string): Promise<string> {
        return await this.http(`data/${key}`);
    }

    async set(key: string, value: string): Promise<string> {
        return await this.http(`data/${key}`, "POST", value);
    }

    async delete(key: string): Promise<boolean> {
        return await this.http(`data/${key}`, "DELETE") === this.status.OK;
    }

    async all(): Promise<{ [k: string]: string }> {
        return JSON.parse(await this.http("data"));
    }

    async clear(): Promise<boolean> {
        return await this.http("data", "DELETE") === this.status.OK;
    }

    async empty(): Promise<boolean> {
        return await this.http("empty") === this.status.TRUE;
    }

    async save(): Promise<boolean> {
        return await this.http("save", "POST") === this.status.OK;
    }

    async reload(): Promise<boolean> {
        return await this.http("reload", "POST") === this.status.OK;
    }

    async reset(): Promise<boolean> {
        return await this.http("reset", "DELETE") === this.status.OK;
    }
}
