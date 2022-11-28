const dal = require("../data-access-layer/dal");


function insertVacationAsync(newVacation) {
    return dal.executeQueryAsync(`
    INSERT INTO vacations
    (vacation_description, vacation_destination, image_location, start_date, end_date, price, followers)
    VALUES
    ("${newVacation.vacation_description}","${newVacation.vacation_destination}","${newVacation.image_location}",
    "${newVacation.start_date}","${newVacation.end_date}","${newVacation.price}","${newVacation.followers}")
    `);
}

function deleteVacationByIdAsync(id){
    return dal.executeQueryAsync(`DELETE FROM vacations WHERE vacation_id = "${id}"`);
}

module.exports = {
    insertVacationAsync,
    deleteVacationByIdAsync
}