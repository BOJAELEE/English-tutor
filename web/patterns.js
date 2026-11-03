const PATTERNS = [
    {
        "num": 1,
        "usage_ko": "come over는 집에 초대할 때 써요.",
        "title": "Come over (놀러 오다).",
        "examples": [
            "Do you want to come over for dinner?",
            "A few friends are coming over tonight.",
            "Thanks for coming over on such short notice."
        ]
    },
    {
        "num": 2,
        "usage_ko": "I'd like는 원하는 일을 공손히 말해요.",
        "title": "I'd like + 명사 / to + 동사원형",
        "examples": [
            "I'd like to make an appointment for next week.",
            "I'd like a room away from the elevator.",
            "I'd like to exchange this for a different size."
        ]
    },
    {
        "num": 3,
        "usage_ko": "head out은 출발하며 자리를 뜰 때 써요.",
        "title": "Head out (출발하다 / 나가다).",
        "examples": [
            "I'm heading out now—I'll be there in twenty minutes.",
            "Let's head out before it starts raining.",
            "What time are you heading out tomorrow?"
        ]
    },
    {
        "num": 4,
        "usage_ko": "a way는 가능한 방법을 물을 때 써요.",
        "title": "Is there a way to + 동사원형?",
        "examples": [
            "Is there a way to change my appointment online?",
            "Is there a way to get to the airport without taking a taxi?",
            "Is there a way to reset my password from the app?"
        ]
    },
    {
        "num": 5,
        "usage_ko": "get the feeling은 느낌에 따른 추측이에요.",
        "title": "I get the feeling (that) + 문장.",
        "examples": [
            "I get the feeling that the landlord is still considering our request.",
            "I get the feeling that this line is not moving.",
            "I get the feeling that she prefers to text rather than call."
        ]
    },
    {
        "num": 6,
        "usage_ko": "stop by는 가는 길에 잠깐 들를 때 써요.",
        "title": "Stop by (잠깐 들르다).",
        "examples": [
            "I'll stop by the store on my way home.",
            "Feel free to stop by anytime.",
            "She stopped by to drop off some documents."
        ]
    },
    {
        "num": 7,
        "usage_ko": "tend to는 평소 반복되는 습관을 말해요.",
        "title": "I tend to + 동사원형.",
        "examples": [
            "I tend to do my grocery shopping on Sundays.",
            "I tend to get carsick on long rides.",
            "I tend to wake up early even on weekends."
        ]
    },
    {
        "num": 8,
        "usage_ko": "hang out은 함께 편하게 시간을 보내요.",
        "title": "Hang out (함께 어울리다).",
        "examples": [
            "Do you want to hang out this weekend?",
            "We usually hang out after class.",
            "I was just hanging out with my cousin."
        ]
    },
    {
        "num": 9,
        "usage_ko": "recommend는 좋은 선택을 추천받을 때 써요.",
        "title": "What do you recommend for + 명사?",
        "examples": [
            "What do you recommend for a starter?",
            "What do you recommend for dessert?",
            "What do you recommend for a vegetarian?"
        ]
    },
    {
        "num": 10,
        "usage_ko": "go out은 식사하러 밖에 나갈 때 써요.",
        "title": "Go out (외출하다 / 데이트하다).",
        "examples": [
            "Do you want to go out for dinner tonight?",
            "I don't feel like going out in this weather.",
            "Are you two going out?"
        ]
    },
    {
        "num": 11,
        "usage_ko": "happen to는 우연히 그런 상태일 때 써요.",
        "title": "I happen to + 동사원형.",
        "examples": [
            "I happen to have an extra phone charger.",
            "I happen to know a good dentist nearby.",
            "I happen to be going downtown this afternoon."
        ]
    },
    {
        "num": 12,
        "usage_ko": "eat out은 집 밖에서 사 먹는다는 뜻이에요.",
        "title": "Eat out (외식하다).",
        "examples": [
            "We don't eat out very often.",
            "Let's eat out tonight instead of cooking.",
            "Where do you usually eat out around here?"
        ]
    },
    {
        "num": 13,
        "usage_ko": "make it은 약속에 참석할 수 있단 뜻이에요.",
        "title": "I can't make it + 시간 / 행사.",
        "examples": [
            "I can't make it to dinner tonight.",
            "I can't make it by six because my train is delayed.",
            "I can't make it to the appointment, so I need to reschedule."
        ]
    },
    {
        "num": 14,
        "usage_ko": "afford는 감당할 여유를 말해요.",
        "title": "I can't afford to + 동사원형.",
        "examples": [
            "I can't afford to miss another day of work.",
            "I can't afford to replace my phone right now.",
            "I can't afford to wait much longer for the repair."
        ]
    },
    {
        "num": 15,
        "usage_ko": "pick up은 차로 데리러 갈 때 써요.",
        "title": "Pick up (태우러 가다 / 사 오다 / 익히다).",
        "examples": [
            "Can you pick me up from the station?",
            "I'll pick up some milk on the way home.",
            "She picked up English quickly at work."
        ]
    },
    {
        "num": 16,
        "usage_ko": "count on은 믿고 기대한다는 뜻이에요.",
        "title": "I wouldn't count on + 명사 / -ing.",
        "examples": [
            "I wouldn't count on the bus being on time in this weather.",
            "I wouldn't count on finding parking near the stadium.",
            "I wouldn't count on the package arriving today."
        ]
    },
    {
        "num": 17,
        "usage_ko": "drop off는 차에서 내려 줄 때 써요.",
        "title": "Drop off (내려주다 / 잠깐 두고 가다).",
        "examples": [
            "Can you drop me off near the entrance?",
            "I'll drop the package off after lunch.",
            "I'll drop my keys off at your place."
        ]
    },
    {
        "num": 18,
        "usage_ko": "more about은 더 자세한 설명을 요청해요.",
        "title": "Could you tell me more about + 명사?",
        "examples": [
            "Could you tell me more about this dish?",
            "Could you tell me more about the specials?",
            "Could you tell me more about the ingredients?"
        ]
    },
    {
        "num": 19,
        "usage_ko": "show up은 약속 장소에 나타날 때 써요.",
        "title": "Show up (나타나다 / 참석하다).",
        "examples": [
            "He didn't show up for dinner.",
            "Thanks for showing up early to help.",
            "I hope the package shows up today."
        ]
    },
    {
        "num": 20,
        "usage_ko": "how long은 걸리는 시간을 물을 때 써요.",
        "title": "How long does it take to + 동사원형?",
        "examples": [
            "How long does it take to get to the airport from here?",
            "How long does it take to get a replacement card?",
            "How long does it take to process the application?"
        ]
    },
    {
        "num": 21,
        "usage_ko": "worth는 해 볼 가치가 있다는 뜻이에요.",
        "title": "It's worth + -ing.",
        "examples": [
            "It's worth calling ahead before you go.",
            "It's worth getting travel insurance for a longer trip.",
            "That restaurant is worth trying at least once."
        ]
    },
    {
        "num": 22,
        "usage_ko": "doesn't hurt는 해 봐도 손해 없단 뜻이에요.",
        "title": "It doesn't hurt to + 동사원형.",
        "examples": [
            "It doesn't hurt to ask for a discount.",
            "It doesn't hurt to keep a copy of the receipt.",
            "It doesn't hurt to arrive a little early."
        ]
    },
    {
        "num": 23,
        "usage_ko": "get back은 갔다가 돌아올 때 써요.",
        "title": "Get back (돌아오다 / 되돌려받다).",
        "examples": [
            "What time did you get back last night?",
            "I'll get back from my trip on Sunday.",
            "I finally got my money back."
        ]
    },
    {
        "num": 24,
        "usage_ko": "supposed to는 어긋난 예정을 말할 때 써요.",
        "title": "I was supposed to + 동사원형, but + 문장.",
        "examples": [
            "I was supposed to receive the package today, but it never arrived.",
            "I was supposed to meet my manager at two, but the meeting was canceled.",
            "I was supposed to get a confirmation email, but I haven't received one."
        ]
    },
    {
        "num": 25,
        "usage_ko": "allergic to는 알레르기 대상을 말해요.",
        "title": "I'm allergic to + 명사",
        "examples": [
            "I'm allergic to nuts.",
            "I'm allergic to seafood.",
            "I'm allergic to dairy."
        ]
    },
    {
        "num": 26,
        "usage_ko": "hold on은 잠시 기다려 달라고 말해요.",
        "title": "Hold on (잠깐 기다리다).",
        "examples": [
            "Hold on—I need to grab my keys.",
            "Can you hold on for just a second?",
            "Hold on, I think I know the answer."
        ]
    },
    {
        "num": 27,
        "usage_ko": "was told는 다른 사람에게 들은 말이에요.",
        "title": "I was told (that) + 문장.",
        "examples": [
            "I was told that the repair would be covered.",
            "I was told to bring my ID to the appointment.",
            "I was told that the office closes at four."
        ]
    },
    {
        "num": 28,
        "usage_ko": "go ahead는 먼저 시작해도 된다는 말이에요.",
        "title": "Go ahead (계속하다 / 먼저 하다).",
        "examples": [
            "Go ahead and start without me.",
            "Can I ask you something? — Go ahead.",
            "If you're ready, go ahead and order."
        ]
    },
    {
        "num": 29,
        "usage_ko": "take it은 추측한 내용이 맞는지 확인해요.",
        "title": "I take it (that) + 문장?",
        "examples": [
            "I take it that breakfast is included?",
            "I take it that I need to book in advance?",
            "I take it that the building is locked after ten?"
        ]
    },
    {
        "num": 30,
        "usage_ko": "trying to는 하려고 시도 중이라는 뜻이에요.",
        "title": "I'm trying to + 동사원형",
        "examples": [
            "I'm trying to check in, but the kiosk isn't reading my passport.",
            "I'm trying to find out which bus goes to the hospital.",
            "I'm trying to set up automatic payments."
        ]
    },
    {
        "num": 31,
        "usage_ko": "keep up은 상대 속도를 따라갈 때 써요.",
        "title": "Keep up (따라가다 / 계속 유지하다).",
        "examples": [
            "Walk a little slower—I can't keep up.",
            "It's hard to keep up with all the changes.",
            "Keep up the good work."
        ]
    },
    {
        "num": 32,
        "usage_ko": "meant는 내가 전하려던 뜻을 가리켜요.",
        "title": "That's not quite what I meant.",
        "examples": [
            "That's not quite what I meant—I only need it for one day.",
            "That's not quite what I meant. I was asking about the fee.",
            "That's not quite what I meant. Could I explain again?"
        ]
    },
    {
        "num": 33,
        "usage_ko": "less spicy는 덜 맵게 해 달란 뜻이에요.",
        "title": "Can you make this dish + 형용사?",
        "examples": [
            "Can you make this dish less spicy?",
            "Can you make this dish extra hot?",
            "Can you make this dish vegetarian?"
        ]
    },
    {
        "num": 34,
        "usage_ko": "run into는 뜻밖에 마주쳤을 때 써요.",
        "title": "Run into + 사람/문제 (우연히 마주치다 / 문제에 부딪히다).",
        "examples": [
            "I ran into an old friend downtown.",
            "We ran into a problem with the payment.",
            "You might run into traffic on the way there."
        ]
    },
    {
        "num": 35,
        "usage_ko": "make sure는 틀림없는지 확인할 때 써요.",
        "title": "I want to make sure (that) + 문장",
        "examples": [
            "I want to make sure the reservation is under my name.",
            "I want to make sure I understand the cancellation policy.",
            "I want to make sure this is the correct address for delivery."
        ]
    },
    {
        "num": 36,
        "usage_ko": "convinced는 확신이 있는지를 나타내요.",
        "title": "I'm not convinced (that) + 문장.",
        "examples": [
            "I'm not convinced that the problem is completely fixed.",
            "I'm not convinced that this is the best option for us.",
            "I'm not convinced that the estimate includes all the fees."
        ]
    },
    {
        "num": 37,
        "usage_ko": "let me는 내가 해 주겠다고 나설 때 써요.",
        "title": "Let me + 동사원형",
        "examples": [
            "Let me check the bus schedule for you.",
            "Let me grab my jacket, and then we can go.",
            "Let me think about it and get back to you tomorrow."
        ]
    },
    {
        "num": 38,
        "usage_ko": "look for는 원하는 것을 찾는 중이에요.",
        "title": "Look for + 명사 (찾다).",
        "examples": [
            "I'm looking for a quiet place to work.",
            "What are you looking for?",
            "I'll let you know if I find what you're looking for."
        ]
    },
    {
        "num": 39,
        "usage_ko": "leaning toward는 더 끌리는 선택을 말해요.",
        "title": "I'm leaning toward + 명사 / -ing.",
        "examples": [
            "I'm leaning toward taking the earlier flight.",
            "I'm leaning toward the smaller apartment.",
            "I'm leaning toward waiting until next month."
        ]
    },
    {
        "num": 40,
        "usage_ko": "bill은 식사 후 계산서를 요청할 때 써요.",
        "title": "Could we have the bill, please?",
        "examples": [
            "Could we have the bill, please?",
            "Could we have the check, please?",
            "Could we have the receipt, please?"
        ]
    },
    {
        "num": 41,
        "usage_ko": "check out은 관심을 갖고 살펴보란 뜻이에요.",
        "title": "Check out + 명사 (확인해 보다 / 가 보다).",
        "examples": [
            "Check out this new coffee shop near my office.",
            "I'll check it out and let you know.",
            "You should check out that movie."
        ]
    },
    {
        "num": 42,
        "usage_ko": "prefer는 다른 것보다 더 원하는 선택이에요.",
        "title": "I'd prefer + 명사 / to + 동사원형",
        "examples": [
            "I'd prefer a table outside if one is available.",
            "I'd prefer to take the earlier train.",
            "I'd prefer a month-to-month lease."
        ]
    },
    {
        "num": 43,
        "usage_ko": "get along은 사람과 사이좋게 지낼 때 써요.",
        "title": "Get along with + 사람 (잘 지내다).",
        "examples": [
            "Do you get along with your coworkers?",
            "We get along really well.",
            "I hope you two can learn to get along."
        ]
    },
    {
        "num": 44,
        "usage_ko": "rather는 두 행동 중 더 원하는 쪽을 말해요.",
        "title": "I'd rather + 동사원형",
        "examples": [
            "I'd rather walk than wait for another bus.",
            "I'd rather not share my phone number.",
            "I'd rather meet somewhere quiet."
        ]
    },
    {
        "num": 45,
        "usage_ko": "better if는 안심될 조건을 부탁할 때 써요.",
        "title": "I'd feel better if + 문장.",
        "examples": [
            "I'd feel better if you could send me the confirmation by email.",
            "I'd feel better if we left before it gets dark.",
            "I'd feel better if the repair person called before arriving."
        ]
    },
    {
        "num": 46,
        "usage_ko": "with는 카드처럼 결제 수단을 나타내요.",
        "title": "I'll pay with + 결제수단",
        "examples": [
            "I'll pay with my credit card.",
            "I'll pay with cash.",
            "I'll pay with Apple Pay."
        ]
    },
    {
        "num": 47,
        "usage_ko": "would like는 상대를 공손히 초대할 때 써요.",
        "title": "Would you like to + 동사원형?",
        "examples": [
            "Would you like to join us for dinner tonight?",
            "Would you like to come in and wait inside?",
            "Would you like to try a different size?"
        ]
    },
    {
        "num": 48,
        "usage_ko": "concerned는 마음에 걸리는 걱정을 말해요.",
        "title": "I'm concerned about + 명사 / -ing.",
        "examples": [
            "I'm concerned about the extra charge on my bill.",
            "I'm concerned about driving in this weather.",
            "I'm concerned about how long the repair will take."
        ]
    },
    {
        "num": 49,
        "usage_ko": "turn down은 초대나 제안을 거절할 때 써요.",
        "title": "Turn down + 제안/요청 (거절하다).",
        "examples": [
            "I had to turn down the invitation.",
            "She turned down the job offer.",
            "It's okay to turn people down politely."
        ]
    },
    {
        "num": 50,
        "usage_ko": "concerns me는 무엇이 걱정인지 짚어요.",
        "title": "What concerns me is (that) + 문장.",
        "examples": [
            "What concerns me is that the lock doesn't work properly.",
            "What concerns me is that the bill keeps changing.",
            "What concerns me is that there isn't a clear emergency contact."
        ]
    },
    {
        "num": 51,
        "usage_ko": "calm down은 흥분을 가라앉히란 뜻이에요.",
        "title": "Calm down (진정하다).",
        "examples": [
            "Take a breath and calm down.",
            "The baby finally calmed down.",
            "I need a few minutes to calm down."
        ]
    },
    {
        "num": 52,
        "usage_ko": "okay if는 해도 괜찮을지 허락을 구해요.",
        "title": "Would it be okay if + 문장?",
        "examples": [
            "Would it be okay if I paid the balance tomorrow morning?",
            "Would it be okay if my friend stayed over for one night?",
            "Would it be okay if we moved the meeting to Friday?"
        ]
    },
    {
        "num": 53,
        "usage_ko": "cheer up은 힘내라고 위로할 때 써요.",
        "title": "Cheer up (기운 내다 / 기운을 북돋우다).",
        "examples": [
            "Cheer up—things will get better.",
            "I brought you coffee to cheer you up.",
            "That song always cheers me up."
        ]
    },
    {
        "num": 54,
        "usage_ko": "browsing은 사지 않고 둘러본단 뜻이에요.",
        "title": "I'm just browsing, thanks",
        "examples": [
            "I'm just browsing, thanks.",
            "I'm just browsing around, thanks.",
            "I'm just browsing for now, thanks."
        ]
    },
    {
        "num": 55,
        "usage_ko": "hang up은 통화를 끝낼 때 써요.",
        "title": "Hang up (전화를 끊다).",
        "examples": [
            "Don't hang up—I have one more question.",
            "She hung up before I could explain.",
            "I think the call dropped, so I'll hang up and call back."
        ]
    },
    {
        "num": 56,
        "usage_ko": "call back은 나중에 다시 전화할 때 써요.",
        "title": "Call back (다시 전화하다).",
        "examples": [
            "Can I call you back in ten minutes?",
            "The doctor said she'd call back this afternoon.",
            "Please call me back when you're free."
        ]
    },
    {
        "num": 57,
        "usage_ko": "mind는 꺼리는지 물으며 공손히 부탁해요.",
        "title": "Would you mind + -ing?",
        "examples": [
            "Would you mind lowering the music a little?",
            "Would you mind taking a picture of us?",
            "Would you mind writing that down for me?"
        ]
    },
    {
        "num": 58,
        "usage_ko": "cut off는 통화가 갑자기 끊겼을 때 써요.",
        "title": "Cut off (끊다 / 차단하다).",
        "examples": [
            "We got cut off in the middle of the call.",
            "Don't cut me off—I'm not finished.",
            "The road was cut off by snow."
        ]
    },
    {
        "num": 59,
        "usage_ko": "happy to는 기꺼이 돕겠다는 뜻이에요.",
        "title": "I'd be happy to + 동사원형.",
        "examples": [
            "I'd be happy to show you where the laundry room is.",
            "I'd be happy to bring in your mail while you're away.",
            "I'd be happy to review the form with you."
        ]
    },
    {
        "num": 60,
        "usage_ko": "speak up은 더 크게 말해 달랄 때 써요.",
        "title": "Speak up (더 크게 말하다 / 의견을 말하다).",
        "examples": [
            "Could you speak up a little?",
            "You should speak up if something feels wrong.",
            "She spoke up during the meeting."
        ]
    },
    {
        "num": 61,
        "usage_ko": "in size는 원하는 옷의 치수를 말해요.",
        "title": "Do you have this in size + [치수]?",
        "examples": [
            "Do you have this wool jacket in size large?",
            "Do you have this in size medium?",
            "Do you have this in size 10?"
        ]
    },
    {
        "num": 62,
        "usage_ko": "bring up은 대화에서 화제를 꺼낼 때 써요.",
        "title": "Bring up + 주제 (화제를 꺼내다).",
        "examples": [
            "I didn't want to bring up money tonight.",
            "Thanks for bringing that up.",
            "He brought up a good question."
        ]
    },
    {
        "num": 63,
        "usage_ko": "point out은 놓친 점을 짚어 줄 때 써요.",
        "title": "Point out + 내용 (지적하다 / 알려 주다).",
        "examples": [
            "Thanks for pointing that out.",
            "She pointed out a mistake in my message.",
            "Let me point out one important detail."
        ]
    },
    {
        "num": 64,
        "usage_ko": "can't help는 걱정을 멈출 수 없단 뜻이에요.",
        "title": "I can't help + -ing.",
        "examples": [
            "I can't help worrying about the delay.",
            "I can't help smiling when I see that dog.",
            "I can't help wondering whether I entered the wrong address."
        ]
    },
    {
        "num": 65,
        "usage_ko": "find out은 몰랐던 사실을 알아낼 때 써요.",
        "title": "Find out + 의문사절 (알아내다).",
        "examples": [
            "I'll find out and get back to you.",
            "How did you find out about the event?",
            "We need to find out what went wrong."
        ]
    },
    {
        "num": 66,
        "usage_ko": "mean by는 그 말의 뜻을 확인할 때 써요.",
        "title": "What do you mean by + 명사 / -ing?",
        "examples": [
            "What do you mean by “processing fee”?",
            "What do you mean by sharing the utilities?",
            "What do you mean by a flexible schedule?"
        ]
    },
    {
        "num": 67,
        "usage_ko": "figure out은 방법을 이해해 낼 때 써요.",
        "title": "Figure out + 의문사절 (이해하다 / 해결 방법을 찾다).",
        "examples": [
            "I can't figure out how this app works.",
            "We'll figure something out.",
            "Have you figured out what you want to do?"
        ]
    },
    {
        "num": 68,
        "usage_ko": "been meaning은 전부터 하려던 일이에요.",
        "title": "I've been meaning to + 동사원형.",
        "examples": [
            "I've been meaning to call you about the rent.",
            "I've been meaning to try that café.",
            "I've been meaning to thank you for your help."
        ]
    },
    {
        "num": 69,
        "usage_ko": "work out은 일이 잘 풀린다는 뜻이에요.",
        "title": "Work out (잘 풀리다 / 해결하다).",
        "examples": [
            "I'm sure everything will work out.",
            "We worked out a solution together.",
            "I hope the timing works out for you."
        ]
    },
    {
        "num": 70,
        "usage_ko": "try on은 옷이 맞는지 입어 볼 때 써요.",
        "title": "Can I try this on?",
        "examples": [
            "Can I try this on in the fitting room?",
            "Can I try this on here?",
            "Can I try this on before I buy it?"
        ]
    },
    {
        "num": 71,
        "usage_ko": "got은 잡혀 있는 약속이 있다는 뜻이에요.",
        "title": "I've got + 명사 / to + 동사원형.",
        "examples": [
            "I've got a dentist appointment at three.",
            "I've got to leave in ten minutes.",
            "I've got a few questions about the contract."
        ]
    },
    {
        "num": 72,
        "usage_ko": "deal with는 문제를 처리할 때 써요.",
        "title": "Deal with + 문제/사람 (처리하다 / 대처하다).",
        "examples": [
            "I'll deal with that later.",
            "How do you deal with stress?",
            "We need to deal with this before it gets worse."
        ]
    },
    {
        "num": 73,
        "usage_ko": "catch는 말을 듣고 알아듣는다는 뜻이에요.",
        "title": "I didn't catch + 단어 / that.",
        "examples": [
            "I didn't catch your name.",
            "I didn't catch the apartment number.",
            "Sorry, I didn't catch what you said after Tuesday."
        ]
    },
    {
        "num": 74,
        "usage_ko": "took은 어떤 일에 시간이 들었단 뜻이에요.",
        "title": "It took me + 시간 + to + 동사원형.",
        "examples": [
            "It took me an hour to get here in traffic.",
            "It took me a few weeks to get used to the new system.",
            "It took me forever to find a parking spot."
        ]
    },
    {
        "num": 75,
        "usage_ko": "put up with는 불편한 일을 참을 때 써요.",
        "title": "Put up with + 명사/-ing (참다 / 감수하다).",
        "examples": [
            "I can't put up with this noise anymore.",
            "How do you put up with such a long commute?",
            "You shouldn't have to put up with being treated that way."
        ]
    },
    {
        "num": 76,
        "usage_ko": "you mean은 상대 뜻이 맞는지 확인해요.",
        "title": "So, you mean (that) + 문장?",
        "examples": [
            "So, you mean the rent includes water but not electricity?",
            "So, you mean I need to bring my ID and the original document?",
            "So, you mean the package will arrive on Monday, not Friday?"
        ]
    },
    {
        "num": 77,
        "usage_ko": "different color는 다른 색상을 요청해요.",
        "title": "Do you have this in a different color?",
        "examples": [
            "Do you have this in a different color?",
            "Do you have this in black?",
            "Do you have this style in a lighter color?"
        ]
    },
    {
        "num": 78,
        "usage_ko": "get used to는 점점 익숙해질 때 써요.",
        "title": "I'm getting used to + 명사 / -ing.",
        "examples": [
            "I'm getting used to driving on this side of the road.",
            "I'm getting used to the colder weather.",
            "I'm getting used to speaking English at work."
        ]
    },
    {
        "num": 79,
        "usage_ko": "not sure는 확실히 알지 못한단 뜻이에요.",
        "title": "I'm not sure if + 문장",
        "examples": [
            "I'm not sure if I can make it by six.",
            "I'm not sure if this medicine is safe on an empty stomach.",
            "I'm not sure if the payment went through."
        ]
    },
    {
        "num": 80,
        "usage_ko": "be used to는 이미 익숙한 상태를 말해요.",
        "title": "I'm used to + 명사 / -ing.",
        "examples": [
            "I'm used to taking public transportation.",
            "I'm used to working late once in a while.",
            "I'm used to the noise from the street."
        ]
    },
    {
        "num": 81,
        "usage_ko": "put off는 해야 할 일을 미룰 때 써요.",
        "title": "Put off + 명사/-ing (미루다).",
        "examples": [
            "Don't put off the conversation any longer.",
            "I keep putting off going to the dentist.",
            "They put the trip off until next month."
        ]
    },
    {
        "num": 82,
        "usage_ko": "might as well은 차라리 하자는 뜻이에요.",
        "title": "I might as well + 동사원형.",
        "examples": [
            "The bus is late, so I might as well walk.",
            "Since we're here, we might as well get groceries.",
            "I might as well pay the bill now."
        ]
    },
    {
        "num": 83,
        "usage_ko": "keep on은 멈추지 않고 계속할 때 써요.",
        "title": "Keep on + -ing (계속 ~하다).",
        "examples": [
            "He kept on talking even after I left.",
            "Keep on trying—you're getting better.",
            "It kept on raining all day."
        ]
    },
    {
        "num": 84,
        "usage_ko": "too는 알맞은 정도를 넘어섰다는 뜻이에요.",
        "title": "This is too + 형용사",
        "examples": [
            "This is unfortunately too loose around the shoulders.",
            "This is too tight.",
            "This is too expensive."
        ]
    },
    {
        "num": 85,
        "usage_ko": "better는 안 하면 곤란해질 일을 권해요.",
        "title": "I'd better + 동사원형.",
        "examples": [
            "I'd better head home before it starts raining.",
            "I'd better call the bank before it closes.",
            "I'd better get going if I want to catch the train."
        ]
    },
    {
        "num": 86,
        "usage_ko": "would have는 사정상 못 한 일을 말해요.",
        "title": "I would have + 과거분사, but + 문장.",
        "examples": [
            "I would have called, but I lost your number.",
            "I would have come earlier, but the train was delayed.",
            "I would have helped, but I didn't know you needed anything."
        ]
    },
    {
        "num": 87,
        "usage_ko": "turn out은 실제로 나온 결과를 말해요.",
        "title": "Turn out (결과적으로 ~이다 / 밝혀지다).",
        "examples": [
            "It turned out better than I expected.",
            "The rumor turned out to be true.",
            "How did the interview turn out?"
        ]
    },
    {
        "num": 88,
        "usage_ko": "not sure는 반대 의견을 부드럽게 말해요.",
        "title": "I'm not sure I agree (with / that) + ...",
        "examples": [
            "I'm not sure I agree that this is the cheapest option.",
            "I'm not sure I agree with changing the schedule at the last minute.",
            "I'm not sure I agree that the issue is completely fixed."
        ]
    },
    {
        "num": 89,
        "usage_ko": "go through는 힘든 시기를 겪을 때 써요.",
        "title": "Go through + 경험/과정 (겪다 / 검토하다).",
        "examples": [
            "She's going through a difficult time.",
            "Let's go through the details one more time.",
            "I went through something similar last year."
        ]
    },
    {
        "num": 90,
        "usage_ko": "could have는 가능했지만 안 한 일이에요.",
        "title": "I could have + 과거분사.",
        "examples": [
            "I could have taken the earlier train.",
            "I could have left my card at the restaurant.",
            "I could have saved money by buying it online."
        ]
    },
    {
        "num": 91,
        "usage_ko": "return은 산 물건을 반품할 때 써요.",
        "title": "Can I return or exchange this + 기간 / 조건?",
        "examples": [
            "Can I return this later with the receipt?",
            "Can I exchange this for a different size?",
            "Can I return this within a week?"
        ]
    },
    {
        "num": 92,
        "usage_ko": "depends on은 조건에 따라 달라진단 뜻이에요.",
        "title": "It depends on + 명사 / 의문사절",
        "examples": [
            "It depends on the traffic.",
            "It depends on how many people are coming.",
            "It depends on whether the landlord approves the request."
        ]
    },
    {
        "num": 93,
        "usage_ko": "should have는 하지 않은 일을 후회해요.",
        "title": "I should have + 과거분사.",
        "examples": [
            "I should have brought an umbrella.",
            "I should have checked the address before leaving.",
            "I should have made the appointment sooner."
        ]
    },
    {
        "num": 94,
        "usage_ko": "about to는 막 하려던 순간을 말해요.",
        "title": "I was about to + 동사원형 when + 문장.",
        "examples": [
            "I was about to leave when the delivery arrived.",
            "I was about to call you when I got your message.",
            "I was about to go to bed when the fire alarm went off."
        ]
    },
    {
        "num": 95,
        "usage_ko": "mess up은 일을 잘못해 망쳤을 때 써요.",
        "title": "Mess up (망치다 / 실수하다).",
        "examples": [
            "I really messed up this time.",
            "Don't worry—you didn't mess anything up.",
            "I messed up the date and missed the appointment."
        ]
    },
    {
        "num": 96,
        "usage_ko": "nearest는 가장 가까운 장소를 찾을 때 써요.",
        "title": "Where is the nearest [transit stop]?",
        "examples": [
            "Where is the nearest subway station?",
            "Where is the nearest bus stop?",
            "Where is the nearest taxi stand?"
        ]
    },
    {
        "num": 97,
        "usage_ko": "sooner는 더 빨리 할수록 좋단 뜻이에요.",
        "title": "The sooner + 문장, the better.",
        "examples": [
            "The sooner we report it, the better.",
            "The sooner you book, the better.",
            "The sooner the repair is finished, the better."
        ]
    },
    {
        "num": 98,
        "usage_ko": "work는 그 시간이 괜찮은지 물을 때 써요.",
        "title": "Does + 시간 + work for you?",
        "examples": [
            "Does three o'clock work for you?",
            "Does Tuesday evening work for you?",
            "Does meeting at the café near your office work for you?"
        ]
    },
    {
        "num": 99,
        "usage_ko": "wind down은 쉬면서 긴장을 풀 때 써요.",
        "title": "Wind down (긴장을 풀며 마무리하다).",
        "examples": [
            "I need an hour to wind down after work.",
            "We were winding down when she called.",
            "How do you usually wind down at night?"
        ]
    },
    {
        "num": 100,
        "usage_ko": "help if는 도움이 될 행동을 부탁해요.",
        "title": "It would help if + 문장.",
        "examples": [
            "It would help if you could send the tracking number.",
            "It would help if the instructions were in writing.",
            "It would help if everyone cleaned up after cooking."
        ]
    },
    {
        "num": 101,
        "usage_ko": "burn out은 무리해서 지칠 때 써요.",
        "title": "Burn out (지쳐서 소진되다).",
        "examples": [
            "I don't want to burn out by taking on too much.",
            "She burned out after months of overtime.",
            "Take breaks before you burn out."
        ]
    },
    {
        "num": 102,
        "usage_ko": "able to는 해 줄 수 있는지 공손히 물어요.",
        "title": "Would you be able to + 동사원형?",
        "examples": [
            "Would you be able to meet a little earlier?",
            "Would you be able to hold my package until tomorrow?",
            "Would you be able to send me the details by email?"
        ]
    },
    {
        "num": 103,
        "usage_ko": "break down은 기계가 고장 났을 때 써요.",
        "title": "Break down (고장 나다 / 감정이 무너지다).",
        "examples": [
            "My car broke down on the way home.",
            "She broke down when she heard the news.",
            "Let's break the problem down into smaller steps."
        ]
    },
    {
        "num": 104,
        "usage_ko": "goes to는 목적지로 가는 노선을 물어요.",
        "title": "Which bus/train goes to + 명사?",
        "examples": [
            "Which bus goes to the museum?",
            "Which train goes to the airport?",
            "Which bus goes downtown?"
        ]
    },
    {
        "num": 105,
        "usage_ko": "come down with는 병의 초기 증상에 써요.",
        "title": "Come down with + 병 (병에 걸리다).",
        "examples": [
            "I think I'm coming down with a cold.",
            "She came down with the flu last week.",
            "I hope I don't come down with anything before the trip."
        ]
    },
    {
        "num": 106,
        "usage_ko": "up to는 결정할 사람이 누구인지 말해요.",
        "title": "It's up to + 사람.",
        "examples": [
            "It's up to the landlord to approve the change.",
            "It's up to you which restaurant we choose.",
            "It's up to the doctor to decide whether I need a test."
        ]
    },
    {
        "num": 107,
        "usage_ko": "take care는 맡아서 처리하겠다는 말이에요.",
        "title": "I'll take care of + 명사.",
        "examples": [
            "I'll take care of the electricity bill this month.",
            "I'll take care of calling the plumber.",
            "I'll take care of the reservation."
        ]
    },
    {
        "num": 108,
        "usage_ko": "came up은 갑자기 일이 생겼단 뜻이에요.",
        "title": "Something came up.",
        "examples": [
            "Something came up, so I need to cancel tonight.",
            "I'm sorry, but something came up at work.",
            "Something came up with my car this morning."
        ]
    },
    {
        "num": 109,
        "usage_ko": "transfer는 다른 교통편으로 갈아타요.",
        "title": "Do I need to transfer at + 명사?",
        "examples": [
            "Do I need to transfer at City Hall?",
            "Do I need to transfer to another line?",
            "Do I need to transfer at the next stop?"
        ]
    },
    {
        "num": 110,
        "usage_ko": "clean up은 어질러진 곳을 치울 때 써요.",
        "title": "Clean up (치우다 / 정리하다).",
        "examples": [
            "Can you help me clean up after dinner?",
            "I'll clean up the mess later.",
            "We need to clean up before the guests arrive."
        ]
    },
    {
        "num": 111,
        "usage_ko": "running late는 예정보다 늦는 중이에요.",
        "title": "I'm running + 시간 + late.",
        "examples": [
            "I'm running about ten minutes late.",
            "I'm running late because the bus never came.",
            "I'm sorry, but I'm running a little late for our appointment."
        ]
    },
    {
        "num": 112,
        "usage_ko": "put away는 물건을 제자리에 넣을 때 써요.",
        "title": "Put away + 물건 (제자리에 넣다).",
        "examples": [
            "Can you put away the groceries?",
            "Please put your phone away during dinner.",
            "I put the dishes away this morning."
        ]
    },
    {
        "num": 113,
        "usage_ko": "works for me는 그 일정이 괜찮단 뜻이에요.",
        "title": "That works for me.",
        "examples": [
            "Thursday at four works for me.",
            "Meeting online works for me.",
            "That works for me as long as I can leave by five."
        ]
    },
    {
        "num": 114,
        "usage_ko": "take out은 쓰레기를 밖으로 내갈 때 써요.",
        "title": "Take out + 쓰레기/음식 (밖으로 내다 / 포장해 가다).",
        "examples": [
            "Can you take out the trash?",
            "Let's take out pizza tonight.",
            "I forgot to take the recycling out."
        ]
    },
    {
        "num": 115,
        "usage_ko": "should는 도착할 것으로 예상할 때 써요.",
        "title": "I should be there by + 시간.",
        "examples": [
            "I should be there by seven.",
            "I should be there by the time the store opens.",
            "I should be there by noon if traffic is normal."
        ]
    },
    {
        "num": 116,
        "usage_ko": "throw out은 필요 없는 것을 버릴 때 써요.",
        "title": "Throw out + 물건 (버리다).",
        "examples": [
            "Don't throw out the receipt.",
            "We threw out a lot of old clothes.",
            "Is this still good, or should I throw it out?"
        ]
    },
    {
        "num": 117,
        "usage_ko": "get me는 택시를 잡아 달라고 부탁해요.",
        "title": "Can you get me a cab to + 명사?",
        "examples": [
            "Can you get me a cab to the airport?",
            "Can you get me a cab to the hotel?",
            "Can you get me a cab to the station?"
        ]
    },
    {
        "num": 118,
        "usage_ko": "run out은 남은 것을 다 써 버렸단 뜻이에요.",
        "title": "Run out of + 명사 (다 써 버리다).",
        "examples": [
            "We've run out of time.",
            "I ran out of things to say.",
            "Don't let your phone run out of battery."
        ]
    },
    {
        "num": 119,
        "usage_ko": "don't mind는 상대가 해도 괜찮다는 말이에요.",
        "title": "I don't mind if + 문장.",
        "examples": [
            "I don't mind if you open the window.",
            "I don't mind if we meet somewhere closer to you.",
            "I don't mind if you borrow my charger."
        ]
    },
    {
        "num": 120,
        "usage_ko": "on my way는 그곳으로 가는 중이에요.",
        "title": "I'm on my way (to + 장소).",
        "examples": [
            "I'm on my way to the station now.",
            "I'm on my way, but traffic is heavy.",
            "I'm on my way to the clinic. I'll be there soon."
        ]
    },
    {
        "num": 121,
        "usage_ko": "cut back은 소비량을 줄일 때 써요.",
        "title": "Cut back on + 소비/행동 (줄이다).",
        "examples": [
            "I'm trying to cut back on coffee.",
            "We need to cut back on unnecessary spending.",
            "The doctor told him to cut back on sugar."
        ]
    },
    {
        "num": 122,
        "usage_ko": "don't mind는 직접 해도 괜찮다는 말이에요.",
        "title": "I don't mind + -ing.",
        "examples": [
            "I don't mind waiting a few more minutes.",
            "I don't mind cooking if you do the dishes.",
            "I don't mind taking the bus instead."
        ]
    },
    {
        "num": 123,
        "usage_ko": "save up은 목표를 위해 돈을 모을 때 써요.",
        "title": "Save up for + 목표 (돈을 모으다).",
        "examples": [
            "I'm saving up for a trip next year.",
            "It took her months to save up for a new laptop.",
            "What are you saving up for?"
        ]
    },
    {
        "num": 124,
        "usage_ko": "about to는 바로 시작하기 직전이에요.",
        "title": "I'm about to + 동사원형.",
        "examples": [
            "I'm about to leave the house.",
            "I'm about to start cooking dinner.",
            "I'm about to get on the train."
        ]
    },
    {
        "num": 125,
        "usage_ko": "pay back은 빌린 돈을 갚을 때 써요.",
        "title": "Pay + 사람 + back (돈을 갚다 / 보답하다).",
        "examples": [
            "I'll pay you back next week.",
            "Thanks for lunch—let me pay you back.",
            "I'll never be able to pay you back for your help."
        ]
    },
    {
        "num": 126,
        "usage_ko": "drop off는 차에서 내려 달라고 부탁해요.",
        "title": "Please drop me off near + 명사",
        "examples": [
            "Please drop me off near the coffee shop.",
            "Please drop me off near the entrance.",
            "Please drop me off here."
        ]
    },
    {
        "num": 127,
        "usage_ko": "pay off는 노력이 결실을 맺을 때 써요.",
        "title": "Pay off (성과를 내다 / 빚을 다 갚다).",
        "examples": [
            "All that practice really paid off.",
            "Her patience paid off in the end.",
            "They finally paid off their loan."
        ]
    },
    {
        "num": 128,
        "usage_ko": "planning to는 실행할 계획을 말해요.",
        "title": "I'm planning to + 동사원형.",
        "examples": [
            "I'm planning to move at the end of the month.",
            "I'm planning to visit my family this weekend.",
            "I'm planning to renew my lease."
        ]
    },
    {
        "num": 129,
        "usage_ko": "feel free는 부담 없이 해도 된단 뜻이에요.",
        "title": "Feel free to + 동사원형.",
        "examples": [
            "Feel free to help yourself to coffee.",
            "Feel free to text me if you get lost.",
            "Feel free to use my desk while I'm away."
        ]
    },
    {
        "num": 130,
        "usage_ko": "take back은 전에 한 말을 취소할 때 써요.",
        "title": "Take back + 말/물건 (말을 철회하다 / 반품하다).",
        "examples": [
            "I take back what I said earlier.",
            "He immediately took back his comment.",
            "Can I take this back if it doesn't fit?"
        ]
    },
    {
        "num": 131,
        "usage_ko": "thinking of는 아직 고려 중인 계획이에요.",
        "title": "I'm thinking of + -ing.",
        "examples": [
            "I'm thinking of taking a night class.",
            "I'm thinking of getting a bike for commuting.",
            "I'm thinking of asking for a different room."
        ]
    },
    {
        "num": 132,
        "usage_ko": "set up은 만날 시간을 정할 때 써요.",
        "title": "Set up + 약속/기기 (마련하다 / 설정하다).",
        "examples": [
            "Let's set up a time to talk.",
            "She set up dinner for Friday night.",
            "Can you help me set up the new printer?"
        ]
    },
    {
        "num": 133,
        "usage_ko": "check in은 항공편 탑승 수속을 할 때 써요.",
        "title": "I'd like to check in for my flight to + 명사",
        "examples": [
            "I'd like to check in for my flight to New York.",
            "I'd like to check in for my flight to Paris.",
            "I'd like to check in for the next flight."
        ]
    },
    {
        "num": 134,
        "usage_ko": "sign up은 수업이나 활동을 신청할 때 써요.",
        "title": "Sign up for + 활동 (신청하다 / 등록하다).",
        "examples": [
            "I signed up for a cooking class.",
            "Do I need to sign up in advance?",
            "You can sign up online."
        ]
    },
    {
        "num": 135,
        "usage_ko": "keep posted는 진행 상황을 계속 알려 줘요.",
        "title": "I'll keep you posted.",
        "examples": [
            "I'll keep you posted on the repair.",
            "I'll keep you posted if my arrival time changes.",
            "I'll keep you posted once I hear back from the landlord."
        ]
    },
    {
        "num": 136,
        "usage_ko": "fill out은 양식의 빈칸을 작성할 때 써요.",
        "title": "Fill out + 양식 (양식을 작성하다).",
        "examples": [
            "Please fill out this form before you leave.",
            "I filled out the application online.",
            "Could you help me fill this out?"
        ]
    },
    {
        "num": 137,
        "usage_ko": "hoping to는 이루고 싶은 바람을 말해요.",
        "title": "I'm hoping to + 동사원형.",
        "examples": [
            "I'm hoping to find a place closer to work.",
            "I'm hoping to get an appointment this week.",
            "I'm hoping to save enough for a trip this summer."
        ]
    },
    {
        "num": 138,
        "usage_ko": "log in은 계정에 접속할 때 써요.",
        "title": "Log in (로그인하다).",
        "examples": [
            "I can't log in to my account.",
            "Log in and check your messages.",
            "Try logging in with your email address."
        ]
    },
    {
        "num": 139,
        "usage_ko": "get back은 확인한 뒤 답하겠다는 말이에요.",
        "title": "Let me get back to you.",
        "examples": [
            "Let me get back to you after I check my schedule.",
            "Let me get back to you about the price.",
            "Let me get back to you by tomorrow morning."
        ]
    },
    {
        "num": 140,
        "usage_ko": "call off는 예정된 행사를 취소할 때 써요.",
        "title": "Call off + 약속/행사 (취소하다).",
        "examples": [
            "They called off the game because of the rain.",
            "We may have to call off dinner tonight.",
            "I hate to call it off at the last minute."
        ]
    },
    {
        "num": 141,
        "usage_ko": "supposed to는 정해진 약속이나 의무예요.",
        "title": "I'm supposed to + 동사원형.",
        "examples": [
            "I'm supposed to meet the technician between two and four.",
            "I'm supposed to submit this form by Friday.",
            "I'm supposed to take this medicine with food."
        ]
    },
    {
        "num": 142,
        "usage_ko": "aisle은 비행기 통로 쪽 좌석을 말해요.",
        "title": "Can I get a window/aisle seat?",
        "examples": [
            "Can I get an aisle seat, please?",
            "Can I get a window seat, please?",
            "Can I get a seat near the front?"
        ]
    },
    {
        "num": 143,
        "usage_ko": "see if는 가능한지 알아보겠다는 말이에요.",
        "title": "I'll see if I can + 동사원형.",
        "examples": [
            "I'll see if I can move the appointment.",
            "I'll see if I can find someone to cover my shift.",
            "I'll see if I can get there before six."
        ]
    },
    {
        "num": 144,
        "usage_ko": "going to는 하려다가 바뀐 계획을 말해요.",
        "title": "I was going to + 동사원형, but ...",
        "examples": [
            "I was going to cook, but we ordered takeout instead.",
            "I was going to call you, but it got too late.",
            "I was going to take the bus, but it started raining."
        ]
    },
    {
        "num": 145,
        "usage_ko": "make sense는 합리적인 방법인지 물어요.",
        "title": "Would it make sense to + 동사원형?",
        "examples": [
            "Would it make sense to split the bill?",
            "Would it make sense to call before we go?",
            "Would it make sense to move the appointment online?"
        ]
    },
    {
        "num": 146,
        "usage_ko": "ended up은 결국 하게 된 일을 말해요.",
        "title": "I ended up + -ing.",
        "examples": [
            "I ended up taking a taxi because the train was canceled.",
            "I ended up buying the smaller one.",
            "I ended up staying home because I wasn't feeling well."
        ]
    },
    {
        "num": 147,
        "usage_ko": "let down은 기대를 저버려 실망시켜요.",
        "title": "Let + 사람 + down (실망시키다).",
        "examples": [
            "I don't want to let you down.",
            "The movie really let me down.",
            "I'm sorry I let the team down."
        ]
    },
    {
        "num": 148,
        "usage_ko": "under는 누구의 이름으로 예약했는지 말해요.",
        "title": "I have a reservation under + [이름]",
        "examples": [
            "I have a reservation under the name Minwoo Kim.",
            "I have a reservation under my company's name.",
            "I have a reservation under John Smith."
        ]
    },
    {
        "num": 149,
        "usage_ko": "used to는 지금은 아닌 과거의 상태예요.",
        "title": "I used to + 동사원형.",
        "examples": [
            "I used to live near the beach.",
            "I used to take this route to work every day.",
            "I used to be nervous about speaking English."
        ]
    },
    {
        "num": 150,
        "usage_ko": "what if는 다른 방법을 제안할 때 써요.",
        "title": "What if + 문장?",
        "examples": [
            "What if we meet at the station instead?",
            "What if the package doesn't arrive by Friday?",
            "What if we take the earlier bus?"
        ]
    },
    {
        "num": 151,
        "usage_ko": "been -ing는 전부터 계속한 일을 말해요.",
        "title": "I've been + -ing.",
        "examples": [
            "I've been looking for a new apartment.",
            "I've been having trouble sleeping lately.",
            "I've been meaning to ask you about that."
        ]
    },
    {
        "num": 152,
        "usage_ko": "how about은 함께 할 일을 제안해요.",
        "title": "How about + 명사 / -ing?",
        "examples": [
            "How about meeting at six?",
            "How about pizza for dinner?",
            "How about taking a break first?"
        ]
    },
    {
        "num": 153,
        "usage_ko": "open to는 제안을 받아들일 의향을 물어요.",
        "title": "Would you be open to + -ing?",
        "examples": [
            "Would you be open to meeting a little earlier?",
            "Would you be open to sharing the internet bill?",
            "Would you be open to trying a different payment plan?"
        ]
    },
    {
        "num": 154,
        "usage_ko": "last time은 지난번의 경험을 꺼낼 때 써요.",
        "title": "The last time I + 과거동사, ...",
        "examples": [
            "The last time I took this bus, it was delayed.",
            "The last time I ordered from them, the delivery was fast.",
            "The last time I moved, I hired a moving company."
        ]
    },
    {
        "num": 155,
        "usage_ko": "yet은 기대한 일이 아직 안 끝났단 뜻이에요.",
        "title": "I haven't + 과거분사 + yet.",
        "examples": [
            "I haven't received the email yet.",
            "I haven't tried that restaurant yet.",
            "I haven't finished the application yet."
        ]
    },
    {
        "num": 156,
        "usage_ko": "flexibility는 일정 조정의 여지를 물어요.",
        "title": "Is there any flexibility on + 명사?",
        "examples": [
            "Is there any flexibility on the move-in date?",
            "Is there any flexibility on the monthly rent?",
            "Is there any flexibility on the appointment time?"
        ]
    },
    {
        "num": 157,
        "usage_ko": "just는 방금 끝낸 일을 말할 때 써요.",
        "title": "I just + 과거동사.",
        "examples": [
            "I just got home.",
            "I just spoke with the building manager.",
            "I just sent you the payment."
        ]
    },
    {
        "num": 158,
        "usage_ko": "already는 벌써 끝낸 일을 말해요.",
        "title": "I've already + 과거분사.",
        "examples": [
            "I've already paid the bill.",
            "I've already called the doctor.",
            "I've already tried restarting the router."
        ]
    },
    {
        "num": 159,
        "usage_ko": "feel like는 지금 하고 싶은 일을 말해요.",
        "title": "I feel like + -ing / 명사.",
        "examples": [
            "I feel like getting something warm to eat.",
            "I feel like a walk after dinner.",
            "I don't really feel like watching a movie tonight."
        ]
    },
    {
        "num": 160,
        "usage_ko": "point는 상대 의견의 요점을 이해했단 말이에요.",
        "title": "I see your point.",
        "examples": [
            "I see your point, especially about the cost.",
            "I see your point, but I still think we should ask first.",
            "I see your point about needing more time."
        ]
    },
    {
        "num": 161,
        "usage_ko": "forward to는 앞으로 할 일을 기대해요.",
        "title": "I'm looking forward to + 명사 / -ing.",
        "examples": [
            "I'm looking forward to seeing the new place.",
            "I'm looking forward to the long weekend.",
            "I'm looking forward to meeting everyone."
        ]
    },
    {
        "num": 162,
        "usage_ko": "glad는 다행이고 기쁘다는 마음이에요.",
        "title": "I'm glad (that) + 문장.",
        "examples": [
            "I'm glad you made it home safely.",
            "I'm glad the doctor could see you today.",
            "I'm glad we cleared that up."
        ]
    },
    {
        "num": 163,
        "usage_ko": "sorry to hear는 안타까운 소식에 공감해요.",
        "title": "I'm sorry to hear (that) + 문장.",
        "examples": [
            "I'm sorry to hear that you're not feeling well.",
            "I'm sorry to hear that your flight was canceled.",
            "I'm sorry to hear about the problem with your apartment."
        ]
    },
    {
        "num": 164,
        "usage_ko": "must는 상대가 그럴 거라 생각하며 공감해요.",
        "title": "That must be + 형용사.",
        "examples": [
            "That must be frustrating.",
            "That must be exciting for you.",
            "That must be hard to deal with."
        ]
    },
    {
        "num": 165,
        "usage_ko": "see why는 상대가 그러는 이유를 이해해요.",
        "title": "I can see why + 문장.",
        "examples": [
            "I can see why you like this neighborhood.",
            "I can see why that rule is confusing.",
            "I can see why you want to wait."
        ]
    },
    {
        "num": 166,
        "usage_ko": "speaking of는 관련된 화제로 옮길 때 써요.",
        "title": "Speaking of + 명사 / -ing, ...",
        "examples": [
            "Speaking of coffee, do you know a good place nearby?",
            "Speaking of weekends, are you doing anything on Saturday?",
            "Speaking of the landlord, did they call you back?"
        ]
    },
    {
        "num": 167,
        "usage_ko": "didn't mean은 그럴 의도가 아니었단 말이에요.",
        "title": "I didn't mean to + 동사원형.",
        "examples": [
            "I didn't mean to interrupt you.",
            "I didn't mean to sound rude.",
            "I didn't mean to send that message to everyone."
        ]
    },
    {
        "num": 168,
        "usage_ko": "don't mean은 불만을 말하기 전 뜻을 완화해요.",
        "title": "I don't mean to + 동사원형, but ...",
        "examples": [
            "I don't mean to complain, but the room is very cold.",
            "I don't mean to rush you, but I need to leave soon.",
            "I don't mean to be difficult, but could you check that again?"
        ]
    },
    {
        "num": 169,
        "usage_ko": "up to는 요즘 어떻게 지내는지 물어요.",
        "title": "What have you been up to?",
        "examples": [
            "What have you been up to lately?",
            "What have you been up to since you moved here?",
            "Hey, what have you been up to this weekend?"
        ]
    },
    {
        "num": 170,
        "usage_ko": "don't mind는 질문에 앞서 양해를 구해요.",
        "title": "If you don't mind me asking, + 질문",
        "examples": [
            "If you don't mind me asking, how much is the monthly rent?",
            "If you don't mind me asking, which internet provider do you use?",
            "If you don't mind me asking, is this area usually quiet at night?"
        ]
    },
    {
        "num": 171,
        "usage_ko": "go는 면접 같은 일이 어떻게 됐는지 물어요.",
        "title": "How did + 일/행사 + go?",
        "examples": [
            "How did your job interview go?",
            "How did the doctor's appointment go?",
            "How did your move go?"
        ]
    },
    {
        "num": 172,
        "usage_ko": "appreciate는 감사의 뜻을 담아 부탁해요.",
        "title": "I'd appreciate it if + 문장.",
        "examples": [
            "I'd appreciate it if you could send me the receipt.",
            "I'd appreciate it if you didn't share my number.",
            "I'd appreciate it if the repair could be done this week."
        ]
    },
    {
        "num": 173,
        "usage_ko": "like는 장소가 어떤 느낌이었는지 물어요.",
        "title": "What was + it/that + like?",
        "examples": [
            "What was the neighborhood like?",
            "What was your first day at work like?",
            "What was it like living there?"
        ]
    },
    {
        "num": 174,
        "usage_ko": "think about은 제안에 대한 의견을 물어요.",
        "title": "What do you think about + 명사 / -ing?",
        "examples": [
            "What do you think about taking the train instead?",
            "What do you think about this neighborhood?",
            "What do you think about meeting halfway?"
        ]
    },
    {
        "num": 175,
        "usage_ko": "wondering if는 궁금한 점을 공손히 물어요.",
        "title": "I was wondering if + 문장.",
        "examples": [
            "I was wondering if you have any rooms available this weekend.",
            "I was wondering if I could change my appointment.",
            "I was wondering if the fee can be waived."
        ]
    },
    {
        "num": 176,
        "usage_ko": "seems는 문제가 있다고 조심스레 말해요.",
        "title": "There seems to be a problem with + 명사.",
        "examples": [
            "There seems to be a problem with my bill.",
            "There seems to be a problem with the heating in my room.",
            "There seems to be a problem with the payment terminal."
        ]
    },
    {
        "num": 177,
        "usage_ko": "happen to know는 혹시 아는지 물어요.",
        "title": "Do you happen to know + 의문사절?",
        "examples": [
            "Do you happen to know where the nearest post office is?",
            "Do you happen to know if this bus stops at City Hall?",
            "Do you happen to know who I should contact about the noise?"
        ]
    },
    {
        "num": 178,
        "usage_ko": "trouble은 어떤 일을 하는 데 겪는 어려움이에요.",
        "title": "I'm having trouble + -ing / with + 명사.",
        "examples": [
            "I'm having trouble logging into my account.",
            "I'm having trouble with the washing machine.",
            "I'm having trouble understanding this form."
        ]
    },
    {
        "num": 179,
        "usage_ko": "won't는 해 보아도 작동하지 않는단 뜻이에요.",
        "title": "It won't + 동사원형.",
        "examples": [
            "The door won't lock.",
            "My phone won't connect to the Wi-Fi.",
            "The machine won't take my card."
        ]
    },
    {
        "num": 180,
        "usage_ko": "thought는 전에 잘못 알고 있던 내용을 말해요.",
        "title": "I thought + 과거동사, but ...",
        "examples": [
            "I thought the store closed at nine, but it closes at eight.",
            "I thought I had already paid, but I was wrong.",
            "I thought this was the express bus, but it isn't."
        ]
    },
    {
        "num": 181,
        "usage_ko": "keeps는 문제가 계속 반복된다는 뜻이에요.",
        "title": "It keeps + -ing.",
        "examples": [
            "The app keeps crashing.",
            "The smoke alarm keeps beeping.",
            "My neighbor's dog keeps barking at night."
        ]
    },
    {
        "num": 182,
        "usage_ko": "realize는 모르던 사실을 뒤늦게 알았어요.",
        "title": "I didn't realize (that) + 문장.",
        "examples": [
            "I didn't realize that parking costs extra.",
            "I didn't realize the library was closed on Mondays.",
            "I didn't realize I needed to make a reservation."
        ]
    },
    {
        "num": 183,
        "usage_ko": "remember는 떠오르지 않는 기억을 말해요.",
        "title": "I can't remember + 의문사절 / if절.",
        "examples": [
            "I can't remember where I parked.",
            "I can't remember if I locked the door.",
            "I can't remember what the doctor said about the dosage."
        ]
    },
    {
        "num": 184,
        "usage_ko": "afraid는 안 좋은 소식을 공손히 전해요.",
        "title": "I'm afraid + 문장.",
        "examples": [
            "I'm afraid the item is out of stock.",
            "I'm afraid I won't be able to make it tonight.",
            "I'm afraid the next appointment isn't until Thursday."
        ]
    },
    {
        "num": 185,
        "usage_ko": "no idea는 전혀 모르겠다는 뜻이에요.",
        "title": "I have no idea + 의문사절.",
        "examples": [
            "I have no idea where my keys are.",
            "I have no idea why the payment failed.",
            "I have no idea how this machine works."
        ]
    },
    {
        "num": 186,
        "usage_ko": "pretty sure는 꽤 확신하지만 단정은 안 해요.",
        "title": "I'm pretty sure (that) + 문장.",
        "examples": [
            "I'm pretty sure this is the right platform.",
            "I'm pretty sure the rent is due on the first.",
            "I'm pretty sure I left my umbrella at the café."
        ]
    },
    {
        "num": 187,
        "usage_ko": "love to는 원하지만 못 한다며 거절해요.",
        "title": "I'd love to, but + 문장.",
        "examples": [
            "I'd love to, but I already have plans tonight.",
            "I'd love to help, but I have to work this weekend.",
            "I'd love to join you, but I'm not feeling well."
        ]
    },
    {
        "num": 188,
        "usage_ko": "may have는 과거에 그랬을 가능성이에요.",
        "title": "I may have + 과거분사.",
        "examples": [
            "I may have left my wallet in the taxi.",
            "I may have typed the wrong password.",
            "I may have taken the wrong bus."
        ]
    },
    {
        "num": 189,
        "usage_ko": "might는 앞으로 그럴 수도 있다는 말이에요.",
        "title": "I might + 동사원형.",
        "examples": [
            "I might be a few minutes late.",
            "I might take a class next semester.",
            "I might stay home if it keeps raining."
        ]
    },
    {
        "num": 190,
        "usage_ko": "not comfortable은 꺼리는 행동을 말해요.",
        "title": "I don't feel comfortable + -ing / with ...",
        "examples": [
            "I don't feel comfortable sharing my bank details.",
            "I don't feel comfortable with someone entering my room without notice.",
            "I don't feel comfortable signing this without more information."
        ]
    }
];
