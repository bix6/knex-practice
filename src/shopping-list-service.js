const ShoppingListService = {
    getList(knex) {
        return knex.select('*').from('shopping_list');
    },

    getById(knex, id) {
        return knex.select('*').from('shopping_list').where('id', id).first();
    }
}

module.exports = ShoppingListService;