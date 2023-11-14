import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // SQLite database file
});

const Card = sequelize.define('Card', {
    id: {
	type: DataTypes.INTEGER,
	primaryKey: true,
	autoIncrement: true,
    },

    name: {
	type: DataTypes.STRING,
	allowNull: false
    },

    flavor_text: {
	type: DataTypes.STRING,
	allowNull: false
    },

    cardType: {
	type: DataTypes.ENUM('Normal Monster', 'fusion', 'ritual', 'syncro', 'xyz', 'pendilum', 'link', 'spell', 'trap'),
	allowNull: false,
	defaultValue: 'Normal Monster'
    },

    serial: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true
    },

    attack: {
	type: DataTypes.NUMBER
    },

    defene: {
	type: DataTypes.NUMBER
    },

    isTuner: {
	type: DataTypes.BOOLEAN,
	defaultValue: false,
	allowNull: false
    },

    race: {
	type: DataTypes.ENUM('Aqua', 'Beast', 'Beast-Warrior', 'Continius', 'Counter', 'Creator-God', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Equip', 'Fairy', 'Field', 'Fiend', 'Fish', 'Illusion', 'Insect', 'Machine', 'Mormal', 'Plant', 'Psychic', 'Pyro', 'Quick-Play', 'Reptile', 'Ritual', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'winged Beast', 'Wyrm', 'Zombie'),

	allowNull: false
    },

    atribute: {
	type: DataTypes.ENUM('dark', 'divine', 'earth', 'fire', 'light', 'water', 'wind')
    },

    level: {
	type: DataTypes.NUMBER
    },

    rarity: {
	type: DataTypes.ENUM('Common'),
	allowNull: false
    }

})

sequelize.sync();

export {Card};
