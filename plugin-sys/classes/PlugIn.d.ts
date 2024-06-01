export default class PlugIn {
    id: string;
    protected _name: string;
    protected _author: string;
    protected _version: number;
    protected _description: string;
    constructor(name: string, description: string);
    get name(): string;
    get description(): string;
    get version(): number;
    get author(): string;
}
