const puppeteer = require('puppeteer');

let ATHLETE_DATA = [];

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const disciplines = ['boulder', 'lead', 'speed', 'boulder-lead'];
  const categories = ['men', 'women'];

  for (let discipline of disciplines) {
    for (let category of categories) {
      const url = `https://www.ifsc-climbing.org/ranking/index?discipline=${discipline}&category=${category}`;
      await page.goto(url);
      await page.waitForSelector('tbody tr', { visible: true });
      await page.screenshot({
        path: `${category}_${discipline}.png`,
        fullPage: true,
      });
      await getRankings(page);
    }
  }

  await getIndividualAthleteData(ATHLETE_DATA[0], page);
  console.log(ATHLETE_DATA[0]);
  await browser.close();
}

async function getRankings(page) {
  ATHLETE_DATA = ATHLETE_DATA.concat(
    await page.evaluate(() =>
      Array.from(document.querySelectorAll('tbody tr'), (row) => ({
        name: row.querySelector('td:nth-child(2)').innerText,
        country: row.querySelector('td:nth-child(3)').innerText,
        points: row.querySelector('td:nth-child(4)').innerText,
        url: row.querySelector('td:nth-child(2) a').href,
      }))
    )
  );
}

async function getIndividualAthleteData(athletes) {
  for (let athlete of athletes) {
    await page.goto(athlete.url);
    await page.evaluate(
      () =>
        (athlete.age = document.querySelector(
          '.text-left:nth-child(1)'
        ).innerText),
      (athlete.city = document.querySelector(
        '.text-left:nth-child(2)'
      ).innerText),
      (athlete.yearActive = document.querySelector(
        '.text-left:nth-child(3)'
      ).innerText)
    );
  }
}

run();
