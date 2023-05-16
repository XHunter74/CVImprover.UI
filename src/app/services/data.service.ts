import { Injectable, Optional, SkipSelf } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpClient } from "@angular/common/http";
import { FileModel } from "../models/file.model";

@Injectable({
    providedIn: 'root',
})
export class DataService extends HttpService {

    constructor(http: HttpClient,
        @Optional() @SkipSelf() parentModule: DataService) {
        super(http, parentModule);
    }

    async getCvFiles(): Promise<FileModel[]> {

        const promise = this.get<FileModel[]>('cv');
        return promise;
    }
}