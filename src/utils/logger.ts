import { ShLogger, LEVELS, css } from "@shirtiny/logger";

const miku = "https://i.giphy.com/media/11lxCeKo6cHkJy/giphy.webp";

class CustomLogger extends ShLogger {
  globalState = {
    pre: (...data: any[]) => {
      this.customFormat(
        LEVELS.group,
        [
          {
            str: " pre ",
            style: css`
              color: #C8C2BC;
            `,
          },
        ],
        ...data
      );
    },
    action: (...data: any[]) => {
      this.customFormat(
        LEVELS.group,
        [
          {
            str: " action ",
            style: css`
              color: #A084CF;
            `,
          },
        ],
        ...data
      );
    },
    next: (...data: any[]) => {
      this.customFormat(
        LEVELS.group,
        [
          {
            str: " next ",
            style: css`
              color: #A0D995;
            `,
          },
        ],
        ...data
      );
    },
    changes: (...data: any[]) => {
      this.customFormat(
        LEVELS.group,
        [
          {
            str: " changes ",
            style: css`
              color: #ECB390;
            `,
          },
        ],
        ...data
      );
    },
  };
}

const logger = new CustomLogger({
  level: LEVELS.debug,
});

export const logVersion = async () => {
  const res = await fetch("/version.json");
  const versionInfo: any = await res.json();
  versionInfo &&
    (await logger.unionVersion(
      versionInfo.package.name,
      "main",
      versionInfo.git.abbreviatedSha,
      { src: miku }
    ));
  logger.log(
    "env:",
    import.meta.env.PROD,
    " log options:",
    logger.getLoggerOption()
  );
};

export default logger;
