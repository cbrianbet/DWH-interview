module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
		{
			firstName: "John",
			lastName: "Doe",
			email: "example@example.com",
			password: "$2y$10$vEGroAQCFkENgfyezabniu45Nlfw3.HVvkIzLj0EDidlYUfMuwdpO", //123456
			access_level: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
