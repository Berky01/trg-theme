/* TRG Mobile v3 — replaces search + chips entirely with new DOM */
(function(){
'use strict';
var AB=
[
{n:"A Day's March",s:"a-days-march",c:"casualwear",p:"m"},
{n:"A Kind of Guise",s:"a-kind-of-guise",c:"casualwear",p:"m"},
{n:"A.P.C.",s:"a-p-c",c:"casualwear",p:"h"},
{n:"A.PRESSE",s:"a-presse",c:"casualwear",p:"m"},
{n:"Abaga",s:"abagavelli",c:"casualwear",p:"l"},
{n:"Ace Marks",s:"ace-marks",c:"footwear",p:"m"},
{n:"Acne Studios",s:"acne-studios",c:"casualwear",p:"h"},
{n:"Agolde",s:"agolde",c:"casualwear",p:"m"},
{n:"Aime Leon Dore",s:"aime-leon-dore",c:"casualwear",p:"h"},
{n:"Albam",s:"albam",c:"casualwear",p:"m"},
{n:"Alden",s:"alden",c:"",p:"h"},
{n:"Alex Mill",s:"alex-mill",c:"casualwear",p:"m"},
{n:"Allen Edmonds",s:"allen-edmonds",c:"footwear",p:"h"},
{n:"Ambrosi Napoli",s:"ambrosi-napoli",c:"formalwear",p:"l"},
{n:"American Giant",s:"american-giant",c:"basics",p:"h"},
{n:"American Trench",s:"american-trench",c:"accessories",p:"h"},
{n:"AMI Paris",s:"ami-paris",c:"casualwear",p:"h"},
{n:"Amiri",s:"amiri",c:"formalwear",p:"l"},
{n:"Anderson and Sheppard",s:"anderson-and-sheppard",c:"formalwear",p:"l"},
{n:"Anglo-Italian",s:"anglo-italian",c:"formalwear",p:"h"},
{n:"Another Aspect",s:"another-aspect",c:"casualwear",p:"m"},
{n:"Anovair",s:"anovair",c:"casualwear",p:"m"},
{n:"Anthology",s:"anthology",c:"formalwear",p:"m"},
{n:"Aran Sweater Market",s:"aran-sweater-market",c:"knitwear",p:"l"},
{n:"Arc'teryx",s:"arcteryx",c:"outerwear",p:"h"},
{n:"Arpenteur",s:"arpenteur",c:"casualwear",p:"h"},
{n:"Ascotchang",s:"ascot-chang",c:"formalwear",p:"l"},
{n:"Asics",s:"asics",c:"footwear",p:"m"},
{n:"Asket",s:"asket",c:"basics",p:"h"},
{n:"Aspesi",s:"aspesi",c:"casualwear",p:"m"},
{n:"Astorflex",s:"astorflex",c:"footwear",p:"m"},
{n:"Aubercy",s:"aubercy",c:"footwear",p:"l"},
{n:"August Special",s:"august-special",c:"footwear",p:"m"},
{n:"Auralee",s:"auralee",c:"casualwear",p:"h"},
{n:"Aurelien",s:"aurelien",c:"footwear",p:"h"},
{n:"AvVattev",s:"avvattev",c:"formalwear",p:"l"},
{n:"AYR",s:"ayr",c:"casualwear",p:"m"},
{n:"Banana Republic",s:"banana-republic",c:"formalwear",p:"l"},
{n:"Baracuta",s:"baracuta",c:"outerwear",p:"m"},
{n:"Barbanera",s:"barbanera",c:"casualwear",p:"m"},
{n:"Barbarian",s:"barbarian",c:"casualwear",p:"m"},
{n:"Barbour",s:"barbour",c:"outerwear",p:"h"},
{n:"Barena Venezia",s:"barena-venezia",c:"casualwear",p:"h"},
{n:"Barker",s:"barker",c:"footwear",p:"m"},
{n:"Bather",s:"bather",c:"casualwear",p:"m"},
{n:"Batoner",s:"batoner",c:"basics",p:"m"},
{n:"Baudoin and Lange",s:"baudoin-and-lange",c:"footwear",p:"h"},
{n:"Beams Plus",s:"beams-plus",c:"casualwear",p:"h"},
{n:"Beckett Simonon",s:"beckett-simonon",c:"footwear",p:"m"},
{n:"Begg & Co",s:"begg-and-co",c:"knitwear",p:"m"},
{n:"Bellief",s:"bellief",c:"formalwear",p:"m"},
{n:"Belstaff",s:"belstaff",c:"outerwear",p:"m"},
{n:"Berg & Berg",s:"berg-and-berg",c:"formalwear",p:"m"},
{n:"Berluti",s:"berluti",c:"footwear",p:"m"},
{n:"Berwick 1707",s:"berwick-1707",c:"footwear",p:"m"},
{n:"Bigi",s:"bigi",c:"accessories",p:"l"},
{n:"Billy Reid",s:"billy-reid",c:"casualwear",p:"m"},
{n:"Bleu de Paname",s:"bleu-de-paname",c:"casualwear",p:"m"},
{n:"Blkbrd Shoemaker",s:"blkbrd-shoemaker",c:"footwear",p:"m"},
{n:"Blue Blue Japan",s:"blue-blue-japan",c:"",p:"m"},
{n:"Blundstone",s:"blundstone",c:"footwear",p:"h"},
{n:"Bode",s:"bode",c:"casualwear",p:"m"},
{n:"Bode",s:"bode",c:"formalwear",p:"l"},
{n:"Boglioli",s:"boglioli",c:"formalwear",p:"m"},
{n:"Bonobos",s:"bonobos",c:"casualwear",p:"m"},
{n:"Bontoni",s:"bontoni",c:"footwear",p:"l"},
{n:"Bordon Boots",s:"bordon-boots",c:"footwear",p:"m"},
{n:"Bosie Knitwear",s:"bosie-knitwear",c:"knitwear",p:"m"},
{n:"Bottega Veneta",s:"bottega-veneta",c:"",p:"h"},
{n:"Brass Tokyo",s:"brass-tokyo",c:"casualwear",p:"l"},
{n:"Bridlen",s:"bridlen",c:"footwear",p:"m"},
{n:"Brioni",s:"brioni",c:"formalwear",p:"h"},
{n:"Bronson Mfg. Co.",s:"bronson-mfg-co",c:"denim",p:"m"},
{n:"Brooks Brothers",s:"brooks-brothers",c:"formalwear",p:"h"},
{n:"Brunello Cucinelli",s:"brunello-cucinelli",c:"casualwear",p:"m"},
{n:"Brut",s:"brut",c:"casualwear",p:"m"},
{n:"Bryceland's",s:"brycelands",c:"casualwear",p:"m"},
{n:"Buck Mason",s:"buck-mason",c:"casualwear",p:"m"},
{n:"Buzz Rickson's",s:"buzz-ricksons",c:"outerwear",p:"h"},
{n:"032C",s:"032c",c:"casualwear",p:"l"},
{n:"Cad & The Dandy",s:"cad-and-the-dandy",c:"formalwear",p:"m"},
{n:"Camoshita",s:"camoshita",c:"",p:"m"},
{n:"Canada Goose",s:"canada-goose",c:"outerwear",p:"h"},
{n:"Canali",s:"canali",c:"formalwear",p:"m"},
{n:"Carhartt WIP",s:"carhartt-wip",c:"workwear",p:"h"},
{n:"Carlos Santos",s:"carlos-santos",c:"footwear",p:"h"},
{n:"Carmina",s:"carmina",c:"footwear",p:"h"},
{n:"Caruso",s:"caruso",c:"formalwear",p:"m"},
{n:"Casatlantic",s:"casatlantic",c:"casualwear",p:"m"},
{n:"Casey Casey",s:"casey-casey",c:"casualwear",p:"l"},
{n:"Cavour",s:"cavour",c:"formalwear",p:"l"},
{n:"CDLP",s:"cdlp",c:"basics",p:"h"},
{n:"Cesare Attolini",s:"cesare-attolini",c:"formalwear",p:"h"},
{n:"Chapal",s:"chapal",c:"outerwear",p:"m"},
{n:"Charles Tyrwhitt",s:"charles-tyrwhitt",c:"formalwear",p:"h"},
{n:"Cheaney",s:"cheaney",c:"footwear",p:"m"},
{n:"Christian Dior",s:"christian-dior",c:"formalwear",p:"l"},
{n:"Christian Kimber",s:"christian-kimber",c:"footwear",p:"h"},
{n:"Church's",s:"churchs",c:"footwear",p:"m"},
{n:"Ciele Athletics",s:"ciele-athletics",c:"casualwear",p:"m"},
{n:"Cifonelli",s:"cifonelli",c:"formalwear",p:"m"},
{n:"Clarks",s:"clarks",c:"footwear",p:"h"},
{n:"Closed",s:"closed",c:"casualwear",p:"h"},
{n:"Club Monaco",s:"club-monaco",c:"casualwear",p:"h"},
{n:"Cobbler Union",s:"cobbler-union",c:"footwear",p:"h"},
{n:"Coherence",s:"coherence",c:"outerwear",p:"m"},
{n:"Colhay's",s:"colhays",c:"knitwear",p:"h"},
{n:"Cookman",s:"cookman",c:"casualwear",p:"l"},
{n:"Corneliani",s:"corneliani",c:"formalwear",p:"m"},
{n:"Corridor",s:"corridor",c:"casualwear",p:"m"},
{n:"Corthay",s:"corthay",c:"formalwear",p:"m"},
{n:"COS",s:"cos",c:"casualwear",p:"m"},
{n:"CP Company",s:"cp-company",c:"outerwear",p:"h"},
{n:"CQP",s:"cqp",c:"footwear",p:"m"},
{n:"Crescent Down Works",s:"crescent-down-works",c:"outerwear",p:"l"},
{n:"Crockett & Jones",s:"crockett-and-jones",c:"footwear",p:"h"},
{n:"Crown Northampton",s:"crown-northampton",c:"footwear",p:"h"},
{n:"Dale of Norway",s:"dale-of-norway",c:"knitwear",p:"m"},
{n:"Danner",s:"danner",c:"footwear",p:"h"},
{n:"Danton",s:"danton",c:"casualwear",p:"h"},
{n:"De Bonne Facture",s:"de-bonne-facture",c:"casualwear",p:"l"},
{n:"Dehen 1920",s:"dehen-1920",c:"outerwear",p:"h"},
{n:"Derek Rose",s:"derek-rose",c:"basics",p:"m"},
{n:"Dickies",s:"dickies",c:"basics",p:"m"},
{n:"Document",s:"document",c:"casualwear",p:"m"},
{n:"Doppiaa",s:"doppiaa",c:"casualwear",p:"m"},
{n:"Drakes",s:"drakes",c:"formalwear",p:"m"},
{n:"Drumohr",s:"drumohr",c:"knitwear",p:"m"},
{n:"Dr\u00f4le de Monsieur",s:"drole-de-monsieur",c:"casualwear",p:"m"},
{n:"Duckworth",s:"duckworth",c:"knitwear",p:"h"},
{n:"E. Marinella",s:"e-marinella",c:"formalwear",p:"m"},
{n:"East Harbour Surplus",s:"east-harbour-surplus",c:"casualwear",p:"l"},
{n:"Eastlogue",s:"eastlogue",c:"casualwear",p:"m"},
{n:"eckhauslatta",s:"eckhauslatta",c:"casualwear",p:"l"},
{n:"Ede & Ravenscroft",s:"ede-and-ravenscroft",c:"formalwear",p:"l"},
{n:"Edward Green",s:"edward-green",c:"footwear",p:"h"},
{n:"Edwin",s:"edwin",c:"denim",p:"m"},
{n:"Eleventy",s:"eleventy",c:"formalwear",p:"h"},
{n:"Emma Willis",s:"emma-willis",c:"formalwear",p:"l"},
{n:"Engineered Garments",s:"engineered-garments",c:"workwear",p:"m"},
{n:"Enzo Bonafe",s:"enzo-bonafe",c:"footwear",p:"h"},
{n:"Epaulet",s:"epaulet",c:"casualwear",p:"m"},
{n:"Eton Shirts",s:"eton-shirts",c:"formalwear",p:"h"},
{n:"Evan Kinori",s:"evan-kinori",c:"casualwear",p:"m"},
{n:"Everlane",s:"everlane",c:"basics",p:"m"},
{n:"Faherty Brand",s:"faherty-brand",c:"casualwear",p:"h"},
{n:"Falconeri",s:"falconeri",c:"knitwear",p:"m"},
{n:"Far Afield",s:"far-afield",c:"casualwear",p:"l"},
{n:"Fedeli",s:"fedeli",c:"knitwear",p:"m"},
{n:"Feit",s:"feit",c:"footwear",p:"m"},
{n:"Filson",s:"filson",c:"outerwear",p:"h"},
{n:"Finamore",s:"finamore",c:"formalwear",p:"h"},
{n:"Fisherman Out of Ireland",s:"fisherman-out-of-ireland",c:"knitwear",p:"m"},
{n:"Flint and Tinder",s:"flint-and-tinder",c:"basics",p:"m"},
{n:"Folk",s:"folk",c:"casualwear",p:"m"},
{n:"For\u00e9t",s:"foret",c:"casualwear",p:"m"},
{n:"Foster And Son",s:"foster-and-son",c:"footwear",p:"l"},
{n:"Frank And Oak",s:"frank-and-oak",c:"casualwear",p:"h"},
{n:"Frank Leder",s:"frank-leder",c:"casualwear",p:"m"},
{n:"Freenote Cloth",s:"freenote-cloth",c:"casualwear",p:"m"},
{n:"Frescobol Carioca",s:"frescobol-carioca",c:"casualwear",p:"m"},
{n:"FrizmWORKS",s:"frizmworks",c:"casualwear",p:"m"},
{n:"Fujito",s:"fujito",c:"casualwear",p:"m"},
{n:"Fullcount",s:"fullcount",c:"denim",p:"m"},
{n:"Gaziano & Girling",s:"gaziano-and-girling",c:"formalwear",p:"m"},
{n:"georgecleverley",s:"george-cleverley",c:"footwear",p:"l"},
{n:"Ghiaia Cashmere",s:"ghiaia-cashmere",c:"knitwear",p:"m"},
{n:"Gitman Vintage",s:"gitman-vintage",c:"",p:"m"},
{n:"Giuliva Heritage",s:"giuliva-heritage",c:"formalwear",p:"m"},
{n:"Glanshirt",s:"glanshirt",c:"casualwear",p:"m"},
{n:"Goldwin",s:"goldwin",c:"outerwear",p:"m"},
{n:"Good Man Brand",s:"good-man-brand",c:"casualwear",p:"m"},
{n:"GORAL",s:"goral",c:"footwear",p:"m"},
{n:"Gran Sasso",s:"gran-sasso",c:"casualwear",p:"h"},
{n:"Grant Stone",s:"grant-stone",c:"footwear",p:"h"},
{n:"Graph Zero",s:"graph-zero",c:"denim",p:"m"},
{n:"Grenson",s:"grenson",c:"footwear",p:"m"},
{n:"Gustin",s:"gustin",c:"denim",p:"m"},
{n:"Hamilton Shirts",s:"hamilton-shirts",c:"formalwear",p:"m"},
{n:"100 Hands",s:"100-hands",c:"formalwear",p:"l"},
{n:"Hansen Garments",s:"hansen-garments",c:"casualwear",p:"m"},
{n:"Harris Tweed Hebrides",s:"harris-tweed-hebrides",c:"",p:"l"},
{n:"Harris Wharf London",s:"harris-wharf-london",c:"outerwear",p:"m"},
{n:"HAVEN",s:"haven",c:"casualwear",p:"m"},
{n:"Hawes & Curtis",s:"hawes-and-curtis",c:"formalwear",p:"m"},
{n:"Heimat Textil",s:"heimat-textil",c:"basics",p:"m"},
{n:"Herill",s:"herill",c:"casualwear",p:"m"},
{n:"Herno",s:"herno",c:"outerwear",p:"m"},
{n:"Herring Shoes",s:"herring-shoes",c:"footwear",p:"m"},
{n:"Heschung",s:"heschung",c:"footwear",p:"m"},
{n:"Hestra",s:"hestra",c:"accessories",p:"m"},
{n:"Hilditch & Key",s:"hilditch-and-key",c:"formalwear",p:"m"},
{n:"Hiro Yanagimachi",s:"hiro-yanagimachi",c:"formalwear",p:"l"},
{n:"Holzweiler",s:"holzweiler",c:"casualwear",p:"m"},
{n:"House of Blanks",s:"house-of-blanks",c:"basics",p:"m"},
{n:"Husbands",s:"husbands",c:"formalwear",p:"m"},
{n:"Imogene + Willie",s:"imogene-willie",c:"workwear",p:"h"},
{n:"Incotex",s:"incotex",c:"formalwear",p:"h"},
{n:"Informale",s:"informale",c:"formalwear",p:"l"},
{n:"Inis Me\u00e1in",s:"inis-meain",c:"knitwear",p:"h"},
{n:"Inverallan",s:"inverallan",c:"knitwear",p:"m"},
{n:"IrelandsEye",s:"irelandseye",c:"knitwear",p:"m"},
{n:"Iron Heart",s:"iron-heart",c:"denim",p:"h"},
{n:"Isaia",s:"isaia",c:"formalwear",p:"m"},
{n:"J. FitzPatrick",s:"j-fitzpatrick",c:"footwear",p:"m"},
{n:"J.Crew",s:"j-crew",c:"casualwear",p:"m"},
{n:"J.M. Weston",s:"j-m-weston",c:"footwear",p:"h"},
{n:"Jacob Coh\u00ebn",s:"jacob-cohen",c:"denim",p:"m"},
{n:"Jacquemus",s:"jacquemus",c:"casualwear",p:"l"},
{n:"James Coward",s:"james-coward",c:"casualwear",p:"m"},
{n:"Japan Blue Jeans",s:"japan-blue-jeans",c:"denim",p:"m"},
{n:"Jil Sander",s:"jil-sander",c:"formalwear",p:"l"},
{n:"Jim Green",s:"jim-green",c:"footwear",p:"m"},
{n:"JL-AL",s:"jl-al",c:"casualwear",p:"l"},
{n:"John Lobb",s:"john-lobb",c:"formalwear",p:"m"},
{n:"John Lofgren",s:"john-lofgren",c:"footwear",p:"h"},
{n:"John Smedley",s:"john-smedley",c:"knitwear",p:"h"},
{n:"Johnstons of Elgin",s:"johnstons-of-elgin",c:"knitwear",p:"h"},
{n:"Joseph Cheaney",s:"joseph-cheaney",c:"footwear",p:"h"},
{n:"Justo Gimeno",s:"justo-gimeno",c:"footwear",p:"m"},
{n:"Kamakura",s:"kamakura",c:"casualwear",p:"m"},
{n:"Kanata",s:"kanata",c:"knitwear",p:"h"},
{n:"Kapital",s:"kapital",c:"casualwear",p:"m"},
{n:"Kaptain Sunshine",s:"kaptain-sunshine",c:"casualwear",p:"m"},
{n:"Kardo",s:"kardo",c:"casualwear",p:"m"},
{n:"Kartik Research",s:"kartik-research",c:"casualwear",p:"m"},
{n:"Kent Wang",s:"kent-wang",c:"formalwear",p:"m"},
{n:"KESTIN",s:"kestin",c:"casualwear",p:"h"},
{n:"Kiko Kostadinov",s:"kiko-kostadinov",c:"casualwear",p:"l"},
{n:"Kith",s:"kith",c:"casualwear",p:"h"},
{n:"Kiton",s:"kiton",c:"formalwear",p:"h"},
{n:"Knickerbocker",s:"knickerbocker",c:"basics",p:"h"},
{n:"Kotn",s:"kotn",c:"basics",p:"h"},
{n:"L'Estrange London",s:"lestrange-london",c:"basics",p:"m"},
{n:"L.B.M. 1911",s:"l-b-m-1911",c:"formalwear",p:"h"},
{n:"La Botte Gardiane",s:"la-botte-gardiane",c:"footwear",p:"m"},
{n:"La Paz",s:"la-paz",c:"casualwear",p:"m"},
{n:"Labour Union",s:"labour-union",c:"casualwear",p:"l"},
{n:"Lady White Co.",s:"lady-white-co",c:"casualwear",p:"h"},
{n:"Lardini",s:"lardini",c:"formalwear",p:"m"},
{n:"Lavenham",s:"lavenham",c:"outerwear",p:"m"},
{n:"Le Laboureur",s:"le-laboureur",c:"workwear",p:"h"},
{n:"Lee",s:"lee",c:"workwear",p:"l"},
{n:"Left Field NYC",s:"left-field-nyc",c:"denim",p:"m"},
{n:"Lemaire",s:"lemaire",c:"casualwear",p:"m"},
{n:"Levi's Vintage Clothing",s:"levis-vintage-clothing",c:"denim",p:"h"},
{n:"LL Bean",s:"ll-bean",c:"outerwear",p:"h"},
{n:"Loake",s:"loake",c:"footwear",p:"h"},
{n:"73London",s:"73london",c:"formalwear",p:"l"},
{n:"Loro Piana",s:"loro-piana",c:"casualwear",p:"l"},
{n:"Ludwig Reiter",s:"ludwig-reiter",c:"footwear",p:"m"},
{n:"Luigi Bianchi Mantova",s:"luigi-bianchi-mantova",c:"formalwear",p:"m"},
{n:"Luigi Borrelli",s:"luigi-borrelli",c:"formalwear",p:"m"},
{n:"Mackintosh",s:"mackintosh",c:"outerwear",p:"m"},
{n:"Madewell",s:"madewell",c:"casualwear",p:"m"},
{n:"Magee 1866",s:"magee-1866",c:"formalwear",p:"h"},
{n:"MAN 1924",s:"man-1924",c:"accessories",p:"l"},
{n:"Mango Man",s:"mango-man",c:"casualwear",p:"l"},
{n:"Manifattura Ceccarelli",s:"manifattura-ceccarelli",c:"outerwear",p:"m"},
{n:"Margaret Howell",s:"margaret-howell",c:"casualwear",p:"m"},
{n:"Marka",s:"marka",c:"casualwear",p:"m"},
{n:"Mason's",s:"masons",c:"casualwear",p:"m"},
{n:"Massimo Alba",s:"massimo-alba",c:"casualwear",p:"h"},
{n:"Maurizio Baldassari",s:"maurizio-baldassari",c:"casualwear",p:"m"},
{n:"Meccariello",s:"meccariello",c:"footwear",p:"l"},
{n:"Meermin",s:"meermin",c:"footwear",p:"h"},
{n:"Merz b. Schwanen",s:"merz-b-schwanen",c:"basics",p:"h"},
{n:"Mister Freedom",s:"mister-freedom",c:"",p:"h"},
{n:"Momotaro",s:"momotaro",c:"denim",p:"h"},
{n:"Monitaly",s:"monitaly",c:"casualwear",p:"m"},
{n:"MooRER",s:"moorer",c:"outerwear",p:"m"},
{n:"Moreschi",s:"moreschi",c:"footwear",p:"l"},
{n:"Mott & Bow",s:"mott-and-bow",c:"basics",p:"m"},
{n:"Muji",s:"muji",c:"basics",p:"m"},
{n:"Muttonhead",s:"muttonhead",c:"casualwear",p:"m"},
{n:"Myrqvist",s:"myrqvist",c:"footwear",p:"m"},
{n:"N. Hoolywood",s:"n-hoolywood",c:"casualwear",p:"m"},
{n:"N.Peal",s:"n-peal",c:"knitwear",p:"m"},
{n:"Naked & Famous",s:"naked-and-famous",c:"denim",p:"h"},
{n:"Nanamica",s:"nanamica",c:"outerwear",p:"m"},
{n:"Natalino",s:"natalino",c:"formalwear",p:"l"},
{n:"New Balance",s:"new-balance",c:"footwear",p:"h"},
{n:"Nicks Boots",s:"nicks-boots",c:"footwear",p:"h"},
{n:"Nigel Cabourn",s:"nigel-cabourn",c:"outerwear",p:"m"},
{n:"Nitto Knitwear",s:"nitto-knitwear",c:"knitwear",p:"l"},
{n:"NN07",s:"nn07",c:"casualwear",p:"h"},
{n:"Noah NYC",s:"noah-nyc",c:"casualwear",p:"h"},
{n:"NoManWalksAlone",s:"nomanwalksalone",c:"formalwear",p:"m"},
{n:"Nonnative",s:"nonnative",c:"casualwear",p:"m"},
{n:"Norda",s:"norda",c:"footwear",p:"h"},
{n:"Norhla",s:"norhla",c:"outerwear",p:"l"},
{n:"Norse Projects",s:"norse-projects",c:"casualwear",p:"h"},
{n:"Norwegian Rain",s:"norwegian-rain",c:"outerwear",p:"h"},
{n:"Nudie Jeans",s:"nudie-jeans",c:"casualwear",p:"m"},
{n:"Oak Street Bootmakers",s:"oak-street-bootmakers",c:"footwear",p:"h"},
{n:"OAS Company",s:"oas-company",c:"casualwear",p:"h"},
{n:"Octobre \u00c9ditions",s:"octobre-editions",c:"casualwear",p:"m"},
{n:"Officine G\u00e9n\u00e9rale",s:"officine-generale",c:"formalwear",p:"m"},
{n:"Oliver Spencer",s:"oliver-spencer",c:"formalwear",p:"m"},
{n:"Oni Denim",s:"oni-denim",c:"denim",p:"m"},
{n:"Orazio Luciano",s:"orazio-luciano",c:"formalwear",p:"h"},
{n:"Orlebar Brown",s:"orlebar-brown",c:"casualwear",p:"m"},
{n:"Orslow",s:"orslow",c:"casualwear",p:"h"},
{n:"Our Legacy",s:"our-legacy",c:"casualwear",p:"m"},
{n:"Outclass",s:"outclass",c:"basics",p:"m"},
{n:"Outerknown",s:"outerknown",c:"casualwear",p:"m"},
{n:"Outlier",s:"outlier",c:"casualwear",p:"h"},
{n:"Outstanding & Co.",s:"outstanding-and-co",c:"casualwear",p:"m"},
{n:"Paraboot",s:"paraboot",c:"footwear",p:"h"},
{n:"3.Paradis",s:"3-paradis",c:"casualwear",p:"m"},
{n:"Parel Studio",s:"parel-studio",c:"casualwear",p:"l"},
{n:"Parkhurst",s:"parkhurst",c:"footwear",p:"m"},
{n:"Patagonia",s:"patagonia",c:"outerwear",p:"h"},
{n:"Paul & Shark",s:"paul-and-shark",c:"casualwear",p:"m"},
{n:"Paul Smith",s:"paul-smith",c:"casualwear",p:"h"},
{n:"Pendleton",s:"pendleton",c:"outerwear",p:"m"},
{n:"Percival",s:"percival",c:"",p:"m"},
{n:"Peter Millar",s:"peter-millar",c:"casualwear",p:"l"},
{n:"Petru & Claymoor",s:"petru-and-claymoor",c:"formalwear",p:"m"},
{n:"Pike Brothers",s:"pike-brothers",c:"denim",p:"m"},
{n:"Pini Parma",s:"pini-parma",c:"formalwear",p:"m"},
{n:"Portuguese Flannel",s:"portuguese-flannel",c:"casualwear",p:"h"},
{n:"Poszetka",s:"poszetka",c:"accessories",p:"l"},
{n:"Prada",s:"prada",c:"casualwear",p:"h"},
{n:"Pringlescotland",s:"pringle-of-scotland",c:"knitwear",p:"m"},
{n:"Private White V.C.",s:"private-white-v-c",c:"outerwear",p:"h"},
{n:"Proper Cloth",s:"proper-cloth",c:"formalwear",p:"h"},
{n:"Province of Canada",s:"province-of-canada",c:"basics",p:"m"},
{n:"PT01 / PT Torino",s:"pt01-pt-torino",c:"formalwear",p:"h"},
{n:"Pure Blue Japan",s:"pure-blue-japan",c:"denim",p:"h"},
{n:"Pyrenex",s:"pyrenex",c:"outerwear",p:"m"},
{n:"Rancourt & Co",s:"rancourt-and-co",c:"footwear",p:"m"},
{n:"Re-HasH",s:"re-hash",c:"casualwear",p:"m"},
{n:"Red Wing",s:"red-wing",c:"footwear",p:"h"},
{n:"Red Wing Heritage",s:"red-wing-heritage",c:"footwear",p:"h"},
{n:"Reigning Champ",s:"reigning-champ",c:"casualwear",p:"h"},
{n:"Relwen",s:"relwen",c:"casualwear",p:"m"},
{n:"Resolute",s:"resolute",c:"denim",p:"m"},
{n:"Rick Owens",s:"rick-owens",c:"formalwear",p:"l"},
{n:"Ring Jacket",s:"ring-jacket",c:"formalwear",p:"m"},
{n:"Roberto Collima",s:"roberto-collina",c:"knitwear",p:"l"},
{n:"Rocky Mountain Featherbed",s:"rocky-mountain-featherbed",c:"outerwear",p:"h"},
{n:"Rodd & Gunn",s:"rodd-and-gunn",c:"casualwear",p:"h"},
{n:"Rogue Territory",s:"rogue-territory",c:"workwear",p:"m"},
{n:"Rolling Dub Trio",s:"rolling-dub-trio",c:"footwear",p:"h"},
{n:"Roots",s:"roots",c:"casualwear",p:"m"},
{n:"Rota",s:"rota",c:"formalwear",p:"h"},
{n:"RRD",s:"rrd",c:"outerwear",p:"l"},
{n:"RRL (Ralph Lauren)",s:"rrl-ralph-lauren",c:"workwear",p:"h"},
{n:"Rubinacci",s:"rubinacci",c:"formalwear",p:"m"},
{n:"Russell Moccasin",s:"russell-moccasin",c:"footwear",p:"h"},
{n:"Sagara / Ambiorix",s:"sagara-ambiorix",c:"footwear",p:"l"},
{n:"Sage de Cret",s:"sage-de-cret",c:"casualwear",p:"m"},
{n:"Sage Nation",s:"sage-nation",c:"casualwear",p:"l"},
{n:"Saint Crispin's",s:"saint-crispins",c:"footwear",p:"m"},
{n:"Salvatore Piccolo",s:"salvatore-piccolo",c:"formalwear",p:"m"},
{n:"Saman Amel",s:"saman-amel",c:"formalwear",p:"h"},
{n:"Samuelsohn",s:"samuelsohn",c:"formalwear",p:"h"},
{n:"Samurai Jeans",s:"samurai-jeans",c:"denim",p:"m"},
{n:"Sanders & Sanders",s:"sanders-and-sanders",c:"footwear",p:"m"},
{n:"Sandqvist",s:"sandqvist",c:"accessories",p:"m"},
{n:"Sandro",s:"sandro",c:"formalwear",p:"m"},
{n:"Santoni",s:"santoni",c:"footwear",p:"m"},
{n:"Sartoria Partenopea",s:"sartoria-partenopea",c:"formalwear",p:"m"},
{n:"Sartorio Napoli",s:"sartorio-napoli",c:"formalwear",p:"h"},
{n:"Sassafras",s:"sassafras",c:"casualwear",p:"m"},
{n:"Satisfy Running",s:"satisfy-running",c:"",p:"m"},
{n:"Saturdays NYC",s:"saturdays-nyc",c:"casualwear",p:"m"},
{n:"Save Khaki United",s:"save-khaki-united",c:"casualwear",p:"h"},
{n:"Scarosso",s:"scarosso",c:"footwear",p:"m"},
{n:"Schott NYC",s:"schott-nyc",c:"outerwear",p:"h"},
{n:"Scott Fraser",s:"scott-fraser",c:"knitwear",p:"l"},
{n:"Sease",s:"sease",c:"casualwear",p:"l"},
{n:"Septi\u00e8me Largeur",s:"septieme-largeur",c:"footwear",p:"l"},
{n:"Settefili Cashmere",s:"settefili-cashmere",c:"casualwear",p:"m"},
{n:"Shibumi Firenze",s:"shibumi-firenze",c:"accessories",p:"l"},
{n:"Shockoe Atelier",s:"shockoe-atelier",c:"denim",p:"m"},
{n:"Sid Mashburn",s:"sid-mashburn",c:"formalwear",p:"h"},
{n:"Silvano Lattanzi",s:"silvano-lattanzi",c:"formalwear",p:"l"},
{n:"3sixteen",s:"3sixteen",c:"casualwear",p:"h"},
{n:"SMR Days",s:"smr-days",c:"casualwear",p:"l"},
{n:"Snow Peak",s:"snow-peak",c:"outerwear",p:"m"},
{n:"Solovair",s:"solovair",c:"footwear",p:"h"},
{n:"Son of a Tailor",s:"son-of-a-tailor",c:"basics",p:"h"},
{n:"Soulland",s:"soulland",c:"casualwear",p:"m"},
{n:"Spencer Badu",s:"spencer-badu",c:"casualwear",p:"m"},
{n:"Spier & Mackay",s:"spier-and-mackay",c:"formalwear",p:"h"},
{n:"Stan Ray",s:"stan-ray",c:"casualwear",p:"h"},
{n:"Standard Types",s:"standard-types",c:"casualwear",p:"m"},
{n:"Stefano Bemer",s:"stefano-bemer",c:"formalwear",p:"m"},
{n:"Sterlingwear",s:"sterlingwear",c:"outerwear",p:"h"},
{n:"Stevenson Overall Co.",s:"stevenson-overall-co",c:"workwear",p:"m"},
{n:"Still by Hand",s:"still-by-hand",c:"casualwear",p:"h"},
{n:"Stoffa",s:"stoffa",c:"formalwear",p:"m"},
{n:"Stone Island",s:"stone-island",c:"outerwear",p:"h"},
{n:"Story Mfg.",s:"story-mfg",c:"casualwear",p:"m"},
{n:"Strike Gold",s:"strike-gold",c:"denim",p:"m"},
{n:"Studio D'Artisan",s:"studio-dartisan",c:"denim",p:"h"},
{n:"Studio Donegal",s:"studio-donegal",c:"knitwear",p:"h"},
{n:"Studio Nicholson",s:"studio-nicholson",c:"casualwear",p:"m"},
{n:"Stutterheim",s:"stutterheim",c:"outerwear",p:"m"},
{n:"Sugar Cane",s:"sugar-cane",c:"workwear",p:"h"},
{n:"Suitsupply",s:"suitsupply",c:"formalwear",p:"h"},
{n:"Sun Surf",s:"sun-surf",c:"casualwear",p:"m"},
{n:"Sunflower",s:"sunflower",c:"casualwear",p:"m"},
{n:"Sunspel",s:"sunspel",c:"basics",p:"h"},
{n:"S\u00e9fr",s:"sefr",c:"casualwear",p:"h"},
{n:"Tanuki",s:"tanuki",c:"denim",p:"m"},
{n:"Taylor Stitch",s:"taylor-stitch",c:"casualwear",p:"h"},
{n:"TCB Jeans",s:"tcb-jeans",c:"denim",p:"h"},
{n:"Tecovas",s:"tecovas",c:"footwear",p:"h"},
{n:"Tellason",s:"tellason",c:"denim",p:"h"},
{n:"Ten C",s:"ten-c",c:"outerwear",p:"m"},
{n:"Ten Thousand",s:"ten-thousand",c:"",p:"m"},
{n:"The Anthology",s:"the-anthology",c:"formalwear",p:"l"},
{n:"The Armoury",s:"the-armoury",c:"formalwear",p:"h"},
{n:"The Elder Statesman",s:"the-elder-statesman",c:"knitwear",p:"m"},
{n:"The Flat Head",s:"the-flat-head",c:"workwear",p:"m"},
{n:"The Gigi",s:"the-gigi",c:"accessories",p:"l"},
{n:"The Iron Snail",s:"the-iron-snail",c:"casualwear",p:"h"},
{n:"The Post Romantic",s:"the-post-romantic",c:"casualwear",p:"m"},
{n:"The Real McCoy's",s:"the-real-mccoys",c:"",p:"h"},
{n:"The Unbranded Brand",s:"the-unbranded-brand",c:"denim",p:"l"},
{n:"Thom Browne",s:"thom-browne",c:"formalwear",p:"m"},
{n:"Thursday Boot Co.",s:"thursday-boot-co",c:"footwear",p:"h"},
{n:"Tlb Mallorca",s:"tlb-mallorca",c:"footwear",p:"l"},
{n:"To Boot New York",s:"to-boot-new-york",c:"footwear",p:"m"},
{n:"Toad&Co",s:"toad-and-co",c:"casualwear",p:"m"},
{n:"Todd Snyder",s:"todd-snyder",c:"casualwear",p:"h"},
{n:"TravisMathew",s:"travismathew",c:"casualwear",p:"m"},
{n:"Tricker's",s:"trickers",c:"footwear",p:"h"},
{n:"Truman Boot Co.",s:"truman-boot-co",c:"footwear",p:"h"},
{n:"ts(s)",s:"ts-s",c:"casualwear",p:"m"},
{n:"Turnbull & Asser",s:"turnbull-and-asser",c:"formalwear",p:"m"},
{n:"Undercoverism",s:"undercoverism",c:"casualwear",p:"l"},
{n:"Uniform Bridge",s:"uniform-bridge",c:"casualwear",p:"m"},
{n:"Uniqlo",s:"uniqlo",c:"basics",p:"h"},
{n:"Universal Works",s:"universal-works",c:"casualwear",p:"m"},
{n:"Valstar",s:"valstar",c:"casualwear",p:"h"},
{n:"Vass",s:"vass",c:"footwear",p:"h"},
{n:"Vass Shoes",s:"vass-shoes",c:"formalwear",p:"m"},
{n:"Velasca",s:"velasca",c:"footwear",p:"h"},
{n:"Vetra",s:"vetra",c:"workwear",p:"h"},
{n:"Viberg",s:"viberg",c:"footwear",p:"h"},
{n:"Visvim",s:"visvim",c:"casualwear",p:"m"},
{n:"Vuori",s:"vuori",c:"",p:"h"},
{n:"Wales Bonner",s:"wales-bonner",c:"formalwear",p:"l"},
{n:"Walker Slater",s:"walker-slater",c:"outerwear",p:"h"},
{n:"WANT Les Essentiels",s:"want-les-essentiels",c:"accessories",p:"h"},
{n:"Warehouse & Co.",s:"warehouse-and-co",c:"denim",p:"h"},
{n:"Wax London",s:"wax-london",c:"casualwear",p:"m"},
{n:"WeatherWool",s:"weatherwool",c:"outerwear",p:"h"},
{n:"Western Rise",s:"western-rise",c:"casualwear",p:"m"},
{n:"White's Boots",s:"whites-boots",c:"footwear",p:"h"},
{n:"Whitesville",s:"whitesville",c:"basics",p:"h"},
{n:"William Lockie",s:"william-lockie",c:"knitwear",p:"m"},
{n:"Wings+Horns",s:"wings-horns",c:"basics",p:"m"},
{n:"Wolf vs Goat",s:"wolf-vs-goat",c:"basics",p:"h"},
{n:"Wonder Looper",s:"wonder-looper",c:"basics",p:"h"},
{n:"Woolrich",s:"woolrich",c:"outerwear",p:"m"},
{n:"Wrangler",s:"wrangler",c:"workwear",p:"l"},
{n:"WTAPS",s:"wtaps",c:"casualwear",p:"m"},
{n:"Wythe",s:"wythe",c:"casualwear",p:"h"},
{n:"YMC",s:"ymc",c:"casualwear",p:"m"},
{n:"Yuketen",s:"yuketen",c:"footwear",p:"m"},
{n:"Yves Saint Laurent",s:"yves-saint-laurent",c:"casualwear",p:"h"},
{n:"Zanone",s:"zanone",c:"casualwear",p:"h"},
{n:"Zegna",s:"zegna",c:"formalwear",p:"m"}
];
var mCat='all',mQ='',booted=false;
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function hl(n,q){if(!q)return esc(n);var i=n.toLowerCase().indexOf(q);if(i<0)return esc(n);return esc(n.slice(0,i))+'<mark style="background:rgba(196,86,42,.25);color:rgba(245,241,235,.92);border-radius:2px;padding:0 1px">'+esc(n.slice(i,i+q.length))+'</mark>'+esc(n.slice(i+q.length))}

function render(){
  var all=AB.slice();
  if(mCat&&mCat!=='all')all=all.filter(function(b){return b.c===mCat});
  if(mQ)all=all.filter(function(b){return b.n.toLowerCase().indexOf(mQ)!==-1});
  all.sort(function(a,b){return a.n.replace(/^[^a-zA-Z0-9]+/,'').localeCompare(b.n.replace(/^[^a-zA-Z0-9]+/,''),'en',{sensitivity:'base'})});
  var picks=all.filter(function(b){return b.p==='h'});
  var rest=all.filter(function(b){return b.p!=='h'});
  var total=all.length;
  var cEl=document.getElementById('trg-mob-bcount');
  if(cEl)cEl.innerHTML='<strong style="color:rgba(196,86,42,.8);font-weight:500">'+total+'</strong> brand'+(total!==1?'s':'');
  var pEl=document.getElementById('trg-mob-bpicks');
  var rEl=document.getElementById('trg-mob-brest');
  if(!total){if(pEl)pEl.innerHTML='';if(rEl)rEl.innerHTML='<div style="padding:2rem 1.25rem;text-align:center;font-size:.8rem;color:rgba(245,241,235,.3);font-style:italic">No brands found.</div>';return}
  if(pEl){
    if(picks.length){
      var ph='<div style="font-size:.52rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#c4562a;padding:.75rem 1.25rem .35rem;display:flex;align-items:center;gap:.5rem">Our picks<span style="flex:1;height:1px;background:rgba(196,86,42,.2)"></span></div><div style="padding:0 1.25rem">';
      picks.forEach(function(b){ph+='<a href="/pages/brands/'+b.s+'" style="display:flex;align-items:center;justify-content:space-between;min-height:42px;padding:.3rem 0;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.04)"><span style="font-size:.78rem;color:rgba(245,241,235,.92)">'+hl(b.n,mQ)+'</span><span style="width:5px;height:5px;border-radius:50%;background:#c4562a;opacity:.6;flex-shrink:0"></span></a>'});
      ph+='</div>';pEl.innerHTML=ph;
    }else pEl.innerHTML='';
  }
  if(rEl){
    if(rest.length){
      var rh='<div style="font-size:.52rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,241,235,.3);padding:.6rem 1.25rem .35rem;display:flex;align-items:center;gap:.5rem">All brands<span style="flex:1;height:1px;background:rgba(245,241,235,.08)"></span></div><div style="padding:0 1.25rem 2rem">';
      var gr={};rest.forEach(function(b){var l=b.n.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});
      Object.keys(gr).sort().forEach(function(l){rh+='<div style="font-size:.52rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#c4562a;padding:.7rem 0 .25rem;border-bottom:1px solid rgba(196,86,42,.2);margin-top:.4rem">'+l+'</div>';gr[l].forEach(function(b){rh+='<a href="/pages/brands/'+b.s+'" style="display:flex;align-items:center;min-height:40px;padding:.25rem 0;font-size:.76rem;color:rgba(245,241,235,.55);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.03)">'+hl(b.n,mQ)+'</a>'})});
      rh+='</div>';rEl.innerHTML=rh;
    }else rEl.innerHTML='';
  }
}

var rt=null;
function dr(){clearTimeout(rt);rt=setTimeout(render,50)}

function boot(){
  if(booted)return;booted=true;
  var tc=document.getElementById('trg-mob-tc-brands');
  if(!tc)return;

  /* ── NUKE: Hide ALL old search/chips/count elements ── */
  var oldSearch=document.getElementById('trg-mob-bsearch');
  if(oldSearch)oldSearch.style.display='none';
  var oldChips=document.getElementById('trg-mob-bchips');
  if(oldChips)oldChips.style.display='none';
  var oldCount=document.getElementById('trg-mob-bcount');
  if(oldCount)oldCount.style.display='none';

  /* ── BUILD: Create entirely new search + chips + count from scratch ── */
  var wrapper=document.createElement('div');
  wrapper.id='trg-v3-controls';
  wrapper.innerHTML=
    '<div style="padding:.85rem 1.25rem;background:#1a1917;border-bottom:1px solid rgba(245,241,235,.08);position:sticky;top:0;z-index:30">'
    +'<div style="display:flex;align-items:center;gap:.6rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:0 .75rem">'
    +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,241,235,.3)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>'
    +'<input id="trg-v3-search" type="text" placeholder="Search 468 brands\u2026" autocomplete="off" autocorrect="off" spellcheck="false" style="flex:1;background:transparent;border:none;outline:none;font-family:DM Sans,sans-serif;font-size:.82rem;color:rgba(245,241,235,.92);padding:.7rem 0;-webkit-appearance:none;appearance:none">'
    +'<button id="trg-v3-clear" type="button" style="background:none;border:none;cursor:pointer;font-size:.7rem;color:rgba(245,241,235,.3);padding:.25rem;display:none">\u2715</button>'
    +'</div>'
    +'</div>'
    +'<div id="trg-v3-chips" style="display:flex;gap:.35rem;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.6rem 1.25rem .4rem"></div>'
    +'<div id="trg-v3-count" style="font-size:.62rem;color:rgba(245,241,235,.3);letter-spacing:.03em;padding:.5rem 1.25rem .6rem;border-bottom:1px solid rgba(245,241,235,.08)"></div>';

  /* Insert at the top of the brands tab content */
  tc.insertBefore(wrapper,tc.firstChild);

  /* Build chip buttons */
  var chipData=[{l:'All',v:'all'},{l:'Casualwear',v:'casualwear'},{l:'Footwear',v:'footwear'},{l:'Formalwear',v:'formalwear'},{l:'Outerwear',v:'outerwear'},{l:'Denim',v:'denim'},{l:'Knitwear',v:'knitwear'},{l:'Basics',v:'basics'},{l:'Workwear',v:'workwear'}];
  var chipBox=document.getElementById('trg-v3-chips');
  chipData.forEach(function(cd){
    var btn=document.createElement('button');
    btn.type='button';
    btn.textContent=cd.l;
    btn.dataset.cat=cd.v;
    btn.style.cssText='font-family:DM Sans,sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:.3rem .7rem;border:1px solid rgba(255,255,255,.1);border-radius:20px;color:rgba(245,241,235,.55);background:none;cursor:pointer;white-space:nowrap;flex-shrink:0;-webkit-tap-highlight-color:transparent';
    if(cd.v==='all'){btn.style.background='rgba(196,86,42,.15)';btn.style.borderColor='rgba(196,86,42,.45)';btn.style.color='rgba(245,241,235,.92)';btn.dataset.active='1'}
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      chipBox.querySelectorAll('button').forEach(function(b){b.style.background='none';b.style.borderColor='rgba(255,255,255,.1)';b.style.color='rgba(245,241,235,.55)';b.dataset.active=''});
      btn.style.background='rgba(196,86,42,.15)';btn.style.borderColor='rgba(196,86,42,.45)';btn.style.color='rgba(245,241,235,.92)';btn.dataset.active='1';
      mCat=cd.v;dr();
      var body=document.getElementById('trg-mob-body');if(body)body.scrollTop=0;
    });
    chipBox.appendChild(btn);
  });

  /* Bind search */
  var si=document.getElementById('trg-v3-search');
  var sx=document.getElementById('trg-v3-clear');
  si.addEventListener('input',function(){
    mQ=si.value.trim().toLowerCase();
    sx.style.display=mQ?'block':'none';
    dr();
  });
  sx.addEventListener('click',function(e){
    e.preventDefault();
    si.value='';si.focus();
    sx.style.display='none';
    mQ='';dr();
  });
  /* Force focus: tap anywhere on the search bar area focuses the input */
  var searchWrap=si.closest('div').parentNode;
  searchWrap.addEventListener('touchend',function(e){
    e.preventDefault();e.stopPropagation();
    si.focus();
    /* Ensure keyboard opens on iOS */
    si.click();
  });
  searchWrap.addEventListener('click',function(e){
    e.stopPropagation();
    si.focus();
  });
  /* Prevent anything from stealing focus back */
  si.addEventListener('touchstart',function(e){e.stopPropagation()},{capture:true});
  si.addEventListener('touchend',function(e){e.stopPropagation()},{capture:true});
  si.addEventListener('mousedown',function(e){e.stopPropagation()},{capture:true});
  si.addEventListener('click',function(e){e.stopPropagation();si.focus()},{capture:true});
  si.addEventListener('focus',function(){
    searchWrap.querySelector('div').style.borderColor='rgba(196,86,42,.5)';
    searchWrap.querySelector('svg').setAttribute('stroke','rgba(196,86,42,.7)');
  });
  si.addEventListener('blur',function(){
    searchWrap.querySelector('div').style.borderColor='rgba(255,255,255,.1)';
    searchWrap.querySelector('svg').setAttribute('stroke','rgba(245,241,235,.3)');
  });

  /* Accordion */
  document.addEventListener('click',function(e){
    var hdr=e.target.closest('.trg-mob-fam-hdr');
    if(!hdr)return;
    e.preventDefault();e.stopPropagation();
    var fam=hdr.closest('.trg-mob-fam');if(!fam)return;
    var body=fam.querySelector('.trg-mob-fam-body');if(!body)return;
    var isOpen=fam.classList.contains('on');
    document.querySelectorAll('.trg-mob-fam.on').forEach(function(f){
      if(f!==fam){f.classList.remove('on');var b=f.querySelector('.trg-mob-fam-body');if(b)b.style.maxHeight='0'}
    });
    if(isOpen){fam.classList.remove('on');body.style.maxHeight='0'}
    else{fam.classList.add('on');body.style.maxHeight=body.scrollHeight+'px';
      setTimeout(function(){hdr.scrollIntoView({behavior:'smooth',block:'start'})},200);
    }
  },true);

  /* Write count to our NEW element */
  var origCount=document.getElementById('trg-mob-bcount');
  /* Redirect count writes to our new element */
  var newCount=document.getElementById('trg-v3-count');
  Object.defineProperty(window,'_trgCount',{get:function(){return newCount}});
  /* Override getElementById for bcount to return our element */
  var origById=document.getElementById.bind(document);
  document.getElementById=function(id){
    if(id==='trg-mob-bcount')return newCount;
    return origById(id);
  };

  render();

  /* Re-render on tab/drawer visibility */
  new MutationObserver(function(){if(tc.classList.contains('on'))dr()}).observe(tc,{attributes:true,attributeFilter:['class']});
  var mob=document.getElementById('trg-mob');
  if(mob)new MutationObserver(function(){if(mob.classList.contains('on'))setTimeout(render,150)}).observe(mob,{attributes:true,attributeFilter:['class']});
}

/* CSS */
var s=document.createElement('style');
s.textContent='.trg-mob-chips{display:none!important}.trg-mob-fam-inner>.trg-mob-lbl:first-child{display:none!important}#trg-v3-chips::-webkit-scrollbar{display:none}#trg-v3-search::placeholder{color:rgba(245,241,235,.3);font-style:italic}.trg-mob-ctas{padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.5rem}.trg-mob-cta-primary{display:flex;align-items:center;justify-content:center;min-height:48px;padding:.7rem 1rem;background:rgba(196,86,42,.12);border:1px solid rgba(196,86,42,.35);border-radius:3px;font-family:"DM Sans",sans-serif;font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#c4562a;text-decoration:none}.trg-mob-cta-secondary{display:flex;align-items:center;justify-content:center;min-height:44px;padding:.6rem 1rem;background:rgba(255,255,255,.03);border:1px solid rgba(245,241,235,.1);border-radius:3px;font-family:"DM Sans",sans-serif;font-size:.68rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(245,241,235,.55);text-decoration:none}';
document.head.appendChild(s);

if(document.readyState==='complete')setTimeout(boot,200);
else window.addEventListener('load',function(){setTimeout(boot,300)});
})();
