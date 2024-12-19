const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  let options = new chrome.Options();

  options.addArguments(
    '--disable-infobars',
    '--disable-notifications',
    '--disable-popup-blocking',
    '--use-fake-ui-for-media-stream',
    // '--use-fake-device-for-media-stream',
    '--disable-media-stream',
    '--disable-features=WebRtcHideLocalIpsWithMd',
    '--ignore-certificate-errors',
    '--allow-insecure-localhost',
    '--allow-file-access-from-files',
    '--allow-running-insecure-content',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled'
  );

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {

    await driver.get('https://meet.google.com/aky-njgw-iic');

    await driver.wait(until.titleContains('Meet'), 30000);

    const nameInputField = await driver.wait(
      until.elementLocated(By.xpath("//input[contains(@placeholder, 'Your name')]")),
      30000
    );

    await nameInputField.sendKeys('Recording BOT', Key.RETURN);

    const joinButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Join')]")),
      30000
    );
    await joinButton.click();

    await driver.sleep(50000);

    console.log('Joined Google Meet successfully!');
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await driver.quit();
  }
})();
