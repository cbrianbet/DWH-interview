module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: "$2b$10$FOcIiUq/MH8jvp6VfYnk3u8gDPzaWwnsa9yrx5vxbDZAEGZXJ/xJW", //Password
      accesslevel: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
