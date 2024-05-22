const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const disciplines = ['boulder', 'lead', 'speed', 'boulder-lead'];
  const categories = ['men', 'women'];

  for (let discipline of disciplines) {
    for (let category of categories) {
      const url = `https://www.ifsc-climbing.org/ranking/index?discipline=${discipline}&category=${category}`;
      console.log(url);
      await page.goto(url);
      await page.waitForSelector('tbody tr', { visible: true });
      await page.screenshot({
        path: `${category}_${discipline}.png`,
        fullPage: true,
      });
      await getAthleteData(page, discipline, category);
    }
  }

  await browser.close();
}

async function getAthleteData(page) {
  const html = await page.content();

  const athletes = await page.evaluate(() =>
    Array.from(document.querySelectorAll('tbody tr'), (row) => ({
      name: row.querySelector('td:nth-child(2)').innerText,
      country: row.querySelector('td:nth-child(3)').innerText,
      points: row.querySelector('td:nth-child(4)').innerText,
      url: row.querySelector('td:nth-child(2) a').href,
    }))
  );
  console.log(athletes);
}

run();
