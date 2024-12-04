import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private scriptLoaded = false;

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve(); // Si ya está cargado, resolver de inmediato
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve(); // Resolver cuando el script esté cargado
      };

      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  }
}
