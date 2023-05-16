import { Injectable, Optional, SkipSelf } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpClient } from "@angular/common/http";
import { FileModel } from "../models/file.model";
import { PromptRequest } from "../models/prompt-request.model";
import { PromptResponse } from "../models/prompt-response.model";

@Injectable({
    providedIn: 'root',
})
export class DataService extends HttpService {

    constructor(http: HttpClient,
        @Optional() @SkipSelf() parentModule: DataService) {
        super(http, parentModule);
    }

    async getCvFiles(): Promise<FileModel[]> {
        const data = this.get<FileModel[]>('cv');
        return data;
    }

    async sendPrompt(promptRequest: PromptRequest): Promise<string> {
        const data = this.post<PromptResponse>('cv', promptRequest);
        return (await data).link;
    }
}