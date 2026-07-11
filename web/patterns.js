const PATTERNS = [
 {
  "num": 1,
  "title": "I'm about to + 동사원형",
  "examples": [
   "I'm about to leave the house.",
   "I'm about to start the meeting.",
   "I'm about to eat dinner."
  ]
 },
 {
  "num": 2,
  "title": "I'm on my way to + 명사/동명사",
  "examples": [
   "I'm on my way to the office.",
   "I'm on my way to the airport.",
   "I'm on my way to meet my friend."
  ]
 },
 {
  "num": 3,
  "title": "I'm in the middle of + 명사/동명사",
  "examples": [
   "I'm in the middle of a report.",
   "I'm in the middle of a meeting.",
   "I'm in the middle of cooking dinner."
  ]
 },
 {
  "num": 4,
  "title": "I've been meaning to + 동사원형",
  "examples": [
   "I've been meaning to read this book.",
   "I've been meaning to call you.",
   "I've been meaning to clean my room."
  ]
 },
 {
  "num": 5,
  "title": "I was planning to + 동사원형",
  "examples": [
   "I was planning to go camping this weekend.",
   "I was planning to visit my parents.",
   "I was planning to finish this project today."
  ]
 },
 {
  "num": 6,
  "title": "I'm thinking of + 동명사",
  "examples": [
   "I'm thinking of ordering a warm tea.",
   "I'm thinking of changing my job.",
   "I'm thinking of buying a new car."
  ]
 },
 {
  "num": 7,
  "title": "I'm planning on + 동명사/명사",
  "examples": [
   "I'm planning on taking a design class.",
   "I'm planning on moving to a new apartment.",
   "I'm planning on studying Spanish."
  ]
 },
 {
  "num": 8,
  "title": "I'm looking forward to + 명사/동명사",
  "examples": [
   "I'm looking forward to the trip.",
   "I'm looking forward to seeing you again.",
   "I'm looking forward to the weekend."
  ]
 },
 {
  "num": 9,
  "title": "I should have + 과거분사",
  "examples": [
   "I should have brought an umbrella.",
   "I should have studied harder.",
   "I should have left earlier."
  ]
 },
 {
  "num": 10,
  "title": "I didn't mean to + 동사원형",
  "examples": [
   "I didn't mean to spill the coffee.",
   "I didn't mean to hurt your feelings.",
   "I didn't mean to interrupt you."
  ]
 },
 {
  "num": 11,
  "title": "I have to + 동사원형",
  "examples": [
   "I have to submit this by midnight.",
   "I have to wake up early tomorrow.",
   "I have to attend a conference."
  ]
 },
 {
  "num": 12,
  "title": "I'm supposed to + 동사원형",
  "examples": [
   "I'm supposed to meet my client here.",
   "I'm supposed to finish this by Friday.",
   "I'm supposed to call him back."
  ]
 },
 {
  "num": 13,
  "title": "I don't feel like + 동명사",
  "examples": [
   "I don't feel like preparing the briefing.",
   "I don't feel like eating right now.",
   "I don't feel like going out today."
  ]
 },
 {
  "num": 14,
  "title": "I'm used to + 동명사/명사",
  "examples": [
   "I'm used to crowds.",
   "I'm used to waking up early.",
   "I'm used to this cold weather."
  ]
 },
 {
  "num": 15,
  "title": "I'm having trouble + 동명사",
  "examples": [
   "I'm having trouble focusing on the slides today.",
   "I'm having trouble understanding this.",
   "I'm having trouble sleeping lately."
  ]
 },
 {
  "num": 16,
  "title": "I can't afford to + 동사원형",
  "examples": [
   "I can't afford to buy this.",
   "I can't afford to waste any more time.",
   "I can't afford to lose this opportunity."
  ]
 },
 {
  "num": 17,
  "title": "It's hard to + 동사원형",
  "examples": [
   "It's hard to believe him.",
   "It's hard to find a parking spot here.",
   "It's hard to say no to them."
  ]
 },
 {
  "num": 18,
  "title": "It takes [시간/자원] to + 동사원형",
  "examples": [
   "It takes an hour to get there.",
   "It takes a lot of effort to learn a language.",
   "It takes two days to finish this."
  ]
 },
 {
  "num": 19,
  "title": "It's time to + 동사원형",
  "examples": [
   "It's time to show results.",
   "It's time to start working.",
   "It's time to make a decision."
  ]
 },
 {
  "num": 20,
  "title": "It's up to you to + 동사원형",
  "examples": [
   "It's up to you to decide.",
   "It's up to you to choose the restaurant.",
   "It's up to you to make it happen."
  ]
 },
 {
  "num": 21,
  "title": "Feel free to + 동사원형",
  "examples": [
   "Feel free to take a break for ten minutes.",
   "Feel free to ask any questions.",
   "Feel free to contact me."
  ]
 },
 {
  "num": 22,
  "title": "No wonder + 평서문",
  "examples": [
   "No wonder you are exhausted after the night shift.",
   "No wonder he is so tired.",
   "No wonder it's so cold today."
  ]
 },
 {
  "num": 23,
  "title": "It's no use + 동명사",
  "examples": [
   "It's no use fixing.",
   "It's no use complaining about it.",
   "It's no use crying over spilled milk."
  ]
 },
 {
  "num": 24,
  "title": "There's no need to + 동사원형",
  "examples": [
   "There's no need to stress about it.",
   "There's no need to rush.",
   "There's no need to apologize."
  ]
 },
 {
  "num": 25,
  "title": "Are you sure + 평서문?",
  "examples": [
   "Are you sure this is the right way?",
   "Are you sure you want to quit?",
   "Are you sure about this plan?"
  ]
 },
 {
  "num": 26,
  "title": "I'm not sure if + 평서문",
  "examples": [
   "I'm not sure if I can make it.",
   "I'm not sure if it's open today.",
   "I'm not sure if he will agree."
  ]
 },
 {
  "num": 27,
  "title": "I was wondering if + 평서문",
  "examples": [
   "I was wondering if you are free tonight.",
   "I was wondering if I could borrow your pen.",
   "I was wondering if we could reschedule."
  ]
 },
 {
  "num": 28,
  "title": "Do you mind if I + 동사원형?",
  "examples": [
   "Do you mind if I open the window?",
   "Do you mind if I sit here?",
   "Do you mind if I leave early?"
  ]
 },
 {
  "num": 29,
  "title": "How about we + 동사원형?",
  "examples": [
   "How about we take a break?",
   "How about we order some pizza?",
   "How about we go for a walk?"
  ]
 },
 {
  "num": 30,
  "title": "I'll let you know + 의문사절",
  "examples": [
   "I'll let you know when the director arrives.",
   "I'll let you know what happens.",
   "I'll let you know how much it costs."
  ]
 },
 {
  "num": 31,
  "title": "It seems like + 평서문",
  "examples": [
   "It seems like it's raining.",
   "It seems like he is angry.",
   "It seems like a good idea."
  ]
 },
 {
  "num": 32,
  "title": "That's why + 평서문",
  "examples": [
   "That's why we need change.",
   "That's why I called you.",
   "That's why she left early."
  ]
 },
 {
  "num": 33,
  "title": "You don't have to + 동사원형",
  "examples": [
   "You don't have to worry.",
   "You don't have to come if you're busy.",
   "You don't have to pay for this."
  ]
 },
 {
  "num": 34,
  "title": "I'm ready to + 동사원형",
  "examples": [
   "I'm ready to order now.",
   "I'm ready to go.",
   "I'm ready to start the project."
  ]
 },
 {
  "num": 35,
  "title": "What if + 평서문?",
  "examples": [
   "What if it rains tomorrow?",
   "What if we get lost?",
   "What if he says no?"
  ]
 },
 {
  "num": 36,
  "title": "There's something wrong with + 명사",
  "examples": [
   "There's something wrong with my computer.",
   "There's something wrong with the engine.",
   "There's something wrong with this phone."
  ]
 },
 {
  "num": 37,
  "title": "I have no choice but to + 동사원형",
  "examples": [
   "I have no choice but to finish this.",
   "I have no choice but to accept it.",
   "I have no choice but to leave now."
  ]
 },
 {
  "num": 38,
  "title": "I'm proud of + 명사/동명사",
  "examples": [
   "I'm proud of you.",
   "I'm proud of your achievement.",
   "I'm proud of being part of this team."
  ]
 },
 {
  "num": 39,
  "title": "You might want to + 동사원형",
  "examples": [
   "You might want to check the weather.",
   "You might want to try this one.",
   "You might want to wait a bit."
  ]
 },
 {
  "num": 40,
  "title": "I'm tempted to + 동사원형",
  "examples": [
   "I'm tempted to buy it.",
   "I'm tempted to skip the class.",
   "I'm tempted to eat that cake."
  ]
 },
 {
  "num": 41,
  "title": "I feel like + 동명사/명사",
  "examples": [
   "I feel like having pizza.",
   "I feel like going for a walk.",
   "I feel like taking a nap."
  ]
 },
 {
  "num": 42,
  "title": "I'm happy with + 명사",
  "examples": [
   "I'm happy with the result.",
   "I'm happy with my new phone.",
   "I'm happy with your decision."
  ]
 },
 {
  "num": 43,
  "title": "I'm worried about + 명사/동명사",
  "examples": [
   "I'm worried about the exam.",
   "I'm worried about his health.",
   "I'm worried about making a mistake."
  ]
 },
 {
  "num": 44,
  "title": "I'm surprised that + 평서문",
  "examples": [
   "I'm surprised that you came.",
   "I'm surprised that it's already over.",
   "I'm surprised that he didn't know."
  ]
 },
 {
  "num": 45,
  "title": "I'm glad to + 동사원형",
  "examples": [
   "I'm glad to hear the good news.",
   "I'm glad to meet you.",
   "I'm glad to help."
  ]
 },
 {
  "num": 46,
  "title": "I'm sorry to + 동사원형",
  "examples": [
   "I'm sorry to bother you.",
   "I'm sorry to keep you waiting.",
   "I'm sorry to hear that."
  ]
 },
 {
  "num": 47,
  "title": "I can't believe + 평서문",
  "examples": [
   "I can't believe it's already Friday.",
   "I can't believe you did that.",
   "I can't believe we won."
  ]
 },
 {
  "num": 48,
  "title": "It's hard to believe + 평서문",
  "examples": [
   "It's hard to believe he's 50 years old.",
   "It's hard to believe this is true.",
   "It's hard to believe they broke up."
  ]
 },
 {
  "num": 49,
  "title": "I'm calling to + 동사원형",
  "examples": [
   "I'm calling to confirm my reservation.",
   "I'm calling to ask a question.",
   "I'm calling to check on you."
  ]
 },
 {
  "num": 50,
  "title": "I'm looking for + 명사",
  "examples": [
   "I'm looking for my keys.",
   "I'm looking for a job.",
   "I'm looking for the restroom."
  ]
 },
 {
  "num": 51,
  "title": "I'm here to + 동사원형",
  "examples": [
   "I'm here to attend the design seminar.",
   "I'm here to see the manager.",
   "I'm here to help you."
  ]
 },
 {
  "num": 52,
  "title": "I'm trying to + 동사원형",
  "examples": [
   "I'm trying to lose weight.",
   "I'm trying to fix this.",
   "I'm trying to concentrate."
  ]
 },
 {
  "num": 53,
  "title": "I'd love to + 동사원형",
  "examples": [
   "I'd love to join you.",
   "I'd love to see that movie.",
   "I'd love to visit your country."
  ]
 },
 {
  "num": 54,
  "title": "I'd rather + 동사원형",
  "examples": [
   "I'd rather stay home.",
   "I'd rather not say.",
   "I'd rather walk than take a bus."
  ]
 },
 {
  "num": 55,
  "title": "I prefer A to B",
  "examples": [
   "I prefer tea to coffee.",
   "I prefer summer to winter.",
   "I prefer reading to watching TV."
  ]
 },
 {
  "num": 56,
  "title": "I'm interested in + 명사/동명사",
  "examples": [
   "I'm interested in learning English.",
   "I'm interested in art.",
   "I'm interested in taking this course."
  ]
 },
 {
  "num": 57,
  "title": "Would you like me to + 동사원형?",
  "examples": [
   "Would you like me to carry this bag?",
   "Would you like me to call a taxi?",
   "Would you like me to help you?"
  ]
 },
 {
  "num": 58,
  "title": "Why don't you + 동사원형?",
  "examples": [
   "Why don't you take a break?",
   "Why don't you ask him?",
   "Why don't you try this one?"
  ]
 },
 {
  "num": 59,
  "title": "Do you want to + 동사원형?",
  "examples": [
   "Do you want to grab lunch together?",
   "Do you want to watch a movie?",
   "Do you want to come with me?"
  ]
 },
 {
  "num": 60,
  "title": "How do you feel about + 명사/동명사?",
  "examples": [
   "How do you feel about this idea?",
   "How do you feel about moving to a new city?",
   "How do you feel about the change?"
  ]
 },
 {
  "num": 61,
  "title": "I'm curious about + 명사",
  "examples": [
   "I'm curious about the result.",
   "I'm curious about his background.",
   "I'm curious about how it works."
  ]
 },
 {
  "num": 62,
  "title": "I'm excited about + 명사/동명사",
  "examples": [
   "I'm excited about the trip.",
   "I'm excited about starting my new job.",
   "I'm excited about the concert."
  ]
 },
 {
  "num": 63,
  "title": "I'm nervous about + 명사/동명사",
  "examples": [
   "I'm nervous about the interview.",
   "I'm nervous about my presentation.",
   "I'm nervous about flying."
  ]
 },
 {
  "num": 64,
  "title": "I'm disappointed with + 명사",
  "examples": [
   "I'm disappointed with the service.",
   "I'm disappointed with my grades.",
   "I'm disappointed with the product."
  ]
 },
 {
  "num": 65,
  "title": "I'm grateful for + 명사/동명사",
  "examples": [
   "I'm grateful for your instant support.",
   "I'm grateful for this opportunity.",
   "I'm grateful for your help."
  ]
 },
 {
  "num": 66,
  "title": "I appreciate your + 명사/동명사",
  "examples": [
   "I appreciate your professional devotion.",
   "I appreciate your feedback.",
   "I appreciate your hard work."
  ]
 },
 {
  "num": 67,
  "title": "Thanks for + 명사/동명사",
  "examples": [
   "Thanks for the help.",
   "Thanks for your advice.",
   "Thanks for inviting me."
  ]
 },
 {
  "num": 68,
  "title": "I owe you one for + 명사/동명사",
  "examples": [
   "I owe you one for helping me out.",
   "I owe you one for covering my shift.",
   "I owe you one for the coffee."
  ]
 },
 {
  "num": 69,
  "title": "I'm afraid that + 평서문",
  "examples": [
   "I'm afraid that I can't make it.",
   "I'm afraid that we are sold out.",
   "I'm afraid that it's too late."
  ]
 },
 {
  "num": 70,
  "title": "I hope that + 평서문",
  "examples": [
   "I hope that you feel better soon.",
   "I hope that it doesn't rain tomorrow.",
   "I hope that everything goes well."
  ]
 },
 {
  "num": 71,
  "title": "I promise to + 동사원형",
  "examples": [
   "I promise to be there on time.",
   "I promise to call you later.",
   "I promise to keep it a secret."
  ]
 },
 {
  "num": 72,
  "title": "I bet that + 평서문",
  "examples": [
   "I bet that he will be late.",
   "I bet that you will love this movie.",
   "I bet that it's going to rain."
  ]
 },
 {
  "num": 73,
  "title": "I'm in the mood for + 명사/동명사",
  "examples": [
   "I'm in the mood for Italian food.",
   "I'm in the mood for a walk.",
   "I'm in the mood for watching a comedy."
  ]
 },
 {
  "num": 74,
  "title": "I'm sick of + 명사/동명사",
  "examples": [
   "I'm sick of this weather.",
   "I'm sick of eating the same food.",
   "I'm sick of waiting."
  ]
 },
 {
  "num": 75,
  "title": "I'm afraid of + 명사/동명사",
  "examples": [
   "I'm afraid of heights.",
   "I'm afraid of making mistakes.",
   "I'm afraid of dogs."
  ]
 },
 {
  "num": 76,
  "title": "I'm obsessed with + 명사/동명사",
  "examples": [
   "I'm obsessed with this new song.",
   "I'm obsessed with taking photos.",
   "I'm obsessed with chocolate."
  ]
 },
 {
  "num": 77,
  "title": "I can't wait to + 동사원형",
  "examples": [
   "I can't wait to see the performance.",
   "I can't wait to go on vacation.",
   "I can't wait to stream the next climax."
  ]
 },
 {
  "num": 78,
  "title": "I'm dying to + 동사원형",
  "examples": [
   "I'm dying to know the secret.",
   "I'm dying to eat some sushi.",
   "I'm dying to see that movie."
  ]
 },
 {
  "num": 79,
  "title": "I can't help but + 동사원형",
  "examples": [
   "I can't help but laugh.",
   "I can't help but wonder.",
   "I can't help but agree with you."
  ]
 },
 {
  "num": 80,
  "title": "I'm so into + 명사",
  "examples": [
   "I'm so totally into this brand-new mystery drama series.",
   "I'm so into jazz music.",
   "I'm so into yoga."
  ]
 },
 {
  "num": 81,
  "title": "I've decided to take up + 명사/동명사",
  "examples": [
   "I've decided to take up the guitar.",
   "I've decided to take up tennis.",
   "I've decided to take up photography."
  ]
 },
 {
  "num": 82,
  "title": "I just dabble in + 명사/동명사",
  "examples": [
   "I just dabble in painting.",
   "I just dabble in investing.",
   "I just dabble in writing."
  ]
 },
 {
  "num": 83,
  "title": "I'm trying my hand at + 명사/동명사",
  "examples": [
   "I'm trying my hand at baking.",
   "I'm trying my hand at gardening.",
   "I'm trying my hand at coding."
  ]
 },
 {
  "num": 84,
  "title": "I'm a beginner at + 명사/동명사",
  "examples": [
   "I'm a beginner at yoga.",
   "I'm a beginner at speaking Spanish.",
   "I'm a beginner at playing golf."
  ]
 },
 {
  "num": 85,
  "title": "I'm passionate about + 명사/동명사",
  "examples": [
   "I'm passionate about history.",
   "I'm passionate about protecting the environment.",
   "I'm passionate about music."
  ]
 },
 {
  "num": 86,
  "title": "I've been [동명사] for donkey's years",
  "examples": [
   "I've been playing piano for donkey's years.",
   "I've been living here for donkey's years.",
   "I've been studying this for donkey's years."
  ]
 },
 {
  "num": 87,
  "title": "I spend a lot of time + 동명사",
  "examples": [
   "I spend a lot of time reading.",
   "I spend a lot of time practicing.",
   "I spend a lot of time watching movies."
  ]
 },
 {
  "num": 88,
  "title": "I'm a big fan of + 명사/동명사",
  "examples": [
   "I'm a big fan of baseball.",
   "I'm a big fan of this band.",
   "I'm a big fan of traveling."
  ]
 },
 {
  "num": 89,
  "title": "It helps me unwind + [전치사구/부사]",
  "examples": [
   "It helps me unwind.",
   "It helps me unwind after work.",
   "It helps me unwind completely."
  ]
 },
 {
  "num": 90,
  "title": "It allows me to disconnect from + 명사",
  "examples": [
   "It allows me to disconnect.",
   "It allows me to disconnect from social media.",
   "It allows me to disconnect from stress."
  ]
 },
 {
  "num": 91,
  "title": "I find it really therapeutic to + 동사원형",
  "examples": [
   "I find it therapeutic to draw.",
   "I find it really therapeutic to listen to classical music.",
   "I find it really therapeutic to cook."
  ]
 },
 {
  "num": 92,
  "title": "It's a great stress buster to + 동사원형",
  "examples": [
   "It's a great stress buster to bowl.",
   "It's a great stress buster to exercise.",
   "It's a great stress buster to talk with friends."
  ]
 },
 {
  "num": 93,
  "title": "What do you get up to on + 명사?",
  "examples": [
   "What do you get up to on weekends?",
   "What do you get up to on your days off?",
   "What do you get up to on Sundays?"
  ]
 },
 {
  "num": 94,
  "title": "I'm planning on hanging out with + 명사",
  "examples": [
   "I'm planning on hanging out with my friends.",
   "I'm planning on hanging out with my family.",
   "I'm planning on hanging out with colleagues."
  ]
 },
 {
  "num": 95,
  "title": "How would you like to join me for + 명사?",
  "examples": [
   "How would you like to join me?",
   "How would you like to join me for dinner?",
   "How would you like to join me for a coffee?"
  ]
 },
 {
  "num": 96,
  "title": "Do you have anything planned for + 명사?",
  "examples": [
   "Do you have anything planned for this weekend?",
   "Do you have anything planned for the holidays?",
   "Do you have anything planned for tonight?"
  ]
 },
 {
  "num": 97,
  "title": "I'm in the middle of binge-watching + 명사",
  "examples": [
   "I'm in the middle of binge-watching.",
   "I'm in the middle of binge-watching a new series.",
   "I'm in the middle of binge-watching this drama."
  ]
 },
 {
  "num": 98,
  "title": "Have you seen any good [명사] recently?",
  "examples": [
   "Have you seen any good movies recently?",
   "Have you seen any good shows recently?",
   "Have you seen any good plays recently?"
  ]
 },
 {
  "num": 99,
  "title": "It has an amazing plot with + 명사",
  "examples": [
   "It has an amazing plot with unexpected twists.",
   "It has an amazing plot with deep characters.",
   "It has an amazing plot with great action."
  ]
 },
 {
  "num": 100,
  "title": "I'm really drawn to + 명사",
  "examples": [
   "I'm really drawn to sci-fi movies.",
   "I'm really drawn to his artwork.",
   "I'm really drawn to this concept."
  ]
 },
 {
  "num": 101,
  "title": "What kind of music do you listen to + [부사]?",
  "examples": [
   "What kind of music do you listen to mostly?",
   "What kind of music do you listen to when you study?",
   "What kind of music do you listen to usually?"
  ]
 },
 {
  "num": 102,
  "title": "I play the [악기], but I'm just an amateur",
  "examples": [
   "I play the piano, but I'm just an amateur.",
   "I play the guitar, but I'm just an amateur.",
   "I play the violin, but I'm just an amateur."
  ]
 },
 {
  "num": 103,
  "title": "I love going to + 명사 + for inspiration",
  "examples": [
   "I love going to museums for inspiration.",
   "I love going to art galleries for inspiration.",
   "I love going to nature for inspiration."
  ]
 },
 {
  "num": 104,
  "title": "The last time I heard live music was + 명사",
  "examples": [
   "The last time I heard live music was last year.",
   "The last time I heard live music was in college.",
   "The last time I heard live music was at a festival."
  ]
 },
 {
  "num": 105,
  "title": "Do you play any sports to + 동사원형?",
  "examples": [
   "Do you play any sports to stay healthy?",
   "Do you play any sports to relieve stress?",
   "Do you play any sports to keep fit?"
  ]
 },
 {
  "num": 106,
  "title": "I go [동명사] almost every weekend",
  "examples": [
   "I go hiking almost every weekend.",
   "I go fishing almost every weekend.",
   "I go swimming almost every weekend."
  ]
 },
 {
  "num": 107,
  "title": "I have a gym membership, but I don't get round to + 동명사",
  "examples": [
   "I have a gym membership, but I don't get round to going.",
   "I have a gym membership, but I don't get round to exercising.",
   "I have a gym membership, but I don't get round to working out."
  ]
 },
 {
  "num": 108,
  "title": "I'm trying to stay in shape by + 동명사",
  "examples": [
   "I'm trying to stay in shape by running.",
   "I'm trying to stay in shape by doing yoga.",
   "I'm trying to stay in shape by eating healthy."
  ]
 },
 {
  "num": 109,
  "title": "I love exploring new places and + 동명사",
  "examples": [
   "I love exploring new places and trying local food.",
   "I love exploring new places and taking photos.",
   "I love exploring new places and meeting people."
  ]
 },
 {
  "num": 110,
  "title": "Have you ever gone camping in + 명사?",
  "examples": [
   "Have you ever gone camping in the mountains?",
   "Have you ever gone camping in the winter?",
   "Have you ever gone camping in a national park?"
  ]
 },
 {
  "num": 111,
  "title": "I'm more drawn to historical cities like + 명사",
  "examples": [
   "I'm more drawn to historical cities like Rome.",
   "I'm more drawn to historical cities like Kyoto.",
   "I'm more drawn to historical cities like Athens."
  ]
 },
 {
  "num": 112,
  "title": "It takes a lot of preparation to + 동사원형",
  "examples": [
   "It takes a lot of preparation to host a party.",
   "It takes a lot of preparation to travel abroad.",
   "It takes a lot of preparation to run a marathon."
  ]
 },
 {
  "num": 113,
  "title": "Do you collect anything like + 명사?",
  "examples": [
   "Do you collect anything like stamps?",
   "Do you collect anything like coins?",
   "Do you collect anything like vintage toys?"
  ]
 },
 {
  "num": 114,
  "title": "I've been building up my collection of + 명사",
  "examples": [
   "I've been building up my collection of vinyl records.",
   "I've been building up my collection of rare books.",
   "I've been building up my collection of sneakers."
  ]
 },
 {
  "num": 115,
  "title": "The prize piece in my collection is + 명사",
  "examples": [
   "The prize piece in my collection is this signed poster.",
   "The prize piece in my collection is a limited edition watch.",
   "The prize piece in my collection is an antique vase."
  ]
 },
 {
  "num": 116,
  "title": "It's a nice way to display + 명사",
  "examples": [
   "It's a nice way to display your photos.",
   "It's a nice way to display your artwork.",
   "It's a nice way to display your medals."
  ]
 },
 {
  "num": 117,
  "title": "I've been thinking about trying + 명사/동명사",
  "examples": [
   "I've been thinking about trying rock climbing.",
   "I've been thinking about trying a new recipe.",
   "I've been thinking about trying meditation."
  ]
 },
 {
  "num": 118,
  "title": "Have you ever taken a class to learn + 명사?",
  "examples": [
   "Have you ever taken a structured class to learn the proper rope knots?",
   "Have you ever taken a class to learn French?",
   "Have you ever taken a class to learn coding?"
  ]
 },
 {
  "num": 119,
  "title": "I'm trying to get the hang of + 명사/동명사",
  "examples": [
   "I'm still trying to get the hang of the basic footwork.",
   "I'm trying to get the hang of driving.",
   "I'm trying to get the hang of this software."
  ]
 },
 {
  "num": 120,
  "title": "My ultimate goal is to master + 명사",
  "examples": [
   "My ultimate goal is to master extreme outdoor routes.",
   "My ultimate goal is to master English.",
   "My ultimate goal is to master French cooking."
  ]
 },
 {
  "num": 121,
  "title": "I need to get round to + 동명사",
  "examples": [
   "I need to get round to vacuuming.",
   "I need to get round to doing the dishes.",
   "I need to get round to fixing the sink."
  ]
 },
 {
  "num": 122,
  "title": "Could you help me with + 명사?",
  "examples": [
   "Could you help me with the laundry?",
   "Could you help me with this heavy box?",
   "Could you help me with my homework?"
  ]
 },
 {
  "num": 123,
  "title": "It's time to do + 명사",
  "examples": [
   "It's time to do the cleaning.",
   "It's time to do the grocery shopping.",
   "It's time to do the ironing."
  ]
 },
 {
  "num": 124,
  "title": "I'll take care of + 명사",
  "examples": [
   "I'll take care of the bills.",
   "I'll take care of the dog.",
   "I'll take care of dinner tonight."
  ]
 },
 {
  "num": 125,
  "title": "I'm going to do the + 명사",
  "examples": [
   "I'm going to do the dishes.",
   "I'm going to do the laundry.",
   "I'm going to do the shopping."
  ]
 },
 {
  "num": 126,
  "title": "Make sure to + 동사원형",
  "examples": [
   "Make sure to lock the door.",
   "Make sure to turn off the lights.",
   "Make sure to wake up early."
  ]
 },
 {
  "num": 127,
  "title": "It needs to be + 과거분사",
  "examples": [
   "The light needs to be replaced.",
   "It needs to be fixed soon.",
   "It needs to be washed."
  ]
 },
 {
  "num": 128,
  "title": "I try to keep [명사] + 형용사",
  "examples": [
   "I try to keep my room clean.",
   "I try to keep the kitchen tidy.",
   "I try to keep the noise down."
  ]
 },
 {
  "num": 129,
  "title": "I'm in the mood for + 명사",
  "examples": [
   "I'm in the mood for a hot soup.",
   "I'm in the mood for some spicy food.",
   "I'm in the mood for a quick snack."
  ]
 },
 {
  "num": 130,
  "title": "What's for + 식사?",
  "examples": [
   "What's for dinner?",
   "What's for breakfast?",
   "What's for lunch today?"
  ]
 },
 {
  "num": 131,
  "title": "I usually do the cooking on + 요일",
  "examples": [
   "I usually do the cooking on Sundays.",
   "I usually do the cooking on weekends.",
   "I usually do the cooking on my days off."
  ]
 },
 {
  "num": 132,
  "title": "It takes [시간] to prepare + 명사",
  "examples": [
   "It takes 30 minutes to prepare dinner.",
   "It takes an hour to prepare this dish.",
   "It takes a lot of time to prepare a feast."
  ]
 },
 {
  "num": 133,
  "title": "Could you please pass the + 명사?",
  "examples": [
   "Could you please pass the salt?",
   "Could you please pass the pepper?",
   "Could you please pass the salad?"
  ]
 },
 {
  "num": 134,
  "title": "Thanks for inviting me over for + 명사",
  "examples": [
   "Thanks for inviting me over for dinner.",
   "Thanks for inviting me over for lunch.",
   "Thanks for inviting me over for the party."
  ]
 },
 {
  "num": 135,
  "title": "Do you need any help setting + 명사?",
  "examples": [
   "Do you need any help setting the table?",
   "Do you need any help setting up the equipment?",
   "Do you need any help setting the alarm?"
  ]
 },
 {
  "num": 136,
  "title": "I would be happy to help with + 명사/동명사",
  "examples": [
   "I would be happy to help with the dishes.",
   "I would be happy to help with cooking.",
   "I would be happy to help with cleaning up."
  ]
 },
 {
  "num": 137,
  "title": "Can we have the menu, please?",
  "examples": [
   "Can we have the menu, please?",
   "Can we have the wine list, please?",
   "Can we have the dessert menu, please?"
  ]
 },
 {
  "num": 138,
  "title": "What do you recommend for + 명사?",
  "examples": [
   "What do you recommend for a starter?",
   "What do you recommend for dessert?",
   "What do you recommend for a vegetarian?"
  ]
 },
 {
  "num": 139,
  "title": "Could you tell me more about + 명사?",
  "examples": [
   "Could you tell me more about this dish?",
   "Could you tell me more about the specials?",
   "Could you tell me more about the ingredients?"
  ]
 },
 {
  "num": 140,
  "title": "I'll have the + 명사",
  "examples": [
   "I'll have the steak.",
   "I'll have the pasta.",
   "I'll have the chicken salad."
  ]
 },
 {
  "num": 141,
  "title": "I'm allergic to + 명사",
  "examples": [
   "I'm allergic to nuts.",
   "I'm allergic to seafood.",
   "I'm allergic to dairy."
  ]
 },
 {
  "num": 142,
  "title": "Can you make this dish + 형용사?",
  "examples": [
   "Can you make this dish less spicy?",
   "Can you make this dish extra hot?",
   "Can you make this dish vegetarian?"
  ]
 },
 {
  "num": 143,
  "title": "The food was delicious, especially + 명사",
  "examples": [
   "The food was delicious.",
   "The food was delicious, especially the steak.",
   "The food was delicious, especially the dessert."
  ]
 },
 {
  "num": 144,
  "title": "Could we have the bill, please?",
  "examples": [
   "Could we have the bill, please?",
   "Could we have the check, please?",
   "Could we have the receipt, please?"
  ]
 },
 {
  "num": 145,
  "title": "It's on me this time",
  "examples": [
   "Don't worry, it's on me.",
   "It's on me this time.",
   "Dinner is on me tonight."
  ]
 },
 {
  "num": 146,
  "title": "We would like to split the bill + [방법]",
  "examples": [
   "We would like to split the bill evenly.",
   "We would like to split the bill in half.",
   "We would like to split the bill by items."
  ]
 },
 {
  "num": 147,
  "title": "I'll pay with + 결제수단",
  "examples": [
   "I'll pay with my credit card.",
   "I'll pay with cash.",
   "I'll pay with Apple Pay."
  ]
 },
 {
  "num": 148,
  "title": "Keep the change",
  "examples": [
   "Keep the change.",
   "Please keep the change.",
   "You can keep the change."
  ]
 },
 {
  "num": 149,
  "title": "I'm just browsing, thanks",
  "examples": [
   "I'm just browsing, thanks.",
   "I'm just browsing around, thanks.",
   "I'm just browsing for now, thanks."
  ]
 },
 {
  "num": 150,
  "title": "I'm looking for a + 명사",
  "examples": [
   "I'm looking for a jacket.",
   "I'm looking for a gift.",
   "I'm looking for a new pair of shoes."
  ]
 },
 {
  "num": 151,
  "title": "Where can I find the + 명사?",
  "examples": [
   "Where can I find the restroom?",
   "Where can I find the fitting room?",
   "Where can I find the electronics section?"
  ]
 },
 {
  "num": 152,
  "title": "Can you help me find + 명사?",
  "examples": [
   "Can you help me find this brand?",
   "Can you help me find a matching tie?",
   "Can you help me find my size?"
  ]
 },
 {
  "num": 153,
  "title": "Do you have this in size + [치수]?",
  "examples": [
   "Do you have this wool jacket in size large?",
   "Do you have this in size medium?",
   "Do you have this in size 10?"
  ]
 },
 {
  "num": 154,
  "title": "Can I try this on in the + [장소]?",
  "examples": [
   "Can I get you to try this on in the fitting room?",
   "Can I try this on in the dressing room?",
   "Can I try this on here?"
  ]
 },
 {
  "num": 155,
  "title": "Do you have a different colour in + 명사?",
  "examples": [
   "Do you have a different colour in medium?",
   "Do you have a different colour in this style?",
   "Do you have a different colour in stock?"
  ]
 },
 {
  "num": 156,
  "title": "This is too + 형용사",
  "examples": [
   "This is unfortunately too loose around the shoulders.",
   "This is too tight.",
   "This is too expensive."
  ]
 },
 {
  "num": 157,
  "title": "How much is this + 명사?",
  "examples": [
   "How much is this watch?",
   "How much is this bag?",
   "How much is this altogether?"
  ]
 },
 {
  "num": 158,
  "title": "Is this on sale/clearance?",
  "examples": [
   "Is this on sale?",
   "Is this on clearance?",
   "Is this item currently on sale?"
  ]
 },
 {
  "num": 159,
  "title": "Do you accept credit cards?",
  "examples": [
   "Do you accept credit cards?",
   "Do you accept foreign credit cards?",
   "Do you accept mobile payments?"
  ]
 },
 {
  "num": 160,
  "title": "Can I return this later with the receipt?",
  "examples": [
   "Can I return this later with the receipt?",
   "Can I return this within a week with the receipt?",
   "Can I exchange or return this later with the receipt?"
  ]
 },
 {
  "num": 161,
  "title": "Where is the nearest [transit stop]?",
  "examples": [
   "Where is the nearest subway station?",
   "Where is the nearest bus stop?",
   "Where is the nearest taxi stand?"
  ]
 },
 {
  "num": 162,
  "title": "Which bus/train goes to + 명사?",
  "examples": [
   "Which bus goes to the museum?",
   "Which train goes to the airport?",
   "Which bus goes downtown?"
  ]
 },
 {
  "num": 163,
  "title": "Do I need to transfer at + 명사?",
  "examples": [
   "Do I need to transfer at City Hall?",
   "Do I need to transfer to another line?",
   "Do I need to transfer at the next stop?"
  ]
 },
 {
  "num": 164,
  "title": "What is the fare for + 명사?",
  "examples": [
   "What is the fare for a single trip ticket?",
   "What is the fare for children?",
   "What is the fare to the airport?"
  ]
 },
 {
  "num": 165,
  "title": "Can you get me a cab to + 명사?",
  "examples": [
   "Can you get me a cab to the airport?",
   "Can you get me a cab to the hotel?",
   "Can you get me a cab to the station?"
  ]
 },
 {
  "num": 166,
  "title": "Could you take me to + 명사?",
  "examples": [
   "Could you take me to this address?",
   "Could you take me to the central station?",
   "Could you take me to the museum?"
  ]
 },
 {
  "num": 167,
  "title": "How long will it take to get to + 명사?",
  "examples": [
   "How long will it take to get to the downtown hall?",
   "How long will it take to get to the airport?",
   "How long will it take to get there by taxi?"
  ]
 },
 {
  "num": 168,
  "title": "Please drop me off near + 명사",
  "examples": [
   "Please drop me off near the coffee shop.",
   "Please drop me off near the entrance.",
   "Please drop me off here."
  ]
 },
 {
  "num": 169,
  "title": "I'd like to book a ticket to + 명사",
  "examples": [
   "I'd like to book a ticket to Edinburgh.",
   "I'd like to book a ticket to London.",
   "I'd like to book a ticket for tomorrow morning."
  ]
 },
 {
  "num": 170,
  "title": "Is there a direct train to + 명사?",
  "examples": [
   "Is there a direct train to Paris?",
   "Is there a direct train to the airport?",
   "Is there a direct flight to New York?"
  ]
 },
 {
  "num": 171,
  "title": "Which platform does the train leave from?",
  "examples": [
   "Which platform does the express train leave from?",
   "Which platform does the train leave from?",
   "Which platform do I need to go to?"
  ]
 },
 {
  "num": 172,
  "title": "Is this seat taken?",
  "examples": [
   "Excuse me, is this seat taken?",
   "Is this seat taken by anyone?",
   "Sorry, is this seat taken?"
  ]
 },
 {
  "num": 173,
  "title": "How do I get to + 명사?",
  "examples": [
   "How do I get to the shopping mall?",
   "How do I get to the nearest station?",
   "How do I get to the museum from here?"
  ]
 },
 {
  "num": 174,
  "title": "Is it within walking distance?",
  "examples": [
   "Is it within walking distance from this hotel?",
   "Is it within walking distance from here?",
   "Is it within walking distance or should I take a cab?"
  ]
 },
 {
  "num": 175,
  "title": "You need to turn left/right at + 명사",
  "examples": [
   "You need to turn right at the post office.",
   "You need to turn left at the next corner.",
   "You need to turn right at the traffic light."
  ]
 },
 {
  "num": 176,
  "title": "Can you show me on the map?",
  "examples": [
   "Can you show me on the map where we are?",
   "Can you show me on the map how to get there?",
   "Can you show me on the map exactly?"
  ]
 },
 {
  "num": 177,
  "title": "I'd like to check in for my flight to + 명사",
  "examples": [
   "I'd like to check in for my flight to New York.",
   "I'd like to check in for my flight to Paris.",
   "I'd like to check in for the next flight."
  ]
 },
 {
  "num": 178,
  "title": "I have [개수] checked bag(s) and a carry-on",
  "examples": [
   "I have two checked bags and a carry-on backpack.",
   "I have one checked bag and a carry-on.",
   "I have no checked bags, just a carry-on."
  ]
 },
 {
  "num": 179,
  "title": "Can I get a window/aisle seat?",
  "examples": [
   "Can I get an aisle seat, please?",
   "Can I get a window seat, please?",
   "Can I get a seat near the front?"
  ]
 },
 {
  "num": 180,
  "title": "Is the flight on time?",
  "examples": [
   "Is the flight to London on time?",
   "Is the flight on time or delayed?",
   "Is the flight on time today?"
  ]
 },
 {
  "num": 181,
  "title": "Do I need to remove my [물품]?",
  "examples": [
   "Do I need to remove my laptop from the bag?",
   "Do I need to remove my shoes?",
   "Do I need to remove my jacket?"
  ]
 },
 {
  "num": 182,
  "title": "Are my liquids okay in this [용기]?",
  "examples": [
   "Are my liquids okay in this transparent zip-lock bag?",
   "Are my liquids okay in this container?",
   "Are my liquids okay for carry-on?"
  ]
 },
 {
  "num": 183,
  "title": "I have a stopover/layover in + 명사",
  "examples": [
   "I have a layover in Tokyo for three hours.",
   "I have a stopover in Dubai.",
   "I have a layover overnight."
  ]
 },
 {
  "num": 184,
  "title": "Will my luggage go straight through to + 명사?",
  "examples": [
   "Will my luggage go straight through to Chicago?",
   "Will my luggage go straight through to my final destination?",
   "Will my luggage go straight through or do I need to recheck it?"
  ]
 },
 {
  "num": 185,
  "title": "Excuse me, I think this is my seat",
  "examples": [
   "Excuse me, I think this is my seat, 14A.",
   "Excuse me, I think this is my seat.",
   "I think this is my reserved seat."
  ]
 },
 {
  "num": 186,
  "title": "Can I have a [물품], please?",
  "examples": [
   "Can I have a warm blanket, please?",
   "Can I have a glass of water, please?",
   "Can I have an extra pillow, please?"
  ]
 },
 {
  "num": 187,
  "title": "Could you help me put this bag in the overhead bin?",
  "examples": [
   "Could you help me put this bag in the overhead bin?",
   "Could you help me lift this bag?",
   "Could you help me find some space in the overhead bin?"
  ]
 },
 {
  "num": 188,
  "title": "How much longer until we land?",
  "examples": [
   "How much longer until we land in San Francisco?",
   "How much longer until we land?",
   "How much longer is the flight?"
  ]
 },
 {
  "num": 189,
  "title": "I'm here for + 목적",
  "examples": [
   "I'm here for a family vacation.",
   "I'm here for business.",
   "I'm here for a conference."
  ]
 },
 {
  "num": 190,
  "title": "I plan on staying for + [기간]",
  "examples": [
   "I plan on staying for ten days.",
   "I plan on staying for a week.",
   "I plan on staying for a month."
  ]
 },
 {
  "num": 191,
  "title": "I have nothing to declare",
  "examples": [
   "I have nothing to declare, officer.",
   "I have nothing to declare.",
   "I have some items to declare."
  ]
 },
 {
  "num": 192,
  "title": "Where is the baggage claim area?",
  "examples": [
   "Excuse me, where is the baggage claim area?",
   "Where is the baggage claim for flight KE101?",
   "Could you point me to the baggage claim area?"
  ]
 },
 {
  "num": 193,
  "title": "My luggage didn't arrive on the conveyor belt",
  "examples": [
   "My luggage didn't arrive on the conveyor belt number 23.",
   "My luggage didn't arrive yet.",
   "My luggage didn't arrive on my flight."
  ]
 },
 {
  "num": 194,
  "title": "It's a [크기/색상] suitcase with + [특징]",
  "examples": [
   "It's a large silver suitcase with a bright yellow sticker.",
   "It's a black suitcase with a red ribbon.",
   "It's a small blue carry-on bag."
  ]
 },
 {
  "num": 195,
  "title": "Can I track my luggage online?",
  "examples": [
   "Can I track my luggage online using this reference number?",
   "Can I track my luggage online?",
   "Can I track my luggage status online?"
  ]
 },
 {
  "num": 196,
  "title": "How will you contact me when [상황]?",
  "examples": [
   "How will you contact me when my bag is found?",
   "How will you contact me when it arrives?",
   "How will you contact me about the updates?"
  ]
 },
 {
  "num": 197,
  "title": "I have a reservation under + [이름]",
  "examples": [
   "I have a reservation under the name Minwoo Kim.",
   "I have a reservation under my company's name.",
   "I have a reservation under John Smith."
  ]
 },
 {
  "num": 198,
  "title": "What time is check-out?",
  "examples": [
   "What time is check-out on Sunday?",
   "What time is check-out tomorrow?",
   "What time is check-out usually?"
  ]
 },
 {
  "num": 199,
  "title": "Does the room include + [서비스]?",
  "examples": [
   "Does the room include complimentary breakfast?",
   "Does the room include free Wi-Fi?",
   "Does the room include room service?"
  ]
 },
 {
  "num": 200,
  "title": "Where is the nearest ATM or bank?",
  "examples": [
   "Where is the nearest ATM to withdraw some local cash?",
   "Where is the nearest ATM or bank?",
   "Where is the nearest ATM around here?"
  ]
 }
];
