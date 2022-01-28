from neo4j import GraphDatabase
import logging
from neo4j.exceptions import ServiceUnavailable
import json

uri = "bolt://neo4j:7687"
user = "neo4j"
password = "streams"


def create_dictionary_for_movie(movie):
    needed_tags = ['ID', 'Link', 'Name', 'Время', 'Rating', 'Count_votes', 'background_image_link_1x',
                   'background_image_link_2x',
                   'title_image_link_1x', 'title_image_link_2x']
    needed_tags_array_1 = ['Год производства', 'Возраст']
    needed_tags_rename = {}
    needed_tags_rename["ID"] = "kinopoisk_id"
    needed_tags_rename["Name"] = "title"
    needed_tags_rename["Время"] = 'duration'
    needed_tags_rename["Год_производства"] = "release_year"
    needed_tags_rename["Возраст"] = "min_age"
    needed_tags_rename["Rating"] = "rating"
    needed_tags_rename["Count_votes"] = "voice_count"
    needed_tags_rename["Link"] = "kinopoisk_ref"
    needed_tags_rename["background_image_link_1x"] = "small_image_ref"
    needed_tags_rename["background_image_link_2x"] = "large_image_ref"
    needed_tags_rename["title_image_link_1x"] = "small_teaser_image_ref"
    needed_tags_rename["title_image_link_2x"] = "large_teaser_image_ref"

    new_dict = {}
    for key in movie:
        if key in needed_tags:
            if key in needed_tags_rename:
                if not ((key == 'Время') and (movie[key] == '—')):
                    new_dict[delete_space(needed_tags_rename[key])] = movie[key]
            else:
                new_dict[delete_space(key)] = movie[key]
        if key in needed_tags_array_1:
            new_dict[needed_tags_rename[delete_space(key)]] = movie[key][0]
    return new_dict


def delete_space(string):
    return string.replace(' ', '_')


def get_int(string):
    res = ''
    for char in string:
        if char.isdigit():
            res += char
    return res


def get_country(country):
    return ''.join(country.replace(' ', '_').replace(')', '_').replace('(', '_').split('_'))



def isExists(nodeType, key, value, isValueInt):
    if isValueInt:
        query = 'MATCH (rwg:' + nodeType + ') WHERE rwg.' + key + ' = ' + str(value) + ' RETURN rwg '
    else:
        query = 'MATCH (rwg:' + nodeType + ') WHERE rwg.' + key + ' = "' + str(value) + '" RETURN rwg '
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    response = list(session.run(query))
    session.close()
    driver.close()
    return len(response), query


def getId(nodeType):
    query = 'MATCH (p:' + nodeType + ') RETURN count(p) + 1 as count'
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    response = list(session.run(query))
    session.close()
    driver.close()
    return response[0]['count']


def smart_create_persons_order(new_data, match_queue):
    persons = {}
    for i in range(len(new_data)):
        for person in new_data[i]['Состав команды']:
            if person['Тип_Персонала'] in ['actor', 'director', 'writer', 'producer']:
                persons[person['ID']] = person['Имя']
    personsLastID = getId('Person')
    i = 0
    all_queue = ''
    all_persons_creating = ''
    for person in persons:
        f_count, query = isExists('Person', 'name', persons[person], False)
        if f_count == 0:
            n_dict = {'name': persons[person], 'kinopoisk_id': person}

            query = 'CREATE (person' + n_dict['kinopoisk_id'] + ':Person { '
            query += 'name: "' + str(n_dict['name']) + '", '
            query += 'kinopoisk_id: ' + str(person) + ', '
            i += 1
            query += 'id:' + str(personsLastID) + '}) '
            personsLastID += 1
            all_queue += query
        else:
            match_queue += query.replace('rwg', 'person' + str(person)).split("RETURN")[0]
    all_persons_creating = all_queue
    return all_persons_creating, match_queue


def smart_create_genres_order(new_data, match_queue):
    genres = {}
    for i in range(len(new_data)):
        for genre in new_data[i]['Жанр']:
            genres[genre['Жанр(eng)'].replace('-', '_')] = genre['Жанр(rus)']
    genresLastID = getId('Genre')
    i = 0
    all_queue = ''
    for genre in genres:
        f_count, query = isExists('Genre', 'name', genres[genre], False)
        if f_count == 0:
            n_dict = {'name': genres[genre], 'Kinopoisk_Genre_ID': genre}

            query = 'CREATE (' + n_dict['Kinopoisk_Genre_ID'] + ':Genre { '
            query += 'name: "' + str(genres[genre]) + '", '
            i += 1
            query += 'id:' + str(genresLastID) + '}) '
            genresLastID += 1
            all_queue += query
        else:
            match_queue += query.replace('rwg', genre).split('RETURN')[0]
    all_genres_creating = all_queue
    return all_genres_creating, match_queue


def smart_create_country_order(new_data, match_queue):
    countryLastID = getId('Country')
    countries = {}
    for i in range(len(new_data)):
        for country in new_data[i]['Страна']:
            if country != '—':
                countries[get_country(country)] = 1
    i = 0
    all_queue = ''
    for country in countries:
        f_count, query = isExists('Country', 'name', country, False)
        if f_count == 0:
            n_dict = {}
            n_dict['name'] = country

            query = 'CREATE (' + n_dict['name'] + ':Country { '
            for row in n_dict:
                query += row + ': "' + str(n_dict[row]) + '", '
            i += 1
            query += 'id:' + str(countryLastID) + '}) '
            countryLastID += 1
            all_queue += query
        else:
            match_queue += query.replace('rwg', country).split('RETURN')[0]
    all_counries_creating = all_queue
    return all_counries_creating, match_queue


def smart_create_movie_order(new_data):
    m_dict = {'kinopoisk_id': 'int', 'kinopoisk_ref': 'str', 'title': 'str', 'release_year': 'int', 'min_age': 'int',
              'duration': 'int', 'rating': 'flt', 'voice_count': 'int', 'small_teaser_image_ref': 'str',
              'large_teaser_image_ref': 'str', 'small_image_ref': 'str', 'large_image_ref': 'str'}
    movieLastID = getId('Movie')
    i = 0
    all_movies_creating = ''
    for movie in new_data:
        n_dict = create_dictionary_for_movie(movie)
        query = 'CREATE (movie' + n_dict['kinopoisk_id'] + ':Movie { '
        for row in n_dict:
            if m_dict[row] == 'str':
                query += row + ': "' + n_dict[row] + '", '
            elif m_dict[row] == 'int':
                query += row + ': ' + get_int(str(n_dict[row])) + ', '
            elif m_dict[row] == 'flt':
                query += row + ': ' + str(n_dict[row]) + ', '

        i += 1
        query += 'id:' + str(movieLastID) + '}) '
        movieLastID += 1
        all_movies_creating += query
    return all_movies_creating
