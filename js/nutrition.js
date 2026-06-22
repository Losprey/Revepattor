// Mealnest — Nutrition estimator
// ==========================================

// ======================== PERSISTENCE ========================
function mergeRecipes(localArr, remoteArr) {
  if (!Array.isArray(localArr)) localArr = [];
  if (!Array.isArray(remoteArr)) remoteArr = [];
  var map = {};
  localArr.forEach(function(r) { if (r && r.id != null) map[r.id] = r; });
  remoteArr.forEach(function(r) {
    if (!r || r.id == null) return;
    var local = map[r.id];
    if (!local) { map[r.id] = r; }
    else {
      var localTs = local.updatedAt || 0;
      var remoteTs = r.updatedAt || 0;
      if (remoteTs > localTs) {
        if (local.favorite && !r.favorite) r.favorite = true;
        if (local.rating > (r.rating || 0)) r.rating = local.rating;
        map[r.id] = r;
      }
    }
  });
  return Object.values(map);
}

function saveToLS() {
  if (!Array.isArray(recipes)) recipes = [];
  recipes.forEach(function(r) {
    if (!r.updatedAt) r.updatedAt = Date.now();
    r.updatedAt = Date.now();
    r.updatedBy = getDeviceId();
  });
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function norm(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function escAttr(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ======================== NUTRITION ESTIMATOR ========================
const NUTRITION_DB = {
  // Mäso
  'kuracie prsia': {kcal:165, protein:31, fat:3.6, carbs:0}, 'kuracie stehno':{kcal:177, protein:25, fat:8.2, carbs:0}, 'kurací':{kcal:172, protein:27, fat:6.3, carbs:0}, 'kurča':{kcal:172, protein:27, fat:6.3, carbs:0},
  'mleté mäso':{kcal:250, protein:20, fat:18, carbs:0}, 'hovädzie':{kcal:250, protein:26, fat:15, carbs:0}, 'bravčové':{kcal:242, protein:27, fat:14, carbs:0}, 'bravčová krkovička':{kcal:250, protein:20, fat:18, carbs:0},
  'bravčová kotleta':{kcal:220, protein:28, fat:12, carbs:0}, 'bravčový bôčik':{kcal:300, protein:16, fat:26, carbs:0}, 'bravčové mäso':{kcal:242, protein:27, fat:14, carbs:0},
  'hovädzie mäso':{kcal:250, protein:26, fat:15, carbs:0}, 'hovädzia sviečková':{kcal:180, protein:30, fat:6, carbs:0},
  'morka':{kcal:135, protein:30, fat:1, carbs:0}, 'morie':{kcal:135, protein:30, fat:1, carbs:0},
  'kačka':{kcal:337, protein:18, fat:28, carbs:0}, 'kačacie':{kcal:337, protein:18, fat:28, carbs:0}, 'husacia':{kcal:370, protein:15, fat:35, carbs:0},
  'šunka':{kcal:145, protein:20, fat:7, carbs:1}, 'anglická slanina':{kcal:540, protein:12, fat:55, carbs:1}, 'slanina':{kcal:540, protein:12, fat:55, carbs:1},
  'klobása':{kcal:310, protein:18, fat:26, carbs:2}, 'saláma':{kcal:300, protein:18, fat:25, carbs:1}, 'špekáčik':{kcal:310, protein:15, fat:28, carbs:1},
  'pečeň':{kcal:135, protein:21, fat:5, carbs:2}, 'bryndza':{kcal:190, protein:14, fat:15, carbs:1},
  'paštéta':{kcal:300, protein:13, fat:27, carbs:1}, 'salam':{kcal:300, protein:18, fat:25, carbs:1},

  // Ryby
  'losos':{kcal:208, protein:20, fat:13, carbs:0}, 'tuniak':{kcal:184, protein:26, fat:8, carbs:0}, 'pstruh':{kcal:148, protein:21, fat:7, carbs:0},
  'makrela':{kcal:205, protein:19, fat:14, carbs:0}, 'sardinky':{kcal:208, protein:25, fat:11, carbs:0}, 'rybie filé':{kcal:150, protein:22, fat:6, carbs:0}, 'ryba':{kcal:150, protein:22, fat:6, carbs:0}, 'krevety':{kcal:85, protein:20, fat:0.5, carbs:0},

  // Mliečne
  'mlieko':{kcal:65, protein:3.3, fat:3.5, carbs:4.7}, 'smotana':{kcal:292, protein:2.5, fat:30, carbs:3}, 'šľahačková smotana':{kcal:340, protein:2, fat:36, carbs:3},
  'tvaroh':{kcal:103, protein:14, fat:4, carbs:3}, 'jogurt':{kcal:60, protein:5, fat:1.5, carbs:7}, 'biely jogurt':{kcal:62, protein:5, fat:1.5, carbs:7},
  'syr':{kcal:350, protein:25, fat:28, carbs:1.5}, 'mozzarella':{kcal:280, protein:22, fat:20, carbs:2}, 'parmezán':{kcal:431, protein:38, fat:29, carbs:4},
  'eidam':{kcal:356, protein:26, fat:28, carbs:0}, 'niva':{kcal:355, protein:21, fat:30, carbs:2}, 'gouda':{kcal:356, protein:26, fat:28, carbs:0},
  'maslo':{kcal:717, protein:0.9, fat:81, carbs:0.1}, 'margarín':{kcal:717, protein:0.5, fat:80, carbs:0.5},
  'vajce':{kcal:155, protein:13, fat:11, carbs:1.1}, 'vajcia':{kcal:155, protein:13, fat:11, carbs:1.1}, 'vajíčko':{kcal:155, protein:13, fat:11, carbs:1.1},

  // Obilniny a pečivo
  'múka':{kcal:364, protein:10, fat:1, carbs:76}, 'hladká múka':{kcal:364, protein:10, fat:1, carbs:76}, 'polohrubá múka':{kcal:364, protein:10, fat:1, carbs:76},
  'hrubá múka':{kcal:364, protein:10, fat:1, carbs:76}, 'celozrnná múka':{kcal:340, protein:13, fat:2, carbs:66},
  'chlieb':{kcal:265, protein:9, fat:1.5, carbs:52}, 'rožok':{kcal:286, protein:9, fat:2.5, carbs:55}, 'bageta':{kcal:280, protein:9, fat:2, carbs:55},
  'cestoviny':{kcal:350, protein:12, fat:1.5, carbs:73}, 'špagety':{kcal:350, protein:12, fat:1.5, carbs:73}, 'špagiet':{kcal:350, protein:12, fat:1.5, carbs:73}, 'rezance':{kcal:350, protein:12, fat:1.5, carbs:73},
  'ryža':{kcal:365, protein:7, fat:0.7, carbs:80}, 'ryža basmati':{kcal:360, protein:7, fat:0.6, carbs:80},
  'kuskus':{kcal:372, protein:12, fat:0.8, carbs:78}, 'bulgur':{kcal:342, protein:12, fat:1.3, carbs:68}, 'quinoa':{kcal:368, protein:14, fat:6, carbs:64},
  'ovsené vločky':{kcal:389, protein:17, fat:7, carbs:66}, 'vločky':{kcal:350, protein:12, fat:5, carbs:65},
  'strúhanka':{kcal:395, protein:10, fat:5, carbs:75}, 'palacinka':{kcal:210, protein:7, fat:8, carbs:28}, 'palacinky':{kcal:210, protein:7, fat:8, carbs:28},
  'pita':{kcal:260, protein:8, fat:1, carbs:52}, 'tortilla':{kcal:300, protein:8, fat:8, carbs:48},
  'kukurica':{kcal:365, protein:9, fat:4.7, carbs:74}, 'kukuričná':{kcal:365, protein:9, fat:4.7, carbs:74},

  // Zelenina
  'mrkva':{kcal:41, protein:0.9, fat:0.2, carbs:10}, 'petržlen':{kcal:36, protein:1.3, fat:0.5, carbs:6}, 'zeler':{kcal:16, protein:0.7, fat:0.2, carbs:3},
  'kapusta':{kcal:25, protein:1.3, fat:0.1, carbs:6}, 'kyslá kapusta':{kcal:15, protein:0.9, fat:0.1, carbs:3},
  'brokolica':{kcal:34, protein:2.8, fat:0.4, carbs:7}, 'karfiol':{kcal:25, protein:1.9, fat:0.3, carbs:5},
  'špenát':{kcal:23, protein:2.9, fat:0.4, carbs:3.6}, 'kel':{kcal:49, protein:4.3, fat:0.9, carbs:9},
  'cibuľa':{kcal:40, protein:1.1, fat:0.1, carbs:9}, 'cesnak':{kcal:149, protein:6.4, fat:0.5, carbs:33},
  'paprika':{kcal:31, protein:1, fat:0.3, carbs:6}, 'paradajka':{kcal:18, protein:0.9, fat:0.2, carbs:3.9}, 'rajčina':{kcal:18, protein:0.9, fat:0.2, carbs:3.9},
  'uhorka':{kcal:15, protein:0.7, fat:0.1, carbs:3.6}, 'cuketa':{kcal:17, protein:1.2, fat:0.3, carbs:3.1},
  'baklažán':{kcal:25, protein:1, fat:0.2, carbs:6}, 'patizón':{kcal:15, protein:1, fat:0.2, carbs:3},
  'fazuľa':{kcal:132, protein:8, fat:0.5, carbs:24}, 'šošovica':{kcal:116, protein:9, fat:0.4, carbs:20}, 'cícer':{kcal:139, protein:8, fat:2, carbs:22},
  'hrach':{kcal:81, protein:5.4, fat:0.4, carbs:14}, 'šošovica':{kcal:116, protein:9, fat:0.4, carbs:20},
  'kaleráb':{kcal:27, protein:1.7, fat:0.1, carbs:6}, 'reďkovka':{kcal:16, protein:0.7, fat:0.1, carbs:3},
  'šalát':{kcal:15, protein:1.4, fat:0.2, carbs:2.9}, 'rukola':{kcal:25, protein:2.6, fat:0.7, carbs:3.7},
  'avokádo':{kcal:160, protein:2, fat:15, carbs:9}, 'zemiak':{kcal:77, protein:2, fat:0.1, carbs:17}, 'zemiaky':{kcal:77, protein:2, fat:0.1, carbs:17},
  'batat':{kcal:86, protein:1.6, fat:0.1, carbs:20},
  'kôpor':{kcal:43, protein:3.5, fat:1.1, carbs:7}, 'pažítka':{kcal:30, protein:3, fat:0.7, carbs:4},
  'huby':{kcal:22, protein:3.1, fat:0.3, carbs:3.3}, 'šampiňóny':{kcal:22, protein:3.1, fat:0.3, carbs:3.3},

  // Ovocie
  'jablko':{kcal:52, protein:0.3, fat:0.2, carbs:14}, 'hruška':{kcal:57, protein:0.4, fat:0.1, carbs:15},
  'banán':{kcal:89, protein:1.1, fat:0.3, carbs:23}, 'pomaranč':{kcal:47, protein:0.9, fat:0.1, carbs:12},
  'citrón':{kcal:29, protein:1.1, fat:0.3, carbs:9}, 'grejf':{kcal:42, protein:0.8, fat:0.1, carbs:10},
  'hrozno':{kcal:69, protein:0.7, fat:0.2, carbs:18}, 'jahody':{kcal:33, protein:0.7, fat:0.3, carbs:8},
  'maliny':{kcal:52, protein:1.2, fat:0.7, carbs:12}, 'čučoriedky':{kcal:57, protein:0.7, fat:0.3, carbs:14},
  'čerešne':{kcal:50, protein:1, fat:0.3, carbs:12}, 'višne':{kcal:50, protein:1, fat:0.3, carbs:12},
  'marhuľa':{kcal:48, protein:1.4, fat:0.4, carbs:11}, 'broskyňa':{kcal:39, protein:0.9, fat:0.3, carbs:10},
  'slivka':{kcal:46, protein:0.7, fat:0.3, carbs:11}, 'kiwi':{kcal:61, protein:1.1, fat:0.5, carbs:15},
  'ananas':{kcal:50, protein:0.5, fat:0.1, carbs:13}, 'mango':{kcal:60, protein:0.8, fat:0.4, carbs:15},
  'vodný melón':{kcal:30, protein:0.6, fat:0.2, carbs:8}, 'melón':{kcal:34, protein:0.8, fat:0.2, carbs:8},

  // Oleje, tuky, orechy
  'olivový olej':{kcal:884, protein:0, fat:100, carbs:0}, 'olej':{kcal:884, protein:0, fat:100, carbs:0}, 'slnečnicový olej':{kcal:884, protein:0, fat:100, carbs:0},
  'masť':{kcal:902, protein:0, fat:100, carbs:0},
  'vlašské orechy':{kcal:654, protein:15, fat:65, carbs:14}, 'lieskové orechy':{kcal:628, protein:15, fat:61, carbs:17},
  'mandle':{kcal:579, protein:21, fat:50, carbs:22}, 'kešu':{kcal:553, protein:18, fat:44, carbs:30},
  'arašidy':{kcal:567, protein:26, fat:49, carbs:16}, 'sezam':{kcal:573, protein:18, fat:50, carbs:23},
  'slnečnicové semienka':{kcal:584, protein:21, fat:51, carbs:20}, 'tekvicové semienka':{kcal:446, protein:19, fat:19, carbs:54},
  'tahini':{kcal:595, protein:17, fat:53, carbs:21},
  'kokos':{kcal:354, protein:3.3, fat:33, carbs:15},
  'kešu maslo':{kcal:615, protein:18, fat:49, carbs:28}, 'arašidové maslo':{kcal:588, protein:25, fat:50, carbs:20},

  // Konzervy a omáčky
  'paradajkový pyré':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'paradajkový pretlak':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'pyré paradajkové':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'paradajková omáčka':{kcal:42, protein:1.8, fat:0.2, carbs:9},
  'kečup':{kcal:101, protein:1.3, fat:0.2, carbs:24}, 'horčica':{kcal:52, protein:3.7, fat:3.3, carbs:4},
  'majonéza':{kcal:680, protein:1, fat:75, carbs:1}, 'tatárska omáčka':{kcal:600, protein:0.8, fat:65, carbs:5},
  'sojová omáčka':{kcal:53, protein:5.3, fat:0.1, carbs:5}, 'oct':{kcal:18, protein:0, fat:0, carbs:0.6},
  'kyslá smotana':{kcal:136, protein:3.5, fat:13, carbs:3}, 'crème fraîche':{kcal:292, protein:2.5, fat:30, carbs:3},
  'kari pasta':{kcal:120, protein:3, fat:8, carbs:10},
  'bujón':{kcal:5, protein:0.5, fat:0.3, carbs:0.5}, 'vývar':{kcal:5, protein:0.5, fat:0.3, carbs:0.5},
  'konzervované paradajky':{kcal:18, protein:0.9, fat:0.2, carbs:3.9},

  // Koreniny, dochucovadlá
  'soľ':{kcal:0, protein:0, fat:0, carbs:0}, 'korenie':{kcal:20, protein:1, fat:0.5, carbs:5}, 'čierne korenie':{kcal:20, protein:1, fat:0.5, carbs:5},
  'paprika korenistá':{kcal:282, protein:14, fat:13, carbs:54}, 'mletá paprika':{kcal:282, protein:14, fat:13, carbs:54},
  'kmín':{kcal:333, protein:18, fat:15, carbs:44}, 'rasca':{kcal:333, protein:18, fat:15, carbs:44},
  'majorán':{kcal:271, protein:13, fat:7, carbs:60}, 'bobkový list':{kcal:55, protein:1.5, fat:0.5, carbs:10},
  'med':{kcal:304, protein:0.3, fat:0, carbs:82}, 'cukor':{kcal:387, protein:0, fat:0, carbs:100}, 'kryštálový cukor':{kcal:387, protein:0, fat:0, carbs:100},
  'práškový cukor':{kcal:389, protein:0, fat:0, carbs:100}, 'vanilkový cukor':{kcal:385, protein:0, fat:0, carbs:98},
  'vanilkový extrakt':{kcal:12, protein:0, fat:0, carbs:0.5},
  'droždie':{kcal:105, protein:14, fat:0.4, carbs:12}, 'kypriaci prášok':{kcal:50, protein:0, fat:0, carbs:10},
  'želatína':{kcal:335, protein:85, fat:0, carbs:0},
  'ocot':{kcal:18, protein:0, fat:0, carbs:0.6},
  'sóda bikarbóna':{kcal:0, protein:0, fat:0, carbs:0},

  // Sladkosti
  'čokoláda':{kcal:546, protein:5, fat:31, carbs:61}, 'mliečna čokoláda':{kcal:546, protein:5, fat:31, carbs:61},
  'kakao':{kcal:228, protein:19, fat:14, carbs:57}, 'nutella':{kcal:544, protein:7, fat:33, carbs:58},
  'džem':{kcal:260, protein:0.4, fat:0.1, carbs:68}, 'marmeláda':{kcal:260, protein:0.4, fat:0.1, carbs:68},
  'sušienky':{kcal:460, protein:6, fat:18, carbs:70}, 'keksy':{kcal:460, protein:6, fat:18, carbs:70},
  'medovník':{kcal:380, protein:5, fat:15, carbs:60}, 'bábovka':{kcal:350, protein:5, fat:14, carbs:52},
  'zmrzlina':{kcal:207, protein:3.5, fat:11, carbs:24},

  // Nápoje
  'pivo':{kcal:43, protein:0.5, fat:0, carbs:3.6}, 'víno':{kcal:85, protein:0.1, fat:0, carbs:2.6},
  'džús':{kcal:45, protein:0.6, fat:0, carbs:10}, 'sirup':{kcal:180, protein:0, fat:0, carbs:45},
  'káva':{kcal:2, protein:0.1, fat:0, carbs:0}, 'čaj':{kcal:1, protein:0, fat:0, carbs:0},

  // Ostatné
  'voda':{kcal:0, protein:0, fat:0, carbs:0}, 'minerálka':{kcal:0, protein:0, fat:0, carbs:0},
};
// Items that are typically counted per piece (approximate weight in g per piece)
const PIECE_WEIGHT = {
  'vajce':50, 'vajcia':50, 'vajíčko':50,
  'zemiak':150, 'zemiaky':150,
  'mrkva':80, 'cibuľa':80,
  'paradajka':100, 'rajčina':100,
  'paprika':120, 'banán':120,
  'jablko':150, 'pomaranč':150,
  'klobása':80, 'rožok':50,
  'kuracie prsia':200, 'kuracie stehno':150, 'kurací':150, 'kurča':1200,
  'strúčik':4, 'strúčiky':4, 'cesnak':4,
};
// Unit conversions
const UNIT_G = {
  'g':1, 'kg':1000, 'dkg':10, 'dag':10,
  'ml':1, 'l':1000, 'dl':100, 'cl':10,
  'pl':15, 'polievková lyžica':15, 'lyžica':15, 'lyžíc':15, 'lyžička':5, 'kl':5, 'čajová lyžička':5, 'čajové lyžičky':5,
  'šálka':240, 'hrnček':250, 'pohár':250,
};
function parseQuantity(raw) {
  let s = raw.trim();
  s = s.replace(/\b(mleté|prerastená|čerstvý|čerstvá|čerstvé|sušené|sušený|sušená|nakrájané|nakrájaný|nakrájaná|plátky|plátok|na kocky|na plátky|na mesiačiky|ošúpané|ošúpaný|vypečené|červenej|bieleho|tmavého|svetlej)\b/gi, '');
  const normed = s.toLowerCase().replace(/^\d+[\.\,]\s*/, m => m.replace(',','.')).trim();
  const fracMap = {'½':0.5,'¼':0.25,'¾':0.75,'⅓':0.333,'⅔':0.667,'⅕':0.2,'⅖':0.4,'⅗':0.6,'⅘':0.8,'⅙':0.167,'⅚':0.833,'⅛':0.125,'⅜':0.375,'⅝':0.625,'⅞':0.875};
  let val = 0, unit = null;
  for (const [f, v] of Object.entries(fracMap)) {
    if (normed.startsWith(f)) { val = v; break; }
  }
  const fracMatch = normed.match(/^(\d+)\s*\/\s*(\d+)/);
  if (fracMatch) val = parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
  const numMatch = normed.match(/^(\d+[\.\,]?\d*)/);
  if (numMatch) val = parseFloat(numMatch[1].replace(',','.')) || 0;
  if (val) {
    const afterNum = normed.replace(/^[\d\.\,\s]+/, '').trim();
    for (const [u, g] of Object.entries(UNIT_G)) {
      const re = new RegExp('^' + u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\.]');
      if (re.test(afterNum)) { unit = u; val *= g; break; }
    }
    if (!unit) {
      const pieceMatch = afterNum.match(/^(ks|kus|kusy|strúčik|strúčiky|plátok|plátky|list|listy|balík|balenia|vajce|vajcia|kura|cibule|mrkvy|zemiaky|papriky|paradajky|stehná|prsia)\b/);
      if (pieceMatch) unit = 'ks';
      // If followed by word chars (no space-delimited unit), also treat as pieces
      else if (afterNum.match(/^[a-záčďéěíňóřšťúůýž]/)) unit = 'ks';
    }
  }
  // Comma-separated fallback: try to find quantity anywhere in string
  if (!val || val === 100) {
    const gMatch = normed.match(/(\d+[\.\,]?\d*)\s*(kg|g|dkg|dag|ml|l|dl|cl)/);
    if (gMatch) {
      val = parseFloat(gMatch[1].replace(',','.'));
      const u = gMatch[2];
      val *= (UNIT_G[u] || 1);
      unit = u;
    } else {
      const numAny = normed.match(/(\d+[\.\,]?\d*)/);
      if (numAny) {
        const afterAny = normed.replace(/^[\d\.\,\s]+/, '').trim();
        if (afterAny.match(/^(ks|kus|kusy|strúčik|strúčiky|plátok|plátky|list|listy|balík|balenia)\b/)) {
          val = parseFloat(numAny[1].replace(',','.'));
          unit = 'ks';
        } else if (!unit) {
          val = parseFloat(numAny[1].replace(',','.'));
          unit = 'ks';
        }
      }
    }
  }
  return { grams: val > 0 ? val : 100, isPiece: unit === 'ks', val: val > 0 ? val : 100 };
}
const DESCRIPTIVE_STRIP = /\b(mleté|prerastená|čerstvý|čerstvá|čerstvé|sušené|sušený|sušená|nakrájané|nakrájaný|nakrájaná|ošúpané|vypečené|červenej|bieleho|tmavého|svetlej|domáce|domáci|domáca|čerstvo|hrsť|štipka|trochu|podľa|chuti)\b/gi;

function estimateNutrition(ingredients, portions) {
  const portionsNum = portions && portions > 0 ? portions : 4;
  let total = {kcal:0, protein:0, fat:0, carbs:0};
  let matchedCount = 0, unmatchedCount = 0, estimatedCount = 0;
  const unmatched = [];
  const matched = [];
  for (const raw of ingredients) {
    const ing = raw.trim();
    if (!ing) continue;
    processIngredient(ing);
  }
  function processIngredient(ing) {
    const { grams, isPiece, val } = parseQuantity(ing);
    const ingLookup = ing.toLowerCase().replace(DESCRIPTIVE_STRIP, '').trim();
    let best = null, bestLen = 0, bestKey = '';
    for (const [key, data] of Object.entries(NUTRITION_DB)) {
      if (ingLookup.includes(key) && key.length > bestLen) {
        best = data; bestLen = key.length; bestKey = key;
      }
    }
    let usedFallback = false;
    if (!best) {
      usedFallback = true;
      if (ingLookup.includes('olej') || ingLookup.includes('masť') || ingLookup.includes('maslo')) best = {kcal:700, protein:0, fat:78, carbs:0};
      else if (ingLookup.includes('mäso') || ingLookup.includes('mäsa')) best = {kcal:220, protein:25, fat:12, carbs:0};
      else if (ingLookup.includes('syr') || ingLookup.includes('tvaroh')) best = {kcal:280, protein:20, fat:22, carbs:1};
      else if (ingLookup.includes('cukor') || ingLookup.includes('med') || ingLookup.includes('sirup')) best = {kcal:350, protein:0, fat:0, carbs:87};
      else if (ingLookup.includes('múka') || ingLookup.includes('cestoviny') || ingLookup.includes('cestovina')) best = {kcal:350, protein:10, fat:1, carbs:75};
      else if (ingLookup.includes('zelenina') || ingLookup.includes('zeleniny')) best = {kcal:30, protein:1, fat:0.2, carbs:6};
      else if (ingLookup.includes('ovocie')) best = {kcal:50, protein:0.5, fat:0.2, carbs:12};
      else if (ingLookup.includes('korenie') || ingLookup.includes('soľ') || ingLookup.includes('bylinky')) best = {kcal:10, protein:0, fat:0, carbs:0};
    }
    if (best) {
      let gramsUsed = grams;
      if (isPiece) {
        let pw = 50;
        for (const [k, w] of Object.entries(PIECE_WEIGHT)) {
          if (ingLookup.includes(k)) { pw = w; break; }
        }
        gramsUsed = val * pw;
      }
      const factor = gramsUsed / 100;
      total.kcal += best.kcal * factor;
      total.protein += best.protein * factor;
      total.fat += best.fat * factor;
      total.carbs += best.carbs * factor;
      if (usedFallback) { estimatedCount++; unmatched.push(ing); }
      else { matchedCount++; matched.push({ing, matchedKey: bestKey, grams: gramsUsed}); }
    } else {
      unmatchedCount++;
      unmatched.push(ing);
    }
  }
  // Round total
  total.kcal = Math.round(total.kcal) || 0;
  total.protein = Math.round(total.protein) || 0;
  total.fat = Math.round(total.fat) || 0;
  total.carbs = Math.round(total.carbs) || 0;
  // Compute per-portion
  const pp = {
    kcal: Math.round(total.kcal / portionsNum) || 0,
    protein: Math.round(total.protein / portionsNum) || 0,
    fat: Math.round(total.fat / portionsNum) || 0,
    carbs: Math.round(total.carbs / portionsNum) || 0,
  };
  // Confidence
  const totalItems = matchedCount + estimatedCount + unmatchedCount;
  let confidence = 'presny';
  if (unmatchedCount > 0 || estimatedCount > 0) confidence = 'odhad';
  if (unmatchedCount > totalItems * 0.3) confidence = 'hruby';
  return {
    total,
    perPortion: pp,
    portions: portionsNum,
    confidence,
    matchedCount, estimatedCount, unmatchedCount,
    matched, unmatched,
  };
}

function sanitizeNutrition(nutrition, portions) {
  const p = portions || 4;
  const warnings = [];
  if (nutrition.kcal > 1200) warnings.push('kcal');
  if (nutrition.fat > 80) warnings.push('fat');
  if (nutrition.protein > 80) warnings.push('protein');
  if (nutrition.carbs > 150) warnings.push('carbs');
  return {
    warnings,
    hasWarnings: warnings.length > 0,
    isHeartyMeal: nutrition.kcal > 800 && nutrition.fat > 40,
  };
}

function autoFillNutrition() {
  const ingredients = document.getElementById('r-ingredients').value.split('\n').map(s => s.trim()).filter(Boolean);
  if (!ingredients.length) return;
  const portions = parseInt(document.getElementById('r-portions').value) || 4;
  const result = estimateNutrition(ingredients, portions);
  // Fill per-portion values
  document.getElementById('r-kcal').value = result.perPortion.kcal;
  document.getElementById('r-protein').value = result.perPortion.protein || '';
  document.getElementById('r-fat').value = result.perPortion.fat || '';
  document.getElementById('r-carbs').value = result.perPortion.carbs || '';
  // Show confidence
  const status = document.getElementById('nutrition-status');
  if (status) {
    const labels = {presny: '✅ Presný výpočet', odhad: '📐 Odhad', hruby: '⚠️ Hrubý odhad'};
    let text = labels[result.confidence] || '';
    if (result.unmatched.length) {
      text += `<br><span style="font-size:.7rem;opacity:.7;">⚠️ ${result.unmatched.length} ${t('unmatchedHint')}</span>`;
    }
    status.innerHTML = text;
  }
  // Portion info
  const info = document.getElementById('nutrition-portion-info');
  if (info) {
    info.textContent = `Na 1 porciu z ${result.portions} (celý recept: ${result.total.kcal} kcal)`;
  }
}

function estimateAndFillImport(ingrArray, yieldNum) {
  const result = estimateNutrition(ingrArray, yieldNum || 4);
  if (result.perPortion.kcal > 0) {
    document.getElementById('r-kcal').value = result.perPortion.kcal;
    document.getElementById('r-protein').value = result.perPortion.protein || '';
    document.getElementById('r-fat').value = result.perPortion.fat || '';
    document.getElementById('r-carbs').value = result.perPortion.carbs || '';
    document.getElementById('r-portions').value = result.portions;
  }
  return result;
}

