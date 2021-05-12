const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');
var faker = require('faker');


(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();

    //************************************************************************************************************************
    //===TEST-1 LOADING THE HOME PAGE
    await driver.get("https://www.booking.com");
    //===TEST-1 RESULT CHECKING
    try {
        await driver.wait(until.titleIs('Booking.com | Official site | The best hotels & accommodations'), 5000);//Check the Title
        await driver.wait(until.elementLocated(By.name("ss")));//Check whether the Destination input box is located
        await driver.wait(until.elementLocated(By.className("xp__dates-inner")));//Check whether the Checkin and Checkout dates input box is located
        await driver.wait(until.elementLocated(By.className("xp__input")));//Check whether the Guest details input box is located
        await driver.wait(until.elementLocated(By.className("sb-searchbox__button")));//Check whether the Search button is located

        console.log("Test-1 Result: Passed! The page is loaded successfully");
    } catch (e) {
        console.log("Test-1 Result: Failed! The page is not loaded successfully");
    }

    //************************************************************************************************************************
    //===TEST-2 ENTERING TEST CASE
    //====Enter the destination name
    let destination = faker.address.cityName();//Generate city name randomly
    const destinationInput = await driver.findElement(By.name("ss"));
    await destinationInput.sendKeys(destination);

    //====Enter the checkin and checkout dates (automated case?)
    const dates = await driver.findElement(By.className("xp__dates-inner"));
    await dates.click();//Click dates box
    //change to automatically generated date later!
    await driver.findElement(By.css("td.bui-calendar__date[data-date='2021-05-13']")).click();//checkin
    await driver.findElement(By.css("td.bui-calendar__date[data-date='2021-05-18']")).click();//checkout

    //====Enter the guest details (automated case?)
    const guestDetails = await driver.findElement(By.className("xp__input"));
    await guestDetails.click();//Click the guest details box
    //=====No of Adults
    await driver.findElement(By.css("button[aria-label='Increase number of Adults']")).click();//automated click for + adults
    //await driver.findElement(By.css("button[aria-label='Decrease number of Adults']")).click();//automated click for - adults
    //=====No of Children
    await driver.findElement(By.css("button[aria-label='Increase number of Children']")).click();//automated click for + children
    //await driver.findElement(By.css("button[aria-label='Decrease number of Children']")).click();//automated click for - children
    //=====No of Rooms
    await driver.findElement(By.css("button[aria-label='Increase number of Rooms']")).click();//automated click for + rooms
    //await driver.findElement(By.css("button[aria-label='Decrease number of Rooms']")).click();//automated click for - rooms

    //====Click Search button
    await driver.findElement(By.className("sb-searchbox__button")).click();

    //===TEST-2 RESULT CHECKING
    try {
        await driver.wait(until.titleContains(destination), 5000);//Check the title
        //await driver.wait(until.elementLocated(By.css("input#ss[value='"+destination+"']")));
        console.log("Test-2 Result: Passed! Successfully load hotels in "+destination);
    } catch (e) {
        console.log("Test-2 Result: Failed! Failed to load hotels in "+destination);
    }

    //************************************************************************************************************************
    //await driver.quit();
})();