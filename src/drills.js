// Setup
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

// 1. Search for text in name
function textSearch(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        });
}

// textSearch('Fish');

// 2. Select pageNumber page paginated to 6 items per page
function paginate(pageNumber) {
    const itemsPerPage = 6;
    const offset = (pageNumber - 1) * itemsPerPage;
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result);
        })
}

// paginate(2);

// 3. Get all items after date (daysAgo)
function afterDate(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added', 
            '>', 
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result);
        });
}

// afterDate(7);

// 4. Get total cost for each category
// select category, sum(price) from shopping_list group by category;
function totalCost() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result);
        });
}

totalCost();