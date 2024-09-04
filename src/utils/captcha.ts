import logger from "@/utils/logger";

const genToken = (action = "login") => {
    const grecaptcha = (window as any).grecaptcha;
    
    return new Promise(r => {
        grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(
              "6Lf8ohclAAAAAInG1aKYnPBL4129L8vP6ENZtNo4",
              { action }
            );
            logger.log(`action ${action} token: ${token}`, );
            r(token)
          });
    })
    
}

const captcha = { genToken };

export default captcha;