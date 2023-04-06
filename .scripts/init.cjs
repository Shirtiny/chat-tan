const shell = require("shelljs");
const ci = require("ci-info");
const husky = require("husky");

//检查控制台是否以运行`git `开头的命令
if (!shell.which("git")) {
  //在控制台输出内容
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

shell.exec("git pull --tags");

if (ci.isCI) {
  console.log("The name of the CI server is:", ci.name);
} else {
  console.log("This program is not running on a CI server");
  husky.install();
  shell.exec("yarn node .scripts/version.cjs");
}
