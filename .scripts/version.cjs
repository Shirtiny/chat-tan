const path = require("path");
const { promises: fsP, writeFileSync } = require("fs");
const getRepoInfo = require("git-repo-info");

const versionFilePath = path.resolve(__dirname, "../src/version.json");

const run = async () => {
  const git = getRepoInfo();
  let isExist = false;
  try {
    const stats = await fsP.stat(versionFilePath);
    isExist = stats.isFile();
  } catch (e) {
    writeFileSync(versionFilePath, "");
  }
  console.log("versionFilePath", versionFilePath);
  console.log("is versionFile exist", isExist);

  if (!git.lastTag) {
    git.lastTag = "0.0.0"
  };

  git.branch; // current branch
  git.sha; // current sha
  git.abbreviatedSha; // first 10 chars of the current sha
  git.tag; // tag for the current sha (or `null` if no tag exists)
  git.lastTag; // tag for the closest tagged ancestor
  //   (or `null` if no ancestor is tagged)
  git.commitsSinceLastTag; // number of commits since the closest tagged ancestor
  //   (`0` if this commit is tagged, or `Infinity` if no ancestor is tagged)
  git.committer; // committer for the current sha
  git.committerDate; // commit date for the current sha
  git.author; // author for the current sha
  git.authorDate; // authored date for the current sha
  git.commitMessage; // commit message for the current sha
  git.root; // root directory for the Git repo or submodule
  //   (if in a worktree, this is the directory containing the original copy)
  git.commonGitDir; // directory containing Git metadata for this repo or submodule
  //   (if in a worktree, this is the primary Git directory for the repo)
  git.worktreeGitDir; // if in a worktree, the directory containing Git metadata specific to
  //   this worktree; otherwise, this is the same as `commonGitDir`.

  const packages = JSON.parse(
    await fsP.readFile(path.resolve(__dirname, "../package.json"), "utf8")
  );
  // package.version = git.lastTag || package.version; // current version

  const versionInfo = { git, package: packages };

  console.log("Get version info:\n", versionInfo);

  await fsP.writeFile(
    versionFilePath,
    JSON.stringify(versionInfo, null, 2),
    "utf8"
  );
};

run();
