/* TRG Mobile v4 — clean, no monkey-patches, prompt search */
(function(){
'use strict';
var AB=
{n:"032C",s:"032c",c:"shirts-tops",p:"m"},
{n:"100 Hands",s:"100-hands",c:"shirts-tops",p:"h"},
{n:"3.Paradis",s:"3-paradis",c:"shirts-tops",p:"h"},
{n:"3sixteen",s:"3sixteen",c:"denim",p:"m"},
{n:"73London",s:"73london",c:"tailoring",p:"m"},
{n:"A Day\'s March",s:"a-days-march",c:"shirts-tops",p:"h"},
{n:"A Kind of Guise",s:"a-kind-of-guise",c:"knitwear",p:"m"},
{n:"A.P.C.",s:"a-p-c",c:"shirts-tops",p:"h"},
{n:"A.PRESSE",s:"a-presse",c:"shirts-tops",p:"h"},
{n:"Abaga",s:"abagavelli",c:"shirts-tops",p:"m"},
{n:"Ace Marks",s:"ace-marks",c:"footwear",p:"m"},
{n:"Acne Studios",s:"acne-studios",c:"shirts-tops",p:"h"},
{n:"Agolde",s:"agolde",c:"denim",p:"m"},
{n:"Aime Leon Dore",s:"aime-leon-dore",c:"shirts-tops",p:"h"},
{n:"Albam",s:"albam",c:"shirts-tops",p:"m"},
{n:"Alden",s:"alden",c:"footwear",p:"m"},
{n:"Alex Mill",s:"alex-mill",c:"shirts-tops",p:"m"},
{n:"Allen Edmonds",s:"allen-edmonds",c:"footwear",p:"m"},
{n:"Ambrosi Napoli",s:"ambrosi-napoli",c:"tailoring",p:"h"},
{n:"American Giant",s:"american-giant",c:"shirts-tops",p:"m"},
{n:"American Trench",s:"american-trench",c:"accessories",p:"m"},
{n:"AMI Paris",s:"ami-paris",c:"shirts-tops",p:"h"},
{n:"Amiri",s:"amiri",c:"shirts-tops",p:"h"},
{n:"Anderson and Sheppard",s:"anderson-and-sheppard",c:"tailoring",p:"h"},
{n:"Anglo-Italian",s:"anglo-italian",c:"tailoring",p:"h"},
{n:"Another Aspect",s:"another-aspect",c:"shirts-tops",p:"h"},
{n:"Anovair",s:"anovair",c:"shirts-tops",p:"m"},
{n:"Anthology",s:"anthology",c:"tailoring",p:"m"},
{n:"Aran Sweater Market",s:"aran-sweater-market",c:"knitwear",p:"m"},
{n:"Arc\'teryx",s:"arcteryx",c:"outerwear",p:"m"},
{n:"Arpenteur",s:"arpenteur",c:"shirts-tops",p:"m"},
{n:"Ascotchang",s:"ascot-chang",c:"shirts-tops",p:"m"},
{n:"Asics",s:"asics",c:"footwear",p:"m"},
{n:"Asket",s:"asket",c:"shirts-tops",p:"h"},
{n:"Aspesi",s:"aspesi",c:"shirts-tops",p:"h"},
{n:"Astorflex",s:"astorflex",c:"footwear",p:"m"},
{n:"Aubercy",s:"aubercy",c:"footwear",p:"h"},
{n:"August Special",s:"august-special",c:"footwear",p:"m"},
{n:"Auralee",s:"auralee",c:"shirts-tops",p:"h"},
{n:"Aurelien",s:"aurelien",c:"footwear",p:"h"},
{n:"AvVattev",s:"avvattev",c:"tailoring",p:"m"},
{n:"AYR",s:"ayr",c:"shirts-tops",p:"m"},
{n:"Banana Republic",s:"banana-republic",c:"tailoring",p:"h"},
{n:"Baracuta",s:"baracuta",c:"outerwear",p:"m"},
{n:"Barbanera",s:"barbanera",c:"footwear",p:"m"},
{n:"Barbarian",s:"barbarian",c:"shirts-tops",p:"m"},
{n:"Barbour",s:"barbour",c:"outerwear",p:"m"},
{n:"Barena Venezia",s:"barena-venezia",c:"shirts-tops",p:"h"},
{n:"Barker",s:"barker",c:"footwear",p:"m"},
{n:"Bather",s:"bather",c:"accessories",p:"m"},
{n:"Batoner",s:"batoner",c:"knitwear",p:"m"},
{n:"Baudoin and Lange",s:"baudoin-and-lange",c:"footwear",p:"h"},
{n:"Beams Plus",s:"beams-plus",c:"shirts-tops",p:"h"},
{n:"Beckett Simonon",s:"beckett-simonon",c:"footwear",p:"m"},
{n:"Begg & Co",s:"begg-and-co",c:"accessories",p:"m"},
{n:"Bellief",s:"bellief",c:"tailoring",p:"h"},
{n:"Belstaff",s:"belstaff",c:"outerwear",p:"m"},
{n:"Berg & Berg",s:"berg-and-berg",c:"tailoring",p:"m"},
{n:"Berluti",s:"berluti",c:"footwear",p:"m"},
{n:"Berwick 1707",s:"berwick-1707",c:"footwear",p:"m"},
{n:"Bigi",s:"bigi",c:"accessories",p:"m"},
{n:"Billy Reid",s:"billy-reid",c:"shirts-tops",p:"m"},
{n:"Bleu de Paname",s:"bleu-de-paname",c:"shirts-tops",p:"m"},
{n:"Blkbrd Shoemaker",s:"blkbrd-shoemaker",c:"footwear",p:"m"},
{n:"Blue Blue Japan",s:"blue-blue-japan",c:"shirts-tops",p:"m"},
{n:"Blundstone",s:"blundstone",c:"footwear",p:"m"},
{n:"Bode",s:"bode",c:"shirts-tops",p:"h"},
{n:"Boglioli",s:"boglioli",c:"tailoring",p:"m"},
{n:"Bonobos",s:"bonobos",c:"tailoring",p:"h"},
{n:"Bontoni",s:"bontoni",c:"footwear",p:"m"},
{n:"Bordon Boots",s:"bordon-boots",c:"footwear",p:"m"},
{n:"Bosie Knitwear",s:"bosie-knitwear",c:"knitwear",p:"m"},
{n:"Bottega Veneta",s:"bottega-veneta",c:"accessories",p:"h"},
{n:"Brass Tokyo",s:"brass-tokyo",c:"shirts-tops",p:"m"},
{n:"Bridlen",s:"bridlen",c:"footwear",p:"m"},
{n:"Brioni",s:"brioni",c:"tailoring",p:"m"},
{n:"Bronson Mfg. Co.",s:"bronson-mfg-co",c:"denim",p:"m"},
{n:"Brooks Brothers",s:"brooks-brothers",c:"tailoring",p:"m"},
{n:"Brunello Cucinelli",s:"brunello-cucinelli",c:"shirts-tops",p:"m"},
{n:"Brut",s:"brut",c:"outerwear",p:"m"},
{n:"Bryceland\'s",s:"brycelands",c:"shirts-tops",p:"m"},
{n:"Buck Mason",s:"buck-mason",c:"shirts-tops",p:"m"},
{n:"Buzz Rickson\'s",s:"buzz-ricksons",c:"shirts-tops",p:"m"},
{n:"Cad & The Dandy",s:"cad-and-the-dandy",c:"tailoring",p:"m"},
{n:"Camoshita",s:"camoshita",c:"tailoring",p:"m"},
{n:"Canada Goose",s:"canada-goose",c:"outerwear",p:"m"},
{n:"Canali",s:"canali",c:"tailoring",p:"m"},
{n:"Carhartt WIP",s:"carhartt-wip",c:"shirts-tops",p:"h"},
{n:"Carlos Santos",s:"carlos-santos",c:"footwear",p:"m"},
{n:"Carmina",s:"carmina",c:"footwear",p:"m"},
{n:"Caruso",s:"caruso",c:"tailoring",p:"m"},
{n:"Casatlantic",s:"casatlantic",c:"trousers",p:"m"},
{n:"Casey Casey",s:"casey-casey",c:"shirts-tops",p:"m"},
{n:"Cavour",s:"cavour",c:"tailoring",p:"m"},
{n:"CDLP",s:"cdlp",c:"accessories",p:"m"},
{n:"Cesare Attolini",s:"cesare-attolini",c:"tailoring",p:"m"},
{n:"Chapal",s:"chapal",c:"outerwear",p:"m"},
{n:"Charles Tyrwhitt",s:"charles-tyrwhitt",c:"tailoring",p:"m"},
{n:"Cheaney",s:"cheaney",c:"footwear",p:"m"},
{n:"Christian Dior",s:"christian-dior",c:"shirts-tops",p:"h"},
{n:"Christian Kimber",s:"christian-kimber",c:"footwear",p:"h"},
{n:"Church\'s",s:"churchs",c:"footwear",p:"m"},
{n:"Ciele Athletics",s:"ciele-athletics",c:"shirts-tops",p:"m"},
{n:"Cifonelli",s:"cifonelli",c:"tailoring",p:"m"},
{n:"Clarks",s:"clarks",c:"footwear",p:"m"},
{n:"Closed",s:"closed",c:"denim",p:"m"},
{n:"Club Monaco",s:"club-monaco",c:"shirts-tops",p:"h"},
{n:"Cobbler Union",s:"cobbler-union",c:"footwear",p:"m"},
{n:"Coherence",s:"coherence",c:"outerwear",p:"h"},
{n:"Colhay\'s",s:"colhays",c:"knitwear",p:"m"},
{n:"Cookman",s:"cookman",c:"shirts-tops",p:"m"},
{n:"Corneliani",s:"corneliani",c:"tailoring",p:"m"},
{n:"Corridor",s:"corridor",c:"shirts-tops",p:"m"},
{n:"Corthay",s:"corthay",c:"footwear",p:"m"},
{n:"COS",s:"cos",c:"shirts-tops",p:"h"},
{n:"CP Company",s:"cp-company",c:"outerwear",p:"m"},
{n:"CQP",s:"cqp",c:"footwear",p:"h"},
{n:"Crescent Down Works",s:"crescent-down-works",c:"outerwear",p:"m"},
{n:"Crockett & Jones",s:"crockett-and-jones",c:"footwear",p:"m"},
{n:"Crown Northampton",s:"crown-northampton",c:"footwear",p:"m"},
{n:"Dale of Norway",s:"dale-of-norway",c:"knitwear",p:"m"},
{n:"Danner",s:"danner",c:"footwear",p:"m"},
{n:"Danton",s:"danton",c:"shirts-tops",p:"m"},
{n:"De Bonne Facture",s:"de-bonne-facture",c:"shirts-tops",p:"h"},
{n:"Dehen 1920",s:"dehen-1920",c:"outerwear",p:"m"},
{n:"Derek Rose",s:"derek-rose",c:"shirts-tops",p:"m"},
{n:"Dickies",s:"dickies",c:"shirts-tops",p:"m"},
{n:"Document",s:"document",c:"outerwear",p:"m"},
{n:"Doppiaa",s:"doppiaa",c:"shirts-tops",p:"h"},
{n:"Drakes",s:"drakes",c:"tailoring",p:"m"},
{n:"Drumohr",s:"drumohr",c:"knitwear",p:"m"},
{n:"Drôle de Monsieur",s:"drole-de-monsieur",c:"shirts-tops",p:"h"},
{n:"Duckworth",s:"duckworth",c:"knitwear",p:"m"},
{n:"E. Marinella",s:"e-marinella",c:"tailoring",p:"m"},
{n:"East Harbour Surplus",s:"east-harbour-surplus",c:"shirts-tops",p:"m"},
{n:"Eastlogue",s:"eastlogue",c:"shirts-tops",p:"m"},
{n:"eckhauslatta",s:"eckhauslatta",c:"shirts-tops",p:"m"},
{n:"Ede & Ravenscroft",s:"ede-and-ravenscroft",c:"tailoring",p:"m"},
{n:"Edward Green",s:"edward-green",c:"footwear",p:"m"},
{n:"Edwin",s:"edwin",c:"denim",p:"m"},
{n:"Eleventy",s:"eleventy",c:"tailoring",p:"h"},
{n:"Emma Willis",s:"emma-willis",c:"tailoring",p:"m"},
{n:"Engineered Garments",s:"engineered-garments",c:"shirts-tops",p:"m"},
{n:"Enzo Bonafe",s:"enzo-bonafe",c:"footwear",p:"m"},
{n:"Epaulet",s:"epaulet",c:"tailoring",p:"m"},
{n:"Eton Shirts",s:"eton-shirts",c:"tailoring",p:"m"},
{n:"Evan Kinori",s:"evan-kinori",c:"shirts-tops",p:"h"},
{n:"Everlane",s:"everlane",c:"shirts-tops",p:"h"},
{n:"Faherty Brand",s:"faherty-brand",c:"shirts-tops",p:"m"},
{n:"Falconeri",s:"falconeri",c:"knitwear",p:"m"},
{n:"Far Afield",s:"far-afield",c:"shirts-tops",p:"m"},
{n:"Fedeli",s:"fedeli",c:"knitwear",p:"m"},
{n:"Feit",s:"feit",c:"footwear",p:"m"},
{n:"Filson",s:"filson",c:"outerwear",p:"m"},
{n:"Finamore",s:"finamore",c:"tailoring",p:"m"},
{n:"Fisherman Out of Ireland",s:"fisherman-out-of-ireland",c:"knitwear",p:"m"},
{n:"Flint and Tinder",s:"flint-and-tinder",c:"shirts-tops",p:"m"},
{n:"Folk",s:"folk",c:"shirts-tops",p:"h"},
{n:"Forét",s:"foret",c:"outerwear",p:"m"},
{n:"Foster And Son",s:"foster-and-son",c:"footwear",p:"h"},
{n:"Frank And Oak",s:"frank-and-oak",c:"shirts-tops",p:"m"},
{n:"Frank Leder",s:"frank-leder",c:"shirts-tops",p:"m"},
{n:"Freenote Cloth",s:"freenote-cloth",c:"shirts-tops",p:"m"},
{n:"Frescobol Carioca",s:"frescobol-carioca",c:"accessories",p:"m"},
{n:"FrizmWORKS",s:"frizmworks",c:"shirts-tops",p:"m"},
{n:"Fujito",s:"fujito",c:"knitwear",p:"m"},
{n:"Fullcount",s:"fullcount",c:"denim",p:"m"},
{n:"Gaziano & Girling",s:"gaziano-and-girling",c:"footwear",p:"m"},
{n:"georgecleverley",s:"george-cleverley",c:"footwear",p:"h"},
{n:"Ghiaia Cashmere",s:"ghiaia-cashmere",c:"knitwear",p:"m"},
{n:"Gitman Vintage",s:"gitman-vintage",c:"shirts-tops",p:"m"},
{n:"Giuliva Heritage",s:"giuliva-heritage",c:"tailoring",p:"m"},
{n:"Glanshirt",s:"glanshirt",c:"shirts-tops",p:"m"},
{n:"Goldwin",s:"goldwin",c:"outerwear",p:"m"},
{n:"Good Man Brand",s:"good-man-brand",c:"shirts-tops",p:"m"},
{n:"GORAL",s:"goral",c:"footwear",p:"m"},
{n:"Gran Sasso",s:"gran-sasso",c:"knitwear",p:"m"},
{n:"Grant Stone",s:"grant-stone",c:"footwear",p:"m"},
{n:"Graph Zero",s:"graph-zero",c:"denim",p:"m"},
{n:"Grenson",s:"grenson",c:"footwear",p:"m"},
{n:"Gustin",s:"gustin",c:"denim",p:"m"},
{n:"Hamilton Shirts",s:"hamilton-shirts",c:"tailoring",p:"m"},
{n:"Hansen Garments",s:"hansen-garments",c:"shirts-tops",p:"m"},
{n:"Harris Tweed Hebrides",s:"harris-tweed-hebrides",c:"accessories",p:"m"},
{n:"Harris Wharf London",s:"harris-wharf-london",c:"outerwear",p:"m"},
{n:"HAVEN",s:"haven",c:"shirts-tops",p:"h"},
{n:"Hawes & Curtis",s:"hawes-and-curtis",c:"tailoring",p:"m"},
{n:"Heimat Textil",s:"heimat-textil",c:"knitwear",p:"m"},
{n:"Herill",s:"herill",c:"shirts-tops",p:"m"},
{n:"Herno",s:"herno",c:"outerwear",p:"h"},
{n:"Herring Shoes",s:"herring-shoes",c:"footwear",p:"m"},
{n:"Heschung",s:"heschung",c:"footwear",p:"m"},
{n:"Hestra",s:"hestra",c:"accessories",p:"m"},
{n:"Hilditch & Key",s:"hilditch-and-key",c:"tailoring",p:"m"},
{n:"Hiro Yanagimachi",s:"hiro-yanagimachi",c:"footwear",p:"m"},
{n:"Holzweiler",s:"holzweiler",c:"outerwear",p:"m"},
{n:"House of Blanks",s:"house-of-blanks",c:"shirts-tops",p:"m"},
{n:"Husbands",s:"husbands",c:"tailoring",p:"m"},
{n:"Imogene + Willie",s:"imogene-willie",c:"denim",p:"m"},
{n:"Incotex",s:"incotex",c:"tailoring",p:"m"},
{n:"Informale",s:"informale",c:"tailoring",p:"m"},
{n:"Inis Meáin",s:"inis-meain",c:"knitwear",p:"m"},
{n:"Inverallan",s:"inverallan",c:"knitwear",p:"m"},
{n:"IrelandsEye",s:"irelandseye",c:"knitwear",p:"m"},
{n:"Iron Heart",s:"iron-heart",c:"denim",p:"m"},
{n:"Isaia",s:"isaia",c:"tailoring",p:"m"},
{n:"J. FitzPatrick",s:"j-fitzpatrick",c:"footwear",p:"m"},
{n:"J.Crew",s:"j-crew",c:"shirts-tops",p:"m"},
{n:"J.M. Weston",s:"j-m-weston",c:"footwear",p:"m"},
{n:"Jacob Cohën",s:"jacob-cohen",c:"denim",p:"m"},
{n:"Jacquemus",s:"jacquemus",c:"shirts-tops",p:"h"},
{n:"James Coward",s:"james-coward",c:"shirts-tops",p:"m"},
{n:"Japan Blue Jeans",s:"japan-blue-jeans",c:"denim",p:"m"},
{n:"Jil Sander",s:"jil-sander",c:"shirts-tops",p:"h"},
{n:"Jim Green",s:"jim-green",c:"footwear",p:"m"},
{n:"JL-AL",s:"jl-al",c:"shirts-tops",p:"m"},
{n:"John Lobb",s:"john-lobb",c:"footwear",p:"m"},
{n:"John Lofgren",s:"john-lofgren",c:"footwear",p:"m"},
{n:"John Smedley",s:"john-smedley",c:"knitwear",p:"m"},
{n:"Johnstons of Elgin",s:"johnstons-of-elgin",c:"knitwear",p:"m"},
{n:"Joseph Cheaney",s:"joseph-cheaney",c:"footwear",p:"m"},
{n:"Justo Gimeno",s:"justo-gimeno",c:"footwear",p:"m"},
{n:"Kamakura",s:"kamakura",c:"shirts-tops",p:"m"},
{n:"Kanata",s:"kanata",c:"knitwear",p:"m"},
{n:"Kapital",s:"kapital",c:"shirts-tops",p:"h"},
{n:"Kaptain Sunshine",s:"kaptain-sunshine",c:"shirts-tops",p:"h"},
{n:"Kardo",s:"kardo",c:"shirts-tops",p:"m"},
{n:"Kartik Research",s:"kartik-research",c:"shirts-tops",p:"h"},
{n:"Kent Wang",s:"kent-wang",c:"tailoring",p:"m"},
{n:"KESTIN",s:"kestin",c:"shirts-tops",p:"m"},
{n:"Kiko Kostadinov",s:"kiko-kostadinov",c:"shirts-tops",p:"m"},
{n:"Kith",s:"kith",c:"shirts-tops",p:"h"},
{n:"Kiton",s:"kiton",c:"tailoring",p:"m"},
{n:"Knickerbocker",s:"knickerbocker",c:"shirts-tops",p:"m"},
{n:"Kotn",s:"kotn",c:"shirts-tops",p:"m"},
{n:"L\'Estrange London",s:"lestrange-london",c:"shirts-tops",p:"h"},
{n:"L.B.M. 1911",s:"l-b-m-1911",c:"tailoring",p:"h"},
{n:"La Botte Gardiane",s:"la-botte-gardiane",c:"footwear",p:"m"},
{n:"La Paz",s:"la-paz",c:"shirts-tops",p:"m"},
{n:"Labour Union",s:"labour-union",c:"shirts-tops",p:"m"},
{n:"Lady White Co.",s:"lady-white-co",c:"shirts-tops",p:"m"},
{n:"Lardini",s:"lardini",c:"tailoring",p:"m"},
{n:"Lavenham",s:"lavenham",c:"outerwear",p:"m"},
{n:"Le Laboureur",s:"le-laboureur",c:"shirts-tops",p:"m"},
{n:"Lee",s:"lee",c:"denim",p:"m"},
{n:"Left Field NYC",s:"left-field-nyc",c:"denim",p:"m"},
{n:"Lemaire",s:"lemaire",c:"shirts-tops",p:"h"},
{n:"Levi\'s Vintage Clothing",s:"levis-vintage-clothing",c:"denim",p:"m"},
{n:"LL Bean",s:"ll-bean",c:"outerwear",p:"m"},
{n:"Loake",s:"loake",c:"footwear",p:"m"},
{n:"Loro Piana",s:"loro-piana",c:"shirts-tops",p:"h"},
{n:"Ludwig Reiter",s:"ludwig-reiter",c:"footwear",p:"m"},
{n:"Luigi Bianchi Mantova",s:"luigi-bianchi-mantova",c:"tailoring",p:"m"},
{n:"Luigi Borrelli",s:"luigi-borrelli",c:"tailoring",p:"m"},
{n:"Mackintosh",s:"mackintosh",c:"outerwear",p:"m"},
{n:"Madewell",s:"madewell",c:"denim",p:"m"},
{n:"Magee 1866",s:"magee-1866",c:"outerwear",p:"m"},
{n:"MAN 1924",s:"man-1924",c:"accessories",p:"m"},
{n:"Mango Man",s:"mango-man",c:"shirts-tops",p:"h"},
{n:"Manifattura Ceccarelli",s:"manifattura-ceccarelli",c:"outerwear",p:"m"},
{n:"Margaret Howell",s:"margaret-howell",c:"shirts-tops",p:"h"},
{n:"Marka",s:"marka",c:"shirts-tops",p:"h"},
{n:"Mason\'s",s:"masons",c:"tailoring",p:"h"},
{n:"Massimo Alba",s:"massimo-alba",c:"shirts-tops",p:"h"},
{n:"Maurizio Baldassari",s:"maurizio-baldassari",c:"knitwear",p:"h"},
{n:"Meccariello",s:"meccariello",c:"footwear",p:"h"},
{n:"Meermin",s:"meermin",c:"footwear",p:"m"},
{n:"Merz b. Schwanen",s:"merz-b-schwanen",c:"shirts-tops",p:"m"},
{n:"Mister Freedom",s:"mister-freedom",c:"shirts-tops",p:"m"},
{n:"Momotaro",s:"momotaro",c:"denim",p:"m"},
{n:"Monitaly",s:"monitaly",c:"shirts-tops",p:"h"},
{n:"MooRER",s:"moorer",c:"outerwear",p:"m"},
{n:"Moreschi",s:"moreschi",c:"footwear",p:"h"},
{n:"Mott & Bow",s:"mott-and-bow",c:"denim",p:"m"},
{n:"Muji",s:"muji",c:"shirts-tops",p:"h"},
{n:"Muttonhead",s:"muttonhead",c:"shirts-tops",p:"m"},
{n:"Myrqvist",s:"myrqvist",c:"footwear",p:"m"},
{n:"N. Hoolywood",s:"n-hoolywood",c:"shirts-tops",p:"h"},
{n:"N.Peal",s:"n-peal",c:"knitwear",p:"m"},
{n:"Naked & Famous",s:"naked-and-famous",c:"denim",p:"m"},
{n:"Nanamica",s:"nanamica",c:"outerwear",p:"m"},
{n:"Natalino",s:"natalino",c:"tailoring",p:"h"},
{n:"New Balance",s:"new-balance",c:"footwear",p:"m"},
{n:"Nicks Boots",s:"nicks-boots",c:"footwear",p:"m"},
{n:"Nigel Cabourn",s:"nigel-cabourn",c:"outerwear",p:"m"},
{n:"Nitto Knitwear",s:"nitto-knitwear",c:"knitwear",p:"m"},
{n:"NN07",s:"nn07",c:"shirts-tops",p:"h"},
{n:"Noah NYC",s:"noah-nyc",c:"shirts-tops",p:"h"},
{n:"NoManWalksAlone",s:"nomanwalksalone",c:"tailoring",p:"h"},
{n:"Nonnative",s:"nonnative",c:"shirts-tops",p:"m"},
{n:"Norda",s:"norda",c:"footwear",p:"m"},
{n:"Norhla",s:"norhla",c:"knitwear",p:"m"},
{n:"Norse Projects",s:"norse-projects",c:"shirts-tops",p:"h"},
{n:"Norwegian Rain",s:"norwegian-rain",c:"outerwear",p:"m"},
{n:"Nudie Jeans",s:"nudie-jeans",c:"denim",p:"m"},
{n:"Oak Street Bootmakers",s:"oak-street-bootmakers",c:"footwear",p:"m"},
{n:"OAS Company",s:"oas-company",c:"accessories",p:"m"},
{n:"Octobre Éditions",s:"octobre-editions",c:"shirts-tops",p:"m"},
{n:"Officine Générale",s:"officine-generale",c:"tailoring",p:"h"},
{n:"Oliver Spencer",s:"oliver-spencer",c:"tailoring",p:"h"},
{n:"Oni Denim",s:"oni-denim",c:"denim",p:"m"},
{n:"Orazio Luciano",s:"orazio-luciano",c:"tailoring",p:"m"},
{n:"Orlebar Brown",s:"orlebar-brown",c:"shirts-tops",p:"m"},
{n:"Orslow",s:"orslow",c:"shirts-tops",p:"m"},
{n:"Our Legacy",s:"our-legacy",c:"shirts-tops",p:"h"},
{n:"Outclass",s:"outclass",c:"shirts-tops",p:"h"},
{n:"Outerknown",s:"outerknown",c:"shirts-tops",p:"m"},
{n:"Outlier",s:"outlier",c:"shirts-tops",p:"m"},
{n:"Outstanding & Co.",s:"outstanding-and-co",c:"shirts-tops",p:"m"},
{n:"Paraboot",s:"paraboot",c:"footwear",p:"m"},
{n:"Parel Studio",s:"parel-studio",c:"shirts-tops",p:"m"},
{n:"Parkhurst",s:"parkhurst",c:"footwear",p:"m"},
{n:"Patagonia",s:"patagonia",c:"outerwear",p:"m"},
{n:"Paul & Shark",s:"paul-and-shark",c:"outerwear",p:"m"},
{n:"Paul Smith",s:"paul-smith",c:"shirts-tops",p:"h"},
{n:"Pendleton",s:"pendleton",c:"outerwear",p:"m"},
{n:"Percival",s:"percival",c:"shirts-tops",p:"h"},
{n:"Peter Millar",s:"peter-millar",c:"shirts-tops",p:"h"},
{n:"Petru & Claymoor",s:"petru-and-claymoor",c:"footwear",p:"m"},
{n:"Pike Brothers",s:"pike-brothers",c:"denim",p:"m"},
{n:"Pini Parma",s:"pini-parma",c:"tailoring",p:"m"},
{n:"Portuguese Flannel",s:"portuguese-flannel",c:"shirts-tops",p:"m"},
{n:"Poszetka",s:"poszetka",c:"accessories",p:"m"},
{n:"Prada",s:"prada",c:"shirts-tops",p:"h"},
{n:"Pringlescotland",s:"pringle-of-scotland",c:"knitwear",p:"m"},
{n:"Private White V.C.",s:"private-white-v-c",c:"outerwear",p:"m"},
{n:"Proper Cloth",s:"proper-cloth",c:"tailoring",p:"m"},
{n:"Province of Canada",s:"province-of-canada",c:"shirts-tops",p:"m"},
{n:"PT01 / PT Torino",s:"pt01-pt-torino",c:"tailoring",p:"m"},
{n:"Pure Blue Japan",s:"pure-blue-japan",c:"denim",p:"m"},
{n:"Pyrenex",s:"pyrenex",c:"outerwear",p:"m"},
{n:"Rancourt & Co",s:"rancourt-and-co",c:"footwear",p:"m"},
{n:"Re-HasH",s:"re-hash",c:"tailoring",p:"h"},
{n:"Red Wing",s:"red-wing",c:"footwear",p:"m"},
{n:"Red Wing Heritage",s:"red-wing-heritage",c:"footwear",p:"m"},
{n:"Reigning Champ",s:"reigning-champ",c:"shirts-tops",p:"m"},
{n:"Relwen",s:"relwen",c:"shirts-tops",p:"m"},
{n:"Resolute",s:"resolute",c:"denim",p:"m"},
{n:"Rick Owens",s:"rick-owens",c:"shirts-tops",p:"h"},
{n:"Ring Jacket",s:"ring-jacket",c:"tailoring",p:"m"},
{n:"Roberto Collima",s:"roberto-collina",c:"knitwear",p:"h"},
{n:"Rocky Mountain Featherbed",s:"rocky-mountain-featherbed",c:"outerwear",p:"m"},
{n:"Rodd & Gunn",s:"rodd-and-gunn",c:"shirts-tops",p:"m"},
{n:"Rogue Territory",s:"rogue-territory",c:"denim",p:"m"},
{n:"Rolling Dub Trio",s:"rolling-dub-trio",c:"footwear",p:"m"},
{n:"Roots",s:"roots",c:"shirts-tops",p:"m"},
{n:"Rota",s:"rota",c:"tailoring",p:"m"},
{n:"RRD",s:"rrd",c:"outerwear",p:"m"},
{n:"RRL (Ralph Lauren)",s:"rrl-ralph-lauren",c:"denim",p:"m"},
{n:"Rubinacci",s:"rubinacci",c:"tailoring",p:"m"},
{n:"Russell Moccasin",s:"russell-moccasin",c:"footwear",p:"m"},
{n:"Sagara / Ambiorix",s:"sagara-ambiorix",c:"footwear",p:"m"},
{n:"Sage de Cret",s:"sage-de-cret",c:"shirts-tops",p:"h"},
{n:"Sage Nation",s:"sage-nation",c:"shirts-tops",p:"m"},
{n:"Saint Crispin\'s",s:"saint-crispins",c:"footwear",p:"m"},
{n:"Salvatore Piccolo",s:"salvatore-piccolo",c:"tailoring",p:"m"},
{n:"Saman Amel",s:"saman-amel",c:"tailoring",p:"m"},
{n:"Samuelsohn",s:"samuelsohn",c:"tailoring",p:"m"},
{n:"Samurai Jeans",s:"samurai-jeans",c:"denim",p:"m"},
{n:"Sanders & Sanders",s:"sanders-and-sanders",c:"footwear",p:"m"},
{n:"Sandqvist",s:"sandqvist",c:"accessories",p:"m"},
{n:"Sandro",s:"sandro",c:"tailoring",p:"h"},
{n:"Santoni",s:"santoni",c:"footwear",p:"m"},
{n:"Sartoria Partenopea",s:"sartoria-partenopea",c:"tailoring",p:"m"},
{n:"Sartorio Napoli",s:"sartorio-napoli",c:"tailoring",p:"m"},
{n:"Sassafras",s:"sassafras",c:"shirts-tops",p:"m"},
{n:"Satisfy Running",s:"satisfy-running",c:"shirts-tops",p:"m"},
{n:"Saturdays NYC",s:"saturdays-nyc",c:"shirts-tops",p:"m"},
{n:"Save Khaki United",s:"save-khaki-united",c:"shirts-tops",p:"m"},
{n:"Scarosso",s:"scarosso",c:"footwear",p:"m"},
{n:"Schott NYC",s:"schott-nyc",c:"outerwear",p:"m"},
{n:"Scott Fraser",s:"scott-fraser",c:"knitwear",p:"m"},
{n:"Sease",s:"sease",c:"outerwear",p:"m"},
{n:"Septième Largeur",s:"septieme-largeur",c:"footwear",p:"m"},
{n:"Settefili Cashmere",s:"settefili-cashmere",c:"knitwear",p:"m"},
{n:"Shibumi Firenze",s:"shibumi-firenze",c:"accessories",p:"h"},
{n:"Shockoe Atelier",s:"shockoe-atelier",c:"denim",p:"m"},
{n:"Sid Mashburn",s:"sid-mashburn",c:"tailoring",p:"h"},
{n:"Silvano Lattanzi",s:"silvano-lattanzi",c:"footwear",p:"m"},
{n:"SMR Days",s:"smr-days",c:"shirts-tops",p:"m"},
{n:"Snow Peak",s:"snow-peak",c:"outerwear",p:"m"},
{n:"Solovair",s:"solovair",c:"footwear",p:"m"},
{n:"Son of a Tailor",s:"son-of-a-tailor",c:"shirts-tops",p:"m"},
{n:"Soulland",s:"soulland",c:"shirts-tops",p:"h"},
{n:"Spencer Badu",s:"spencer-badu",c:"shirts-tops",p:"m"},
{n:"Spier & Mackay",s:"spier-and-mackay",c:"tailoring",p:"m"},
{n:"Stan Ray",s:"stan-ray",c:"shirts-tops",p:"m"},
{n:"Standard Types",s:"standard-types",c:"shirts-tops",p:"m"},
{n:"Stefano Bemer",s:"stefano-bemer",c:"footwear",p:"m"},
{n:"Sterlingwear",s:"sterlingwear",c:"outerwear",p:"m"},
{n:"Stevenson Overall Co.",s:"stevenson-overall-co",c:"denim",p:"m"},
{n:"Still by Hand",s:"still-by-hand",c:"shirts-tops",p:"h"},
{n:"Stoffa",s:"stoffa",c:"tailoring",p:"m"},
{n:"Stone Island",s:"stone-island",c:"outerwear",p:"m"},
{n:"Story Mfg.",s:"story-mfg",c:"shirts-tops",p:"m"},
{n:"Strike Gold",s:"strike-gold",c:"denim",p:"m"},
{n:"Studio D\'Artisan",s:"studio-dartisan",c:"denim",p:"m"},
{n:"Studio Donegal",s:"studio-donegal",c:"knitwear",p:"m"},
{n:"Studio Nicholson",s:"studio-nicholson",c:"shirts-tops",p:"h"},
{n:"Stutterheim",s:"stutterheim",c:"outerwear",p:"m"},
{n:"Sugar Cane",s:"sugar-cane",c:"denim",p:"m"},
{n:"Suitsupply",s:"suitsupply",c:"tailoring",p:"m"},
{n:"Sun Surf",s:"sun-surf",c:"shirts-tops",p:"m"},
{n:"Sunflower",s:"sunflower",c:"shirts-tops",p:"m"},
{n:"Sunspel",s:"sunspel",c:"shirts-tops",p:"m"},
{n:"Séfr",s:"sefr",c:"shirts-tops",p:"h"},
{n:"Tanuki",s:"tanuki",c:"denim",p:"m"},
{n:"Taylor Stitch",s:"taylor-stitch",c:"shirts-tops",p:"m"},
{n:"TCB Jeans",s:"tcb-jeans",c:"denim",p:"m"},
{n:"Tecovas",s:"tecovas",c:"footwear",p:"m"},
{n:"Tellason",s:"tellason",c:"denim",p:"m"},
{n:"Ten C",s:"ten-c",c:"outerwear",p:"m"},
{n:"Ten Thousand",s:"ten-thousand",c:"shirts-tops",p:"m"},
{n:"The Anthology",s:"the-anthology",c:"tailoring",p:"m"},
{n:"The Armoury",s:"the-armoury",c:"tailoring",p:"m"},
{n:"The Elder Statesman",s:"the-elder-statesman",c:"knitwear",p:"m"},
{n:"The Flat Head",s:"the-flat-head",c:"denim",p:"m"},
{n:"The Gigi",s:"the-gigi",c:"accessories",p:"m"},
{n:"The Iron Snail",s:"the-iron-snail",c:"shirts-tops",p:"m"},
{n:"The Post Romantic",s:"the-post-romantic",c:"shirts-tops",p:"m"},
{n:"The Real McCoy\'s",s:"the-real-mccoys",c:"shirts-tops",p:"m"},
{n:"The Unbranded Brand",s:"the-unbranded-brand",c:"denim",p:"m"},
{n:"Thom Browne",s:"thom-browne",c:"tailoring",p:"h"},
{n:"Thursday Boot Co.",s:"thursday-boot-co",c:"footwear",p:"m"},
{n:"Tlb Mallorca",s:"tlb-mallorca",c:"footwear",p:"m"},
{n:"To Boot New York",s:"to-boot-new-york",c:"footwear",p:"m"},
{n:"Toad&Co",s:"toad-and-co",c:"shirts-tops",p:"m"},
{n:"Todd Snyder",s:"todd-snyder",c:"shirts-tops",p:"h"},
{n:"TravisMathew",s:"travismathew",c:"shirts-tops",p:"m"},
{n:"Tricker\'s",s:"trickers",c:"footwear",p:"m"},
{n:"Truman Boot Co.",s:"truman-boot-co",c:"footwear",p:"m"},
{n:"ts(s)",s:"ts-s",c:"shirts-tops",p:"m"},
{n:"Turnbull & Asser",s:"turnbull-and-asser",c:"tailoring",p:"m"},
{n:"Undercoverism",s:"undercoverism",c:"shirts-tops",p:"m"},
{n:"Uniform Bridge",s:"uniform-bridge",c:"shirts-tops",p:"m"},
{n:"Uniqlo",s:"uniqlo",c:"shirts-tops",p:"m"},
{n:"Universal Works",s:"universal-works",c:"shirts-tops",p:"m"},
{n:"Valstar",s:"valstar",c:"outerwear",p:"m"},
{n:"Vass",s:"vass",c:"footwear",p:"m"},
{n:"Vass Shoes",s:"vass-shoes",c:"footwear",p:"m"},
{n:"Velasca",s:"velasca",c:"footwear",p:"m"},
{n:"Vetra",s:"vetra",c:"shirts-tops",p:"m"},
{n:"Viberg",s:"viberg",c:"footwear",p:"m"},
{n:"Visvim",s:"visvim",c:"shirts-tops",p:"h"},
{n:"Vuori",s:"vuori",c:"shirts-tops",p:"m"},
{n:"Wales Bonner",s:"wales-bonner",c:"shirts-tops",p:"h"},
{n:"Walker Slater",s:"walker-slater",c:"outerwear",p:"m"},
{n:"WANT Les Essentiels",s:"want-les-essentiels",c:"accessories",p:"m"},
{n:"Warehouse & Co.",s:"warehouse-and-co",c:"denim",p:"m"},
{n:"Wax London",s:"wax-london",c:"shirts-tops",p:"h"},
{n:"WeatherWool",s:"weatherwool",c:"outerwear",p:"m"},
{n:"Western Rise",s:"western-rise",c:"shirts-tops",p:"m"},
{n:"White\'s Boots",s:"whites-boots",c:"footwear",p:"m"},
{n:"Whitesville",s:"whitesville",c:"shirts-tops",p:"m"},
{n:"William Lockie",s:"william-lockie",c:"knitwear",p:"m"},
{n:"Wings+Horns",s:"wings-horns",c:"shirts-tops",p:"h"},
{n:"Wolf vs Goat",s:"wolf-vs-goat",c:"knitwear",p:"m"},
{n:"Wonder Looper",s:"wonder-looper",c:"shirts-tops",p:"m"},
{n:"Woolrich",s:"woolrich",c:"outerwear",p:"m"},
{n:"Wrangler",s:"wrangler",c:"denim",p:"m"},
{n:"WTAPS",s:"wtaps",c:"shirts-tops",p:"h"},
{n:"Wythe",s:"wythe",c:"shirts-tops",p:"m"},
{n:"YMC",s:"ymc",c:"shirts-tops",p:"h"},
{n:"Yuketen",s:"yuketen",c:"footwear",p:"m"},
{n:"Yves Saint Laurent",s:"yves-saint-laurent",c:"shirts-tops",p:"h"},
{n:"Zanone",s:"zanone",c:"knitwear",p:"m"},
{n:"Zegna",s:"zegna",c:"tailoring",p:"m"};
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
      picks.forEach(function(b){ph+='<a href="/collections/'+b.s+'" style="display:flex;align-items:center;justify-content:space-between;min-height:42px;padding:.3rem 0;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.04)"><span style="font-size:.78rem;color:rgba(245,241,235,.92)">'+hl(b.n,mQ)+'</span><span style="width:5px;height:5px;border-radius:50%;background:#c4562a;opacity:.6;flex-shrink:0"></span></a>'});
      ph+='</div>';pEl.innerHTML=ph;
    }else pEl.innerHTML='';
  }
  if(rEl){
    if(rest.length){
      var rh='<div style="font-size:.52rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,241,235,.3);padding:.6rem 1.25rem .35rem;display:flex;align-items:center;gap:.5rem">All brands<span style="flex:1;height:1px;background:rgba(245,241,235,.08)"></span></div><div style="padding:0 1.25rem 2rem">';
      var gr={};rest.forEach(function(b){var l=b.n.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});
      Object.keys(gr).sort().forEach(function(l){rh+='<div style="font-size:.52rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#c4562a;padding:.7rem 0 .25rem;border-bottom:1px solid rgba(196,86,42,.2);margin-top:.4rem">'+l+'</div>';gr[l].forEach(function(b){rh+='<a href="/collections/'+b.s+'" style="display:flex;align-items:center;min-height:40px;padding:.25rem 0;font-size:.76rem;color:rgba(245,241,235,.55);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.03)">'+hl(b.n,mQ)+'</a>'})});
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
  /* Hide old elements */
  var oldSearch=document.getElementById('trg-mob-bsearch');
  if(oldSearch)oldSearch.style.display='none';
  var oldChips=document.getElementById('trg-mob-bchips');
  if(oldChips)oldChips.style.display='none';
  var oldCount=document.getElementById('trg-mob-bcount');
  if(oldCount)oldCount.style.display='none';
  /* Build new UI */
  var w=document.createElement('div');
  w.id='trg-v4';
  /* Search button (uses prompt — guaranteed to work) */
  var searchHTML='<div style="padding:.75rem 1.25rem .25rem"><label style="display:flex;align-items:center;gap:.6rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:0 .75rem;cursor:text"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,241,235,.3)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg><input id="trg-v4-input" type="search" placeholder="Search 468 brands\u2026" autocomplete="off" inputmode="search" style="flex:1;background:transparent;border:none;outline:none;font-family:DM Sans,sans-serif;font-size:16px;color:rgba(245,241,235,.92);padding:.65rem 0;-webkit-appearance:none;min-height:44px"><button id="trg-v4-clear" type="button" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:rgba(245,241,235,.4);padding:.35rem;display:none;flex-shrink:0">\u2715</button></label></div>';
  /* Chips */
  var chipData=[{l:'All',v:'all'},{l:'Shirts & Tops',v:'shirts-tops'},{l:'Outerwear',v:'outerwear'},{l:'Trousers',v:'trousers'},{l:'Footwear',v:'footwear'},{l:'Knitwear',v:'knitwear'},{l:'Denim',v:'denim'},{l:'Tailoring',v:'tailoring'},{l:'Accessories',v:'accessories'}];
  var chipsHTML='<div id="trg-v4-chips" style="display:flex;gap:.35rem;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.6rem 1.25rem .4rem">';
  chipData.forEach(function(cd){
    var active=cd.v==='all'?'background:rgba(196,86,42,.15);border-color:rgba(196,86,42,.45);color:rgba(245,241,235,.92)':'';
    chipsHTML+='<button type="button" data-cat="'+cd.v+'" style="font-family:DM Sans,sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:.3rem .7rem;border:1px solid rgba(255,255,255,.1);border-radius:20px;color:rgba(245,241,235,.55);background:none;cursor:pointer;white-space:nowrap;flex-shrink:0;-webkit-tap-highlight-color:transparent;'+active+'">'+cd.l+'</button>';
  });
  chipsHTML+='</div>';
  var countHTML='<div id="trg-v4-count" style="font-size:.62rem;color:rgba(245,241,235,.3);letter-spacing:.03em;padding:.5rem 1.25rem .6rem;border-bottom:1px solid rgba(245,241,235,.08)"></div>';
  w.innerHTML=searchHTML+chipsHTML+countHTML;
  tc.insertBefore(w,tc.firstChild);
  /* Bind search input */
  var sInput=document.getElementById('trg-v4-input');
  var sClear=document.getElementById('trg-v4-clear');
  if(sInput){
    sInput.addEventListener('input',function(){
      mQ=sInput.value.trim().toLowerCase();
      if(sClear)sClear.style.display=mQ?'block':'none';
      dr();
    });
  }
  if(sClear){
    sClear.addEventListener('click',function(e){
      e.preventDefault();
      if(sInput){sInput.value='';sInput.focus()}
      sClear.style.display='none';
      mQ='';dr();
    });
  }
  /* Bind chips */
  document.getElementById('trg-v4-chips').addEventListener('click',function(e){
    var chip=e.target.closest('button');if(!chip)return;
    e.preventDefault();e.stopPropagation();
    mCat=chip.dataset.cat||'all';
    document.getElementById('trg-v4-chips').querySelectorAll('button').forEach(function(b){b.style.background='none';b.style.borderColor='rgba(255,255,255,.1)';b.style.color='rgba(245,241,235,.55)'});
    chip.style.background='rgba(196,86,42,.15)';chip.style.borderColor='rgba(196,86,42,.45)';chip.style.color='rgba(245,241,235,.92)';
    render();
    var body=document.getElementById('trg-mob-body');if(body)body.scrollTop=0;
  });
  /* Redirect count to our element */
  var origById=document.getElementById.bind(document);
  var newCount=document.getElementById('trg-v4-count');
  document.getElementById=function(id){if(id==='trg-mob-bcount')return newCount;return origById(id)};
  /* Accordion (capture phase) */
  document.addEventListener('click',function(e){
    var hdr=e.target.closest('.trg-mob-fam-hdr');if(!hdr)return;
    e.preventDefault();e.stopPropagation();
    var fam=hdr.closest('.trg-mob-fam');if(!fam)return;
    var body=fam.querySelector('.trg-mob-fam-body');if(!body)return;
    var isOpen=fam.classList.contains('on');
    document.querySelectorAll('.trg-mob-fam.on').forEach(function(f){if(f!==fam){f.classList.remove('on');var b=f.querySelector('.trg-mob-fam-body');if(b)b.style.maxHeight='0'}});
    if(isOpen){fam.classList.remove('on');body.style.maxHeight='0'}
    else{fam.classList.add('on');body.style.maxHeight=body.scrollHeight+'px';setTimeout(function(){hdr.scrollIntoView({behavior:'smooth',block:'start'})},200)}
  },true);
  render();
  /* Re-render on tab/drawer open */
  new MutationObserver(function(){if(tc.classList.contains('on'))dr()}).observe(tc,{attributes:true,attributeFilter:['class']});
  var mob=document.getElementById('trg-mob');
  if(mob)new MutationObserver(function(){if(mob.classList.contains('on'))setTimeout(render,150)}).observe(mob,{attributes:true,attributeFilter:['class']});
}
/* CSS */
var s=document.createElement('style');
s.textContent='.trg-mob-chips{display:none!important}.trg-mob-fam-inner>.trg-mob-lbl:first-child{display:none!important}#trg-v4-chips::-webkit-scrollbar{display:none}.trg-mob-ctas{padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.5rem}.trg-mob-cta-primary{display:flex;align-items:center;justify-content:center;min-height:48px;padding:.7rem 1rem;background:rgba(196,86,42,.12);border:1px solid rgba(196,86,42,.35);border-radius:3px;font-family:"DM Sans",sans-serif;font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#c4562a;text-decoration:none}.trg-mob-cta-secondary{display:flex;align-items:center;justify-content:center;min-height:44px;padding:.6rem 1rem;background:rgba(255,255,255,.03);border:1px solid rgba(245,241,235,.1);border-radius:3px;font-family:"DM Sans",sans-serif;font-size:.68rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(245,241,235,.55);text-decoration:none}';
document.head.appendChild(s);
if(document.readyState==='complete')setTimeout(boot,200);
else window.addEventListener('load',function(){setTimeout(boot,300)});
})();
