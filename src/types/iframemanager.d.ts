declare module '@orestbida/iframemanager' {
  interface IframeManagerConfig {
    currLang: string;
    services: {
      [key: string]: {
        embedUrl: string;
        thumbnailUrl?: string;
        iframe: {
          allow: string;
          params?: string;
        };
        languages: {
          [key: string]: {
            notice: string;
            loadBtn: string;
          };
        };
        onAccept?: () => void;
      };
    };
  }

  interface ConsentConfig {
    [key: string]: boolean;
  }

  interface IframeManager {
    run(config: IframeManagerConfig): void;
    setConsent(config: ConsentConfig): void;
  }

  const iframemanager: () => IframeManager;
  export default iframemanager;
}