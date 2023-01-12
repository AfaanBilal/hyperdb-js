/**
 * HyperDB JS Client
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 */

export class HyperDB {
    public address: string;
    public username: string;
    public password: string;

    private authEnabled: boolean = false;
    private token: string = "";

    constructor(address: string = "http://localhost:8765", username: string = "", password: string = "") {
        this.address = address;

        this.username = username;
        this.password = password;

        if (this.username !== "" && this.password !== "") {
            this.authEnabled = true;
        }
    }

    status = {
        PONG: "PONG",
        TRUE: "YES",
        OK: "OK",
        INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
        AUTH_FAILED: "AUTH_FAILED",
    };

    async http(url: string = "", method: string = "GET", body: string = ""): Promise<any> {
        let init: RequestInit = { method };

        if (body !== "") {
            init = { ...init, body };
        }

        if (this.authEnabled) {
            if (this.token === "") {
                await this.auth();
            }

            init = { ...init, headers: { "Auth": this.token } };
        }

        let response = await (await fetch(this.address + "/" + url, init)).text();

        if (response === this.status.AUTH_FAILED) {
            this.auth();
            init.headers["Auth"] = this.token;
            response = await (await fetch(this.address + "/" + url, init)).text();
        }

        return response;
    }

    async auth(): Promise<void> {
        const authResponse = await (await fetch(this.address + "/auth", { method: "POST", headers: { "username": this.username, "password": this.password } })).text();

        if (authResponse === this.status.INVALID_CREDENTIALS) {
            throw new Error("Invalid credentials.");
        }

        this.token = authResponse;
    }

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
