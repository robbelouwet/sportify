const sports = [
  {
    id: 'Aerobics/Partyrobics',
    content:
      'cardio strength train flexibility high intensity low intensity endurance indoor outdoor weight mat individual pair small group large group mens womens child friendly adult seniors    specific genres type music use workouts certify instructors experience instructors class videos online course short workouts long workouts specialize shoe equipment require workouts lively fun atmosphere dance game include workouts',
  },
  {
    id: 'Antwerp 10 Miles',
    content:
      'miles antwerp belgium road pavement individual team child friendly adult seniors mens womens high intensity endurance run shoe hydration pack chip time manual time flat hilly',
  },
  {
    id: 'Archery Tag',
    content:
      'indoor outdoor bow arrows protective gear small team large team mens womens child friendly adult seniors high intensity low intensity protective gear competitive recreational high contact low contact contact',
  },
  {
    id: 'Athletics',
    content:
      'indoor outdoor run jump throw mens womens child friendly adult seniors high intensity endurance track spike javelins shoot put competitive recreational',
  },
  {
    id: 'Badminton',
    content:
      'indoor outdoor racket shuttlecock pair single mens womens child friendly adult seniors high intensity low intensity endurance racket shuttlecock',
  },
  {
    id: 'Balfolk',
    content:
      'indoor outdoor specific genres type music use dance dance pair solo dance mens womens child friendly adult seniors high intensity low intensity endurance dance shoe competitive recreational western eastern indigenous',
  },
  {
    id: 'Ballet',
    content:
      'indoor outdoor specific genres type music use dance mens womens child friendly adult seniors high intensity low intensity endurance flexibility ballet shoe tights leotards competitive recreational western eastern indigenous',
  },
  {
    id: 'Baseball',
    content:
      'indoor outdoor ball bat gloves small team large team mens womens child friendly adult seniors high intensity low intensity endurance ball bat gloves competitive recreational',
  },
  {
    id: 'Basketball',
    content:
      'indoor outdoor ball hoop small team large team mens womens child friendly adult seniors high intensity low intensity endurance ball hoop competitive recreational',
  },
  {
    id: 'Beach Balance',
    content:
      'beach mat ball individual pair small group large group mens womens child friendly adult seniors high intensity low intensity endurance flexibility mat ball competitive recreational',
  },
  {
    id: 'Beach Bootcamp',
    content:
      'cardio exercise high intensity interval strength train use body weight sandbag resistance band equipment build muscle core work exercise strengthen abdominal back muscle flexibility mobility stretch exercise improve range motion outdoor set train fresh air sunlight add benefit natural resistance change environment',
  },
  {
    id: 'Beach volleyball',
    content:
      'serve underhand overhand serve serve different areas court pass use forearm control ball set teammate attack set use hand set ball teammate attack attack hit ball net variety shots spike hit tip block jump deflect ball back net score serve substitutions timeouts',
  },
  {
    id: 'Bodypower',
    content:
      'cardio exercise high intensity interval strength train use weight machine body weight build muscle core work exercise strengthen abdominal back muscle flexibility mobility stretch exercise improve range motion group set train supportive motivate group people',
  },
  {
    id: 'Bodyshock',
    content:
      'cardio exercise high intensity interval strength train use weight machine body weight build muscle core work exercise strengthen abdominal back muscle flexibility mobility stretch exercise improve range motion surprise factor workout different include unexpected challenge keep things interest',
  },
  {
    id: 'Bootcamp',
    content:
      'cardio exercise high intensity interval strength train use weight machine body weight build muscle core work exercise strengthen abdominal back muscle flexibility mobility stretch exercise improve range motion military style train use military drill techniques challenge motivate participants',
  },
  {
    id: 'Boxing Fit',
    content:
      'cardio exercise high intensity interval pad box specific equipment hand eye coordination improve ability track react move object footwork move around box ring shift weight balance punch techniques jab cross hook uppercuts defense block bob weave slip condition build endurance stamina repeat round intense exercise',
  },
  {
    id: 'Calisthenics',
    content:
      'body weight exercise push squat lunge plank burpees strength train use gravity body weight build muscle core work exercise strengthen abdominal back muscle flexibility mobility stretch exercise improve range motion outdoor set train natural environment use park playgrounds public space train ground',
  },
  {
    id: 'Capoeira',
    content:
      'movement fluid acrobatic movements incorporate kick flip handstands music play sing traditional capoeira songs use instrument berimbau',
  },
  {
    id: 'Cheerleading',
    content:
      'stunt lift synchronization degree cheerlead team perform move unison could important feature demonstrate coordination teamwork flexibility cheerleaders often perform move require high degree flexibility could important feature consider strength strength could important stunt require lift support weight cheerleaders endurance cheerlead routines physically demand endurance could important feature consider potential feature circuit train',
  },
  {
    id: 'Circuit training',
    content:
      'exercise circuit train program include wide range exercise could challenge effective intensity exercise intensity exercise could important feature determine overall difficulty circuit number station number station circuit could affect duration intensity workout rest intervals amount rest time station could affect intensity overall difficulty circuit equipment type quantity equipment use could affect variety intensity circuit',
  },
  {
    id: 'Climbing',
    content:
      'bouldering sport climb trad climb grade difficulty climb lead climb top rope indoor gym outdoor rock artificial wall climb shoe harness carabiners',
  },
  {
    id: 'Couple dance',
    content:
      'ballroom latin swing    close open semi open rhythm tempo music box step cross body lead',
  },
  {
    id: 'Cycling',
    content:
      'road cycle mountain bike track cycle distance duration ride flat hilly road bike type helmet pedal leisurely moderate high intensity',
  },
  {
    id: 'Dance around the world',
    content:
      'salsa tango waltz dance shoe sneakers rhythm tempo music region country origin dance',
  },
  {
    id: 'Dance on the beach',
    content:
      'salsa tango waltz dance shoe sandals rhythm tempo music beach park studio',
  },
  {
    id: 'Fatburning',
    content:
      'cardio strength train hiit dumbbells exercise bike jump rope moderate high intensity',
  },
  {
    id: 'Fencing',
    content: 'foil epee sabre    fence mask gloves weapon',
  },
  {
    id: 'Figure training',
    content:
      'single pair ice dance skate blade guard skate guard axel spiral camel spin',
  },
  {
    id: 'Fistball',
    content: 'team size number players fistball net field',
  },
  {
    id: 'Fitness training',
    content:
      'cardio strength train flexibility dumbbells exercise bike yoga mat moderate high intensity',
  },
  {
    id: 'Flag football',
    content: 'team size number players field size dimension',
  },
  {
    id: 'Football',
    content:
      'amateur professional team size number players field size dimension',
  },
  {
    id: 'Futsal',
    content: 'team size number players field size dimension',
  },
  {
    id: 'Gaelic football',
    content:
      'amateur professional team size number players field size dimension',
  },
  {
    id: 'Golf',
    content: 'par par par golf club golf ball gloves stroke play match play',
  },
  {
    id: 'Gymnastics',
    content:
      'artistic rhythmic trampoline balance beam bar floor cartwheel backflip split leap',
  },
  {
    id: 'Handball',
    content:
      'amateur professional team size number players court size dimension',
  },
  {
    id: 'Heels Body Expressive',
    content: 'salsa tango waltz high heel dance shoe rhythm tempo music',
  },
  {
    id: 'High intensity training',
    content:
      'hiit circuit train    dumbbells exercise bike jump rope high intensity high intensity',
  },
  {
    id: 'Hockey',
    content:
      'amateur professional team size number players rink size dimension',
  },
  {
    id: 'Indoor cycling',
    content: 'duration distance ride resistance intensity ride spin cycle rpm',
  },
  {
    id: 'Indoor football',
    content: 'team size number players court size dimension',
  },
  {
    id: 'Judo',
    content: 'weight class judo belt mouthguard',
  },
  {
    id: 'JuJitsu',
    content: 'weight class jujitsu belt mouthguard',
  },
  {
    id: 'Karate',
    content:
      'techniques punch kick strike block throw sweep stances front stance back stance horse stance cat stance pre arrange form spar protective gear gloves headgear mouthguard chest protector',
  },
  {
    id: 'Kayak',
    content:
      'type boat sit top sit inside inflatable paddle techniques forward stroke back stroke turn stroke equipment paddle personal flotation device sit inside kayak navigation read map use compass know read water currents safety skills self rescue escape capsize kayak',
  },
  {
    id: 'Korfball',
    content:
      'position attacker defender center physical contact alternate possession shoot designate area score korf mount foot high pole team strategy offensive play defensive play transition offense defense',
  },
  {
    id: 'Kung Fu',
    content:
      'pre arrange sequence movements techniques punch kick strike block throw joint lock pressure point attack stances horse stance cat stance crane stance snake stance weapons train staff sword spear nunchucks philosophy principles respect discipline balance control relaxation',
  },
  {
    id: 'Latin Solo Dance',
    content:
      'footwork basic step turn break adornments rhythm understand feel music keep time beat style express character emotion dance body movement posture alignment fluidity control musicality interpret respond music use body movement accentuate rhythm melody',
  },
  {
    id: 'Lyrical Jazz',
    content: 'jazz ballet modern dance shoe ballet slippers rhythm tempo music',
  },
  {
    id: 'Modern dance',
    content: 'jazz ballet modern dance shoe ballet slippers rhythm tempo music',
  },
  {
    id: 'Orienteering',
    content: 'foot bike ski forest mountain urban map compass gps',
  },
  {
    id: 'Padel',
    content: 'team size number players court size dimension',
  },
  {
    id: 'Parasports',
    content:
      'wheelchair basketball paraswimming paratriathlon amateur professional classification impairment type wheelchair prosthetics adaptive cycle bike',
  },
  {
    id: 'Parkour',
    content:
      'movement skills run jump climb vault roll swing balance physical condition strength flexibility endurance coordination spatial awareness understand environment move safely efficiently mental focus stay calm focus pressure problem solve adapt new challenge',
  },
  {
    id: 'Partyrobics',
    content:
      'cardio exercise high hiit workouts set upbeat music dance move basic step turn break adornments coordination combine dance move cardio exercise keep time music fun factor energetic social enjoyable group exercise experience',
  },
  {
    id: 'Pilates',
    content:
      'mat exercise abdominal work back work leg work stretch equipment base exercise reformer cadillac chair barrel focus core strength stability control precise movements breath control proper alignment',
  },
  {
    id: 'Rope skipping',
    content:
      'basic jump single unders double unders speed increase number jump per minute footwork alternate feet cross rope jump one foot complex trick crossovers boxers heel click skip one hand endurance able skip long periods time without get tire',
  },
  {
    id: 'Rock climbing',
    content:
      'physical skills strength endurance balance flexibility coordination mental skills focus problem solve risk assessment decision make climb techniques footwork handholds body position balance safety equipment climb harness belay device carabiners helmet route read understand climb route navigate effectively',
  },
  {
    id: 'Roundnet',
    content: 'team size number players court size dimension',
  },
  {
    id: 'Rugby',
    content:
      'amateur professional team size number players field size dimension',
  },
  {
    id: 'Salsa',
    content: 'salsa tango waltz dance shoe high heel rhythm tempo music',
  },
  {
    id: 'Scuba diving',
    content: 'dive site location depth duration dive wetsuit dive mask fin',
  },
  {
    id: 'Self defence',
    content:
      'martial arts krav maga self defence awareness gloves pad train weapons block strike grapple',
  },
  {
    id: 'Show dance',
    content:
      'choreography create perform cohesive dance routine style express character emotion dance showcasing unique elements music costume synchronization perform dance team members execute movements time performance skills charisma facial expressions projection',
  },
  {
    id: 'Slowpitch',
    content:
      'bat hit ball round bat pitch throw ball underhand arch trajectory field catch throw ball make defend hit base run score substitutions innings strategy offensive play defensive play pitch selection',
  },
  {
    id: 'Snowboarding',
    content:
      'rid stance leave foot forwardright foot forward carve make turn shift weight lean slope trick jump spin grab rail slide terrain rid different type snow terrain powder groom trail park feature safety wear protective gear know fall recover safely respect riders ski patrol',
  },
  {
    id: 'Social dancing',
    content:
      'footwork basic step turn break adornments connection maintain proper frame connection partner lead follow understand execute roles leader follower dance style express character emotion dance adapt different music dance style etiquette respect personal space follow social norms conventions partner dance',
  },
  {
    id: 'Spelunking',
    content:
      'physical fitness endurance strength agility flexibility safety equipment helmet headlamp climb harness carabiners navigation read map use compass identify landmarks cave techniques crawl climb rappel wad water environmental awareness preserve cave ecosystem minimize impact cave',
  },
  {
    id: 'Sports degustation',
    content:
      'football basketball tennis region country origin sport sport ball net racket',
  },
  {
    id: 'Step BBB',
    content: 'aerobics cardio step platform weight moderate high intensity',
  },
  {
    id: 'Streetdance',
    content: 'hip hop breakdancing pop sneakers dance shoe rhythm tempo music',
  },
  {
    id: 'Swimming',
    content:
      'freestyle breaststroke butterfly distance duration swim indoor outdoor lap pool',
  },
  {
    id: 'Table tennis',
    content: 'team size number players table size dimension',
  },
  {
    id: 'Taekwondo',
    content:
      'techniques punch kick strike block throw sweep pre arrange sequence movements spar use protective gear practice techniques control competitive environment philosophy principles respect discipline control perseverance indomitable spirit',
  },
  {
    id: 'Tai Chi',
    content:
      'form pre arrange sequence slow graceful movements stances horse stance cat stance crane stance bear stance principles relaxation balance alignment coordination flow meditation focus mind calm breath cultivate internal energy',
  },
  {
    id: 'Tennis',
    content:
      'stroke forehand backhand serve volley overhead smash footwork movement around court position shots strategy construct point play offensively defensively score serve foot fault let bound equipment racket ball shoe clothe',
  },
  {
    id: 'Trampoline',
    content:
      'basic bounce seat kneel stand flip front flip back flip front layout back layout combinations link multiple trick together sequence safety use proper form land techniques prevent injury performance skills power control creativity showmanship',
  },
  {
    id: 'Triathlon',
    content:
      'swim freestyle stroke open water skills pool etiquette bike road cycle techniques draft gear shift hill climb run pace form nutrition hydration transition change one sport another train build endurance strength speed three sport',
  },
  {
    id: 'Ultimate Frisbee',
    content: 'team size number players field size dimension',
  },
  {
    id: 'Volleyball',
    content:
      'amateur professional team size number players court size dimension',
  },
  {
    id: 'Waterpolo',
    content:
      'amateur professional team size number players pool size dimension',
  },
  {
    id: 'X-Fit',
    content:
      'fit    type crossfit hiit strength train dumbbells kettlebells jump rope high intensity high intensity',
  },
  {
    id: 'Yoga',
    content:
      'hatha vinyasa yin yoga mat block strap relaxation strength flexibility',
  },
  {
    id: 'Zumba',
    content: 'salsa tango waltz dance shoe sneakers rhythm tempo music',
  },
];

export default sports;