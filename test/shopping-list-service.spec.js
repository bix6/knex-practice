const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List Service Object', () => {
    let db;
    let testList = [
        {
            id: 1,
            name: 'Fish Tricks',
            price: '13.10',
            date_added: new Date(),
            checked: true,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Not Dogs',
            price: '4.99',
            date_added: new Date(),
            checked: true,
            category: 'Snack'
        },
        {
            id: 3,
            name: 'Bluffalo Wings',
            price: '5.50',
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

    before(() => db('shopping_list').truncate());

    afterEach(() => db('shopping_list').truncate());

    after(() => db.destroy());

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

        it('should get by id', () => {
            const id = 1
            return ShoppingListService.getById(db, id)
                .then(result => {
                    expect(result).to.eql(testList[0]);
                });
        });

        it('should return undefined if no id match', () => {
            const id = 4;
            return ShoppingListService.getById(db, id)
                .then(result => {
                    expect(result).to.be.undefined;
                });
        });

        it('should delete item by id', () => {
            const id = 1;
            const newList = testList.slice(1);
            return ShoppingListService.deleteItem(db, id)
                .then(() => ShoppingListService.getList(db))
                .then(list => {
                    expect(list).to.eql(newList);
                });
        });

        it('should update item', () => {
            const id = 1;
            const updateObj = {
                name: 'updated name',
                price: '13.33',
                checked: true,
                date_added: new Date(),
                category: 'Main'
            }
            return ShoppingListService.updateItem(db, id, updateObj)
                .then(() => ShoppingListService.getById(db, id))
                .then(result => {
                    expect(result).to.eql({
                        id: id,
                        ...updateObj
                    });
                });
        });
    });

    context(`'shopping_list' has no data`, () => {
        beforeEach(() => db('shopping_list').truncate());

        it('should get [] when no items', () => {
            return ShoppingListService.getList(db)
                .then(result => {
                    expect(result).to.eql([]);
                });
        });

        it('should insert a new item', () => {
            const newItem = {
                name: 'Pumpkins',
                price: '12.22',
                category: 'Main',
                date_added: new Date(),
                checked: false
            };
            return ShoppingListService.insertItem(db, newItem)
                .then(result => {
                    expect(result).to.eql({
                        id: 1,
                        ...newItem
                    });
                });
        });
    });
});