"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
(function example() {
    return __awaiter(this, void 0, void 0, function* () {
        let options = new chrome.Options();
        // Flags to disable permission prompts and automate Google Meet
        options.addArguments('--disable-infobars', '--disable-notifications', '--disable-popup-blocking', '--use-fake-ui-for-media-stream', // Fake camera/microphone input
        // '--use-fake-device-for-media-stream',
        '--disable-media-stream', '--disable-features=WebRtcHideLocalIpsWithMd', '--ignore-certificate-errors', '--allow-insecure-localhost', '--allow-file-access-from-files', '--allow-running-insecure-content', '--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled');
        let driver = yield new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options)
            .build();
        try {
            yield driver.get('https://meet.google.com/aky-njgw-iic');
            yield driver.wait(until.titleContains('Meet'), 30000);
            const nameInputField = yield driver.wait(until.elementLocated(By.xpath("//input[contains(@placeholder, 'Your name')]")), 30000);
            yield nameInputField.sendKeys('Recording BOT', Key.RETURN);
            const joinButton = yield driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Join')]")), 30000);
            yield joinButton.click();
            yield driver.sleep(50000);
            console.log('Joined Google Meet successfully!');
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
        finally {
            yield driver.quit();
        }
    });
})();
