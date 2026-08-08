const PATTERNS = [
    {
        "num": 1,
        "title": "Come over (놀러 오다).",
        "examples": [
            "Do you want to come over for dinner?",
            "A few friends are coming over tonight.",
            "Thanks for coming over on such short notice."
        ]
    },
    {
        "num": 2,
        "title": "I'd like + 명사 / to + 동사원형",
        "examples": [
            "I'd like to make an appointment for next week.",
            "I'd like a room away from the elevator.",
            "I'd like to exchange this for a different size."
        ]
    },
    {
        "num": 3,
        "title": "Head out (출발하다 / 나가다).",
        "examples": [
            "I'm heading out now—I'll be there in twenty minutes.",
            "Let's head out before it starts raining.",
            "What time are you heading out tomorrow?"
        ]
    },
    {
        "num": 4,
        "title": "Is there a way to + 동사원형?",
        "examples": [
            "Is there a way to change my appointment online?",
            "Is there a way to get to the airport without taking a taxi?",
            "Is there a way to reset my password from the app?"
        ]
    },
    {
        "num": 5,
        "title": "Head back (돌아가다).",
        "examples": [
            "I'd better head back home.",
            "We headed back after dinner.",
            "Are you ready to head back?"
        ]
    },
    {
        "num": 6,
        "title": "I get the feeling (that) + 문장.",
        "examples": [
            "I get the feeling that the landlord is still considering our request.",
            "I get the feeling that this line is not moving.",
            "I get the feeling that she prefers to text rather than call."
        ]
    },
    {
        "num": 7,
        "title": "Stop by (잠깐 들르다).",
        "examples": [
            "I'll stop by the store on my way home.",
            "Feel free to stop by anytime.",
            "She stopped by to drop off some documents."
        ]
    },
    {
        "num": 8,
        "title": "I tend to + 동사원형.",
        "examples": [
            "I tend to do my grocery shopping on Sundays.",
            "I tend to get carsick on long rides.",
            "I tend to wake up early even on weekends."
        ]
    },
    {
        "num": 9,
        "title": "Hang out (함께 어울리다).",
        "examples": [
            "Do you want to hang out this weekend?",
            "We usually hang out after class.",
            "I was just hanging out with my cousin."
        ]
    },
    {
        "num": 10,
        "title": "What do you recommend for + 명사?",
        "examples": [
            "What do you recommend for a starter?",
            "What do you recommend for dessert?",
            "What do you recommend for a vegetarian?"
        ]
    },
    {
        "num": 11,
        "title": "Go out (외출하다 / 데이트하다).",
        "examples": [
            "Do you want to go out for dinner tonight?",
            "I don't feel like going out in this weather.",
            "Are you two going out?"
        ]
    },
    {
        "num": 12,
        "title": "I happen to + 동사원형.",
        "examples": [
            "I happen to have an extra phone charger.",
            "I happen to know a good dentist nearby.",
            "I happen to be going downtown this afternoon."
        ]
    },
    {
        "num": 13,
        "title": "Eat out (외식하다).",
        "examples": [
            "We don't eat out very often.",
            "Let's eat out tonight instead of cooking.",
            "Where do you usually eat out around here?"
        ]
    },
    {
        "num": 14,
        "title": "I can't make it + 시간 / 행사.",
        "examples": [
            "I can't make it to dinner tonight.",
            "I can't make it by six because my train is delayed.",
            "I can't make it to the appointment, so I need to reschedule."
        ]
    },
    {
        "num": 15,
        "title": "Stay over (밤을 지내다).",
        "examples": [
            "Do you want to stay over tonight?",
            "She stayed over after the party.",
            "You're welcome to stay over if it gets too late."
        ]
    },
    {
        "num": 16,
        "title": "I can't afford to + 동사원형.",
        "examples": [
            "I can't afford to miss another day of work.",
            "I can't afford to replace my phone right now.",
            "I can't afford to wait much longer for the repair."
        ]
    },
    {
        "num": 17,
        "title": "Pick up (태우러 가다 / 사 오다 / 익히다).",
        "examples": [
            "Can you pick me up from the station?",
            "I'll pick up some milk on the way home.",
            "She picked up English quickly at work."
        ]
    },
    {
        "num": 18,
        "title": "I wouldn't count on + 명사 / -ing.",
        "examples": [
            "I wouldn't count on the bus being on time in this weather.",
            "I wouldn't count on finding parking near the stadium.",
            "I wouldn't count on the package arriving today."
        ]
    },
    {
        "num": 19,
        "title": "Drop off (내려주다 / 잠깐 두고 가다).",
        "examples": [
            "Can you drop me off near the entrance?",
            "I'll drop the package off after lunch.",
            "I'll drop my keys off at your place."
        ]
    },
    {
        "num": 20,
        "title": "Could you tell me more about + 명사?",
        "examples": [
            "Could you tell me more about this dish?",
            "Could you tell me more about the specials?",
            "Could you tell me more about the ingredients?"
        ]
    },
    {
        "num": 21,
        "title": "Show up (나타나다 / 참석하다).",
        "examples": [
            "He didn't show up for dinner.",
            "Thanks for showing up early to help.",
            "I hope the package shows up today."
        ]
    },
    {
        "num": 22,
        "title": "How long does it take to + 동사원형?",
        "examples": [
            "How long does it take to get to the airport from here?",
            "How long does it take to get a replacement card?",
            "How long does it take to process the application?"
        ]
    },
    {
        "num": 23,
        "title": "Turn up (나타나다 / 발견되다).",
        "examples": [
            "She turned up an hour late.",
            "My missing keys finally turned up.",
            "I wasn't sure if anyone would turn up."
        ]
    },
    {
        "num": 24,
        "title": "It's worth + -ing.",
        "examples": [
            "It's worth calling ahead before you go.",
            "It's worth getting travel insurance for a longer trip.",
            "That restaurant is worth trying at least once."
        ]
    },
    {
        "num": 25,
        "title": "End up + -ing (결국 ~하게 되다).",
        "examples": [
            "We ended up taking a taxi home.",
            "I thought it would be quick, but it ended up taking all day.",
            "Where did you end up going for dinner?"
        ]
    },
    {
        "num": 26,
        "title": "It doesn't hurt to + 동사원형.",
        "examples": [
            "It doesn't hurt to ask for a discount.",
            "It doesn't hurt to keep a copy of the receipt.",
            "It doesn't hurt to arrive a little early."
        ]
    },
    {
        "num": 27,
        "title": "Get back (돌아오다 / 되돌려받다).",
        "examples": [
            "What time did you get back last night?",
            "I'll get back from my trip on Sunday.",
            "I finally got my money back."
        ]
    },
    {
        "num": 28,
        "title": "I was supposed to + 동사원형, but + 문장.",
        "examples": [
            "I was supposed to receive the package today, but it never arrived.",
            "I was supposed to meet my manager at two, but the meeting was canceled.",
            "I was supposed to get a confirmation email, but I haven't received one."
        ]
    },
    {
        "num": 29,
        "title": "Get back to + 사람 (회신하다 / 다시 연락하다).",
        "examples": [
            "I'll get back to you as soon as I know.",
            "Sorry, I didn't get back to you sooner.",
            "Can you get back to me by tomorrow?"
        ]
    },
    {
        "num": 30,
        "title": "I'm allergic to + 명사",
        "examples": [
            "I'm allergic to nuts.",
            "I'm allergic to seafood.",
            "I'm allergic to dairy."
        ]
    },
    {
        "num": 31,
        "title": "Hold on (잠깐 기다리다).",
        "examples": [
            "Hold on—I need to grab my keys.",
            "Can you hold on for just a second?",
            "Hold on, I think I know the answer."
        ]
    },
    {
        "num": 32,
        "title": "I was told (that) + 문장.",
        "examples": [
            "I was told that the repair would be covered.",
            "I was told to bring my ID to the appointment.",
            "I was told that the office closes at four."
        ]
    },
    {
        "num": 33,
        "title": "Go ahead (계속하다 / 먼저 하다).",
        "examples": [
            "Go ahead and start without me.",
            "Can I ask you something? — Go ahead.",
            "If you're ready, go ahead and order."
        ]
    },
    {
        "num": 34,
        "title": "I take it (that) + 문장?",
        "examples": [
            "I take it that breakfast is included?",
            "I take it that I need to book in advance?",
            "I take it that the building is locked after ten?"
        ]
    },
    {
        "num": 35,
        "title": "Catch up (밀린 일을 처리하다 / 근황을 나누다).",
        "examples": [
            "I need the weekend to catch up on sleep.",
            "Let's catch up over coffee sometime.",
            "I'm still catching up on the work I missed."
        ]
    },
    {
        "num": 36,
        "title": "I'm trying to + 동사원형",
        "examples": [
            "I'm trying to check in, but the kiosk isn't reading my passport.",
            "I'm trying to find out which bus goes to the hospital.",
            "I'm trying to set up automatic payments."
        ]
    },
    {
        "num": 37,
        "title": "Keep up (따라가다 / 계속 유지하다).",
        "examples": [
            "Walk a little slower—I can't keep up.",
            "It's hard to keep up with all the changes.",
            "Keep up the good work."
        ]
    },
    {
        "num": 38,
        "title": "That's not quite what I meant.",
        "examples": [
            "That's not quite what I meant—I only need it for one day.",
            "That's not quite what I meant. I was asking about the fee.",
            "That's not quite what I meant. Could I explain again?"
        ]
    },
    {
        "num": 39,
        "title": "Fall behind (뒤처지다).",
        "examples": [
            "I fell behind on my messages this week.",
            "Don't fall behind on your bills.",
            "She fell behind because she was sick."
        ]
    },
    {
        "num": 40,
        "title": "Can you make this dish + 형용사?",
        "examples": [
            "Can you make this dish less spicy?",
            "Can you make this dish extra hot?",
            "Can you make this dish vegetarian?"
        ]
    },
    {
        "num": 41,
        "title": "Run into + 사람/문제 (우연히 마주치다 / 문제에 부딪히다).",
        "examples": [
            "I ran into an old friend downtown.",
            "We ran into a problem with the payment.",
            "You might run into traffic on the way there."
        ]
    },
    {
        "num": 42,
        "title": "I want to make sure (that) + 문장",
        "examples": [
            "I want to make sure the reservation is under my name.",
            "I want to make sure I understand the cancellation policy.",
            "I want to make sure this is the correct address for delivery."
        ]
    },
    {
        "num": 43,
        "title": "Bump into + 사람 (우연히 마주치다).",
        "examples": [
            "I bumped into my teacher at the mall.",
            "We bumped into each other on the subway.",
            "I can't believe I bumped into you here."
        ]
    },
    {
        "num": 44,
        "title": "I'm not convinced (that) + 문장.",
        "examples": [
            "I'm not convinced that the problem is completely fixed.",
            "I'm not convinced that this is the best option for us.",
            "I'm not convinced that the estimate includes all the fees."
        ]
    },
    {
        "num": 45,
        "title": "Come across + 명사 (우연히 발견하다).",
        "examples": [
            "I came across your old photo yesterday.",
            "Have you come across any good cafés nearby?",
            "I came across this article and thought of you."
        ]
    },
    {
        "num": 46,
        "title": "Let me + 동사원형",
        "examples": [
            "Let me check the bus schedule for you.",
            "Let me grab my jacket, and then we can go.",
            "Let me think about it and get back to you tomorrow."
        ]
    },
    {
        "num": 47,
        "title": "Look for + 명사 (찾다).",
        "examples": [
            "I'm looking for a quiet place to work.",
            "What are you looking for?",
            "I'll let you know if I find what you're looking for."
        ]
    },
    {
        "num": 48,
        "title": "I'm leaning toward + 명사 / -ing.",
        "examples": [
            "I'm leaning toward taking the earlier flight.",
            "I'm leaning toward the smaller apartment.",
            "I'm leaning toward waiting until next month."
        ]
    },
    {
        "num": 49,
        "title": "Look around (둘러보다).",
        "examples": [
            "Do you mind if I look around?",
            "We looked around before choosing an apartment.",
            "Take your time and look around."
        ]
    },
    {
        "num": 50,
        "title": "Could we have the bill, please?",
        "examples": [
            "Could we have the bill, please?",
            "Could we have the check, please?",
            "Could we have the receipt, please?"
        ]
    },
    {
        "num": 51,
        "title": "Check out + 명사 (확인해 보다 / 가 보다).",
        "examples": [
            "Check out this new coffee shop near my office.",
            "I'll check it out and let you know.",
            "You should check out that movie."
        ]
    },
    {
        "num": 52,
        "title": "I'd prefer + 명사 / to + 동사원형",
        "examples": [
            "I'd prefer a table outside if one is available.",
            "I'd prefer to take the earlier train.",
            "I'd prefer a month-to-month lease."
        ]
    },
    {
        "num": 53,
        "title": "Look forward to + 명사/-ing (기대하다).",
        "examples": [
            "I'm really looking forward to seeing you.",
            "We look forward to hearing from you.",
            "What are you looking forward to this week?"
        ]
    },
    {
        "num": 54,
        "title": "I'm wondering whether + 문장.",
        "examples": [
            "I'm wondering whether the office is open on Saturday.",
            "I'm wondering whether it would be cheaper to pay annually.",
            "I'm wondering whether I need to bring anything to the appointment."
        ]
    },
    {
        "num": 55,
        "title": "Get along with + 사람 (잘 지내다).",
        "examples": [
            "Do you get along with your coworkers?",
            "We get along really well.",
            "I hope you two can learn to get along."
        ]
    },
    {
        "num": 56,
        "title": "I'd rather + 동사원형",
        "examples": [
            "I'd rather walk than wait for another bus.",
            "I'd rather not share my phone number.",
            "I'd rather meet somewhere quiet."
        ]
    },
    {
        "num": 57,
        "title": "Fall out with + 사람 (사이가 틀어지다).",
        "examples": [
            "They fell out over something small.",
            "I don't want us to fall out over this.",
            "Have you two fallen out again?"
        ]
    },
    {
        "num": 58,
        "title": "I'd feel better if + 문장.",
        "examples": [
            "I'd feel better if you could send me the confirmation by email.",
            "I'd feel better if we left before it gets dark.",
            "I'd feel better if the repair person called before arriving."
        ]
    },
    {
        "num": 59,
        "title": "Make up (화해하다).",
        "examples": [
            "We argued, but we made up the next day.",
            "Why don't you call her and make up?",
            "They always make up after a fight."
        ]
    },
    {
        "num": 60,
        "title": "I'll pay with + 결제수단",
        "examples": [
            "I'll pay with my credit card.",
            "I'll pay with cash.",
            "I'll pay with Apple Pay."
        ]
    },
    {
        "num": 61,
        "title": "Break up (헤어지다 / 끝나다).",
        "examples": [
            "They broke up a few months ago.",
            "The meeting broke up around six.",
            "It's hard to stay friends after you break up."
        ]
    },
    {
        "num": 62,
        "title": "Would you like to + 동사원형?",
        "examples": [
            "Would you like to join us for dinner tonight?",
            "Would you like to come in and wait inside?",
            "Would you like to try a different size?"
        ]
    },
    {
        "num": 63,
        "title": "Ask + 사람 + out (데이트 신청하다).",
        "examples": [
            "He finally asked her out for coffee.",
            "Would it be weird if I asked him out?",
            "She was too shy to ask anyone out."
        ]
    },
    {
        "num": 64,
        "title": "I'm concerned about + 명사 / -ing.",
        "examples": [
            "I'm concerned about the extra charge on my bill.",
            "I'm concerned about driving in this weather.",
            "I'm concerned about how long the repair will take."
        ]
    },
    {
        "num": 65,
        "title": "Turn down + 제안/요청 (거절하다).",
        "examples": [
            "I had to turn down the invitation.",
            "She turned down the job offer.",
            "It's okay to turn people down politely."
        ]
    },
    {
        "num": 66,
        "title": "What concerns me is (that) + 문장.",
        "examples": [
            "What concerns me is that the lock doesn't work properly.",
            "What concerns me is that the bill keeps changing.",
            "What concerns me is that there isn't a clear emergency contact."
        ]
    },
    {
        "num": 67,
        "title": "Calm down (진정하다).",
        "examples": [
            "Take a breath and calm down.",
            "The baby finally calmed down.",
            "I need a few minutes to calm down."
        ]
    },
    {
        "num": 68,
        "title": "Would it be okay if + 문장?",
        "examples": [
            "Would it be okay if I paid the balance tomorrow morning?",
            "Would it be okay if my friend stayed over for one night?",
            "Would it be okay if we moved the meeting to Friday?"
        ]
    },
    {
        "num": 69,
        "title": "Cheer up (기운 내다 / 기운을 북돋우다).",
        "examples": [
            "Cheer up—things will get better.",
            "I brought you coffee to cheer you up.",
            "That song always cheers me up."
        ]
    },
    {
        "num": 70,
        "title": "I'm just browsing, thanks",
        "examples": [
            "I'm just browsing, thanks.",
            "I'm just browsing around, thanks.",
            "I'm just browsing for now, thanks."
        ]
    },
    {
        "num": 71,
        "title": "Open up (마음을 열다 / 솔직하게 말하다).",
        "examples": [
            "It took him a while to open up.",
            "She opened up about what happened.",
            "I find it hard to open up to strangers."
        ]
    },
    {
        "num": 72,
        "title": "Do you mind if + 문장?",
        "examples": [
            "Do you mind if I open the window?",
            "Do you mind if I take this call outside?",
            "Do you mind if we switch seats?"
        ]
    },
    {
        "num": 73,
        "title": "Hang up (전화를 끊다).",
        "examples": [
            "Don't hang up—I have one more question.",
            "She hung up before I could explain.",
            "I think the call dropped, so I'll hang up and call back."
        ]
    },
    {
        "num": 74,
        "title": "I wouldn't mind + -ing.",
        "examples": [
            "I wouldn't mind sharing a ride if you're going that way.",
            "I wouldn't mind waiting another ten minutes.",
            "I wouldn't mind trying a different restaurant."
        ]
    },
    {
        "num": 75,
        "title": "Call back (다시 전화하다).",
        "examples": [
            "Can I call you back in ten minutes?",
            "The doctor said she'd call back this afternoon.",
            "Please call me back when you're free."
        ]
    },
    {
        "num": 76,
        "title": "Would you mind + -ing?",
        "examples": [
            "Would you mind lowering the music a little?",
            "Would you mind taking a picture of us?",
            "Would you mind writing that down for me?"
        ]
    },
    {
        "num": 77,
        "title": "Cut off (끊다 / 차단하다).",
        "examples": [
            "We got cut off in the middle of the call.",
            "Don't cut me off—I'm not finished.",
            "The road was cut off by snow."
        ]
    },
    {
        "num": 78,
        "title": "I'd be happy to + 동사원형.",
        "examples": [
            "I'd be happy to show you where the laundry room is.",
            "I'd be happy to bring in your mail while you're away.",
            "I'd be happy to review the form with you."
        ]
    },
    {
        "num": 79,
        "title": "Speak up (더 크게 말하다 / 의견을 말하다).",
        "examples": [
            "Could you speak up a little?",
            "You should speak up if something feels wrong.",
            "She spoke up during the meeting."
        ]
    },
    {
        "num": 80,
        "title": "Do you have this in size + [치수]?",
        "examples": [
            "Do you have this wool jacket in size large?",
            "Do you have this in size medium?",
            "Do you have this in size 10?"
        ]
    },
    {
        "num": 81,
        "title": "Bring up + 주제 (화제를 꺼내다).",
        "examples": [
            "I didn't want to bring up money tonight.",
            "Thanks for bringing that up.",
            "He brought up a good question."
        ]
    },
    {
        "num": 82,
        "title": "I don't feel like + -ing.",
        "examples": [
            "I don't feel like cooking tonight.",
            "I don't feel like going out in the rain.",
            "I don't feel like talking about work right now."
        ]
    },
    {
        "num": 83,
        "title": "Point out + 내용 (지적하다 / 알려 주다).",
        "examples": [
            "Thanks for pointing that out.",
            "She pointed out a mistake in my message.",
            "Let me point out one important detail."
        ]
    },
    {
        "num": 84,
        "title": "I can't help + -ing.",
        "examples": [
            "I can't help worrying about the delay.",
            "I can't help smiling when I see that dog.",
            "I can't help wondering whether I entered the wrong address."
        ]
    },
    {
        "num": 85,
        "title": "Find out + 의문사절 (알아내다).",
        "examples": [
            "I'll find out and get back to you.",
            "How did you find out about the event?",
            "We need to find out what went wrong."
        ]
    },
    {
        "num": 86,
        "title": "What do you mean by + 명사 / -ing?",
        "examples": [
            "What do you mean by “processing fee”?",
            "What do you mean by sharing the utilities?",
            "What do you mean by a flexible schedule?"
        ]
    },
    {
        "num": 87,
        "title": "Figure out + 의문사절 (이해하다 / 해결 방법을 찾다).",
        "examples": [
            "I can't figure out how this app works.",
            "We'll figure something out.",
            "Have you figured out what you want to do?"
        ]
    },
    {
        "num": 88,
        "title": "I've been meaning to + 동사원형.",
        "examples": [
            "I've been meaning to call you about the rent.",
            "I've been meaning to try that café.",
            "I've been meaning to thank you for your help."
        ]
    },
    {
        "num": 89,
        "title": "Work out (잘 풀리다 / 해결하다).",
        "examples": [
            "I'm sure everything will work out.",
            "We worked out a solution together.",
            "I hope the timing works out for you."
        ]
    },
    {
        "num": 90,
        "title": "Can I try this on?",
        "examples": [
            "Can I try this on in the fitting room?",
            "Can I try this on here?",
            "Can I try this on before I buy it?"
        ]
    },
    {
        "num": 91,
        "title": "Sort out + 문제 (정리하다 / 해결하다).",
        "examples": [
            "We'll sort it out tomorrow.",
            "I need to sort out my schedule first.",
            "Don't worry—we can sort this out."
        ]
    },
    {
        "num": 92,
        "title": "I've got + 명사 / to + 동사원형.",
        "examples": [
            "I've got a dentist appointment at three.",
            "I've got to leave in ten minutes.",
            "I've got a few questions about the contract."
        ]
    },
    {
        "num": 93,
        "title": "Deal with + 문제/사람 (처리하다 / 대처하다).",
        "examples": [
            "I'll deal with that later.",
            "How do you deal with stress?",
            "We need to deal with this before it gets worse."
        ]
    },
    {
        "num": 94,
        "title": "I didn't catch + 단어 / that.",
        "examples": [
            "I didn't catch your name.",
            "I didn't catch the apartment number.",
            "Sorry, I didn't catch what you said after Tuesday."
        ]
    },
    {
        "num": 95,
        "title": "Get over + 문제/감정 (극복하다).",
        "examples": [
            "It took me a while to get over the disappointment.",
            "You'll get over it with time.",
            "I still haven't gotten over that cold."
        ]
    },
    {
        "num": 96,
        "title": "It took me + 시간 + to + 동사원형.",
        "examples": [
            "It took me an hour to get here in traffic.",
            "It took me a few weeks to get used to the new system.",
            "It took me forever to find a parking spot."
        ]
    },
    {
        "num": 97,
        "title": "Put up with + 명사/-ing (참다 / 감수하다).",
        "examples": [
            "I can't put up with this noise anymore.",
            "How do you put up with such a long commute?",
            "You shouldn't have to put up with being treated that way."
        ]
    },
    {
        "num": 98,
        "title": "So, you mean (that) + 문장?",
        "examples": [
            "So, you mean the rent includes water but not electricity?",
            "So, you mean I need to bring my ID and the original document?",
            "So, you mean the package will arrive on Monday, not Friday?"
        ]
    },
    {
        "num": 99,
        "title": "Get used to + 명사/-ing (익숙해지다).",
        "examples": [
            "I'm still getting used to my new schedule.",
            "You'll get used to speaking English every day.",
            "It took me a while to get used to the noise."
        ]
    },
    {
        "num": 100,
        "title": "Do you have this in a different color?",
        "examples": [
            "Do you have this in a different color?",
            "Do you have this in black?",
            "Do you have this style in a lighter color?"
        ]
    },
    {
        "num": 101,
        "title": "Look after + 사람/동물 (돌보다).",
        "examples": [
            "Can you look after my cat this weekend?",
            "She looks after her grandparents every day.",
            "Don't worry—I'll look after everything."
        ]
    },
    {
        "num": 102,
        "title": "I'm getting used to + 명사 / -ing.",
        "examples": [
            "I'm getting used to driving on this side of the road.",
            "I'm getting used to the colder weather.",
            "I'm getting used to speaking English at work."
        ]
    },
    {
        "num": 103,
        "title": "Take care of + 일/사람 (처리하다 / 돌보다).",
        "examples": [
            "I'll take care of the reservation.",
            "Can you take care of the kids for an hour?",
            "The company took care of the repair cost."
        ]
    },
    {
        "num": 104,
        "title": "I'm not sure if + 문장",
        "examples": [
            "I'm not sure if I can make it by six.",
            "I'm not sure if this medicine is safe on an empty stomach.",
            "I'm not sure if the payment went through."
        ]
    },
    {
        "num": 105,
        "title": "Get around to + -ing (미루던 일을 마침내 하다).",
        "examples": [
            "I still haven't gotten around to replying to her.",
            "When will you get around to fixing the door?",
            "I finally got around to reading that book."
        ]
    },
    {
        "num": 106,
        "title": "I'm used to + 명사 / -ing.",
        "examples": [
            "I'm used to taking public transportation.",
            "I'm used to working late once in a while.",
            "I'm used to the noise from the street."
        ]
    },
    {
        "num": 107,
        "title": "Put off + 명사/-ing (미루다).",
        "examples": [
            "Don't put off the conversation any longer.",
            "I keep putting off going to the dentist.",
            "They put the trip off until next month."
        ]
    },
    {
        "num": 108,
        "title": "I might as well + 동사원형.",
        "examples": [
            "The bus is late, so I might as well walk.",
            "Since we're here, we might as well get groceries.",
            "I might as well pay the bill now."
        ]
    },
    {
        "num": 109,
        "title": "Keep on + -ing (계속 ~하다).",
        "examples": [
            "He kept on talking even after I left.",
            "Keep on trying—you're getting better.",
            "It kept on raining all day."
        ]
    },
    {
        "num": 110,
        "title": "This is too + 형용사",
        "examples": [
            "This is unfortunately too loose around the shoulders.",
            "This is too tight.",
            "This is too expensive."
        ]
    },
    {
        "num": 111,
        "title": "Carry on (계속하다).",
        "examples": [
            "Please carry on—I didn't mean to interrupt.",
            "We carried on talking long after dinner.",
            "Despite the delay, the show carried on."
        ]
    },
    {
        "num": 112,
        "title": "I'd better + 동사원형.",
        "examples": [
            "I'd better head home before it starts raining.",
            "I'd better call the bank before it closes.",
            "I'd better get going if I want to catch the train."
        ]
    },
    {
        "num": 113,
        "title": "Come up (일이나 문제가 생기다).",
        "examples": [
            "Something came up, so I need to reschedule.",
            "Let me know if anything comes up.",
            "A few questions came up during dinner."
        ]
    },
    {
        "num": 114,
        "title": "I would have + 과거분사, but + 문장.",
        "examples": [
            "I would have called, but I lost your number.",
            "I would have come earlier, but the train was delayed.",
            "I would have helped, but I didn't know you needed anything."
        ]
    },
    {
        "num": 115,
        "title": "Turn out (결과적으로 ~이다 / 밝혀지다).",
        "examples": [
            "It turned out better than I expected.",
            "The rumor turned out to be true.",
            "How did the interview turn out?"
        ]
    },
    {
        "num": 116,
        "title": "I'm not sure I agree (with / that) + ...",
        "examples": [
            "I'm not sure I agree that this is the cheapest option.",
            "I'm not sure I agree with changing the schedule at the last minute.",
            "I'm not sure I agree that the issue is completely fixed."
        ]
    },
    {
        "num": 117,
        "title": "Go through + 경험/과정 (겪다 / 검토하다).",
        "examples": [
            "She's going through a difficult time.",
            "Let's go through the details one more time.",
            "I went through something similar last year."
        ]
    },
    {
        "num": 118,
        "title": "I could have + 과거분사.",
        "examples": [
            "I could have taken the earlier train.",
            "I could have left my card at the restaurant.",
            "I could have saved money by buying it online."
        ]
    },
    {
        "num": 119,
        "title": "Back + 사람 + up (편들다 / 뒷받침하다).",
        "examples": [
            "Thanks for backing me up.",
            "Can you back me up if they ask?",
            "Her story backed up what I said."
        ]
    },
    {
        "num": 120,
        "title": "Can I return or exchange this + 기간 / 조건?",
        "examples": [
            "Can I return this later with the receipt?",
            "Can I exchange this for a different size?",
            "Can I return this within a week?"
        ]
    },
    {
        "num": 121,
        "title": "Pick on + 사람 (괴롭히다 / 흠잡다).",
        "examples": [
            "Why are you always picking on me?",
            "Kids can be cruel when they pick on someone.",
            "Don't pick on him just because he's quiet."
        ]
    },
    {
        "num": 122,
        "title": "It depends on + 명사 / 의문사절",
        "examples": [
            "It depends on the traffic.",
            "It depends on how many people are coming.",
            "It depends on whether the landlord approves the request."
        ]
    },
    {
        "num": 123,
        "title": "Show off (자랑하다 / 뽐내다).",
        "examples": [
            "He's always showing off his new phone.",
            "I wasn't trying to show off.",
            "She likes to show off when she's good at something."
        ]
    },
    {
        "num": 124,
        "title": "I should have + 과거분사.",
        "examples": [
            "I should have brought an umbrella.",
            "I should have checked the address before leaving.",
            "I should have made the appointment sooner."
        ]
    },
    {
        "num": 125,
        "title": "Put + 사람 + down (깔보다 / 비하하다).",
        "examples": [
            "You don't need to put other people down.",
            "He keeps putting himself down.",
            "I felt hurt when she put me down in front of everyone."
        ]
    },
    {
        "num": 126,
        "title": "I was about to + 동사원형 when + 문장.",
        "examples": [
            "I was about to leave when the delivery arrived.",
            "I was about to call you when I got your message.",
            "I was about to go to bed when the fire alarm went off."
        ]
    },
    {
        "num": 127,
        "title": "Mess up (망치다 / 실수하다).",
        "examples": [
            "I really messed up this time.",
            "Don't worry—you didn't mess anything up.",
            "I messed up the date and missed the appointment."
        ]
    },
    {
        "num": 128,
        "title": "Are you free + 시간?",
        "examples": [
            "Are you free this Saturday afternoon?",
            "Are you free for a quick call after work?",
            "Are you free sometime next week?"
        ]
    },
    {
        "num": 129,
        "title": "Screw up (큰 실수를 하다 / 망치다).",
        "examples": [
            "I screwed up and sent it to the wrong person.",
            "We all screw up sometimes.",
            "Don't let one mistake make you think you've screwed everything up."
        ]
    },
    {
        "num": 130,
        "title": "Where is the nearest [transit stop]?",
        "examples": [
            "Where is the nearest subway station?",
            "Where is the nearest bus stop?",
            "Where is the nearest taxi stand?"
        ]
    },
    {
        "num": 131,
        "title": "Freak out (몹시 당황하거나 흥분하다).",
        "examples": [
            "Don't freak out—it's probably nothing serious.",
            "I freaked out when I couldn't find my phone.",
            "She tends to freak out under pressure."
        ]
    },
    {
        "num": 132,
        "title": "The sooner + 문장, the better.",
        "examples": [
            "The sooner we report it, the better.",
            "The sooner you book, the better.",
            "The sooner the repair is finished, the better."
        ]
    },
    {
        "num": 133,
        "title": "Chill out (진정하고 편하게 쉬다).",
        "examples": [
            "Just chill out—we have plenty of time.",
            "I want to chill out at home this weekend.",
            "You need to chill out a little."
        ]
    },
    {
        "num": 134,
        "title": "Does + 시간 + work for you?",
        "examples": [
            "Does three o'clock work for you?",
            "Does Tuesday evening work for you?",
            "Does meeting at the café near your office work for you?"
        ]
    },
    {
        "num": 135,
        "title": "Wind down (긴장을 풀며 마무리하다).",
        "examples": [
            "I need an hour to wind down after work.",
            "We were winding down when she called.",
            "How do you usually wind down at night?"
        ]
    },
    {
        "num": 136,
        "title": "It would help if + 문장.",
        "examples": [
            "It would help if you could send the tracking number.",
            "It would help if the instructions were in writing.",
            "It would help if everyone cleaned up after cooking."
        ]
    },
    {
        "num": 137,
        "title": "Burn out (지쳐서 소진되다).",
        "examples": [
            "I don't want to burn out by taking on too much.",
            "She burned out after months of overtime.",
            "Take breaks before you burn out."
        ]
    },
    {
        "num": 138,
        "title": "Would you be able to + 동사원형?",
        "examples": [
            "Would you be able to meet a little earlier?",
            "Would you be able to hold my package until tomorrow?",
            "Would you be able to send me the details by email?"
        ]
    },
    {
        "num": 139,
        "title": "Break down (고장 나다 / 감정이 무너지다).",
        "examples": [
            "My car broke down on the way home.",
            "She broke down when she heard the news.",
            "Let's break the problem down into smaller steps."
        ]
    },
    {
        "num": 140,
        "title": "Which bus/train goes to + 명사?",
        "examples": [
            "Which bus goes to the museum?",
            "Which train goes to the airport?",
            "Which bus goes downtown?"
        ]
    },
    {
        "num": 141,
        "title": "Come down with + 병 (병에 걸리다).",
        "examples": [
            "I think I'm coming down with a cold.",
            "She came down with the flu last week.",
            "I hope I don't come down with anything before the trip."
        ]
    },
    {
        "num": 142,
        "title": "It's up to + 사람.",
        "examples": [
            "It's up to the landlord to approve the change.",
            "It's up to you which restaurant we choose.",
            "It's up to the doctor to decide whether I need a test."
        ]
    },
    {
        "num": 143,
        "title": "Throw up (토하다).",
        "examples": [
            "I felt so sick that I almost threw up.",
            "He threw up after eating something bad.",
            "The medicine made me want to throw up."
        ]
    },
    {
        "num": 144,
        "title": "Can we move + 일정 + to + 시간?",
        "examples": [
            "Can we move our appointment to Thursday?",
            "Can we move the meeting to the afternoon?",
            "Can we move dinner to next week?"
        ]
    },
    {
        "num": 145,
        "title": "Pass out (기절하다 / 잠들다).",
        "examples": [
            "I was so tired that I passed out on the couch.",
            "She almost passed out from the heat.",
            "Don't skip meals—you could pass out."
        ]
    },
    {
        "num": 146,
        "title": "I'll take care of + 명사.",
        "examples": [
            "I'll take care of the electricity bill this month.",
            "I'll take care of calling the plumber.",
            "I'll take care of the reservation."
        ]
    },
    {
        "num": 147,
        "title": "Warm up (몸을 풀다 / 분위기를 풀다).",
        "examples": [
            "I need to warm up before I work out.",
            "Give me a minute to warm up my hands.",
            "It took a while for everyone to warm up to each other."
        ]
    },
    {
        "num": 148,
        "title": "Something came up.",
        "examples": [
            "Something came up, so I need to cancel tonight.",
            "I'm sorry, but something came up at work.",
            "Something came up with my car this morning."
        ]
    },
    {
        "num": 149,
        "title": "Cool down (열을 식히다 / 진정하다).",
        "examples": [
            "Let the food cool down before you eat it.",
            "I need a few minutes to cool down.",
            "Walk around and cool down after your workout."
        ]
    },
    {
        "num": 150,
        "title": "Do I need to transfer at + 명사?",
        "examples": [
            "Do I need to transfer at City Hall?",
            "Do I need to transfer to another line?",
            "Do I need to transfer at the next stop?"
        ]
    },
    {
        "num": 151,
        "title": "Clean up (치우다 / 정리하다).",
        "examples": [
            "Can you help me clean up after dinner?",
            "I'll clean up the mess later.",
            "We need to clean up before the guests arrive."
        ]
    },
    {
        "num": 152,
        "title": "I can work with + 명사 / that.",
        "examples": [
            "I can work with a later delivery date.",
            "I can work with that price if installation is included.",
            "I can work with a smaller room for a few months."
        ]
    },
    {
        "num": 153,
        "title": "Tidy up (깔끔하게 정돈하다).",
        "examples": [
            "I need to tidy up my room.",
            "Could you tidy up before your friends come over?",
            "She tidied up the kitchen after breakfast."
        ]
    },
    {
        "num": 154,
        "title": "I'm running + 시간 + late.",
        "examples": [
            "I'm running about ten minutes late.",
            "I'm running late because the bus never came.",
            "I'm sorry, but I'm running a little late for our appointment."
        ]
    },
    {
        "num": 155,
        "title": "Put away + 물건 (제자리에 넣다).",
        "examples": [
            "Can you put away the groceries?",
            "Please put your phone away during dinner.",
            "I put the dishes away this morning."
        ]
    },
    {
        "num": 156,
        "title": "That works for me.",
        "examples": [
            "Thursday at four works for me.",
            "Meeting online works for me.",
            "That works for me as long as I can leave by five."
        ]
    },
    {
        "num": 157,
        "title": "Take out + 쓰레기/음식 (밖으로 내다 / 포장해 가다).",
        "examples": [
            "Can you take out the trash?",
            "Let's take out pizza tonight.",
            "I forgot to take the recycling out."
        ]
    },
    {
        "num": 158,
        "title": "I should be there by + 시간.",
        "examples": [
            "I should be there by seven.",
            "I should be there by the time the store opens.",
            "I should be there by noon if traffic is normal."
        ]
    },
    {
        "num": 159,
        "title": "Throw out + 물건 (버리다).",
        "examples": [
            "Don't throw out the receipt.",
            "We threw out a lot of old clothes.",
            "Is this still good, or should I throw it out?"
        ]
    },
    {
        "num": 160,
        "title": "Can you get me a cab to + 명사?",
        "examples": [
            "Can you get me a cab to the airport?",
            "Can you get me a cab to the hotel?",
            "Can you get me a cab to the station?"
        ]
    },
    {
        "num": 161,
        "title": "Run out of + 명사 (다 써 버리다).",
        "examples": [
            "We've run out of time.",
            "I ran out of things to say.",
            "Don't let your phone run out of battery."
        ]
    },
    {
        "num": 162,
        "title": "I don't mind if + 문장.",
        "examples": [
            "I don't mind if you open the window.",
            "I don't mind if we meet somewhere closer to you.",
            "I don't mind if you borrow my charger."
        ]
    },
    {
        "num": 163,
        "title": "Stock up on + 명사 (미리 충분히 사 두다).",
        "examples": [
            "We should stock up on groceries before the storm.",
            "I stocked up on snacks for the trip.",
            "People were stocking up on bottled water."
        ]
    },
    {
        "num": 164,
        "title": "I'm on my way (to + 장소).",
        "examples": [
            "I'm on my way to the station now.",
            "I'm on my way, but traffic is heavy.",
            "I'm on my way to the clinic. I'll be there soon."
        ]
    },
    {
        "num": 165,
        "title": "Cut back on + 소비/행동 (줄이다).",
        "examples": [
            "I'm trying to cut back on coffee.",
            "We need to cut back on unnecessary spending.",
            "The doctor told him to cut back on sugar."
        ]
    },
    {
        "num": 166,
        "title": "I don't mind + -ing.",
        "examples": [
            "I don't mind waiting a few more minutes.",
            "I don't mind cooking if you do the dishes.",
            "I don't mind taking the bus instead."
        ]
    },
    {
        "num": 167,
        "title": "Save up for + 목표 (돈을 모으다).",
        "examples": [
            "I'm saving up for a trip next year.",
            "It took her months to save up for a new laptop.",
            "What are you saving up for?"
        ]
    },
    {
        "num": 168,
        "title": "I'm about to + 동사원형.",
        "examples": [
            "I'm about to leave the house.",
            "I'm about to start cooking dinner.",
            "I'm about to get on the train."
        ]
    },
    {
        "num": 169,
        "title": "Pay + 사람 + back (돈을 갚다 / 보답하다).",
        "examples": [
            "I'll pay you back next week.",
            "Thanks for lunch—let me pay you back.",
            "I'll never be able to pay you back for your help."
        ]
    },
    {
        "num": 170,
        "title": "Please drop me off near + 명사",
        "examples": [
            "Please drop me off near the coffee shop.",
            "Please drop me off near the entrance.",
            "Please drop me off here."
        ]
    },
    {
        "num": 171,
        "title": "Chip in (돈이나 도움을 조금씩 보태다).",
        "examples": [
            "Everyone chipped in for her gift.",
            "Can you chip in and help us move the table?",
            "We all chipped in to cover the bill."
        ]
    },
    {
        "num": 172,
        "title": "You're welcome to + 동사원형.",
        "examples": [
            "You're welcome to use the kitchen.",
            "You're welcome to stay until the rain stops.",
            "You're welcome to take one of these brochures."
        ]
    },
    {
        "num": 173,
        "title": "Pay off (성과를 내다 / 빚을 다 갚다).",
        "examples": [
            "All that practice really paid off.",
            "Her patience paid off in the end.",
            "They finally paid off their loan."
        ]
    },
    {
        "num": 174,
        "title": "I'm planning to + 동사원형.",
        "examples": [
            "I'm planning to move at the end of the month.",
            "I'm planning to visit my family this weekend.",
            "I'm planning to renew my lease."
        ]
    },
    {
        "num": 175,
        "title": "Try on + 옷 (입어 보다).",
        "examples": [
            "Can I try this on?",
            "She tried on three different jackets.",
            "I need to try it on before I buy it."
        ]
    },
    {
        "num": 176,
        "title": "Feel free to + 동사원형.",
        "examples": [
            "Feel free to help yourself to coffee.",
            "Feel free to text me if you get lost.",
            "Feel free to use my desk while I'm away."
        ]
    },
    {
        "num": 177,
        "title": "Take back + 말/물건 (말을 철회하다 / 반품하다).",
        "examples": [
            "I take back what I said earlier.",
            "He immediately took back his comment.",
            "Can I take this back if it doesn't fit?"
        ]
    },
    {
        "num": 178,
        "title": "I'm thinking of + -ing.",
        "examples": [
            "I'm thinking of taking a night class.",
            "I'm thinking of getting a bike for commuting.",
            "I'm thinking of asking for a different room."
        ]
    },
    {
        "num": 179,
        "title": "Set up + 약속/기기 (마련하다 / 설정하다).",
        "examples": [
            "Let's set up a time to talk.",
            "She set up dinner for Friday night.",
            "Can you help me set up the new printer?"
        ]
    },
    {
        "num": 180,
        "title": "I'd like to check in for my flight to + 명사",
        "examples": [
            "I'd like to check in for my flight to New York.",
            "I'd like to check in for my flight to Paris.",
            "I'd like to check in for the next flight."
        ]
    },
    {
        "num": 181,
        "title": "Sign up for + 활동 (신청하다 / 등록하다).",
        "examples": [
            "I signed up for a cooking class.",
            "Do I need to sign up in advance?",
            "You can sign up online."
        ]
    },
    {
        "num": 182,
        "title": "I'll keep you posted.",
        "examples": [
            "I'll keep you posted on the repair.",
            "I'll keep you posted if my arrival time changes.",
            "I'll keep you posted once I hear back from the landlord."
        ]
    },
    {
        "num": 183,
        "title": "Fill out + 양식 (양식을 작성하다).",
        "examples": [
            "Please fill out this form before you leave.",
            "I filled out the application online.",
            "Could you help me fill this out?"
        ]
    },
    {
        "num": 184,
        "title": "I'm hoping to + 동사원형.",
        "examples": [
            "I'm hoping to find a place closer to work.",
            "I'm hoping to get an appointment this week.",
            "I'm hoping to save enough for a trip this summer."
        ]
    },
    {
        "num": 185,
        "title": "Log in (로그인하다).",
        "examples": [
            "I can't log in to my account.",
            "Log in and check your messages.",
            "Try logging in with your email address."
        ]
    },
    {
        "num": 186,
        "title": "Let me get back to you.",
        "examples": [
            "Let me get back to you after I check my schedule.",
            "Let me get back to you about the price.",
            "Let me get back to you by tomorrow morning."
        ]
    },
    {
        "num": 187,
        "title": "Call off + 약속/행사 (취소하다).",
        "examples": [
            "They called off the game because of the rain.",
            "We may have to call off dinner tonight.",
            "I hate to call it off at the last minute."
        ]
    },
    {
        "num": 188,
        "title": "I'm supposed to + 동사원형.",
        "examples": [
            "I'm supposed to meet the technician between two and four.",
            "I'm supposed to submit this form by Friday.",
            "I'm supposed to take this medicine with food."
        ]
    },
    {
        "num": 189,
        "title": "Stand by (기다리다 / 곁에서 지지하다).",
        "examples": [
            "Please stand by while I check that for you.",
            "I knew my friends would stand by me.",
            "Just stand by in case we need help."
        ]
    },
    {
        "num": 190,
        "title": "Can I get a window/aisle seat?",
        "examples": [
            "Can I get an aisle seat, please?",
            "Can I get a window seat, please?",
            "Can I get a seat near the front?"
        ]
    },
    {
        "num": 191,
        "title": "Pull off + 어려운 일 (성공적으로 해내다).",
        "examples": [
            "I don't know how you pulled that off.",
            "We pulled off the surprise without anyone noticing.",
            "Do you think we can pull it off by Friday?"
        ]
    },
    {
        "num": 192,
        "title": "I'll see if I can + 동사원형.",
        "examples": [
            "I'll see if I can move the appointment.",
            "I'll see if I can find someone to cover my shift.",
            "I'll see if I can get there before six."
        ]
    },
    {
        "num": 193,
        "title": "Catch on (이해하다 / 유행하다).",
        "examples": [
            "It took me a while to catch on.",
            "Do you catch on when I explain it this way?",
            "That new dance is really catching on."
        ]
    },
    {
        "num": 194,
        "title": "I was going to + 동사원형, but ...",
        "examples": [
            "I was going to cook, but we ordered takeout instead.",
            "I was going to call you, but it got too late.",
            "I was going to take the bus, but it started raining."
        ]
    },
    {
        "num": 195,
        "title": "Come through (어려움 속에서 도움을 주다 / 기대에 부응하다).",
        "examples": [
            "Thanks for coming through when I needed you.",
            "I knew she would come through for us.",
            "The payment finally came through."
        ]
    },
    {
        "num": 196,
        "title": "Would it make sense to + 동사원형?",
        "examples": [
            "Would it make sense to split the bill?",
            "Would it make sense to call before we go?",
            "Would it make sense to move the appointment online?"
        ]
    },
    {
        "num": 197,
        "title": "Hold back (참다 / 감추다).",
        "examples": [
            "Don't hold back—tell me what you really think.",
            "She was holding back tears.",
            "I had to hold myself back from laughing."
        ]
    },
    {
        "num": 198,
        "title": "I ended up + -ing.",
        "examples": [
            "I ended up taking a taxi because the train was canceled.",
            "I ended up buying the smaller one.",
            "I ended up staying home because I wasn't feeling well."
        ]
    },
    {
        "num": 199,
        "title": "Let + 사람 + down (실망시키다).",
        "examples": [
            "I don't want to let you down.",
            "The movie really let me down.",
            "I'm sorry I let the team down."
        ]
    },
    {
        "num": 200,
        "title": "I have a reservation under + [이름]",
        "examples": [
            "I have a reservation under the name Minwoo Kim.",
            "I have a reservation under my company's name.",
            "I have a reservation under John Smith."
        ]
    },
    {
        "num": 201,
        "title": "I used to + 동사원형.",
        "examples": [
            "I used to live near the beach.",
            "I used to take this route to work every day.",
            "I used to be nervous about speaking English."
        ]
    },
    {
        "num": 202,
        "title": "What if + 문장?",
        "examples": [
            "What if we meet at the station instead?",
            "What if the package doesn't arrive by Friday?",
            "What if we take the earlier bus?"
        ]
    },
    {
        "num": 203,
        "title": "I've been + -ing.",
        "examples": [
            "I've been looking for a new apartment.",
            "I've been having trouble sleeping lately.",
            "I've been meaning to ask you about that."
        ]
    },
    {
        "num": 204,
        "title": "How about + 명사 / -ing?",
        "examples": [
            "How about meeting at six?",
            "How about pizza for dinner?",
            "How about taking a break first?"
        ]
    },
    {
        "num": 205,
        "title": "Would you be open to + -ing?",
        "examples": [
            "Would you be open to meeting a little earlier?",
            "Would you be open to sharing the internet bill?",
            "Would you be open to trying a different payment plan?"
        ]
    },
    {
        "num": 206,
        "title": "The last time I + 과거동사, ...",
        "examples": [
            "The last time I took this bus, it was delayed.",
            "The last time I ordered from them, the delivery was fast.",
            "The last time I moved, I hired a moving company."
        ]
    },
    {
        "num": 207,
        "title": "Is there a chance you could + 동사원형?",
        "examples": [
            "Is there a chance you could send it today?",
            "Is there a chance you could check the account again?",
            "Is there a chance you could hold the room until noon?"
        ]
    },
    {
        "num": 208,
        "title": "I haven't + 과거분사 + yet.",
        "examples": [
            "I haven't received the email yet.",
            "I haven't tried that restaurant yet.",
            "I haven't finished the application yet."
        ]
    },
    {
        "num": 209,
        "title": "Is there any flexibility on + 명사?",
        "examples": [
            "Is there any flexibility on the move-in date?",
            "Is there any flexibility on the monthly rent?",
            "Is there any flexibility on the appointment time?"
        ]
    },
    {
        "num": 210,
        "title": "I just + 과거동사.",
        "examples": [
            "I just got home.",
            "I just spoke with the building manager.",
            "I just sent you the payment."
        ]
    },
    {
        "num": 211,
        "title": "Would you consider + -ing?",
        "examples": [
            "Would you consider lowering the rent a little?",
            "Would you consider extending the deadline?",
            "Would you consider sending a replacement instead?"
        ]
    },
    {
        "num": 212,
        "title": "I've already + 과거분사.",
        "examples": [
            "I've already paid the bill.",
            "I've already called the doctor.",
            "I've already tried restarting the router."
        ]
    },
    {
        "num": 213,
        "title": "I feel like + -ing / 명사.",
        "examples": [
            "I feel like getting something warm to eat.",
            "I feel like a walk after dinner.",
            "I don't really feel like watching a movie tonight."
        ]
    },
    {
        "num": 214,
        "title": "I see your point.",
        "examples": [
            "I see your point, especially about the cost.",
            "I see your point, but I still think we should ask first.",
            "I see your point about needing more time."
        ]
    },
    {
        "num": 215,
        "title": "I'm looking forward to + 명사 / -ing.",
        "examples": [
            "I'm looking forward to seeing the new place.",
            "I'm looking forward to the long weekend.",
            "I'm looking forward to meeting everyone."
        ]
    },
    {
        "num": 216,
        "title": "I can't wait to + 동사원형.",
        "examples": [
            "I can't wait to see the new apartment.",
            "I can't wait to try the food there.",
            "I can't wait to have a day off."
        ]
    },
    {
        "num": 217,
        "title": "I'm glad (that) + 문장.",
        "examples": [
            "I'm glad you made it home safely.",
            "I'm glad the doctor could see you today.",
            "I'm glad we cleared that up."
        ]
    },
    {
        "num": 218,
        "title": "I'm sorry to hear (that) + 문장.",
        "examples": [
            "I'm sorry to hear that you're not feeling well.",
            "I'm sorry to hear that your flight was canceled.",
            "I'm sorry to hear about the problem with your apartment."
        ]
    },
    {
        "num": 219,
        "title": "That must be + 형용사.",
        "examples": [
            "That must be frustrating.",
            "That must be exciting for you.",
            "That must be hard to deal with."
        ]
    },
    {
        "num": 220,
        "title": "I can see why + 문장.",
        "examples": [
            "I can see why you like this neighborhood.",
            "I can see why that rule is confusing.",
            "I can see why you want to wait."
        ]
    },
    {
        "num": 221,
        "title": "Speaking of + 명사 / -ing, ...",
        "examples": [
            "Speaking of coffee, do you know a good place nearby?",
            "Speaking of weekends, are you doing anything on Saturday?",
            "Speaking of the landlord, did they call you back?"
        ]
    },
    {
        "num": 222,
        "title": "I didn't mean to + 동사원형.",
        "examples": [
            "I didn't mean to interrupt you.",
            "I didn't mean to sound rude.",
            "I didn't mean to send that message to everyone."
        ]
    },
    {
        "num": 223,
        "title": "You know what I mean?",
        "examples": [
            "It's one of those days, you know what I mean?",
            "The bus is always late when you're in a hurry, you know what I mean?",
            "You want somewhere quiet, you know what I mean?"
        ]
    },
    {
        "num": 224,
        "title": "I don't mean to + 동사원형, but ...",
        "examples": [
            "I don't mean to complain, but the room is very cold.",
            "I don't mean to rush you, but I need to leave soon.",
            "I don't mean to be difficult, but could you check that again?"
        ]
    },
    {
        "num": 225,
        "title": "What have you been up to?",
        "examples": [
            "What have you been up to lately?",
            "What have you been up to since you moved here?",
            "Hey, what have you been up to this weekend?"
        ]
    },
    {
        "num": 226,
        "title": "If you don't mind me asking, + 질문",
        "examples": [
            "If you don't mind me asking, how much is the monthly rent?",
            "If you don't mind me asking, which internet provider do you use?",
            "If you don't mind me asking, is this area usually quiet at night?"
        ]
    },
    {
        "num": 227,
        "title": "How did + 일/행사 + go?",
        "examples": [
            "How did your job interview go?",
            "How did the doctor's appointment go?",
            "How did your move go?"
        ]
    },
    {
        "num": 228,
        "title": "I'd appreciate it if + 문장.",
        "examples": [
            "I'd appreciate it if you could send me the receipt.",
            "I'd appreciate it if you didn't share my number.",
            "I'd appreciate it if the repair could be done this week."
        ]
    },
    {
        "num": 229,
        "title": "What was + it/that + like?",
        "examples": [
            "What was the neighborhood like?",
            "What was your first day at work like?",
            "What was it like living there?"
        ]
    },
    {
        "num": 230,
        "title": "I was hoping you could + 동사원형.",
        "examples": [
            "I was hoping you could check the status of my order.",
            "I was hoping you could explain this charge.",
            "I was hoping you could hold the table for ten more minutes."
        ]
    },
    {
        "num": 231,
        "title": "What do you think about + 명사 / -ing?",
        "examples": [
            "What do you think about taking the train instead?",
            "What do you think about this neighborhood?",
            "What do you think about meeting halfway?"
        ]
    },
    {
        "num": 232,
        "title": "I was wondering if + 문장.",
        "examples": [
            "I was wondering if you have any rooms available this weekend.",
            "I was wondering if I could change my appointment.",
            "I was wondering if the fee can be waived."
        ]
    },
    {
        "num": 233,
        "title": "There seems to be a problem with + 명사.",
        "examples": [
            "There seems to be a problem with my bill.",
            "There seems to be a problem with the heating in my room.",
            "There seems to be a problem with the payment terminal."
        ]
    },
    {
        "num": 234,
        "title": "Do you happen to know + 의문사절?",
        "examples": [
            "Do you happen to know where the nearest post office is?",
            "Do you happen to know if this bus stops at City Hall?",
            "Do you happen to know who I should contact about the noise?"
        ]
    },
    {
        "num": 235,
        "title": "I'm having trouble + -ing / with + 명사.",
        "examples": [
            "I'm having trouble logging into my account.",
            "I'm having trouble with the washing machine.",
            "I'm having trouble understanding this form."
        ]
    },
    {
        "num": 236,
        "title": "I wonder if + 문장.",
        "examples": [
            "I wonder if the store has a return policy.",
            "I wonder if we could get a table by the window.",
            "I wonder if there's a cheaper way to get there."
        ]
    },
    {
        "num": 237,
        "title": "It turns out (that) + 문장.",
        "examples": [
            "It turns out that the store was just around the corner.",
            "It turns out I had entered the wrong zip code.",
            "It turns out that the fee was already included."
        ]
    },
    {
        "num": 238,
        "title": "It won't + 동사원형.",
        "examples": [
            "The door won't lock.",
            "My phone won't connect to the Wi-Fi.",
            "The machine won't take my card."
        ]
    },
    {
        "num": 239,
        "title": "I thought + 과거동사, but ...",
        "examples": [
            "I thought the store closed at nine, but it closes at eight.",
            "I thought I had already paid, but I was wrong.",
            "I thought this was the express bus, but it isn't."
        ]
    },
    {
        "num": 240,
        "title": "It keeps + -ing.",
        "examples": [
            "The app keeps crashing.",
            "The smoke alarm keeps beeping.",
            "My neighbor's dog keeps barking at night."
        ]
    },
    {
        "num": 241,
        "title": "I didn't realize (that) + 문장.",
        "examples": [
            "I didn't realize that parking costs extra.",
            "I didn't realize the library was closed on Mondays.",
            "I didn't realize I needed to make a reservation."
        ]
    },
    {
        "num": 242,
        "title": "I can't remember + 의문사절 / if절.",
        "examples": [
            "I can't remember where I parked.",
            "I can't remember if I locked the door.",
            "I can't remember what the doctor said about the dosage."
        ]
    },
    {
        "num": 243,
        "title": "I'm afraid + 문장.",
        "examples": [
            "I'm afraid the item is out of stock.",
            "I'm afraid I won't be able to make it tonight.",
            "I'm afraid the next appointment isn't until Thursday."
        ]
    },
    {
        "num": 244,
        "title": "I have no idea + 의문사절.",
        "examples": [
            "I have no idea where my keys are.",
            "I have no idea why the payment failed.",
            "I have no idea how this machine works."
        ]
    },
    {
        "num": 245,
        "title": "I'm pretty sure (that) + 문장.",
        "examples": [
            "I'm pretty sure this is the right platform.",
            "I'm pretty sure the rent is due on the first.",
            "I'm pretty sure I left my umbrella at the café."
        ]
    },
    {
        "num": 246,
        "title": "I'd love to, but + 문장.",
        "examples": [
            "I'd love to, but I already have plans tonight.",
            "I'd love to help, but I have to work this weekend.",
            "I'd love to join you, but I'm not feeling well."
        ]
    },
    {
        "num": 247,
        "title": "I may have + 과거분사.",
        "examples": [
            "I may have left my wallet in the taxi.",
            "I may have typed the wrong password.",
            "I may have taken the wrong bus."
        ]
    },
    {
        "num": 248,
        "title": "I might + 동사원형.",
        "examples": [
            "I might be a few minutes late.",
            "I might take a class next semester.",
            "I might stay home if it keeps raining."
        ]
    },
    {
        "num": 249,
        "title": "I'd rather not + 동사원형.",
        "examples": [
            "I'd rather not drive at night.",
            "I'd rather not discuss that at work.",
            "I'd rather not sign anything until I read it carefully."
        ]
    },
    {
        "num": 250,
        "title": "I don't feel comfortable + -ing / with ...",
        "examples": [
            "I don't feel comfortable sharing my bank details.",
            "I don't feel comfortable with someone entering my room without notice.",
            "I don't feel comfortable signing this without more information."
        ]
    }
];
