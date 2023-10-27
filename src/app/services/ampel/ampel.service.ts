import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Context } from '../../core/models/context.enum';

interface AmpelDto {
    level: number; // 1 - 5
    validFrom: Date;
}

interface AmpelDataDto {
    [key: string]: AmpelDto;
}

export interface AmpelEntry {
    level: number; // 1 - 5
    isValidNow: boolean;
}

interface AmpelData {
    [key: string]: AmpelEntry;
}

@Injectable({
    providedIn: 'root'
})
export class AmpelService {
    private cachedAmpelData$: Observable<AmpelData>;

    constructor(private readonly http: HttpClient) {}

    private loadAmpelData(): void {
        const url = environment.baseUrl + '/dashboard/ampel';
        this.cachedAmpelData$ = this.http.get<AmpelDataDto>(url).pipe(
            first(),
            map((data) => {
                // map validFrom from String to Date
                return Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                        this.formatKey(key),
                        <AmpelEntry>{
                            level: value.level,
                            isValidNow:
                                new Date(value.validFrom).getTime() < Date.now()
                        }
                    ])
                );
            })
        );
    }

    private formatKey(key: string): string {
        return key.split('ampelStatus')[1].toLowerCase();
    }

    getAmpelEntry(context: Context): Observable<AmpelEntry> {
        if (!this.cachedAmpelData$) {
            this.loadAmpelData();
        }
        return this.cachedAmpelData$.pipe(
            map((ampelData) => ampelData[context.toLowerCase()])
        );
    }
}
