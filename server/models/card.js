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
	type: DataTypes.ENUM('vanilla', 'effect', 'fusion', 'ritual', 'syncro', 'xyz', 'pendilum', 'link', 'spell', 'trap'),
	allowNull: false,
	defaultValue: 'vanilla'
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

    monster_type: {
	type: DataTypes.ENUM('spellcaster', 'dragon')
    },

    atribute: {
	type: DataTypes.ENUM('dark', 'quickspell')
    },

    level: {
	type: DataTypes.NUMBER
    }

})

sequelize.sync();

export {Card};
