declare class wabe {
    constructor(data: {
        phoneNumber: string;
        sessionId: string;
        useStore: boolean;
    });

    start(): Promise<any>;
}

declare function clearMessages(m: any): Promise<any>;

export { wabe, clearMessages };
