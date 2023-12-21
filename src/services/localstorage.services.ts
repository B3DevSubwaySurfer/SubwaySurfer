import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    saveData(key: string, data: any): void {
        const jsonString = JSON.stringify(data);
        localStorage.setItem(key, jsonString);
    }

    getData(key: string): any {
        const jsonString = localStorage.getItem(key);
        console.log(jsonString)
        return jsonString ? JSON.parse(jsonString) : null;
    }
}
