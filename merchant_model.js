const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: 'fairy',
    port: 5432,
  })
  
  const getSongs = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT songs.song_name, groups.group, albums.albom_name FROM songs LEFT JOIN groups ON songs.id_group = groups.id LEFT JOIN albums ON songs.id_album = albums.id', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  

  const getSortedGroupsByYear = (request, response) => {
    pool.query(`select groups.group, geners.gener_name, years.year, albums.albom_name FROM groups 
    inner join geners on groups.id_genre= geners.id
    inner join years on groups.id_year = years.id 
    inner join albums on groups.id_first_album = albums.id order by year `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getSortedGroupsByAlbum = (request, response) => {
    pool.query(`select groups.group, geners.gener_name, years.year, albums.albom_name FROM groups 
    inner join geners on groups.id_genre= geners.id
    inner join years on groups.id_year = years.id 
    inner join albums on groups.id_first_album = albums.id order by albom_name `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getSortedGroupsByGenerRock = (request, response) => {
    pool.query(`select groups.group, geners.gener_name FROM groups 
    inner join geners on groups.id_genre = geners.id
    where gener_name = 'Rock'`, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getSortedGroupsByYearMoreTwoThousand = (request, response) => {
    pool.query(`select groups.group, years.year FROM groups 
    inner join years on groups.id_year = years.id where year > 2000 order by year   `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getSortedGroupsByYearInterval = (request, response) => {
    pool.query(`select groups.group, years.year FROM groups 
    inner join years on groups.id_year = years.id where year in (1996, 2006)  `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getMaxGroupName = (request, response) => {
    pool.query(`select groups.group as group_name, length(groups.group) as group_length
    from groups
    where length(groups.group) = (select max(length(groups.group)) from groups) `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
  const getMinGroupName = (request, response) => {
    pool.query(`select groups.group as group_name, length(groups.group) as group_length
    from groups
    where length(groups.group) = (select min(length(groups.group)) from groups) `, (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
    })
  }
  
    module.exports = {
      getSongs,
      getSortedGroupsByYear,
      getSortedGroupsByAlbum,
      getSortedGroupsByGenerRock, 
      getSortedGroupsByYearMoreTwoThousand,
      getSortedGroupsByYearInterval,
      getMaxGroupName,
      getMinGroupName
    }