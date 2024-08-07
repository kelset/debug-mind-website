const fs = require("fs");
const path = require("path");

const insertContent = (filePath, targetId, indexContent) => {
  const content = fs.readFileSync(filePath, "utf8");
  const targetPattern = new RegExp(`(<(div|section|header|footer)[^>]*id="${targetId}"[^>]*>)(.*?)(</\\2>)`, "s");

  if (!targetPattern.test(indexContent)) {
    console.error(`Element with ID '${targetId}' not found or not properly formatted in index.html`);
    return indexContent; // Return the original content if the target element is not found
  }

  return indexContent.replace(targetPattern, `$1${content}$4`);
};

const buildIndex = () => {
  const indexPath = path.join(__dirname, "index.html");
  let indexContent = fs.readFileSync(indexPath, "utf8");

  indexContent = insertContent(
    path.join(__dirname, "partials", "bg-illustration.html"),
    "bg-illustration",
    indexContent
  );
  indexContent = insertContent(path.join(__dirname, "partials", "resources.html"), "resources", indexContent);
  indexContent = insertContent(
    path.join(__dirname, "partials", "episodes-illustration.html"),
    "episodes-illustration",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "episodes-ascii-text.html"),
    "episodes-ascii-text",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "shorts-illustration.html"),
    "shorts-illustration",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "shorts-ascii-text.html"),
    "shorts-ascii-text",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "resources-illustration.html"),
    "resources-illustration",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "resources-ascii-text.html"),
    "resources-ascii-text",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "hero-illustration.html"),
    "hero-illustration",
    indexContent
  );
  indexContent = insertContent(
    path.join(__dirname, "partials", "footer-illustration.html"),
    "footer-illustration",
    indexContent
  );

  fs.writeFileSync(indexPath, indexContent, "utf8");
};

buildIndex();
