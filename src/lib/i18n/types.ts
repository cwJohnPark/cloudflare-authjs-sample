export type Dictionary = {
  lang: string;
  navigation: {
    account: string;
    billing: string;
    notifications: string;
    logout: string;
    dashboard: string;
    login: string;
    signup: string;
  };
  landing: {
    navigation: {
      home: string;
      product: string;
      feature: string;
      pricing: string;
      signIn: string;
    };
    hero: {
      brandName: string;
      title1: string;
      title2: string;
      title3: string;
      description1: string;
      description2: string;
      description3: string;
      startBuilding: string;
      stats: {
        modelsDeployed: string;
        modelsDeployedLabel: string;
        uptime: string;
        uptimeLabel: string;
        responseTime: string;
        responseTimeLabel: string;
      };
    };
    features: {
      title: string;
      description: string;
      items: {
        smartAI: {
          title: string;
          description: string;
        };
        lightningFast: {
          title: string;
          description: string;
        };
        enterpriseSecurity: {
          title: string;
          description: string;
        };
      };
    };
    benefits: {
      title: string;
      description: string;
      items: {
        modelsDeployed: {
          metric: string;
          label: string;
          description: string;
        };
        uptime: {
          metric: string;
          label: string;
          description: string;
        };
        responseTime: {
          metric: string;
          label: string;
          description: string;
        };
      };
    };
    testimonials: {
      title: string;
      description: string;
      items: {
        sarah: {
          name: string;
          role: string;
          company: string;
          content: string;
        };
        marcus: {
          name: string;
          role: string;
          company: string;
          content: string;
        };
        emily: {
          name: string;
          role: string;
          company: string;
          content: string;
        };
      };
    };
    cta: {
      title: string;
      description: string;
      startBuilding: string;
    };
    dashboard: {
      aiConsole: {
        title: string;
        subtitle: string;
        live: string;
        activeModels: string;
        weeklyGrowth: string;
        modelTraining: string;
        inProgress: string;
      };
      userAnalytics: {
        title: string;
        subtitle: string;
        totalUsers: string;
        trendingUp: string;
        engagementMetrics: string;
      };
    };
  };
  auth: {
    signIn: string;
    signOut: string;
    email: string;
    password: string;
    welcomeBack: string;
    enterCredentials: string;
    rememberMe: string;
    forgotPassword: string;
    noAccount: string;
    createAccount: string;
    orContinueWith: string;
    signInWithEmail: string;
    signInWithGoogle: string;
    signInWithApple: string;
    terms: string;
    termsOfService: string;
    and: string;
    privacyPolicy: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    overview: string;
    analytics: string;
    reports: string;
    settings: string;
    help: string;
    search: string;
  };
  account: {
    title: string;
    profile: string;
    security: string;
    preferences: string;
    personalInfo: string;
    name: string;
    email: string;
    save: string;
    cancel: string;
    unknown: string;
    noName: string;
    noEmail: string;
    connection: string;
    connected: string;
  };
  settings: {
    title: string;
    language: string;
    languageSettings: string;
    theme: string;
    themeSettings: string;
    notifications: string;
    notificationSettings: string;
    privacy: string;
    privacySettings: string;
    security: string;
    securitySettings: string;
    general: string;
    generalSettings: string;
    appearance: string;
    appearanceSettings: string;
    preferences: string;
    preferencesSettings: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    submit: string;
    close: string;
    edit: string;
    delete: string;
    confirm: string;
    language: string;
    description: string;
  };
  payments: {
    buyNow: string;
    subscribe: string;
    upgrade: string;
    checkout: string;
    processing: string;
    paymentSuccess: string;
    paymentFailed: string;
    tryAgain: string;
    cancel: string;
    freeTrial: string;
    monthly: string;
    yearly: string;
    oneTime: string;
    secure: string;
    paymentDemo: string;
    testIntegration: string;
    recommended: string;
    noSubscriptions: string;
  };
  seo: {
    siteName: string;
    siteDescription: string;
    keywords: string[];
    pages: {
      home: {
        title: string;
        description: string;
      };
      dashboard: {
        title: string;
        description: string;
      };
      auth: {
        title: string;
        description: string;
      };
      account: {
        title: string;
        description: string;
      };
    };
    structuredData: {
      name: string;
      description: string;
      url: string;
      inLanguage: string;
    };
  };
  privacy: {
    cookieConsent: {
      title: string;
      description: string;
      necessary: string;
      analytics: string;
      marketing: string;
      functional: string;
      acceptAll: string;
      acceptSelected: string;
      rejectAll: string;
      showPreferences: string;
      hidePreferences: string;
      necessaryDescription: string;
      analyticsDescription: string;
      marketingDescription: string;
      functionalDescription: string;
      gdprNotice: string;
      ccpaNotice: string;
    };
    policy: {
      title: string;
      lastUpdated: string;
      sections: {
        intro: {
          title: string;
          content: string;
        };
        dataCollection: {
          title: string;
          content: string;
        };
        dataUsage: {
          title: string;
          content: string;
        };
        dataSecurity: {
          title: string;
          content: string;
        };
        cookies: {
          title: string;
          content: string;
        };
        yourRights: {
          title: string;
          content: string;
        };
        contact: {
          title: string;
          content: string;
        };
      };
    };
  };
};
