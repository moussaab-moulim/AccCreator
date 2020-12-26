//#region Global Variables
const readln = process.stdout;
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const open = promisify(fs.open);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const path = require('path');
const { XMLHttpRequest } = require('xmlhttprequest');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];
const isPkg = typeof process.pkg !== 'undefined';

let chromiumPath = isPkg
  ? puppeteer
      .executablePath()
      .replace(
        process.platform != 'win32'
          ? /^.*?\/node_modules\/puppeteer\/\.local-chromium/
          : /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      )
  : puppeteer.executablePath();

const siteData = {
  appName: 'dofus',
  app: 'https://www.dofus.com/fr/mmorpg/jouer',
  appHome: 'https://www.dofus.com/fr',
  appLogout:
    'https://account.ankama.com/sso?action=logout&from=https%3A%2F%2Fwww.dofus.com%2Ffr',
  username: '#userlogin',
  password: '#user_password',
  verify_pass: '#user_password_confirm',
  email: '#user_mail',
  birthDay: '#ak_field_1',
  birthMonth: '#ak_field_2',
  birthYear: '#ak_field_3',
  newletterCheck:
    'body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div:nth-child(1) > div > div > div > div.ak-inner-block > div > div.col-md-8 > div > form > fieldset > div > div > div > div:nth-child(8) > div > div > label',
  submit: '#submit_field',
  siteKey: '6LfbFRsUAAAAACrqF5w4oOiGVxOsjSUjIHHvglJx',
};

const defaultData = {
  inputFileName: 'proxy.txt',
  outputFileName: 'accounts.txt',
  dirs: {
    captureDir: 'capture',
    logDir: 'log',
    outDir: 'out',
  },
  proxyAllowedCountries: [
    'BD',
    'BE',
    'BJ',
    'MM',
    'BO',
    'CM',
    'CA',
    'CY',
    'FR',
    'GB',
    'IQ',
    'JP',
    'PG',
    'PY',
    'PR',
    'PE',
    'SV',
    'SD',
    'PS',
    'LK',
    'UA',
  ],
};

var nm1 = ["Acts","Affliction","Agony","Allies","Ambition","Angels","Anger","Anguish","Anomalies","Archers","Army","Assassins","Association","Atonement","Attack","Avengers","Avenging","Ban","Bandits","Bane","Beasts","Betrayal","Birth","Blaze","Blessing","Blood","Bond","Boon","Bounty","Brigade","Burden","Butchers","Champions","Children","Citizens","Civilians","Commandos","Companions","Conquerors","Contract","Corruption","Courage","Crew","Crushers","Cry","Curse","Damnation","Dawn","Deceivers","Demons","Desire","Destiny","Disciples","Disruption","Disturbance","Division","Dream","Dreamers","Duty","End","Enemies","Enigmas","Entities","Evolution","Executioners","Faith","Fame","Favor","Fiends","Fight","Fighters","Flames","Flash","Flight","Force","Forgiveness","Fortune","Freaks","Frenzy","Gang","Genocide","Ghosts","Gift","Gladiators","Glory","Grace","Grief","Grudge","Guardians","Guards","Hammers","Harbingers","Harmony","Harvesters","Hate","Hell","Heralds","Heroes","Home","Honor","Hope","Horde","Host","House","Howl","Hunters","Illusions","Immortals","Justice","Keepers","Killers","Knights","Last","Legacy","Legion","Light","Mages","Masters","Memories","Men","Mercenaries","Messengers","Might","Minds","Misery","Monsters","Mysteries","Mystery","Mystics","Myth","Nightmares","Oath","Oracles","Order","Outcasts","Outlaws","Outsiders","Overseers","Pact","Pain","Paladins","Passion","Patience","Peace","Phantoms","Plague","Promise","Prophecies","Prophets","Protection","Protectors","Punishment","Purification","Pursuit","Quiet","Rage","Raiders","Rangers","Rebellion","Rebels","Rebirth","Recovery","Recruits","Redemption","Refugees","Rejects","Relics","Requiem","Residents","Retaliation","Retribution","Revelations","Revenge","Riddles","Riders","Rise","Rivals","Roar","Rogues","Ruins","Rumours","Sacrifice","Safety","Scourge","Scouts","Screams","Screech","Secret","Secrets","Seducers","Seekers","Seers","Sentinels","Serenity","Service","Shades","Shadows","Shamans","Shame","Shepherds","Shields","Silence","Sinners","Smiles","Society","Soldiers","Sorcerers","Spears","Specters","Spirits","Spite","Squad","Stalkers","Stewards","Storm","Strangers","Strength","Struggle","Survivors","Swarm","Swords","Tears","Tempest","Templars","Terror","Thieves","Thugs","Thunder","Tirade","Torment","Tradition","Traitors","Tranquillity","Treasure","Trial","Trust","Vendetta","Vengeance","Venom","Victims","Vigor","Vikings","Villains","Vision","Visions","Visitors","Voice","Voices","Wards","Warlords","Warriors","Wealth","Weapons","Weight","Whisper","Whispers","Widows","Witches","Wizards","Women","Workers","Wound","Wraiths","Wrath","Yell"];
var nm2 = ["from the Empire","from the Forest","from the Grave","from the Mountains","from the Ocean","from the People","from the Sea","from the Woods","of Abandonment","of Ambition","of Angels","of Anger","of Betrayal","of Claws","of Corruption","of Courage","of Damnation","of Darkness","of Death","of Decay","of Deception","of Defiance","of Delusion","of Desire","of Devotion","of Disease","of Ending","of Extinction","of Faith","of Fear","of Forests","of Fortune","of Fury","of Hate","of Heroes","of Honor","of Hope","of Impurity","of Innocence","of Joy","of Life","of Light","of Loyalty","of Might","of Mountains","of Mystery","of Mystics","of Nature","of Oceans","of Patience","of Promises","of Purity","of Rejects","of Seduction","of Serenity","of Shadows","of Shame","of Skulls","of Strength","of Tricks","of Trust","of Vigor","of Virtue","of Wolves","of the Abandoned","of the Alligator","of the Ambitious","of the Angelic","of the Angry","of the Ape","of the Badger","of the Bear","of the Betrayed","of the Bitter","of the Boar","of the Bold","of the Bound","of the Brave","of the Buffalo","of the Bull","of the Carious","of the Cheeky","of the Classified","of the Claw","of the Clean","of the Cobra","of the Collapsed","of the Concealed","of the Corrupt","of the Corrupted","of the Cosmos","of the Cougar","of the Covert","of the Crocodile","of the Crooked","of the Crow","of the Crumbled","of the Damned","of the Dark","of the Dead","of the Decayed","of the Deceased","of the Deceived","of the Defiant","of the Deluded","of the Demonic","of the Departed","of the Depraved","of the Deserted","of the Desired","of the Despicable","of the Devoted","of the Discarded","of the Diseased","of the Disgraceful","of the Dishonest","of the Dissipated","of the Dog","of the Dove","of the Dragon","of the Dragonfly","of the Eager","of the Eagle","of the Earth","of the Ended","of the Enraged","of the Extinct","of the Faithful","of the Fallen","of the Fearless","of the Feeble","of the Fierce","of the Forbidden","of the Forest","of the Forgotten","of the Forsaken","of the Fortunate","of the Fox","of the Furious","of the Galaxy","of the Gorilla","of the Grave","of the Ground","of the Hallowed","of the Hateful","of the Hawk","of the Heroic","of the Hidden","of the Holy","of the Honest","of the Honored","of the Hopeful","of the Horse","of the Humble","of the Ill","of the Immoral","of the Impure","of the Infernal","of the Innocent","of the Jackal","of the Jaguar","of the Joyful","of the Joyous","of the Jungle","of the Lake","of the Lamb","of the Land","of the Last Age","of the Lewd","of the Light","of the Lion","of the Living","of the Lost","of the Lost Age","of the Loyal","of the Lynx","of the Mace","of the Meek","of the Mighty","of the Mislead","of the Moon","of the Mountain","of the Mysterious","of the Mystical","of the Natural","of the Nefarious","of the Night","of the Noble","of the Obscene","of the Obscure","of the Ocean","of the Owl","of the Passive","of the Patient","of the Perished","of the Pious","of the Poor","of the Pristine","of the Profane","of the Promised","of the Pure","of the Putrid","of the Ram","of the Rat","of the Raven","of the Reckless","of the Rejected","of the Resolute","of the Revenant","of the Rhino","of the Rich","of the Right","of the Righteous","of the Rotten","of the Ruined","of the Sacred","of the Sacrificed","of the Scorpion","of the Sea","of the Seduced","of the Serene","of the Serpent","of the Shadows","of the Shameless","of the Shark","of the Sheep","of the Shield","of the Sick","of the Sincere","of the Skull","of the Snake","of the Sophisticated","of the Spear","of the Spider","of the Stag","of the Stars","of the Stout","of the Strong","of the Sun","of the Sword","of the Taboo","of the Tainted","of the Talon","of the Tame","of the Tiger","of the Tricked","of the Trusted","of the Undead","of the Universe","of the Unknown","of the Valiant","of the Vanquished","of the Vicious","of the Vigorous","of the Virtuous","of the Void","of the Vulture","of the Wasted","of the Weak","of the Weasel","of the Wicked","of the Withered","of the Wolf","of the Wolves","of the Woods","of the World","of the Wretched","of the Wrong"];
var nm3 = ["Aqua","Arm","Banner","Battle","Bellow","Black","Blood","Blue","Bone","Boulder","Bright","Bronze","Burning","Chaos","Char","Cold","Cunning","Dark","Dashing","Doom","Drum","Earth","Ebon","Fallen","Fel","Fire","Forge","Forsaken","Frost","Gentle","Golden","Gray","Hallow","Hell","High","Hollow","Howling","Humming","Iron","Ivory","Jade","Killing","Lightning","Low","Mad","Magic","Marble","Metal","Midnight","Monster","Moon","Night","Poison","Quick","Rain","Raven","Red","Rumble","Running","Shadow","Shatter","Shimmer","Shiver","Silver","Snow","Solar","Split","Steel","Stone","Storm","Sun","Swift","Thunder","Tremble","Twin","Venom","Water","White","Wind","Wrecking"];
var nm4 = [" Assault"," Dragons"," Eagles"," Foxes"," Hawks"," Hearts"," Lust"," Maggots"," Oath"," Rage"," Rats"," Wolves","arrows","bane","beards","blades","bow","brand","brawlers","breaker","brows","cloaks","clouds","crawlers","crushers","cry","dawn","death","fall","field","fists","flags","flayers","force","ford","forge","fury","garde","glades","guard","guards","hammers","hands","hoods","landers","laws","light","manes","mantles","might","pikes","roses","scars","shade","shapers","shields","shifters","shroud","sins","skulls","smiths","song","stars","stand","striders","swords","talons","thorn","tops","tips","vale","well"];
var nm5 = ["Abandoned","Accurate","Alchemy","Alpha","Ambitious","Amused","Angelic","Angry","Arcane","Aspiring","Assassins","Assorted","Awful","Banished","Betrayed","Bite-sized","Bitter","Black","Blades","Blue","Bold","Bound","Bounty","Brave","Broken","Burning","Chosen","Clean","Closed","Collapsed","Common","Concealed","Contract","Corrupt","Corrupted","Crescent","Crimson","Crumbled","Cutlass","Damned","Dark","Dazzling","Decayed","Deceased","Deceived","Defiant","Delicate","Deluded","Demolition","Demonic","Departed","Depraved","Deserted","Desired","Despicable","Devoted","Discarded","Diseased","Disgraceful","Dishonest","Dispensable","Divided","Electric","Elite","Emerald","Encircling","Enraged","Eternal","Ethereal","Extra-Small","Faded","Fallen","Famous","Fast","Fearless","Fierce","Flesh","Fluttering","Forbidden","Forgotten","Forsaken","Fortunate","Funny","Furious","Golden","Grave","Grouchy","Grubby","Hallowed","Harmonious","Heavens","Hellfire","Heroic","Hidden","High","Holy","Honest","Honored","Hopeful","Humble","Icky","Ill","Immoral","Impure","Independent","Infamous","Infernal","Innocent","Iron","Itchy","Jolly","Joyful","Joyous","Jumpy","Large","Last","Living","Lost","Macabre","Massive","Mental","Mighty","Mini","Mislead","Moonlight","Mortal","Mysterious","Mystic","Mystical","Nameless","Nefarious","Noble","Nocturnal","Obscene","Obscure","Omega","Ominous","Open","Ordained","Ordinary","Perished","Phobic","Pious","Power","Pristine","Profane","Promised","Pure","Purple","Putrid","Reckless","Red","Rejected","Resolute","Revenant","Righteous","Rising","Roaring","Robust","Rogue","Rotten","Royal","Ruined","Sacred","Sacrificed","Scarlet","Scary","Scourge","Sealed","Searing","Sedated","Shaded","Shadow","Shameless","Shattered","Shivering","Sightless","Silent","Sleeping","Sore","Super","Tainted","Tasty","Tempest","Templar","Tricked","Trusted","Twilight","Tyranny","Ugly","Unarmed","Unknown","Unseen","Valiant","Vanquished","Vicious","Vigorous","Virtuous","Vulgar","Wasted","Weak","Wicked","Winged","Withered","World","Worthless","Wretched","Wrong","Grim"];
var nm6 = ["Admirals","Alliance","Ancients","Anomalies","Apocalypse","Ashes","Assailant","Assassins","Assault","Berserkers","Blow","Brigade","Brothers","Butchers","Champions","Chaos","Criminals","Crossfire","Crusaders","Death","Defeat","Demons","Devils","Discipline","Domination","Dominion","Doom","Dust","Dynasty","Embers","End","Enemy","Entities","Executors","Exiles","Exterminators","Fall","Feast","Force","Gang","Gangsters","Genesis","Genocide","Gods","Grave","Gunslingers","Harvesters","Headhunters","Helix","Honour","Hooligans","Hunters","Illusions","Immortals","Inferno","Intent","Jackals","Killers","Knights","Legacy","Legion","Liquidators","Mafia","Maggots","Moguls","Nightmare","Noobs","Oblivion","Occupation","Outlaws","Paradox","Perception","Pergatory","Plague","Power","Predation","Predators","Prestige","Primeval","Privilege","Punished","Punks","Rage","Rebels","Regiment","Sacrament","Saints","Serenity","Shadow","Shadows","Sharpshooters","Singularity","Slayers","Soldiers","Squad","Strategy","Supremacy","Switchblades","Syndicate","Synergy","Thugs","Thunder","Titans","Tyranny","Valor","Vanguard","Vanguardians","Vanguards","Vengeance","Veterans","Vigor","Vigorous","Vikings","Vitality","Voltiac","Vultures","War","Warfare","Warheads","Widowmakers","Wolverines","Wound","Incarnation"];

var nm7 = ["enigme","equipe","evolution","Affliction","Agonie","Agression","Alliance","Ambition","Angoisse","Apocalypse","Armee","Association","Attaque","Aubaine","Aube","Aurore","Avant-Garde","Benediction","Bande","Bataille","Brigade","Chaarge","Chute","Clemence","Condamnation","Corruption","Croyance","Defaite","Damnation","Discipline","Division","Domination","Douleur","Dynastie","Expiration","Fête","Faveur","Fin","Flamme","Foi","Force","Fortune","Frenesie","Furie","Genese","Gloire","Grace","Guerre","Haine","Harmonie","Honte","Horde","Horreur","Illusion","Importance","Incarnation","Intention","Justice","Legion","Liaison","Lumiere","Lutte","Mafia","Malediction","Misere","Naissance","Paix","Passion","Patience","Perte","Perturbation","Peste","Plaie","Poursuite","Predation","Prime","Promesse","Prophetie","Protection","Puissance","Punition","Purification","Rebellion","Redemption","Resistance","Revelation","Rage","Rancune","Relique","Renaissance","Richesse","Ruine","Rumeur","Serenite","Sanction","Singularite","Societe","Sorcieres","Souffrance","Strategie","Suprematie","Synergie","Tempête","Terreur","Tirade","Tombe","Tradition","Trahison","Traite","Tranquillite","Tuerie","Tyrannie","Vaillance","Valeur","Vendetta","Vengeance","Vigueur","Vision","Vitalite","Voix","enigmes","epees","Anomalies","Armes","Bêtes","Brutes","Cendres","Entites","Flammes","Horreurs","Lances","Larmes","Memoires","Ogives","Ombres","Propheties","Reliques","Sentinelles","Veuves","Victimes","Voix","equipage","Accord","Assaut","Cauchemar","Chatiment","Chagrin","Chaos","Contrat","Coup","Courage","Cri","Depit","Desir","Destin","Devoir","Don","Enfer","Espoir","Essaim","Fardeau","Feu","Fleau","Genocide","Gang","Heritage","Hote","Honneur","Incendie","Jugement","Malheur","Murmure","Mystere","Mythe","Orage","Ordre","Oubli","Pacte","Paradoxe","Patrimoine","Pouvoir","Prestige","Privilege","Purgatoire","Regiment","Rêve","Requiem","Sacrement","Sacrifice","Sang","Serment","Service","Silence","Syndicat","Tonnerre","Tourment","Tresor","Venin","Vol","emissaires","etrangers","Actes","Allies","Amiraux","Ancients","Anges","Archers","Assassins","Asticots","Bandits","Bannis","Bergers","Berserkers","Bouchers","Boucliers","Bourreaux","Carcajous","Cauchemars","Cavaliers","Chacals","Chamans","Champions","Chasseurs","Chercheurs","Chevaliers","Citoyens","Combattants","Commandos","Compagnon","Conquerants","Criminels","Cris","Croises","Demons","Diables","Dieux","Disciples","Enchanteurs","Enfants","Ennemis","Esprits","Executeurs","Exiles","Exterminateurs","Fantômes","Femmes","Flingueurs","Freres","Gangsters","Gardes","Gardiens","Gladiateurs","Glaives","Guerriers","Herauts","Heros","Harceleurs","Hommes","Hooligans","Immortels","Intendants","Liquidateurs","Maîtres","Mages","Marteaux","Massacreurs","Mercenaires","Militantes","Monstres","Murmures","Mysteres","Mystiques","Oracles","Pecheurs","Paladins","Predateurs","Presages","Prophetes","Protecteurs","Refugies","Residents","Rêveurs","Raiders","Rebelles","Revenants","Rivaux","Seducteurs","Sabres","Saints","Satins","Scelerats","Scouts","Secrets","Soldats","Sorciers","Sourires","Spectres","Stewards","Surveillants","Survivants","Templiers","Titans","Traîtres","Trompeurs","Tueurs","Veterans","Vainqueurs","Vautours","Vengeurs","Vestiges","Vikings","Visiteurs","Voleurs","Voyants","Voyous"];
var nm8a = ["ecarte","ehonte","electrique","emeraude","esoterique","eternel","ethere","Abandonne","Abominable","Ambitieux","Amer","Amuse","Angelique","Atrophie","Audacieux","Avide","Banni","Bleu","Brûlant","Brave","Cache","Carie","Casse","Chanceux","Choisi","Classifie","Commun","Corrompu","Corrumpu","Courageux","Courbe","Cramoisi","Decede","Dechu","Defunt","Delaisse","Delave","Demoniaque","Deprave","Deserte","Detestable","Devoue","Damne","Diabolique","Disparu","Disponsable","Dissipe","Divise","Feroce","Fameux","Fidele","Furieux","Heroïque","Honnête","Honore","Honteux","Ignoble","Immoral","Impur","Incarnat","Inconnu","Infame","Infernal","Interdit","Intrepide","Invisible","Loyal","Mechant","Meprisable","Majestueux","Malade","Malhonnête","Maudit","Miserable","Mort","Mysterieux","Mystique","Naturel","Noble","Noir","Obscene","Obscur","Optimiste","Oublie","Passif","Perdu","Perpetuel","Pieux","Pourri","Precis","Promis","Puissant","Pur","Putride","Resolu","Rejete","Riche","Ruine","Sacre","Sacrifie","Scandaleux","Secret","Serein","Sincere","Sombre","Spirituel","Temeraire","Tabou","Termine","Terrible","Trahi","Trompe","Vaillant","Vaincu","Vertueux","Vicieux","Vigoureux","Vivant","Volatil","Voulu","Sans Peur","d'elite","d'emeraude","d'epee","d'etoile","d'Abandon","d'Agneau","d'Aigle","d'Alchimie","d'Ambition","d'Ange","d'Assassins","d'Empire","d'Extinction","d'Ignorance","d'Inconnu","d'Innocence","d'Obscurite","d'Ombre","d'Optimistes","Chance","Colere","Condamnation","Corruption","Courage","Crainte","Defi","Delaissement","Demolition","Desir","Damnation","Destin","Disparation","Foi","Fortune","Fureur","Galaxie","Jungle","Lumiere","Mort-Vivant","Perversion","Peur","Pourriture","Prime","Promesse","Serenite","Sacrilege","Soleil","Terminaison","Terre","Trahison","Tromperie","Vaillance","age Perdu","Accord","Alpha","Araignee","Ocean","Ours","Univers","Belette","Bison","Cavalerie","Colombe","Corruption","Demande","Fin","Foi","Forêt","Fortune","Galaxie","Griffe","Jungle","Lance","Libellule","Lumiere","Lune","Mer","Montagne","Nature","Nuit","Resistance","Terre","Tombe","Vie","ehontes","etoiles","Abandonnes","Abominables","Agneaux","Aigles","Alligators","Amers","Anges","Bisons","Blaireaux","Braves","Buffles","Caches","Carieux","Chiens","Cobras","Colombes","Corruptions","Courbeaux","Crocodiles","Croyants","Decedes","Depraves","Diaboliques","Dociles","Dragons","Feroces","Faibles","Forts","Griffes","Heros","Humbles","Immoraux","Impurs","Inconnus","Infames","Infernaux","Innocents","Interdits","Libellules","Loups","Loyaux","Mechants","Malades","Miserables","Morts-Vivants","Moutons","Mysterieux","Mystiques","Nobles","Obscenes","Obscurs","Optimistes","Oublies","Ours","Pauvres","Perdus","Pieux","Pourris","Promesses","Propres","Puissants","Pumas","Purs","Putrides","Rejetes","Riches","Sacres","Sacrifies","Sangliers","Serpents","Sinceres","Singes","Temeraires","Tabous","Taureaux","Trahis","Trompe","Trompes","Trucs","Vaincus","Vampires","Vertueux","du Alligator","du Blaireau","du Bois","du Bouclier","du Buffle","du Cerf","du Chacal","du Cheval","du Chien","du Cobra","du Contrat","du Corbeau","du Cosmos","du Crane","du Crocodile","du Defi","du Dernier age","du Destin","du Dragon","du Faucon","du Fourre","du Gorille","du Hibou","du Jaguar","du Lac","du Lion","du Loup","du Lynx","du Monde","du Mouton","du Puma","du Rat","du Reguin","du Renard","du Rhinoceros","du Sanglier","du Scorpion","du Serpent","du Siecle","du Singe","du Soleil","du Talon","du Taureau","du Tigre","du Vampire","du Vautour","du Vide","en Colere","en Miettes"];
var nm8b = ["ecartee","ehontee","electrique","emeraude","esoterique","eternelle","etheree","Abandonnee","Abominable","Ambitieuse","Amere","Amusee","Angelique","Atrophiee","Audacieuse","Avide","Bannie","Bleue","Brûlante","Brave","Cachee","Cariee","Cassee","Chanceuse","Choisie","Classifiee","Commune","Corrompue","Corrumpue","Courageuse","Courbee","Cramoisie","Decedee","Dechue","Defunte","Delaissee","Delavee","Demoniaque","Depravee","Desertee","Detestable","Devouee","Damnee","Diabolique","Disparue","Disponsable","Dissipee","Divisee","Feroce","Fameuse","Fidele","Furieuse","Heroïque","Honnête","Honoree","Honteuse","Ignoble","Immorale","Impure","Incarnate","Inconnue","Infame","Infernale","Interdite","Intrepide","Invisible","Loyale","Mechante","Meprisable","Majestueuse","Malade","Malhonnête","Maudite","Miserable","Morte","Mysterieuse","Mystique","Naturelle","Noble","Noire","Obscene","Obscure","Optimiste","Oubliee","Passive","Perdue","Perpetuelle","Pieuse","Pourrie","Precise","Promise","Puissante","Pure","Putride","Resolue","Rejetee","Riche","Ruinee","Sacree","Sacrifiee","Scandaleuse","Secrete","Sereine","Sincere","Sombre","Spirituelle","Temeraire","Tabou","Terminee","Terrible","Trahie","Trompee","Vaillante","Vaincue","Vertueuse","Vicieuse","Vigoureuse","Vivante","Volatile","Voulue"];

function nameGen(type){
	var tp = type;
	
	var names = ""
	const i = Math.floor(Math.random() * 10) ;
	
		if(tp === 1){
			if(i < 3){
				rnd = Math.random() * nm5.length | 0;
				rnd2 = Math.random() * nm6.length | 0;
				names = nm5[rnd] + " " + nm6[rnd2];
			}else if(i < 7){
				rnd = Math.random() * nm1.length | 0;
				rnd2 = Math.random() * nm2.length | 0;
				names = nm1[rnd] + " " + nm2[rnd2];
			}else{
				rnd = Math.random() * nm3.length | 0;
				rnd2 = Math.random() * nm4.length | 0;
				names = nm3[rnd] + nm4[rnd2];
			}
		}else{
			rnd = Math.random() * nm7.length | 0;
			rnd2 = Math.random() * nm8a.length | 0;
			if(rnd2 < 120){
				if(rnd < 141){
					if(rnd < 120){
						names = nm7[rnd] + " " + nm8b[rnd2];
					}else{
						names = nm7[rnd] + " " + nm8b[rnd2] + "s";
					}
				}else{
					if(rnd < 199){
						names = nm7[rnd] + " " + nm8a[rnd2];
					}else{
						plur = nm8a[rnd2].charAt(nm8a[rnd2].length-1);
						plurx = nm8a[rnd2].charAt(nm8a[rnd2].length-2);
						if(plur === "s" || plur === "x"){
							names = nm7[rnd] + " " + nm8a[rnd2];
						}else if(plur === "l" && plurx === "a"){
							names = nm7[rnd] + " " + nm8a[rnd2].slice(0, -1) + "ux";
						}else{
							names = nm7[rnd] + " " + nm8a[rnd2] + "s";
						}
					}
				}
			}else{
				names = nm7[rnd] + " " + nm8a[rnd2];
			}
		}
			
		return names
	
	
}

const stdClrs = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

const ipValidityUrl = 'https://hidemyna.me/api/geoip.php?out=js&htmlentities';
const antiCaptchaKey = '6509269ba268eeb444acc01333d32e75'; //Anti-captcha key
const createTaskUrl = 'https://api.anti-captcha.com/createTask';
const getTaskResultUrl = 'https://api.anti-captcha.com/getTaskResult';
const mailDomain = '@moulimmoussaab.ml'; //remplacez par votre domaine mail
const key = 'k_8cm5OIGrNWo2TmbZpktWQPNKB6px7LxumkfzDrrdjLk'; // cle API mail
const getMailListUrl = 'https://mailsac.com/api/addresses/'; //appel API mail

// Filtering and detecting arguments
const arguments = process.argv;
let skipNext = false;
let inputFile,
  outputFile,
  useProxy = true,
  useEmulation = false;

arguments.forEach((arg, key) => {
  if (key < 1 || skipNext) {
    skipNext = false;
    return;
  }
  if (arg[0] === '-') {
    skipNext = true;
    switch (arg[1]) {
      case 'i':
        inputFile = arguments[key + 1];
        break;

      case 'o':
        outputFile = arguments[key + 1];
        break;

      case '-':
        switch (arg.substring(2)) {
          case 'use-proxy':
            useProxy = true;
            break;

          case 'no-proxy':
            useProxy = false;
            break;

          case 'use-emulation':
            useEmulation = true;
            break;

          case 'no-emulation':
            useEmulation = false;
            break;

          default:
            break;
        }
        break;

      default:
        skipNext = false;
        console.error('Unknown argument Encountered');
        break;
    }
  }
});

if (!inputFile) {
  inputFile = defaultData.inputFileName;
}
if (!outputFile) {
  outputFile = defaultData.dirs.outDir + '/' + defaultData.outputFileName;
}

//#endregion

//#region Helper Functions

const delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });

const tempId = () => {
  const oneTwo = Math.floor(Math.random() * 2) + 1 ;

  let firstLtr = nameGen(oneTwo);
  const ran = Math.floor(Math.random() * 999) + 1 ;
  return firstLtr.replace(/\s/g,'').replace("'","").toLowerCase().replace(/[eeeë]/g,"e")+ran;
};

const getRnd = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getFrenchMonth = function (month) {
  const months = {
    '1': 'Janvier',
    '2': 'Fevrier',
    '3': 'Mars',
    '4': 'Avril',
    '5': 'Mai',
    '6': 'Juin',
    '7': 'Juillet',
    '8': 'Aout',
    '9': 'Septembre',
    '10': 'Octobre',
    '11': 'Novembre',
    '12': 'Decembre',
  };

  return months[`${month}`];
};

var _loadTick = 0;
var _msg = '';
const waiting = (msg, t) => {
  _msg = msg;
  return setInterval(() => {
    readln.clearLine();
    readln.cursorTo(0);
    _loadTick = (_loadTick + 1) % 4;

    var dots = new Array(_loadTick + 1).join('.');
    readln.write(msg + dots);
  }, t);
};

const stopWaiting = (timer, status) => {
  clearInterval(timer);
  loadTick = 0;
  readln.clearLine();
  readln.cursorTo(0);
  readln.write(_msg + '... ' + status + stdClrs.Reset + '\n');
};

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const getTwoDigitString = (no) => ('0' + no.toString()).slice(-2);

var getDateTime = () => {
  let date = new Date();
  return (
    '[' +
    getTwoDigitString(date.getDate()) +
    '-' +
    getTwoDigitString(date.getMonth()) +
    '-' +
    getTwoDigitString(date.getFullYear()) +
    ' ' +
    getTwoDigitString(date.getHours()) +
    ':' +
    getTwoDigitString(date.getMinutes()) +
    ':' +
    getTwoDigitString(date.getSeconds()) +
    ']'
  );
};

//#endregion

//#region Utility Functions
//#region   File Control Functions

const checkDir = async (dir, callback) =>
  new Promise(async (resolve, reject) => {
    await stat(dir, function (err, stats) {
      if (!err) return;
      if (err && err.errno === -4058) {
        mkdir(dir);
      } else {
        callback(err);
      }
    });
  });

const readInputFile = (fileName) =>
  new Promise(async (resolve, reject) => {
    console.log('\x1b[36m%s\x1b[0m', 'Createur compte - Syliaz#1452');
    console.log(
      '\x1b[36m%s\x1b[0m',
      'Discord : https://discordapp.com/invite/FqwpVQW'
    );

    try {
      readFile(fileName, 'utf-8', (err, content) => {
        if (err) {
          return reject(err);
        }

        var proxyList = [];
        content.split('\n').forEach((line, key) => {
          let proxy = line.trim().split(':');

          if (proxy == '' || proxy[2].split('.').length < 4) {
            // console.error('Invalid type of IP address Detected: ', proxy);
            return;
          }

          let tempObj = {};
          tempObj['_id'] = key;
          tempObj['username'] = proxy[0];
          tempObj['password'] = proxy[1];
          tempObj['ip'] = proxy[2];
          tempObj['port'] = proxy[3];

          proxyList.push(tempObj);
        });

        if (proxyList.length == 0) {
          console.log(
            'No Proxy IPs found in the given file.\nTerminating application...'
          );
          return reject({ errorId: 1, msg: 'No IP found' });
        }

        console.log(`${proxyList.length} proxy IPs found`);
        return resolve(proxyList);
      });
    } catch (err) {
      console.log(`Error occured when reading \'${fileName}\'': `, err);
      return reject({ errorId: -1, error: err });
    }
  });

const writeOutputFile = (fileName, data) =>
  new Promise(async (resolve, reject) => {
    open(fileName, 'a', (err, fd) => {
      if (err) throw err;
      fs.appendFile(fd, data, 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        if (err) throw err;
        resolve({ status: 'success' });
      });
    });
  });

const LOG = async (log) => {
  await writeOutputFile('log/LOG.txt', `${getDateTime()} ${log}\n`);
};

//#endregion
//#region   Browser Control functions

// Initialize browser window for proxy details
const initBrowser = (proxy) =>
  new Promise(async (resolve, reject) => {
    try {
      let browser = await puppeteer.launch({
        executablePath: chromiumPath,
        // headless: false,
        // slowMo: 100,
        args: useProxy ? [`--proxy-server=${proxy.ip}:${proxy.port}`] : [],
      });

      resolve(browser);
    } catch (error) {
      console.log('Error in initBrowser: ', error);
      // reject(error);
    }
  });

// Close pre-opened browser window
const closeBrowser = (browser) =>
  new Promise(async (resolve, reject) => {
    try {
      await browser.close();
      return resolve({ status: 'success' });
    } catch (error) {
      console.log('Error in closeBrowser: ', error);
      reject(error);
    }
  });

//#endregion
//#region   Network Requests

const creatAntiCaptchaTask = () =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = function (e) {
      if (http.readyState === 4) {
        let taskData = JSON.parse(http.responseText);
        if (taskData.errorId !== 0) reject(taskData);
        resolve(taskData);
      } else console.log("Error in response Data 'anti-captcha task creation'");
    };

    try {
      http.open('POST', createTaskUrl, true);
      http.responseType = 'json';
      http.send(
        JSON.stringify({
          clientKey: `${antiCaptchaKey}`,
          task: {
            type: 'NoCaptchaTaskProxyless',
            websiteURL: 'https://www.dofus.com/fr/mmorpg/jouer',
            websiteKey: `${siteData.siteKey}`,
          },
          softId: 0,
          languagePool: 'en',
        })
      );
    } catch (err) {
      console.log('Error in anti-captcha request', err);
      reject(err);
    }
  });

const getAntiCaptchaResponseKey = (taskId) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = async function (e) {
      let response = JSON.parse(http.responseText);

      if (response.status === 'processing') {
        setTimeout(() => {
          return resolve(getAntiCaptchaResponseKey(taskId));
        }, 2000);
      } else {
        if (response.errorId !== 0) return reject(response);
        return resolve(response);
      }
    };

    try {
      http.open('POST', getTaskResultUrl, true);
      http.responseType = 'json';
      http.send(
        JSON.stringify({
          clientKey: `${antiCaptchaKey}`,
          taskId: `${taskId}`,
        })
      );
    } catch (error) {
      console.log('Error in anti-captcha responseKey request', error);
      return reject(error);
    }
  });

const getValidationLink = (email) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = function (e) {
      let mails = JSON.parse(http.responseText);

      let mailCount = 0;
      mails.forEach((mail) => {
        mailCount++;
        mail.links.forEach((link) => {
          if (link.indexOf('www.dofus.com') >= 0) {
            return resolve(link);
          }
        });
      });

      if (mailCount == 0) {
        setTimeout(() => {
          return resolve(getValidationLink(email));
        }, 2000);
      }
    };

    http.open(
      'GET',
      getMailListUrl + email + '/messages?_mailsacKey=' + key,
      true
    );
    http.responseType = 'json';
    http.send();
  });
const getEmailAvailability = (email) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = function (e) {
      let reponse = JSON.parse(http.responseText);
      if (reponse.available == true) {
        let http2 = new XMLHttpRequest();
        http.onload = function (e) {
          let reponse = JSON.parse(http2.responseText);
          if (reponse.enablews == true) {
            return resolve(email);
          }
        };

        http2.open(
          'POST',
          'https://mailsac.com/api/addresses/' + email + '?_mailsacKey=' + key,
          true
        );
        http2.responseType = 'json';
        http2.send();
      }
    };

    http.open(
      'GET',
      'https://mailsac.com/api/addresses/' +
        email +
        '/availability?_mailsacKey=' +
        key,
      true
    );
    http.responseType = 'json';
    http.send();
  });

const getAllMails = () =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();
    let mailList = [];

    http.onload = () => {
      let mails = JSON.parse(http.responseText);

      mails.forEach((mail) => {
        mailList.push(mail);
      });

      return resolve(mailList);
    };
    http.open('GET', getMailListUrl + '?_mailsacKey=' + key, true);
    http.responseType = 'json';
    http.send();
  });

const releaseEmail = (email) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = () => {
      return resolve();
    };
    http.open('DELETE', getMailListUrl + email + '?_mailsacKey=' + key, true);
    http.responseType = 'json';
    http.send();
  });

const getMail = (mailId) =>
  new Promise(async (resolve) => {
    let http = new XMLHttpRequest();

    http.onload = () => {
      if (http.readyState === 4) {
        let msg = JSON.parse(http.responseText);
        // console.log(mailId, msg);
        return resolve(msg);
      }
    };
    http.open(
      'GET',
      `https://mailsac.com/api/addresses/*@exemple.com/messages/${mailId}/?_mailsacKey=` +
        key
    ); //mettre domaine mail & cle api mail
    http.send();
  });

const deleteMail = (mailId) =>
  new Promise(async (resolve) => {
    let http = new XMLHttpRequest();

    http.onload = () => {
      if (http.readyState === 4) {
        let msg = JSON.parse(http.responseText);
        // console.log(mailId, msg);
        return resolve(msg);
      }
    };
    http.open(
      'DELETE',
      `https://mailsac.com/api/addresses/*@gmail.msdc.co/messages/${mailId}/?_mailsacKey=` +
        key
    ); //mettre domaine mail & cle api mail
    http.send();
  });

//#endregion
//#endregion

//#region Task Handling Functions

const handleProxyFile = async () => {
  // TODO
};

const handleAntiCaptcha = async () => {
  await LOG('Creating Anti-Captcha Task');
  let task;
  try {
    task = await creatAntiCaptchaTask();
    await LOG(`Anti-Captcha Task created: ${JSON.stringify(task)}`);
  } catch (error) {
    await LOG(`An error occured: ${error}`);
    return false;
  }

  await LOG('Requesting Anti-Captcha response key');
  let response = null;
  try {
    response = await getAntiCaptchaResponseKey(task.taskId);
    await LOG(
      `Anti-Captcha response key recieved: ${JSON.stringify(response)}`
    );

    response = response.solution.gRecaptchaResponse;
  } catch (error) {
    await LOG(`An error occured: ${error}`);
    return false;
  }

  return response;
};

const handleFormSubmission = async (dataIn) => {
  let browser, status;
  if (useProxy) {
    await LOG('Using Proxy for browser');
    console.log(`Using proxy ${dataIn.proxy.ip}:${dataIn.proxy.port}`);
    browser = await initBrowser(dataIn.proxy);
    console.log(`init browser`);
    await LOG('Initializing Browser');

    let page = await browser.newPage();
    await page.authenticate({
      username: dataIn.proxy.username,
      password: dataIn.proxy.password,
    });

    //#region Proxy Validity Check

    let proxyValidity = waiting('Checking proxy Validity', 800);

    try {
      await LOG('Trying to validate IP using an API');
      await page.goto(ipValidityUrl, { waitUntil: 'load' });
      console.log(`ip validity`);
    } catch (err) {
      await LOG('Error occured during loading IP validation API');
      console.log(`Error occured during loading IP validation API`);
      await page.close();
      await closeBrowser(browser);
      stopWaiting(proxyValidity, stdClrs.FgRed + 'ERROR');

      return {
        errorId: 3,
        msg: 'Unknown Proxy Error',
        error: err,
      };
    }
    await LOG('IP validation URL loaded');

    let proxyInfo = await page.evaluate(() => {
      let div = document.querySelector('body > pre'),
        jsonObject = JSON.parse(div.innerText),
        key = Object.keys(jsonObject);

      return jsonObject[key];
    });
    await LOG(`Proxy infomarmation recorded: ${proxyInfo}`);

    await LOG('Checking for validity of IP');
    let isValid =
      defaultData.proxyAllowedCountries.find((element) => {
        return proxyInfo[0] == element;
      }) == proxyInfo[0];

    if (!isValid) {
      await LOG('IP is not from a valid country');
      await page.close();
      await closeBrowser(browser);
      stopWaiting(proxyValidity, proxyInfo[0] + stdClrs.FgMagenta + ' INVALID');

      return {
        errorId: 2,
        msg: 'Proxy IP location is not valid',
      };
    }
    stopWaiting(proxyValidity, stdClrs.FgGreen + ' VALID');
    await LOG('IP is from a valid country');

    //#endregion

    await page.close();
  } else {
    await LOG('Initializing Browser');
    console.log('Account Creation Started');
    browser = await initBrowser();
  }
  await LOG('Account Creation Started');

  let noOfPages = dataIn.cycles;
  for (let page = 0; page < noOfPages; page++) {
    await LOG(`Starting ${page + 1} of ${dataIn.cycles} form submission`);
    let webPage = await browser.newPage();
    if(useProxy){
      await webPage.authenticate({
        username: dataIn.proxy.username,
        password: dataIn.proxy.password,
      });
    }
    
    if (useEmulation) await webPage.emulate(iPhonex);

    let msgStart = stdClrs.FgYellow + `[${page + 1}] ` + stdClrs.Reset;

    //#region Loading Signup Page

    let pageLoading = waiting(msgStart + 'Page Loading', 800);
    try {
      await webPage.goto(siteData.app, { waitUntil: 'load' });
    } catch (err) {
      if (noOfPages < 2) noOfPages++;
      stopWaiting(pageLoading, stdClrs.FgRed + 'ERROR');
      await LOG(`Error occured while loading: ${siteData.app} ${err}`);
      await webPage.close();

      continue;
    }
    await LOG(`${siteData.app} URL loaded`);
    stopWaiting(pageLoading, stdClrs.FgGreen + 'DONE');

    //#endregion

    //#region Anti-Captcha handling

    await LOG('Handling Anti-captcha');
    let responseKeyHandle = waiting(msgStart + 'Handling Anti-captcha', 500);

    let antiCaptchaKey = await handleAntiCaptcha();
    if (antiCaptchaKey == false) {
      stopWaiting(responseKeyHandle, stdClrs.FgRed + 'ERROR');
      status = {
        errorId: 4,
        msg: 'Error in Anticaptcha Key',
      };
      break;
    }

    await LOG('Anti-captcha response key recieved successfully');
    stopWaiting(responseKeyHandle, stdClrs.FgGreen + 'DONE');

    //#endregion

    //#region Page Processing
    // process html and inject response key
    let injectLoading = waiting(msgStart + 'Page Injection', 400);
    await LOG('Page Alteration Started');
    let alteration = await webPage.evaluate((key) => {
      let divs = document.querySelectorAll('body > div'),
        iframe = document.querySelector('body > iframe'),
        keyArea = document.querySelector('#g-recaptcha-response'),
        form = document.querySelector(
          'body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div:nth-child(1) > div > div > div > div.ak-inner-block > div > div.col-md-8 > div > form'
        ),
        btn = document.createElement('input');

      if (iframe == null)
        return {
          errorId: 5,
          error: 'Iframe not found',
          content: iframe,
        };
      iframe.parentNode.removeChild(iframe);

      if (divs == null)
        return {
          errorId: 6,
          error: 'Div not found',
          content: div,
        };
      divs.forEach((div) => {
        let top = div.style.top;
        if (top !== '') {
          div.parentNode.removeChild(div);
        }
      });

      try {
        keyArea.style.display = 'block';
        keyArea.innerHTML = key;

        btn.setAttribute('id', 'submit_field');
        btn.setAttribute('type', 'submit');
        form.append(btn);
      } catch (error) {
        return {
          errorId: 7,
          msg: 'Error on alteration',
          error: error,
        };
      }

      return {
        errorId: 0,
      };
    }, antiCaptchaKey);

    if (alteration.errorId != 0) {
      await LOG(`Error in page injection: ${JSON.stringify(alteration)}`);
      stopWaiting(injectLoading, stdClrs.FgRed + 'ERROR');
      await webPage.close();

      continue;
    }
    await LOG('Page Alteration Done');
    stopWaiting(injectLoading, stdClrs.FgGreen + 'DONE');

    // #endregion

    //#region Form Submission

    let formFilling = waiting(msgStart + 'Form Filling', 500);
    await LOG('Starting Form auto filling');
    let userName = tempId(),
      password = 'EP3congoro@D',
      email = userName + mailDomain,
      bDay = ('0' + getRnd(1, 10).toString()).slice(-2),
      bMonth = getFrenchMonth(getRnd(1, 12)).toString().substr(0, 2),
      bYear = getRnd(1987, 1998).toString();

    await LOG('Checking email availability');
    getEmailAvailability(email);

    let formData = {
      username: userName,
      password: password,
      email: email,
      birth: {
        day: bDay,
        month: bMonth,
        year: bYear,
      },
    };
    await LOG(
      `Form filling started using random data ${JSON.stringify(formData)}`
    );

    try {
      await Promise.all([
        await webPage.focus(siteData.username),
        await webPage.keyboard.type(userName),
        await webPage.keyboard.press('Tab'),

        await webPage.focus(siteData.password),
        await webPage.keyboard.type(password),
        await webPage.keyboard.press('Tab'),

        await webPage.focus(siteData.verify_pass),
        await webPage.keyboard.type(password),
        await webPage.keyboard.press('Tab'),

        await webPage.focus(siteData.email),
        await webPage.keyboard.type(email),
        await webPage.keyboard.press('Tab'),

        await webPage.focus(siteData.birthDay),
        await webPage.keyboard.type(bDay),

        await webPage.focus(siteData.birthMonth),
        await webPage.keyboard.type(bMonth),

        await webPage.focus(siteData.birthYear),
        await webPage.keyboard.type(bYear),
      ]);
      await LOG('Form filling finished');
    } catch (error) {
      await LOG(`Error on form fill: ${error}`);
      stopWaiting(formFilling, stdClrs.FgRed + 'ERROR');
      await webPage.close();

      status = {
        errorId: 10,
        msg: 'Error on form filling',
        error: error,
      };

      break;
    }

    await webPage.screenshot({
      path: `./capture/${Date.now()}_${formData.username}_${
        formData.password
      }_beforeSubmission.png`,
      fullPage: true,
    });
    await LOG('Submitting filled signup form');
    await webPage.click(siteData.submit);
    await webPage.waitFor(2 * 1000);

    stopWaiting(formFilling, stdClrs.FgGreen + 'DONE');

    //#endregion

    //#region Checking Submission State

    let checkingSubmission = waiting(
      msgStart + 'Checking Submission State',
      500
    );

    await LOG('Searching for submit state in DOM');
    let submitState = await webPage.evaluate(() => {
      let okDiv = document.querySelectorAll('.ak-register-email-validate'),
        problemDiv = document.querySelectorAll('.ak-register-error');

      if (okDiv.length >= 1) {
        return {
          state: 'OK',
        };
      } else if (problemDiv.length >= 1) {
        return {
          state: 'ERROR',
        };
      } else {
        return {
          state: 'UNKNOWN',
        };
      }
    });

    if (submitState.state != 'OK') {
      await LOG(
        'Form was not submitted successfully: ' + JSON.stringify(submitState)
      );
      stopWaiting(checkingSubmission, stdClrs.FgRed + 'ERROR');

      await webPage.screenshot({
        path: `./capture/${Date.now()}_error_${formData.username}_${
          formData.password
        }.png`,
        fullPage: true,
      });
      await webPage.close();

      status = {
        errorId: 5,
        msg: 'Submission Error',
      };
      break;
    }
    await LOG('Form submitted successfully');
    await webPage.screenshot({
      path: `./capture/${Date.now()}_${formData.username}_${
        formData.password
      }_submitted.png`,
      fullPage: true,
    });
    await LOG('Submitted form page Captured');
    stopWaiting(checkingSubmission, stdClrs.FgGreen + 'DONE');

    //#endregion

    //#region Form Validation & Logging Out

    let checkingEmail = waiting(msgStart + 'Checking Validation Emai', 500);
    await LOG('Searching for validation Emai');
    let validationLink = await getValidationLink(formData.email.toLowerCase());
    await LOG('Got the validation link: ' + validationLink);
    stopWaiting(checkingEmail, stdClrs.FgGreen + 'DONE');

    let validateAccount = waiting(msgStart + 'Validating Account', 500);
    try {
      await webPage.goto(validationLink, { waitUntil: 'load' });
      await LOG('Account validated');
      await webPage.screenshot({
        path: `./capture/${Date.now()}_${formData.username}_${
          formData.password
        }_validated.png`,
        fullPage: true,
      });
      await writeOutputFile(
        outputFile,
        `${formData.username}:${formData.password}\n`
      );
    } catch (error) {
      stopWaiting(validateAccount, stdClrs.FgRed + 'ERROR');
      await LOG('Error on Account validation: ' + error);
      await webPage.screenshot({
        path: `./capture/${Date.now()}_${formData.username}_${
          formData.password
        }_errorvalidated.png`,
        fullPage: true,
      });
      await webPage.close();

      status = {
        errorId: 6,
        msg: 'Error on validation',
        error: error,
      };
      break;
    }
    stopWaiting(validateAccount, stdClrs.FgGreen + 'DONE');

    let loggingOut = waiting(msgStart + 'Logging Out', 500);
    await LOG('Logging out of the account '+email);
    const responseDelete = await releaseEmail(email);
    await LOG(`Email ${responseDelete._id} deleted Successfully`);
    //#endregion

    await LOG(`Account ${page + 1} of 3, Created Successfully`);
    console.log(`Account ${page + 1} of 3, Created Successfully`);
    await webPage.close();
  }
  await closeBrowser(browser);

  if (status) {
    return status;
  }
  return { errorId: 0, msg: 'successfull' };
};

const handleTasks = async () => {
  console.clear();
  let proxyList = [];
  if (useProxy) {
    proxyList = await readInputFile(inputFile).catch((err) => {
      console.log(err);
      process.exit(0);
    });
  }

  let length = proxyList.length;
  length = length > 0 ? length : 1;
  for (let i = 0; i < 10; i++) {
    //TODO
    //useProxy = false;
    let status = await handleFormSubmission(
      useProxy
        ? {
            proxy: {
              ip: proxyList[i].ip,
              port: proxyList[i].port,
              username: proxyList[i].username,
              password: proxyList[i].password,
            },
            cycles: 3,
            entryNo: i,
          }
        : {
            cycles: 3,
            entryNo: i,
          }
    );
  }

  return;
};

//#endregion

(async function () {
  var dirs = Object.values(defaultData.dirs);
  for (const dir in defaultData.dirs) {
    if (defaultData.dirs.hasOwnProperty(dir)) {
      const element = defaultData.dirs[dir];

      checkDir(element, (err) => {
        console.log('Error Occured', err);
      });
    }
  }
  await delay(2);
  console.log('hnaaa');
  await handleTasks();

  process.exit();
})();
