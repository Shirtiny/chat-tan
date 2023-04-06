import { ShLogger, LEVELS } from "@shirtiny/logger";
import versionInfo from "../version.json";

const miku = "https://i.giphy.com/media/11lxCeKo6cHkJy/giphy.webp";

class CustomLogger extends ShLogger {}

const logger = new CustomLogger({
  level: LEVELS.debug,
});

export const logVersion = async () => {
  versionInfo &&
    (await logger.unionVersion(
      versionInfo.package.name,
      versionInfo.git.branch,
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
