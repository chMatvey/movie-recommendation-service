from bs4 import BeautifulSoup
import requests as req
import lxml

my_cookies = {'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'ru,en;q=0.8',
              'Cache-Control': 'no-cache',
              'Connection': 'Upgrade',
              'Cookie': 'gdpr=0; yandexuid=8116565561631377372; yuidss=8116565561631377372; '
                        'yandex_login=burlakov2054; location=1; mda_exp_enabled=1; '
                        'crookie=lmGRTBkvGooXo2c4WgWhxtpxsqjlXvskbJjbOX05WyZNmpMnTfGA//K9ojpopfuFn'
                        '+oE0YZlhcnPRMgW8jAvDQPKm2Y=; cmtchd=MTYzOTE2NTM5MDAxNA==; mobile=no; my_perpages=%5B%5D; '
                        'i=5n9Mu5+NA5K35Vd/B8376QqY1RUxAopNeF7k/uK3s8KGCc/ZZGQXe4L086jel9EFwi1'
                        '+BiqjVzSGYPnP6yug3UCy9W8=; users_info[check_sh_bool]=none; '
                        'PHPSESSID=9j2ambk9l9osb5krlfc2b76qg6; yandex_gid=2; tc=2; uid=27845568; '
                        '_csrf_csrf_token=nz1w3KJr37kp4hAr46q-zxNCzubkpYnRpZgBNW6v_s0; '
                        'desktop_session_key'
                        '=69e5bdbee2b7461c301527f09995e0f60bd28eee51626a448f20f4252fecf0e63433619903127958f46639fad3c5571d1061f8f105cbdbc56fc0b6819d8710f26c24cf5a842fb51900be6d4e8d5fc7b19ce369886e1a89424ef137ea75176a2b; desktop_session_key.sig=IIvuU0c8TQc5X1GehwQM0Pghp3Y; _ym_isad=1; ys=udn.cDrQkNC70LXQutGB0LDQvdC00YAg0JHRg9GA0LvQsNC60L7Qsg%3D%3D#c_chck.2156366297; yp=1639701362.yu.8116565561631377372; ymex=1642206962.oyu.8116565561631377372; _csrf=cGM-vSb9JHejtVJhI5iWwxFe; user_country=ru; _ym_uid=1639165374410722118; ya_sess_id=3:1639626310.5.0.1631377418993:VMHqTQ:45.1|128215649.0.2|30:203636.481946.-bblQkVFGyYs3f5ptro9teRLbKs; mda2_beacon=1639626310293; sso_status=sso.passport.yandex.ru:blocked; kdetect=1; _ym_visorc=w; _ym_d=1639627327; kpunk=1; spravka=dD0xNjM5NjI3NDEzO2k9NzcuMjM0LjE5My44NDtEPUE4OTRERTI1QkNFNzAxQkZERTExNDBCRUQ2RTBEQzU3RDcyREQyREY2NDMzRTkxQUY2MTE5NzE4Q0U4NjAyMTlBQzVEO3U9MTYzOTYyNzQxMzgyNDExOTA3ODtoPTZiMWUyMmQwODg0ZTAxNDcxYjk3MTJjYTE0NDlhOTdm',
              'Host': 'www.kinopoisk.ru',
              'Origin': 'https://www.kinopoisk.ru',
              'Pragma': 'no-cache',
              'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
              'Sec-WebSocket-Key': 'xC2ZGui1LizMzDATee+w9Q==',
              'Sec-WebSocket-Version': '13',
              'Upgrade': 'websocket',
              'User-Agent': 'Mozilla/4.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                            'Chrome/94.0.4606.85 YaBrowser/21.11.2.763 Yowser/2.5 Safari/537.36'}


def driver_get_text(link):
    resp = req.get(link, cookies=my_cookies)
    return resp.text


def get_movie_cast(link):
    a = link + 'cast/'
    soup = BeautifulSoup(driver_get_text(a), 'lxml')
    left_block = soup.find('div', {'class': 'block_left'})
    left_block_childs = [e for e in left_block.children if e.name is not None]
    a = 0
    write_name = False
    cast_type = ''
    film_persons = []
    while a < len(left_block_childs):
        person = {}
        if write_name and left_block_childs[a].name == 'div':
            cast_name_tag = left_block_childs[a].find('div', {'class': 'name'}).find('a')
            cast_name = cast_name_tag.text
            if cast_type == 'actor':
                person['Роль_в_фильме'] = left_block_childs[a].find('div', {'class': 'role'}).text[4:].split(',')[0]
            cast_id = cast_name_tag.get('href').split('/')[2]
            person['Тип_Персонала'] = cast_type
            person['Имя'] = cast_name
            person['ID'] = cast_id
            film_persons.append(person)
        if left_block_childs[a].name == 'a':
            cast_type = left_block_childs[a].get('name')
            a += 1
            write_name = True
        a += 1
    return film_persons


def get_num_from_string(string):
    result = ''
    for char in string:
        if char.isdigit():
            result += char
    return result


def get_movie_rating(link):
    try:
        a = link + 'votes/'
        soup = BeautifulSoup(driver_get_text(a), 'lxml')
        print(soup)
        rating = float(soup.find('span', {'class': 'rating_ball'}).text[:-2])
        votes_count = int(get_num_from_string(soup.find('span', {'class': 'ratingCount'}).text))
        return rating, votes_count
    except:
        None


def parse_page(link):
    id = link.split('/')[-2]
    genre_words = ['Жанр']
    needed_words = ['Возраст', 'Время', 'Страна', 'Рейтинг MPAA', 'Год производства']
    try:
        soup = BeautifulSoup(driver_get_text(link), 'lxml')
        name = soup.find('h1', {'itemprop': "name"}).text

        movie = {'ID': id, 'Link': link, 'Name': name}

        all_data = soup.find('div', {'data-test-id': "encyclopedic-table"})
        datas = [e for e in all_data.children if e.name is not None]
        for data in datas:
            data_childs = [e for e in data.children if e.name is not None]
            title = data_childs[0].text.strip()
            if title in needed_words:
                lin_cl = len(data_childs[1].findAll('a'))
                if lin_cl == 0:
                    if title == 'Время':
                        movie[title] = data_childs[1].text.strip().split(' ')[0]
                    else:
                        movie[title] = data_childs[1].text.strip()
                else:
                    m = []
                    for a in data_childs[1].findAll('a'):
                        if a.text.strip() != '...':
                            m.append(a.text.strip())
                    movie[title] = m

            if title in genre_words:
                all_genres = data_childs[1].findAll('a')
                gggg = []
                for genre in all_genres:
                    rus_genre = genre.text
                    eng_genre = genre.get('href').split('/')[3]
                    genr = {}
                    genr['Жанр(rus)'] = rus_genre
                    genr['Жанр(eng)'] = eng_genre
                    if rus_genre != 'слова':
                        gggg.append(genr)
                movie[title] = gggg

        try:
            movie['Состав команды'] = get_movie_cast(link)
        except:
            pass

        try:
            links = parse_page_image_links(soup)
            for key in links.keys():
                movie[key] = links[key]
        except:
            pass

        try:
            rating, count_votes = get_movie_rating(link)
            movie['Rating'] = rating
            movie['Count_votes'] = count_votes
        except:
            pass
        return movie
    except:
        pass


def parse_page_image_links(soup):
    movie = {}
    try:
        title_srcset = soup.find('img', {'class': "film-poster"}).get('srcset')
        try:
            for img_link in title_srcset.split(','):
                movie['title_image_link_' + img_link.strip()[-2:]] = img_link.strip()[:-3]
        except:
            pass
        background = soup.find('div', {'class': 'styles_background__22eKg'})
        try:
            for img_link in background.find('img').get('srcset').split(','):
                movie['background_image_link_' + img_link.strip()[-2:]] = img_link.strip()[:-3]
        except:
            pass
    except:
        pass
    return movie
