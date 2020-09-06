const airports = [
    {
        "airport_id": 1,
        "airport_code": "HAN",
        "airport_name": "Hà Nội"
    },
    {
        "airport_id": 2,
        "airport_code": "HPH",
        "airport_name": "Hải Phòng"
    },
    {
        "airport_id": 3,
        "airport_code": "DIN",
        "airport_name": "Điện Biên"
    },
    {
        "airport_id": 4,
        "airport_code": "THD",
        "airport_name": "Thanh Hóa"
    },
    {
        "airport_id": 5,
        "airport_code": "VDO",
        "airport_name": "Quảng Ninh"
    },
    {
        "airport_id": 6,
        "airport_code": "VII",
        "airport_name": "Vinh"
    },
    {
        "airport_id": 7,
        "airport_code": "HUI",
        "airport_name": "Huế"
    },
    {
        "airport_id": 8,
        "airport_code": "VDH",
        "airport_name": "Đồng Hới"
    },
    {
        "airport_id": 9,
        "airport_code": "DAD",
        "airport_name": "Đà Nẵng"
    },
    {
        "airport_id": 10,
        "airport_code": "PXU",
        "airport_name": "Pleiku"
    },
    {
        "airport_id": 11,
        "airport_code": "TBB",
        "airport_name": "Tuy Hòa"
    },
    {
        "airport_id": 12,
        "airport_code": "SGN",
        "airport_name": "Hồ Chí Minh"
    },
    {
        "airport_id": 13,
        "airport_code": "CXR",
        "airport_name": "Nha Trang"
    },
    {
        "airport_id": 14,
        "airport_code": "DLI",
        "airport_name": "Đà Lạt"
    },
    {
        "airport_id": 15,
        "airport_code": "PQC",
        "airport_name": "Phú Quốc"
    },
    {
        "airport_id": 16,
        "airport_code": "VCL",
        "airport_name": "Tam Kỳ"
    },
    {
        "airport_id": 17,
        "airport_code": "UIH",
        "airport_name": "Qui Nhơn"
    },
    {
        "airport_id": 18,
        "airport_code": "VCA",
        "airport_name": "Cần Thơ"
    },
    {
        "airport_id": 19,
        "airport_code": "VCS",
        "airport_name": "Côn Đảo"
    },
    {
        "airport_id": 20,
        "airport_code": "BMV",
        "airport_name": "Ban Mê Thuột"
    },
    {
        "airport_id": 21,
        "airport_code": "VKG",
        "airport_name": "Rạch Giá"
    },
    {
        "airport_id": 22,
        "airport_code": "CAH",
        "airport_name": "Cà Mau"
    }
];

const getAirportId = (s) => {
    let airportId = -1;
    airports.forEach(element => {
        if (element.airport_code === s) {
            airportId = element.airport_id;
        }
    });
    return airportId;
}

module.exports = airportHelper = { getAirportId };