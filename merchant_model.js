const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: 'fairy',
    port: 5432
});

const executeSQL = (query) => {
    return new Promise(((resolve, reject) => {
        pool.query(query, (error, results) => {
            if ( error ) return reject(error);
            resolve(results.rows);
        });
    }));
}

const getSongs = () => {
    console.log('default sort');
    return executeSQL('SELECT songs.song_name, groups.group, albums.albom_name FROM songs LEFT JOIN groups ON songs.id_group = groups.id LEFT JOIN albums ON songs.id_album = albums.id');
};

const getSortedGroupsByYear = () => {
    return executeSQL(`select groups.group, geners.gener_name, years.year, albums.albom_name FROM groups 
    inner join geners on groups.id_genre= geners.id
    inner join years on groups.id_year = years.id 
    inner join albums on groups.id_first_album = albums.id order by year `);
};

const getSortedGroupsByAlbum = () => {
    console.log('sorted by album')
    return executeSQL(`select groups.group, geners.gener_name, years.year, albums.albom_name FROM groups 
    inner join geners on groups.id_genre= geners.id
    inner join years on groups.id_year = years.id 
    inner join albums on groups.id_first_album = albums.id order by albom_name `);
};

const getSortedGroupsByGenerRock = () => {
    return executeSQL(`select groups.group, geners.gener_name FROM groups 
    inner join geners on groups.id_genre = geners.id
    where gener_name = 'Rock'`);
};

const getSortedGroupsByYearMoreTwoThousand = () => {
    return executeSQL(`select groups.group, years.year FROM groups 
    inner join years on groups.id_year = years.id where year > 2000 order by year   `);
};

const getSortedGroupsByYearInterval = () => {
    return executeSQL(`select groups.group, years.year FROM groups 
    inner join years on groups.id_year = years.id where year in (1996, 2006)  `);
};

const getMaxGroupName = () => {
    return executeSQL(`select groups.group as group_name, length(groups.group) as group_length
    from groups
    where length(groups.group) = (select max(length(groups.group)) from groups) `);
};

const getMinGroupName = () => {
    return executeSQL(`select groups.group as group_name, length(groups.group) as group_length
    from groups
    where length(groups.group) = (select min(length(groups.group)) from groups) `);
};

function getSortedGroups(field) {
    switch (field) {
        case 'albom_name':
            return getSortedGroupsByAlbum();
        case 'song_name':
            return
        default:
            return getSongs();
    }
}

module.exports = {
    getSortedGroups,
    getSongs,
    getSortedGroupsByYear,
    getSortedGroupsByAlbum,
    getSortedGroupsByGenerRock,
    getSortedGroupsByYearMoreTwoThousand,
    getSortedGroupsByYearInterval,
    getMaxGroupName,
    getMinGroupName
};