type LogLevel = "info" | "debug" | "trace" | "warn" | "error";

interface LogConfig {
  level: LogLevel;
  timestamp: boolean;
}

class Logger {
  private config: LogConfig;
  private readonly logLevels: Record<LogLevel, number> = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  };

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      level: (process.env.LOG_LEVEL?.toLowerCase() as LogLevel) || "info",
      timestamp: true,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels[level] >= this.logLevels[this.config.level];
  }

  private formatMessage(
    level: LogLevel,
    message: string | object,
    ...args: unknown[]
  ): string {
    let formattedMessage: string;

    // Handle object as first parameter
    if (typeof message === "object") {
      formattedMessage = JSON.stringify(message, null, 2);
    } else {
      formattedMessage = message;
    }

    // Add arguments if provided
    if (args.length > 0) {
      const argsString = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");
      formattedMessage += " " + argsString;
    }

    // Add timestamp
    if (this.config.timestamp) {
      const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
      formattedMessage = `${timestamp} [${level.toUpperCase()}]: ${formattedMessage}`;
    } else {
      formattedMessage = `[${level.toUpperCase()}]: ${formattedMessage}`;
    }

    return formattedMessage;
  }

  private log(
    level: LogLevel,
    message: string | object,
    ...args: unknown[]
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, ...args);

    // Use console.warn for warn level, console.log for others
    if (level === "warn") {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  }

  trace(message: string | object, ...args: unknown[]): void {
    this.log("trace", message, ...args);
  }

  debug(message: string | object, ...args: unknown[]): void {
    this.log("debug", message, ...args);
  }

  info(message: string | object, ...args: unknown[]): void {
    this.log("info", message, ...args);
  }

  warn(message: string | object, ...args: unknown[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string | object, ...args: unknown[]): void {
    this.log("error", message, ...args);
  }

  // Utility method to change log level at runtime
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  // Utility method to get current log level
  getLevel(): LogLevel {
    return this.config.level;
  }
}

// Create and export default logger instance
const logger = new Logger();

export default logger;
export { Logger };
export type { LogLevel };
