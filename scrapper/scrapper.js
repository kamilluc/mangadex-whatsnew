const { chromium } = require("playwright");
fs = require("fs");

const fetchMangas = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://mangadex.org/login");
  await page.fill("#login_username", "delthas");
  await page.fill("#login_password", "SoC37700");
  await page.click("#login_button");
  await page.waitForNavigation();
  await page.goto(
    "https://mangadex.org/search?tag_mode_exc=any&tag_mode_inc=all&tags=2"
  );

  const records = await page.$$(".manga_title");
  const titles = [];

  if (Array.isArray(records) && records.length) {
    for (const record of records) {
      const linkSuffix = await record.getAttribute("href");
      const name = await record.innerText();
      const id = linkSuffix && linkSuffix.length ? linkSuffix.split("/") : null;
      //czesc logiki do id
      const coverImageUrl =
        id && id.length && id.length > 2
          ? `https://mangadex.org/images/manga/${id[2]}.jpg`
          : null;

      //nie pushowac ostatneigo rekordu po null
      titles.push({
        name,
        link: `https://mangadex.org${linkSuffix}`,
        coverImageUrl,
      });
    }
  }

  console.log(titles);

  await browser.close();
  //to sie powinno zapisyywac w serwerze

  fs.writeFile("db.json", JSON.stringify({ manga: titles }), function (err) {
    if (err) return console.log(err);
    console.log("Hello World > helloworld.txt");
  });
};

fetchMangas();
