const ShoppingListService = {
    getList(knex) {
        return knex.select('*').from('shopping_list');
    },

    getById(knex, id) {
        return knex.select('*').from('shopping_list').where('id', id).first();
    },

    insertItem(knex, item) {
        return knex('shopping_list').insert(item).returning('*').then(rows => rows[0]);
    },

    deleteItem(knex, id) {
        return knex('shopping_list').delete().where({ id });
    },

    updateItem(knex, id, item) {
        return knex('shopping_list').update(item).where({ id });
    }
}

module.exports = ShoppingListService;