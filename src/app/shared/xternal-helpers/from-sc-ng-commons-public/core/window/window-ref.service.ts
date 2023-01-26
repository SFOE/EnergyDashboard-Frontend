import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class WindowRef {
    get nativeWindow(): null | Window {
        return (typeof window !== 'undefined' && window) || null;
    }
}
