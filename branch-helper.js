const branches = [
    {
        "branch_id": 1,
        "branch_name": "VietjetAir"
    },
    {
        "branch_id": 2,
        "branch_name": "Pacific Airlines"
    },
    {
        "branch_id": 3,
        "branch_name": "BamBooAirWay"
    },
    {
        "branch_id": 4,
        "branch_name": "Vietnam Airlines"
    }
];

const getBranchId = (s) => {
    let branchId = -1;
    branches.forEach(element => {
        if (element.branch_name === s) {
            branchId = element.branch_id;
        }
    });
    return branchId;
}

module.exports = airportHelper = { getBranchId };