class Language {
    static Swedish = this.c("se")
    static English = this.c("en")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new Language(name)
    }


    static current() {
        var languageName = CookieManager.getCookie("language") ?? Language.English.name
        return Language.c(languageName)
    }
}