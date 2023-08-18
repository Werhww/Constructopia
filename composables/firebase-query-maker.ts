export default function (queryObject: any) {
    let newQuery = query(buildRef)
    if(queryObject['limit']) {
        newQuery = query(newQuery, limit(queryObject['limit']))
    } else if(queryObject['where']) {
        newQuery = query(newQuery, where(queryObject['where'].field, queryObject['where'].filter, queryObject['where'].value))
    } else if (queryObject['orderBy']) {
        newQuery = query(newQuery, orderBy(queryObject['orderBy'].field, queryObject['orderBy'].direction))
    }

    return newQuery
}