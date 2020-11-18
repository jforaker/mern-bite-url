var script = `
The whole mad swirl of everything that was to come began then; it would mix up all my friends

and all I had left of my family in a big dust cloud over the American Night. Carlo told him of Old Bull

Lee, Elmer Hassel, Jane: Lee in Texas growing weed, Hassel on Riker's Island, Jane wandering on

Times Square in a benzedrine hallucination, with her baby girl in her arms and ending up in Bellevue.

And Dean told Carlo of unknown people in the West like Tommy Snark, the clubfooted poolhall

rotation shark and cardplayer and queer saint. He told him of Roy Johnson, Big Ed Dunkel, his

boyhood buddies, his street buddies, his innumerable girls and sex-parties and pornographic

pictures, his heroes, heroines, adventures. They rushed down the street together, digging everything

in the early way they had, which later became so much sadder and perceptive and blank. But then

they danced down the streets like dingledodies, and I shambled after as I've been doing all my life

after people who interest me, because the only people for me are the mad ones, the ones who are

mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who

never yawn or say a commonplace thing, but bum, bum, bum like fabulous yellow roman candles

exploding like spiders across the stars and in the middle you see the blue centerlight pop and

everybody goes «Awww!» What did they call such young people in Goethe's Germany? Wanting

dearly to learn how to write like Carlo, the first thing you know, Dean was attacking him with a great

amorous soul such as only a con-man can have. «Now, Carlo, let me speak - here's what I'm

saying ...» I didn't see them for about two weeks, during which time they cemented their relationship

to fiendish allday-allnight-talk proportions.

Then came spring, the great time of traveling, and everybody in the scattered gang was getting

ready to take one trip or another. I was busily at work on my novel and when I came to the halfway

mark, after a trip down South with my aunt to visit my brother Rocco, I got ready to travel West for

the very first time.

Dean had already left. Carlo and I saw him off at the 34th Street Greyhound station. Upstairs

they had a place where you could make pictures for a quarter. Carlo took off his glasses and looked

sinister. Dean made a profile shot and looked coyly around. I took a straight picture that made me

look like a thirty-year-old Italian who'd kill anybody who said anything against his mother. This

picture Carlo and Dean neatly cut down the middle with a razor and saved a half each in their

wallets. Dean was wearing a real Western business suit for his big trip back to Denver; he'd finished

his first fling in New York. I say fling, but he only worked like a dog in parking lots. The most

fantastic parking-lot attendant in the world, he can back a car forty miles an hour into a tight squeeze

and stop at the wall, jump out, race among fenders, leap into another car, circle it fifty miles an hour

in a narrow space, back swiftly into tight spot, hump, snap the car with the emergency so that you

see it bounce as he flies out; then clear to the ticket shack, sprinting like a track star, hand a ticket,

leap into a newly arrived car before the owner's half out, leap literally under him as he steps out, start

`;

export function listen(cb) {
  var lines = script.split("\n").reduce((memo, line) => {
    if (line !== "") memo.push(line);

    return memo;
  }, []);

  function notify() {
    if (lines.length) {
      cb([lines.shift()]);
      setTimeout(notify, Math.random() * 75);
    }
  }

  notify();
}
