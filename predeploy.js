const fs = require("fs");
const path = require("path");

// Function to calculate the relative time from a given date
const calculateRelativeTime = (uploadDate) => {
  const uploadDateParts = uploadDate.split("-");
  const uploadDateTime = new Date(`${uploadDateParts[2]}-${uploadDateParts[1]}-${uploadDateParts[0]}`).getTime();
  const now = Date.now();
  const diffTime = Math.abs(now - uploadDateTime);

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths >= 1) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
};

// Function to format length in minutes
const formatLengthInMinutes = (length) => {
  const timeParts = length.split(":").map((part) => parseInt(part, 10));
  let totalMinutes = 0;

  if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts;
    totalMinutes = hours * 60 + minutes;
  } else if (timeParts.length === 2) {
    const [minutes, seconds] = timeParts;
    totalMinutes = minutes;
  }

  return `${totalMinutes} minutes`;
};

// Insert content from partials
const insertContent = (filePath, targetId, indexContent) => {
  const content = fs.readFileSync(filePath, "utf8");
  const targetPattern = new RegExp(`(<(div|section|header|footer)[^>]*id="${targetId}"[^>]*>)(.*?)(</\\2>)`, "s");

  if (!targetPattern.test(indexContent)) {
    console.error(`Element with ID '${targetId}' not found or not properly formatted in index.html`);
    return indexContent; // Return the original content if the target element is not found
  }

  return indexContent.replace(targetPattern, `$1${content}$4`);
};

const insertVideoContent = (indexContent, containerId, newContent) => {
  const containerPattern = new RegExp(`(<(div|section|header|footer)[^>]*id="${containerId}"[^>]*>)(.*?)(</\\2>)`, "s");
  if (!containerPattern.test(indexContent)) {
    console.error("Element with ID 'episodes-container' not found in index.html");
    return indexContent;
  }
  return indexContent.replace(containerPattern, `$1${newContent}$4`);
};

const buildIndex = () => {
  const indexPath = path.join(__dirname, "index.html");
  let indexContent = fs.readFileSync(indexPath, "utf8");

  // Insert content from partials
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

  // Read and insert YouTube content
  const youtubeContentPath = path.join(__dirname, "youtube-content.json");
  const youtubeContent = JSON.parse(fs.readFileSync(youtubeContentPath, "utf8"));

  let newEpisodesContent = "";
  youtubeContent.long_form_videos.forEach((video) => {
    if (video.title && video.video_id && video.length && video.upload_date) {
      newEpisodesContent += `
        <article class="flex flex-col text-base leading-7 text-gray-900 min-w-[200px] max-w-[600px] w-full">
          <div class="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/${video.video_id}"
              title="${video.title}"
              loading="lazy"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-lg"
            ></iframe>
          </div>
          <header class="mt-3.5 w-full px-2">
            <h3 class="font-bold leading-6 episode-title">
              ${video.title}
            </h3>
            <p>
              <time class="leading-9 episode-upload-date" datetime="${video.upload_date}">${calculateRelativeTime(
        video.upload_date
      )}</time> •
              <time class="leading-9 episode-length">${formatLengthInMinutes(video.length)}</time>
            </p>
          </header>
        </article>`;
    }
  });

  indexContent = insertVideoContent(indexContent, "episodes-container", newEpisodesContent);

  // Insert shorts content for desktop
  let newShortsContentDesktop = "";
  youtubeContent.shorts.forEach((short) => {
    if (short.title && short.video_id) {
      newShortsContentDesktop += `
        <article class="shorts flex flex-col text-base leading-7 text-gray-900 w-full max-w-[200px]">
          <div class="shorts-container rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/${short.video_id}"
              title="${short.title} - YouTube short"
              loading="lazy"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class=""
            ></iframe>
          </div>
          <header class="mt-3.5 w-full px-2">
            <h3 class="font-bold leading-6">${short.title}</h3>
          </header>
        </article>`;
    }
  });

  newShortsContentDesktop += `
    <a
      href="https://www.youtube.com/@kelset/shorts"
      target="_blank"
      class="flex flex-col text-base leading-7 text-gray-900 w-full hover:underline"
    >
      <div id="watch-more" class="shorts-container gradient flex justify-center items-center rounded-lg">
        <img src="./assets/images/watch-on-youtube.svg" alt="Watch more on Youtube" />
      </div>
      <div class="mt-3.5 w-full px-2">
        <h3 class="font-bold leading-6 text-blue-600">Want more?</h3>
      </div>
    </a>`;

  indexContent = insertVideoContent(indexContent, "shorts-container-desktop", newShortsContentDesktop);

  // Insert shorts content for mobile
  let newShortsContentMobile = "";
  youtubeContent.shorts.forEach((short) => {
    if (short.title && short.video_id) {
      newShortsContentMobile += `
        <article class="shorts flex flex-col text-base leading-7 text-gray-900 w-full max-w-[160px]">
          <div class="shorts-container rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/${short.video_id}"
              title="${short.title} - YouTube short"
              loading="lazy"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class=""
            ></iframe>
          </div>
          <header class="mt-3.5 w-full px-2">
            <h3 class="font-bold leading-6">${short.title}</h3>
          </header>
        </article>`;
    }
  });

  newShortsContentMobile += `
    <a
      href="https://www.youtube.com/@kelset/shorts"
      target="_blank"
      class="flex flex-col text-base leading-7 text-gray-900 w-full max-w-[160px] hover:underline"
    >
      <div id="watch-more" class="shorts-container gradient flex justify-center items-center rounded-lg">
        <img src="./assets/images/watch-on-youtube.svg" alt="Watch more on Youtube" />
      </div>
      <div class="mt-3.5 w-full px-2">
        <h3 class="font-bold leading-6 text-blue-600">Want more?</h3>
      </div>
    </a>`;

  indexContent = insertVideoContent(indexContent, "shorts-container-mobile", newShortsContentMobile);

  fs.writeFileSync(indexPath, indexContent, "utf8");
};

buildIndex();
