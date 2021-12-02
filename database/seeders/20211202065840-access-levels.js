module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('AccessLevels', [
            {
                accessLevel: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                accessLevel: 'hospital',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('AccessLevels', null, {});
    }
};
