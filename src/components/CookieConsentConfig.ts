import type { CookieConsentConfig } from "vanilla-cookieconsent";

// Extend the Window interface to include the dataLayer object
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}
export const config: CookieConsentConfig = {
  root: "#cc-container",
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: false,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            window.gtag("consent", "update", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
              analytics_storage: "granted",
            });
          },
          onReject: () => {},
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: "de",
    autoDetect: "document",
    translations: {
      de: {
        consentModal: {
          title: "Hallo Reisende, es ist Kekszeit!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          showPreferencesBtn: "Einstellungen verwalten",
          footer:
            '<a href="#link">Datenschutz</a>\n<a href="#link">Bedingungen und Konditionen</a>',
        },
        preferencesModal: {
          title: "Präferenzen für die Zustimmung",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Modal schließen",
          serviceCounterLabel: "Dienstleistungen",
          sections: [
            {
              title: "Verwendung von Cookies",
              description: "",
            },
            {
              title:
                'Streng Notwendige Cookies <span class="pm__badge">Immer Aktiviert</span>',
              description: "",
              linkedCategory: "necessary",
            },
            {
              title: "Analytische Cookies",
              description: "",
              linkedCategory: "analytics",
            },
            {
              title: "Weitere Informationen",
              description:
                'Wenn du Fragen zu meiner Cookie-Policy und deinen Wahlmöglichkeiten hast, wende dich bitte an <a class="cc__link" href="mailto:contact@travel.blog">contact@travel.blog</a>.',
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description: "",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer:
            '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description: "",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description: "",
              linkedCategory: "necessary",
            },
            {
              title: "Functionality Cookies",
              description: "",
              linkedCategory: "functionality",
            },
            {
              title: "Analytics Cookies",
              description: "",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
    },
  },
};
