import bs4
from urllib.request import Request, urlopen


class Translate:
    def __init__(self):
        pass

    @staticmethod
    def get(word):
        url = 'https://www.diki.pl/slownik-angielskiego?q={}'.format(word)
        req = Request(url)
        code_html = urlopen(req).read().decode()
        no_starch_soup = bs4.BeautifulSoup(code_html, "lxml")
        res = bs4.BeautifulStoneSoup.select(no_starch_soup, ".diki-results-left-column .hw .plainLink")
        result = [x.text for x in res]
        return result


class Examples:
    def __init__(self):
        pass

    @staticmethod
    def get(word):
        url = 'https://www.collinsdictionary.com/dictionary/english/{}'.format(word)
        req = Request(url)
        code_html = urlopen(req).read().decode()
        no_starch_soup = bs4.BeautifulSoup(code_html, "lxml")
        res = bs4.BeautifulStoneSoup.select(no_starch_soup, ".cit.type-example .quote")
        result = [x.text.rstrip() for x in res]
        return result


class Description:
    def __init__(self):
        pass

    @staticmethod
    def get(word):
        url = 'https://www.collinsdictionary.com/dictionary/english/{}'.format(word)
        req = Request(url)
        code_html = urlopen(req).read().decode()
        no_starch_soup = bs4.BeautifulSoup(code_html, "lxml")
        res = bs4.BeautifulStoneSoup.select(no_starch_soup, ".sense .def")
        result = [x.text.rstrip() for x in res if word.lower() not in x.text.lower()]
        return result


class Audio:
    def __init__(self):
        pass

    @staticmethod
    def get(word):
        return "https:1//www.diki.pl/images-common/en/mp3/{}.mp3".format(word)
