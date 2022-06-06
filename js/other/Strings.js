
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
            "se": "En snabb översikt på årets större ny startade konsult projekt. Innhåller både utförda & aktiva projekt.",
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
            "se": "<span>Riktigt bra system börjar med en riktigt bra design där funktionalitet är logiskt & naturlig. Funktionalitet valideras, vad behövs, vad ska prioriteras & hur vill vi att användaren ska uppleva systemet.</span><span>Logisk design resulterar i logisk kod, logisk kod resulterar i mindre ologisk kod & mindre ologisk kod betyder mer tid över till annat än att göra det ologiska logiskt.</span>",
            "en": ""
        }
        translations[Strings.SectionPracticeCenterTitle.name] = {
            "se": "System Karta",
            "en": ""
        }
        translations[Strings.SectionPracticeCenterBody.name] = {
            "se": "<span>Målet med en system karta är att effektiversera det annars tid krävande, själva kodandet. Minsta detalj i systemet planeras. Hur ska komponenter kommunicera med varandra, hur fördelas ansvar mellan komponenter & främst hur kan vi ta bort så många frågetecken från kodandet som möjligt.</span><span>Fungerar även som ett riktigt bra sätt att snabbt få en förståelse för projektets uppbyggnad då projektet blir större och nya utvecklare ska introduceras till projektet.</span>",
            "en": ""
        }
        translations[Strings.SectionPracticeRightTitle.name] = {
            "se": "Kod",
            "en": ""
        }
        translations[Strings.SectionPracticeRightBody.name] = {
            "se": "Ett dokument som består utav två delar. En sammanfattning utav vad som är gjort och en del för vad som är planerat för framtiden.",
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
            "se": "Tydlig Kommunikation",
            "en": ""
        }
        translations[Strings.SectionCommunicationDescription.name] = {
            "se": "Kommunkation är riktigt viktigt och mitt mål är att kunden alltid ska känna sig helt med i projekts alla svängar. Bortsett från att alltid ha en ",
            "en": ""
        }

        //#region Sections - Communication - Content
        translations[Strings.SectionCommunicationLeftTitle.name] = {
            "se": "Daglig Rapport",
            "en": "Daily Report"
        }
        translations[Strings.SectionCommunicationLeftBody.name] = {
            "se": "Ett simpelt dokument med snabb översikt på vad som är gjort & vad som ska göras. Består utav två delar “Saker fixade” och “Saker att fixa“.",
            "en": ""
        }
        translations[Strings.SectionCommunicationCenterTitle.name] = {
            "se": "Process Rapport",
            "en": "Process Report"
        }
        translations[Strings.SectionCommunicationCenterBody.name] = {
            "se": "<span>Ett dokument som på ett tydligt sätt går igenom ett större delmoment. Målet är att låta kunden få en väldigt detaljerad förståelse för vad som är gjort.</span>I det fall där projekt blir större och kräver fler utvecklare så fungerar dessa dokument även som ett sätt för nya utvecklare att snabbt få en förståelse för hur projektet är konstruerat.<span>",
            "en": ""
        }
        translations[Strings.SectionCommunicationRightTitle.name] = {
            "se": "Lansering Rapport",
            "en": "Launch Report"
        }
        translations[Strings.SectionCommunicationRightBody.name] = {
            "se": "Ett dokument som består utav två delar. En sammanfattning utav vad som är gjort och en del för vad som är planerat för framtiden.",
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