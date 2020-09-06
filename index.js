const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
const airportHelper = require('./airport-helper');
const branchHelper = require('./branch-helper');
const dateHelper = require('./date-helper');
const { connect, query } = require('./async-mysql');
const config = require('./config');

/**
 * Chuẩn hóa thông tin
 */
const prepair = async (list) => new Promise((resolve, reject) => {
    let length = list.length;
    let element;
    for (let index = 0; index < length; index++) {
        element = list[index];
        element.branch = branchHelper.getBranchId(element.branch);
        element.departureDateTime = dateHelper.convertToDateString(element.departureDateTime);
        element.departureAirPort = airportHelper.getAirportId(element.departureAirPort);
        element.arrivalDateTime = dateHelper.convertToDateString(element.arrivalDateTime);
        element.arrivalAirPort = airportHelper.getAirportId(element.arrivalAirPort);
        if (index === length - 1) resolve();
    };
});

/**
 * Chuyển [...] thành [[ ],[ ],...] để dùng trong câu insert
 */
const prepairedValues = async (list) => new Promise((resolve, reject) => {
    const length = list.length;
    const values = [];
    let element;
    for (let index = 0; index < length; index++) {
        element = list[index];
        values.push([
            element.arrivalDateTime,
            element.departureDateTime,
            100,
            element.flightCode,
            element.price,
            'active',
            element.branch,
            element.arrivalAirPort,
            element.departureAirPort,
        ]);
        if (index === length - 1) resolve(values);
    };
});

const insertQuery = "INSERT INTO flight_schedules (arrival_time, departure_time, flight_capacity, flight_code, price, status, arrival_airport_id, brand_id, departure_airport_id) VALUES ?";

const find = async (departure, arrival, departureDate) => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1280,
            height: 600,
        },
        args: [`--window-size=1296,688`],
    });

    const myTimeout = 2 * 60 * 1000;

    // Điền thông tin tìm chuyến bay
    const page = await browser.newPage();
    await page.goto('https://www.flynow.vn/ve-may-bay', { timeout: myTimeout });

    await page.waitForSelector('#mot-chieu');
    await page.click('#mot-chieu');
    await page.waitFor(2000);

    await page.waitForSelector('#departure');
    await page.$eval('#departure', (el, s) => (el.value = s), departure);
    await page.waitFor(2000);

    await page.waitForSelector('#arrival');
    await page.$eval('#arrival', (el, s) => (el.value = s), arrival);
    await page.waitFor(2000);

    await page.waitForSelector('#DepartureDate');
    await page.$eval('#DepartureDate', (el, s) => (el.value = s), departureDate);
    await page.waitFor(2000);

    await Promise.all([
        page.waitForSelector('#formSearch > div > div:nth-child(10) > button'),
        page.click('#formSearch > div > div:nth-child(10) > button'),
        page.waitForNavigation({ timeout: myTimeout, waitUntil: 'networkidle2' })
    ]);

    // Lấy thông tin
    const listContentOneWay = await page.evaluate(() => {
        const list = document.querySelectorAll('#listContentOneWay > li');
        const result = [];
        let branch;
        let flightCode;
        let departureDateTime;
        let departureAirPort;
        let arrivalDateTime;
        let arrivalAirPort;
        let price;
        list.forEach((element) => {
            branch = element.querySelector('.col-1 > span').innerText;
            flightCode = element.querySelector('.col-1 > p').innerText;
            departureDateTime = element
                .querySelector('.detail > .box-detail > .col-detail-2 > div > p:nth-child(2)')
                .innerText.trim();
            departureAirPort = element.querySelector('.col-2 > p:nth-child(2)').innerText;
            arrivalDateTime = element.querySelector(
                '.detail > .box-detail > .col-detail-4 > div > p:nth-child(2)',
            ).innerText;
            arrivalAirPort = element.querySelector('.col-4 > p:nth-child(2)').innerText;
            price = element.querySelector('.col-6 > p').innerText;
            result.push({
                branch,
                flightCode,
                departureDateTime,
                departureAirPort: departureAirPort.substr(departureAirPort.length - 4, 3),
                arrivalDateTime,
                arrivalAirPort: arrivalAirPort.substr(arrivalAirPort.length - 4, 3),
                price: Number(price.substr(0, price.length - 2).replace('.', '')),
            });
        });
        return result;
    });

    await prepair(listContentOneWay);

    // In thông tin lấy được thành file csv
    const csv = parse(listContentOneWay);
    fs.writeFileSync(`output/${departureDate}.csv`, csv);

    // Thêm thông tin vào database
    // const values = await prepairedValues(listContentOneWay);
    // const connection = await connect(config);
    // const insertSQL = await query(connection, insertQuery, [values]);
    // console.log(insertSQL.message);

    await browser.close();
};

(async () => {
    const n = 5;
    const departure = 'Hồ Chí Minh (SGN)';
    const arrival = 'Hà Nội (HAN)';
    let date = '2020-10-21';
    for (let i = 0; i < n; i++) {
        console.log(`Times: ${i + 1}`);
        try {
            await find(departure, arrival, date);
        } catch (error) {
            console.log(error);
        }
        date = dateHelper.nextDateString(date);
    }
})();