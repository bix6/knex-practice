const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List Service Object', () => {
    let db;
    let testList = [
        {
            id: 1,
            name: 'Fish Tricks',
            price: 13.10,
            date_added: new Date(),
            checked: true,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Not Dogs',
            price: 4.99,
            date_added: new Date(),
            checked: true,
            category: 'Snack'
        },
        {
            id: 3,
            name: 'Bluffalo Wings',
            price: 5.50,
            date_added: new Date(),
            checked: true,
            category: 'Snack'
        }
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.SHOPPING_TEST_DB_URL
        });
    });

    before(() => {
        db('shopping_list').truncate();
    });

    afterEach(() => {
        db('shopping_list').truncate();
    });

    after(() => {
        db.destroy();
    });

    context(`'shopping_list' has data`, () => {
        beforeEach(() => {
            return db('shopping_list').insert(testList);
        });

        it('should get every item', () => {
            return ShoppingListService.getList(db)
                .then(result => {
                    expect(result).to.eql(testList);
                });
        });
    });
});