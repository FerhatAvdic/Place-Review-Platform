const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('chai').assert;

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:8787/#!/login');
    
    await driver.findElement(By.name('username')).sendKeys('f');
    await driver.findElement(By.name('password')).sendKeys('123123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);
    await driver.findElement(By.className('fixed-navbar'))
            .then(el => el.getAttribute('innerHTML')
            .then(html => {
                var htmlString = html.toString();
                if(htmlString.indexOf('My Suggestions')!== -1) console.log("OK");
                else console.log("NOT OK");
            }));
  } finally {
    await driver.quit();
  }
})();