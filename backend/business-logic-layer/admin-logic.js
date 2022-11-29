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

function deleteVacationByIdAsync(id) {
    return dal.executeQueryAsync(`DELETE FROM vacations WHERE vacation_id = "${id}"`);
}

function updateVacationByIdAsync(id, body) {
    return dal.executeQueryAsync(`
    UPDATE vacations
    SET 
    vacation_description = "${body.vacation_description}",
    vacation_destination = "${body.vacation_destination}",
    image_location = "${body.image_location}",
    start_date = "${body.start_date}",
    end_date = "${body.end_date}",
    price = "${body.price}"
    
    WHERE vacation_id = "${id}"
    `);
}

module.exports = {
    insertVacationAsync,
    deleteVacationByIdAsync,
    updateVacationByIdAsync
}