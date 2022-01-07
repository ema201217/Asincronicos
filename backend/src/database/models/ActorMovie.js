module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        movie_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
       };
    let config = {
        tableName: 'actor_movie',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: true
    }
    const ActorMovie = sequelize.define(alias, cols, config); 

    return ActorMovie
};