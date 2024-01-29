import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: string[] = [];

  addNotification(notification: string) {
    this.notifications.push(notification);
  }

  getNotifications() {
    return this.notifications;
  }
}