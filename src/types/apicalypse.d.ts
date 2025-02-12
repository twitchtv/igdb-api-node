declare module 'apicalypse' {
    interface ApicalypseConfig {
        method?: string;
        baseURL?: string;
        headers?: Record<string, string>;
        responseType?: string;
        [key: string]: any;
    }

    interface ApicalypseClient {
        fields(fields: string | string[]): ApicalypseClient;
        limit(limit: number): ApicalypseClient;
        offset(offset: number): ApicalypseClient;
        search(query: string): ApicalypseClient;
        where(query: string): ApicalypseClient;
        sort(field: string, direction?: 'asc' | 'desc'): ApicalypseClient;
        request(endpoint: string): Promise<any>;
    }

    function apicalypse(config?: ApicalypseConfig): ApicalypseClient;
    export default apicalypse;
}