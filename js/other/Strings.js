
class Strings {
    //#region Sections
    //#region Sections - Projects
    static SectionProjects = this.c("section_projects")
    static SectionProjectsDescription = this.c("section_projects_description")
    //#region Sections - Projects - Contents 
    static ProjectAnimation = this.c("project_animation")
    static ProjectAnimationDescription = this.c("project_animation_description")
    static ProjectPallet = this.c("project_pallet")
    static ProjectPalletDescription = this.c("project_pallet_description")
    static ProjectScanner = this.c("project_scanner")
    static ProjectScannerDescription = this.c("project_scanner_description")
    static ProjectBag = this.c("project_bag")
    static ProjectBagDescription = this.c("project_bag_description")
    static ProjectCaravan = this.c("project_caravan")
    static ProjectCaravanDescription = this.c("project_caravan_description")
    //#endregion
    //#endregion
   
    //#region Sections - Practice
    static SectionPractice = this.c("section_practice")
    static SectionPracticeDescription = this.c("section_practice_description")

    //#region Sections - Practice - Content
    static SectionPracticeLeftTitle = this.c("section_practice_left_title")
    static SectionPracticeLeftBody = this.c("section_practice_left_body")
    static SectionPracticeCenterTitle = this.c("section_practice_center_title")
    static SectionPracticeCenterBody = this.c("section_practice_center_body")
    static SectionPracticeRightTitle = this.c("section_practice_right_title")
    static SectionPracticeRightBody = this.c("section_practice_right_body")
    //#endregion
    //#endregion

    //#region Sections - Knowledge
    static SectionKnowledge = this.c("section_knowledge")
    static SectionKnowledgeDescription = this.c("section_knowledge_description")
    //#endregion
    
    //#region Sections - Communication
    static SectionCommunication = this.c("section_communication")
    static SectionCommunicationDescription = this.c("section_communication_description")
    //#region Sections - Communication - Content
    static SectionCommunicationLeftTitle = this.c("section_communication_left_title")
    static SectionCommunicationLeftBody = this.c("section_communication_left_body")
    static SectionCommunicationCenterTitle = this.c("section_communication_center_title")
    static SectionCommunicationCenterBody = this.c("section_communication_center_body")
    static SectionCommunicationRightTitle = this.c("section_communication_right_title")
    static SectionCommunicationRightBody = this.c("section_communication_right_body")
    //#endregion
    //#endregion
    
    //#region Sections - Background
    static SectionBackground = this.c("section_background")
    static SectionBackgroundDescription = this.c("section_background_description")
    //#endregion
    //#endregion

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new Strings(name)
    }

    translated(language) {
        var translations = {}
        //#region Sections
        //#region Sections - Projects
        translations[Strings.SectionProjects.name] = {
            "se": "Större Projekt",
            "en": "Bigger Projects"
        }
        translations[Strings.SectionProjectsDescription.name] = {
            "se": "En snabb översikt på några utav årets större ny startade konsult projekt. Innhåller både utförda & aktiva projekt.",
            "en": ""
        }
        //#region Sections - Projects - Content
        translations[Strings.ProjectAnimation.name] = {
            "se": "Grafik Animering",
            "en": ""
        }
        translations[Strings.ProjectAnimationDescription.name] = {
            "se": "Animerings program likt After Effects men med fokus på vektor grafik. Kapabel att exportera direkt till Lottie.<br>Vektyg för att snabbare kunna skapa animationer för använding i appar och websidor.",
            "en": ""
        }
        translations[Strings.ProjectPallet.name] = {
            "se": "Lastpall Konfigurator",
            "en": ""
        }
        translations[Strings.ProjectPalletDescription.name] = {
            "se": "System för att konfiguerara alla aspekter utav en lastpall i 3d för att sen skicka instruktioner till en robot som bygger lastpallen. Främst skrivet i JavaScript",
            "en": ""
        }
        translations[Strings.ProjectScanner.name] = {
            "se": "Lager Skanner",
            "en": ""
        }
        translations[Strings.ProjectScannerDescription.name] = {
            "se": "Hjälpmedel för effektivisering utav större lager. Låter användaren skanna och beställa lager artiklar direkt från mobiltelefonen.<br>Innehar även funktionalitet för större översikt på hela lagret. ",
            "en": ""
        }
        translations[Strings.ProjectBag.name] = {
            "se": "Väsk Personifierare ",
            "en": ""
        }
        translations[Strings.ProjectBagDescription.name] = {
            "se": "Ett verkyg som låter kunden designa sin egen väska. Byt färg, lägg till bild, skriv ditt namn och mycket annat för att göra väskan personlig.",
            "en": ""
        }
        translations[Strings.ProjectCaravan.name] = {
            "se": "Husvagn Styrare",
            "en": ""
        }
        translations[Strings.ProjectCaravanDescription.name] = {
            "se": "Kontrollera lampor, värme och mycket annat på din husvagn från mobiltelefonen genom bluetooth eller internet anslutning.",
            "en": ""
        }
        //#endregion
        //#endregion
        
        //#region Sections - Practice
        translations[Strings.SectionPractice.name] = {
            "se": "Projekt Process",
            "en": "Bigger Projects"
        }
        translations[Strings.SectionPracticeDescription.name] = {
            "se": "Målet är att göra det komplexa simpelt. Att effektivisera det tidskrävande genom att anpassa projektets alla delmoment till att fungera som en enhet. Nedanför är kortare sammanfattningar på hur detta uppnås. ",
            "en": ""
        }
        //#region Sections - Practice - Content
        translations[Strings.SectionPracticeLeftTitle.name] = {
            "se": "Design & Funktion",
            "en": ""
        }
        translations[Strings.SectionPracticeLeftBody.name] = {
            "se": "<span>Bra system börjar med en bra design där funktionalitet är logiskt & naturlig. Vad ska prioriteras, vad ska synas & hur vill vi att användaren upplever systemet. </span><span>Logisk design resulterar i logisk kod. Logisk kod resulterar i slutändan till mer tid över till annat än att göra det ologiska, logiskt. Ett problem som annars ofta uppstår. </span>",
            "en": ""
        }
        translations[Strings.SectionPracticeCenterTitle.name] = {
            "se": "System Karta",
            "en": ""
        }
        translations[Strings.SectionPracticeCenterBody.name] = {
            "se": "<span>Effektivisering utav det annars tidskrävande. Själva kodandet. Systemet som helhet planeras utförligt. Minsta frågetecken som annars vidhändetas under kodandet görs istället under detta moment. Kommunikation, ansvar & logik mellan systemets alla komponenter ska vara tydligt. </span><span>System kartan fungerar även som ett sätt att snabbt introducera nya utvecklare till projektet vid vidareutveckling.</span>",
            "en": ""
        }
        translations[Strings.SectionPracticeRightTitle.name] = {
            "se": "Kod",
            "en": ""
        }
        translations[Strings.SectionPracticeRightBody.name] = {
            "se": "<span>Genom en logisk & naturlig design, en detaljerad & utänkt system karta så utförs detta stag snabbare än vad man först kan förvänta.</span><span>Från egen erfaranhet så har detta moment alltmer blivit det minst tidskrävande ur projektet som helhet.</span></span>",
            "en": ""
        }
        //#endregion
        //#endregion

        //#region Sections - Knowledge 
        translations[Strings.SectionKnowledge.name] = {
            "se": "Kunskap Översikt",
            "en": "Knowledge Overview"
        }
        translations[Strings.SectionKnowledgeDescription.name] = {
            "se": "Ingenting är omöjligt & är det något man inte kan så går det alltid att lära sig. Men här är en översikt på vad jag nuligen är riktigt bekväm med och som jag redan arbetat med i tidigare projekt. ",
            "en": ""
        }
        //#endregion

        //#region Sections - Communication 
        translations[Strings.SectionCommunication.name] = {
            "se": "Kommunikation",
            "en": ""
        }
        translations[Strings.SectionCommunicationDescription.name] = {
            "se": "Tre typer utav dokument skapas genom projektets utveckling. Dokumenten fungerar både som ett sätt att förbättra kommunikation med kund men även mellan utvecklare.",
            "en": ""
        }

        //#region Sections - Communication - Content
        translations[Strings.SectionCommunicationLeftTitle.name] = {
            "se": "Daglig",
            "en": "Daily"
        }
        translations[Strings.SectionCommunicationLeftBody.name] = {
            "se": "Snabb översikt på vad som är gjort & vad som ska göras. Innhåller detaljer på kod nivå. Främst använt mellan utvecklare.",
            "en": ""
        }
        translations[Strings.SectionCommunicationCenterTitle.name] = {
            "se": "Moment",
            "en": "Moment"
        }
        translations[Strings.SectionCommunicationCenterBody.name] = {
            "se": "<span>Rapport på större moment (ex: PoC, Wireframe). Relativt detaljerad men lätläst i jämförelse det det dagliga dokumentet.</span><span>Ger en helhets insikt på vilka problem som är lösta, hur dessa problem blev lösta och vad som är avklarat.</span>",
            "en": ""
        }
        translations[Strings.SectionCommunicationRightTitle.name] = {
            "se": "Lansering",
            "en": "Launch"
        }
        translations[Strings.SectionCommunicationRightBody.name] = {
            "se": "<span>Alla moment sammanfattade för att ge en översikt på vad en lansering innehåller.</span><span>Beskriver även vad som är planerat till nästa lansering & en lista på möjliga tillägg.</span>",
            "en": ""
        }
        //#endregion
        //#endregion
        
        //#region Sections - Background
        translations[Strings.SectionBackground.name] = {
            "se": "Min Start",
            "en": ""
        }
        translations[Strings.SectionBackgroundDescription.name] = {
            "se": "Ett ämne som nästan alltid förekommer är hur sjutton jag kan vara så ung. I grund och botten så handlar det såklart om intresse men nedanför är en liten sammanfattning utav hur allt startade. ",
            "en": ""
        }
        //#endregion
        //#endregion

        var translation = translations[this.name]
        var translated = translation[language.name]
        if (translated === undefined || translated == null) {
            return translated[Language.English.name] ?? ""
        }
        return translated
    }

}