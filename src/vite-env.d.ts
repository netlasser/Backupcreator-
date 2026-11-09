/// <reference types="vite/client" />

declare module '*firebase-applet-config.json' {
  const config: {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    firestoreDatabaseId?: string;
  };
  export default config;
}
