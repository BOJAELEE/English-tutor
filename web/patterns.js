const PATTERNS = [
    {
        "num": 1,
        "title": "I can't say for sure, but + 문장.",
        "examples": [
            "I can't say for sure, but the bus should be here soon.",
            "I can't say for sure, but I think the pharmacy is open until nine.",
            "I can't say for sure, but this neighborhood seems pretty safe."
        ]
    },
    {
        "num": 2,
        "title": "As far as + 명사 + is concerned, + 문장.",
        "examples": [
            "As far as rent is concerned, this place is within my budget.",
            "As far as parking is concerned, there are spaces behind the building.",
            "As far as the schedule is concerned, Friday works best for me."
        ]
    },
    {
        "num": 3,
        "title": "At least + 문장.",
        "examples": [
            "At least we found the right building.",
            "At least the repair is covered by the warranty.",
            "At least you don't have to pay the late fee."
        ]
    },
    {
        "num": 4,
        "title": "I'd like + 명사 / to + 동사원형",
        "examples": [
            "I'd like to make an appointment for next week.",
            "I'd like a room away from the elevator.",
            "I'd like to exchange this for a different size."
        ]
    },
    {
        "num": 5,
        "title": "If anything, + 문장.",
        "examples": [
            "If anything, the traffic has gotten worse this week.",
            "If anything, I need a little more time to decide.",
            "If anything, the new route is faster than the old one."
        ]
    },
    {
        "num": 6,
        "title": "That reminds me, + 문장.",
        "examples": [
            "That reminds me, I need to call the internet company.",
            "That reminds me, your package came this morning.",
            "That reminds me, are you still looking for a roommate?"
        ]
    },
    {
        "num": 7,
        "title": "Come to think of it, + 문장.",
        "examples": [
            "Come to think of it, I haven't seen the keys today.",
            "Come to think of it, the store may be closed on Mondays.",
            "Come to think of it, I can give you a ride after work."
        ]
    },
    {
        "num": 8,
        "title": "Is there a way to + 동사원형?",
        "examples": [
            "Is there a way to change my appointment online?",
            "Is there a way to get to the airport without taking a taxi?",
            "Is there a way to reset my password from the app?"
        ]
    },
    {
        "num": 9,
        "title": "I get the feeling (that) + 문장.",
        "examples": [
            "I get the feeling that the landlord is still considering our request.",
            "I get the feeling that this line is not moving.",
            "I get the feeling that she prefers to text rather than call."
        ]
    },
    {
        "num": 10,
        "title": "I tend to + 동사원형.",
        "examples": [
            "I tend to do my grocery shopping on Sundays.",
            "I tend to get carsick on long rides.",
            "I tend to wake up early even on weekends."
        ]
    },
    {
        "num": 11,
        "title": "I happen to + 동사원형.",
        "examples": [
            "I happen to have an extra phone charger.",
            "I happen to know a good dentist nearby.",
            "I happen to be going downtown this afternoon."
        ]
    },
    {
        "num": 12,
        "title": "I can't make it + 시간 / 행사.",
        "examples": [
            "I can't make it to dinner tonight.",
            "I can't make it by six because my train is delayed.",
            "I can't make it to the appointment, so I need to reschedule."
        ]
    },
    {
        "num": 13,
        "title": "I can't afford to + 동사원형.",
        "examples": [
            "I can't afford to miss another day of work.",
            "I can't afford to replace my phone right now.",
            "I can't afford to wait much longer for the repair."
        ]
    },
    {
        "num": 14,
        "title": "I wouldn't count on + 명사 / -ing.",
        "examples": [
            "I wouldn't count on the bus being on time in this weather.",
            "I wouldn't count on finding parking near the stadium.",
            "I wouldn't count on the package arriving today."
        ]
    },
    {
        "num": 15,
        "title": "How long does it take to + 동사원형?",
        "examples": [
            "How long does it take to get to the airport from here?",
            "How long does it take to get a replacement card?",
            "How long does it take to process the application?"
        ]
    },
    {
        "num": 16,
        "title": "It's worth + -ing.",
        "examples": [
            "It's worth calling ahead before you go.",
            "It's worth getting travel insurance for a longer trip.",
            "That restaurant is worth trying at least once."
        ]
    },
    {
        "num": 17,
        "title": "It doesn't hurt to + 동사원형.",
        "examples": [
            "It doesn't hurt to ask for a discount.",
            "It doesn't hurt to keep a copy of the receipt.",
            "It doesn't hurt to arrive a little early."
        ]
    },
    {
        "num": 18,
        "title": "I was supposed to + 동사원형, but + 문장.",
        "examples": [
            "I was supposed to receive the package today, but it never arrived.",
            "I was supposed to meet my manager at two, but the meeting was canceled.",
            "I was supposed to get a confirmation email, but I haven't received one."
        ]
    },
    {
        "num": 19,
        "title": "I was told (that) + 문장.",
        "examples": [
            "I was told that the repair would be covered.",
            "I was told to bring my ID to the appointment.",
            "I was told that the office closes at four."
        ]
    },
    {
        "num": 20,
        "title": "I take it (that) + 문장?",
        "examples": [
            "I take it that breakfast is included?",
            "I take it that I need to book in advance?",
            "I take it that the building is locked after ten?"
        ]
    },
    {
        "num": 21,
        "title": "I'm trying to + 동사원형",
        "examples": [
            "I'm trying to check in, but the kiosk isn't reading my passport.",
            "I'm trying to find out which bus goes to the hospital.",
            "I'm trying to set up automatic payments."
        ]
    },
    {
        "num": 22,
        "title": "That's not quite what I meant.",
        "examples": [
            "That's not quite what I meant—I only need it for one day.",
            "That's not quite what I meant. I was asking about the fee.",
            "That's not quite what I meant. Could I explain again?"
        ]
    },
    {
        "num": 23,
        "title": "I want to make sure (that) + 문장",
        "examples": [
            "I want to make sure the reservation is under my name.",
            "I want to make sure I understand the cancellation policy.",
            "I want to make sure this is the correct address for delivery."
        ]
    },
    {
        "num": 24,
        "title": "I'm not convinced (that) + 문장.",
        "examples": [
            "I'm not convinced that the problem is completely fixed.",
            "I'm not convinced that this is the best option for us.",
            "I'm not convinced that the estimate includes all the fees."
        ]
    },
    {
        "num": 25,
        "title": "Let me + 동사원형",
        "examples": [
            "Let me check the bus schedule for you.",
            "Let me grab my jacket, and then we can go.",
            "Let me think about it and get back to you tomorrow."
        ]
    },
    {
        "num": 26,
        "title": "I'm leaning toward + 명사 / -ing.",
        "examples": [
            "I'm leaning toward taking the earlier flight.",
            "I'm leaning toward the smaller apartment.",
            "I'm leaning toward waiting until next month."
        ]
    },
    {
        "num": 27,
        "title": "I'd prefer + 명사 / to + 동사원형",
        "examples": [
            "I'd prefer a table outside if one is available.",
            "I'd prefer to take the earlier train.",
            "I'd prefer a month-to-month lease."
        ]
    },
    {
        "num": 28,
        "title": "I'm wondering whether + 문장.",
        "examples": [
            "I'm wondering whether the office is open on Saturday.",
            "I'm wondering whether it would be cheaper to pay annually.",
            "I'm wondering whether I need to bring anything to the appointment."
        ]
    },
    {
        "num": 29,
        "title": "I'd rather + 동사원형",
        "examples": [
            "I'd rather walk than wait for another bus.",
            "I'd rather not share my phone number.",
            "I'd rather meet somewhere quiet."
        ]
    },
    {
        "num": 30,
        "title": "I'd feel better if + 문장.",
        "examples": [
            "I'd feel better if you could send me the confirmation by email.",
            "I'd feel better if we left before it gets dark.",
            "I'd feel better if the repair person called before arriving."
        ]
    },
    {
        "num": 31,
        "title": "Would you like to + 동사원형?",
        "examples": [
            "Would you like to join us for dinner tonight?",
            "Would you like to come in and wait inside?",
            "Would you like to try a different size?"
        ]
    },
    {
        "num": 32,
        "title": "I'm concerned about + 명사 / -ing.",
        "examples": [
            "I'm concerned about the extra charge on my bill.",
            "I'm concerned about driving in this weather.",
            "I'm concerned about how long the repair will take."
        ]
    },
    {
        "num": 33,
        "title": "What concerns me is (that) + 문장.",
        "examples": [
            "What concerns me is that the lock doesn't work properly.",
            "What concerns me is that the bill keeps changing.",
            "What concerns me is that there isn't a clear emergency contact."
        ]
    },
    {
        "num": 34,
        "title": "Would it be okay if + 문장?",
        "examples": [
            "Would it be okay if I paid the balance tomorrow morning?",
            "Would it be okay if my friend stayed over for one night?",
            "Would it be okay if we moved the meeting to Friday?"
        ]
    },
    {
        "num": 35,
        "title": "The only thing is (that) + 문장.",
        "examples": [
            "The only thing is that I don't have a car.",
            "The only thing is that the store closes at six.",
            "The only thing is that I may need to leave early."
        ]
    },
    {
        "num": 36,
        "title": "Do you mind if + 문장?",
        "examples": [
            "Do you mind if I open the window?",
            "Do you mind if I take this call outside?",
            "Do you mind if we switch seats?"
        ]
    },
    {
        "num": 37,
        "title": "I wouldn't mind + -ing.",
        "examples": [
            "I wouldn't mind sharing a ride if you're going that way.",
            "I wouldn't mind waiting another ten minutes.",
            "I wouldn't mind trying a different restaurant."
        ]
    },
    {
        "num": 38,
        "title": "Would you mind + -ing?",
        "examples": [
            "Would you mind lowering the music a little?",
            "Would you mind taking a picture of us?",
            "Would you mind writing that down for me?"
        ]
    },
    {
        "num": 39,
        "title": "I'd be happy to + 동사원형.",
        "examples": [
            "I'd be happy to show you where the laundry room is.",
            "I'd be happy to bring in your mail while you're away.",
            "I'd be happy to review the form with you."
        ]
    },
    {
        "num": 40,
        "title": "I don't feel like + -ing.",
        "examples": [
            "I don't feel like cooking tonight.",
            "I don't feel like going out in the rain.",
            "I don't feel like talking about work right now."
        ]
    },
    {
        "num": 41,
        "title": "I can't help + -ing.",
        "examples": [
            "I can't help worrying about the delay.",
            "I can't help smiling when I see that dog.",
            "I can't help wondering whether I entered the wrong address."
        ]
    },
    {
        "num": 42,
        "title": "What do you mean by + 명사 / -ing?",
        "examples": [
            "What do you mean by “processing fee”?",
            "What do you mean by sharing the utilities?",
            "What do you mean by a flexible schedule?"
        ]
    },
    {
        "num": 43,
        "title": "I've been meaning to + 동사원형.",
        "examples": [
            "I've been meaning to call you about the rent.",
            "I've been meaning to try that café.",
            "I've been meaning to thank you for your help."
        ]
    },
    {
        "num": 44,
        "title": "I've got + 명사 / to + 동사원형.",
        "examples": [
            "I've got a dentist appointment at three.",
            "I've got to leave in ten minutes.",
            "I've got a few questions about the contract."
        ]
    },
    {
        "num": 45,
        "title": "I didn't catch + 단어 / that.",
        "examples": [
            "I didn't catch your name.",
            "I didn't catch the apartment number.",
            "Sorry, I didn't catch what you said after Tuesday."
        ]
    },
    {
        "num": 46,
        "title": "It took me + 시간 + to + 동사원형.",
        "examples": [
            "It took me an hour to get here in traffic.",
            "It took me a few weeks to get used to the new system.",
            "It took me forever to find a parking spot."
        ]
    },
    {
        "num": 47,
        "title": "So, you mean (that) + 문장?",
        "examples": [
            "So, you mean the rent includes water but not electricity?",
            "So, you mean I need to bring my ID and the original document?",
            "So, you mean the package will arrive on Monday, not Friday?"
        ]
    },
    {
        "num": 48,
        "title": "I'm getting used to + 명사 / -ing.",
        "examples": [
            "I'm getting used to driving on this side of the road.",
            "I'm getting used to the colder weather.",
            "I'm getting used to speaking English at work."
        ]
    },
    {
        "num": 49,
        "title": "I'm not sure if + 문장",
        "examples": [
            "I'm not sure if I can make it by six.",
            "I'm not sure if this medicine is safe on an empty stomach.",
            "I'm not sure if the payment went through."
        ]
    },
    {
        "num": 50,
        "title": "I'm used to + 명사 / -ing.",
        "examples": [
            "I'm used to taking public transportation.",
            "I'm used to working late once in a while.",
            "I'm used to the noise from the street."
        ]
    },
    {
        "num": 51,
        "title": "I might as well + 동사원형.",
        "examples": [
            "The bus is late, so I might as well walk.",
            "Since we're here, we might as well get groceries.",
            "I might as well pay the bill now."
        ]
    },
    {
        "num": 52,
        "title": "I'd better + 동사원형.",
        "examples": [
            "I'd better head home before it starts raining.",
            "I'd better call the bank before it closes.",
            "I'd better get going if I want to catch the train."
        ]
    },
    {
        "num": 53,
        "title": "I would have + 과거분사, but + 문장.",
        "examples": [
            "I would have called, but I lost your number.",
            "I would have come earlier, but the train was delayed.",
            "I would have helped, but I didn't know you needed anything."
        ]
    },
    {
        "num": 54,
        "title": "I'm not sure I agree (with / that) + ...",
        "examples": [
            "I'm not sure I agree that this is the cheapest option.",
            "I'm not sure I agree with changing the schedule at the last minute.",
            "I'm not sure I agree that the issue is completely fixed."
        ]
    },
    {
        "num": 55,
        "title": "I could have + 과거분사.",
        "examples": [
            "I could have taken the earlier train.",
            "I could have left my card at the restaurant.",
            "I could have saved money by buying it online."
        ]
    },
    {
        "num": 56,
        "title": "It depends on + 명사 / 의문사절",
        "examples": [
            "It depends on the traffic.",
            "It depends on how many people are coming.",
            "It depends on whether the landlord approves the request."
        ]
    },
    {
        "num": 57,
        "title": "I should have + 과거분사.",
        "examples": [
            "I should have brought an umbrella.",
            "I should have checked the address before leaving.",
            "I should have made the appointment sooner."
        ]
    },
    {
        "num": 58,
        "title": "I was about to + 동사원형 when + 문장.",
        "examples": [
            "I was about to leave when the delivery arrived.",
            "I was about to call you when I got your message.",
            "I was about to go to bed when the fire alarm went off."
        ]
    },
    {
        "num": 59,
        "title": "Are you free + 시간?",
        "examples": [
            "Are you free this Saturday afternoon?",
            "Are you free for a quick call after work?",
            "Are you free sometime next week?"
        ]
    },
    {
        "num": 60,
        "title": "The sooner + 문장, the better.",
        "examples": [
            "The sooner we report it, the better.",
            "The sooner you book, the better.",
            "The sooner the repair is finished, the better."
        ]
    },
    {
        "num": 61,
        "title": "Does + 시간 + work for you?",
        "examples": [
            "Does three o'clock work for you?",
            "Does Tuesday evening work for you?",
            "Does meeting at the café near your office work for you?"
        ]
    },
    {
        "num": 62,
        "title": "It would help if + 문장.",
        "examples": [
            "It would help if you could send the tracking number.",
            "It would help if the instructions were in writing.",
            "It would help if everyone cleaned up after cooking."
        ]
    },
    {
        "num": 63,
        "title": "Would you be able to + 동사원형?",
        "examples": [
            "Would you be able to meet a little earlier?",
            "Would you be able to hold my package until tomorrow?",
            "Would you be able to send me the details by email?"
        ]
    },
    {
        "num": 64,
        "title": "It's up to + 사람.",
        "examples": [
            "It's up to the landlord to approve the change.",
            "It's up to you which restaurant we choose.",
            "It's up to the doctor to decide whether I need a test."
        ]
    },
    {
        "num": 65,
        "title": "Can we move + 일정 + to + 시간?",
        "examples": [
            "Can we move our appointment to Thursday?",
            "Can we move the meeting to the afternoon?",
            "Can we move dinner to next week?"
        ]
    },
    {
        "num": 66,
        "title": "I'll take care of + 명사.",
        "examples": [
            "I'll take care of the electricity bill this month.",
            "I'll take care of calling the plumber.",
            "I'll take care of the reservation."
        ]
    },
    {
        "num": 67,
        "title": "Something came up.",
        "examples": [
            "Something came up, so I need to cancel tonight.",
            "I'm sorry, but something came up at work.",
            "Something came up with my car this morning."
        ]
    },
    {
        "num": 68,
        "title": "I can work with + 명사 / that.",
        "examples": [
            "I can work with a later delivery date.",
            "I can work with that price if installation is included.",
            "I can work with a smaller room for a few months."
        ]
    },
    {
        "num": 69,
        "title": "I'm running + 시간 + late.",
        "examples": [
            "I'm running about ten minutes late.",
            "I'm running late because the bus never came.",
            "I'm sorry, but I'm running a little late for our appointment."
        ]
    },
    {
        "num": 70,
        "title": "That works for me.",
        "examples": [
            "Thursday at four works for me.",
            "Meeting online works for me.",
            "That works for me as long as I can leave by five."
        ]
    },
    {
        "num": 71,
        "title": "I should be there by + 시간.",
        "examples": [
            "I should be there by seven.",
            "I should be there by the time the store opens.",
            "I should be there by noon if traffic is normal."
        ]
    },
    {
        "num": 72,
        "title": "I don't mind if + 문장.",
        "examples": [
            "I don't mind if you open the window.",
            "I don't mind if we meet somewhere closer to you.",
            "I don't mind if you borrow my charger."
        ]
    },
    {
        "num": 73,
        "title": "I'm on my way (to + 장소).",
        "examples": [
            "I'm on my way to the station now.",
            "I'm on my way, but traffic is heavy.",
            "I'm on my way to the clinic. I'll be there soon."
        ]
    },
    {
        "num": 74,
        "title": "I don't mind + -ing.",
        "examples": [
            "I don't mind waiting a few more minutes.",
            "I don't mind cooking if you do the dishes.",
            "I don't mind taking the bus instead."
        ]
    },
    {
        "num": 75,
        "title": "I'm about to + 동사원형.",
        "examples": [
            "I'm about to leave the house.",
            "I'm about to start cooking dinner.",
            "I'm about to get on the train."
        ]
    },
    {
        "num": 76,
        "title": "You're welcome to + 동사원형.",
        "examples": [
            "You're welcome to use the kitchen.",
            "You're welcome to stay until the rain stops.",
            "You're welcome to take one of these brochures."
        ]
    },
    {
        "num": 77,
        "title": "I'm planning to + 동사원형.",
        "examples": [
            "I'm planning to move at the end of the month.",
            "I'm planning to visit my family this weekend.",
            "I'm planning to renew my lease."
        ]
    },
    {
        "num": 78,
        "title": "Feel free to + 동사원형.",
        "examples": [
            "Feel free to help yourself to coffee.",
            "Feel free to text me if you get lost.",
            "Feel free to use my desk while I'm away."
        ]
    },
    {
        "num": 79,
        "title": "I'm thinking of + -ing.",
        "examples": [
            "I'm thinking of taking a night class.",
            "I'm thinking of getting a bike for commuting.",
            "I'm thinking of asking for a different room."
        ]
    },
    {
        "num": 80,
        "title": "I'll keep you posted.",
        "examples": [
            "I'll keep you posted on the repair.",
            "I'll keep you posted if my arrival time changes.",
            "I'll keep you posted once I hear back from the landlord."
        ]
    },
    {
        "num": 81,
        "title": "I'm hoping to + 동사원형.",
        "examples": [
            "I'm hoping to find a place closer to work.",
            "I'm hoping to get an appointment this week.",
            "I'm hoping to save enough for a trip this summer."
        ]
    },
    {
        "num": 82,
        "title": "Let me get back to you.",
        "examples": [
            "Let me get back to you after I check my schedule.",
            "Let me get back to you about the price.",
            "Let me get back to you by tomorrow morning."
        ]
    },
    {
        "num": 83,
        "title": "I'm supposed to + 동사원형.",
        "examples": [
            "I'm supposed to meet the technician between two and four.",
            "I'm supposed to submit this form by Friday.",
            "I'm supposed to take this medicine with food."
        ]
    },
    {
        "num": 84,
        "title": "I'll see if I can + 동사원형.",
        "examples": [
            "I'll see if I can move the appointment.",
            "I'll see if I can find someone to cover my shift.",
            "I'll see if I can get there before six."
        ]
    },
    {
        "num": 85,
        "title": "I was going to + 동사원형, but ...",
        "examples": [
            "I was going to cook, but we ordered takeout instead.",
            "I was going to call you, but it got too late.",
            "I was going to take the bus, but it started raining."
        ]
    },
    {
        "num": 86,
        "title": "Would it make sense to + 동사원형?",
        "examples": [
            "Would it make sense to split the bill?",
            "Would it make sense to call before we go?",
            "Would it make sense to move the appointment online?"
        ]
    },
    {
        "num": 87,
        "title": "I ended up + -ing.",
        "examples": [
            "I ended up taking a taxi because the train was canceled.",
            "I ended up buying the smaller one.",
            "I ended up staying home because I wasn't feeling well."
        ]
    },
    {
        "num": 88,
        "title": "I used to + 동사원형.",
        "examples": [
            "I used to live near the beach.",
            "I used to take this route to work every day.",
            "I used to be nervous about speaking English."
        ]
    },
    {
        "num": 89,
        "title": "What if + 문장?",
        "examples": [
            "What if we meet at the station instead?",
            "What if the package doesn't arrive by Friday?",
            "What if we take the earlier bus?"
        ]
    },
    {
        "num": 90,
        "title": "I've been + -ing.",
        "examples": [
            "I've been looking for a new apartment.",
            "I've been having trouble sleeping lately.",
            "I've been meaning to ask you about that."
        ]
    },
    {
        "num": 91,
        "title": "How about + 명사 / -ing?",
        "examples": [
            "How about meeting at six?",
            "How about pizza for dinner?",
            "How about taking a break first?"
        ]
    },
    {
        "num": 92,
        "title": "Would you be open to + -ing?",
        "examples": [
            "Would you be open to meeting a little earlier?",
            "Would you be open to sharing the internet bill?",
            "Would you be open to trying a different payment plan?"
        ]
    },
    {
        "num": 93,
        "title": "The last time I + 과거동사, ...",
        "examples": [
            "The last time I took this bus, it was delayed.",
            "The last time I ordered from them, the delivery was fast.",
            "The last time I moved, I hired a moving company."
        ]
    },
    {
        "num": 94,
        "title": "Is there a chance you could + 동사원형?",
        "examples": [
            "Is there a chance you could send it today?",
            "Is there a chance you could check the account again?",
            "Is there a chance you could hold the room until noon?"
        ]
    },
    {
        "num": 95,
        "title": "I haven't + 과거분사 + yet.",
        "examples": [
            "I haven't received the email yet.",
            "I haven't tried that restaurant yet.",
            "I haven't finished the application yet."
        ]
    },
    {
        "num": 96,
        "title": "Is there any flexibility on + 명사?",
        "examples": [
            "Is there any flexibility on the move-in date?",
            "Is there any flexibility on the monthly rent?",
            "Is there any flexibility on the appointment time?"
        ]
    },
    {
        "num": 97,
        "title": "I just + 과거동사.",
        "examples": [
            "I just got home.",
            "I just spoke with the building manager.",
            "I just sent you the payment."
        ]
    },
    {
        "num": 98,
        "title": "Would you consider + -ing?",
        "examples": [
            "Would you consider lowering the rent a little?",
            "Would you consider extending the deadline?",
            "Would you consider sending a replacement instead?"
        ]
    },
    {
        "num": 99,
        "title": "I've already + 과거분사.",
        "examples": [
            "I've already paid the bill.",
            "I've already called the doctor.",
            "I've already tried restarting the router."
        ]
    },
    {
        "num": 100,
        "title": "I feel like + -ing / 명사.",
        "examples": [
            "I feel like getting something warm to eat.",
            "I feel like a walk after dinner.",
            "I don't really feel like watching a movie tonight."
        ]
    },
    {
        "num": 101,
        "title": "I see your point.",
        "examples": [
            "I see your point, especially about the cost.",
            "I see your point, but I still think we should ask first.",
            "I see your point about needing more time."
        ]
    },
    {
        "num": 102,
        "title": "I'm looking forward to + 명사 / -ing.",
        "examples": [
            "I'm looking forward to seeing the new place.",
            "I'm looking forward to the long weekend.",
            "I'm looking forward to meeting everyone."
        ]
    },
    {
        "num": 103,
        "title": "I see what you mean, but + 문장.",
        "examples": [
            "I see what you mean, but I don't think we need to rush.",
            "I see what you mean, but that price is still too high.",
            "I see what you mean, but I had a different understanding."
        ]
    },
    {
        "num": 104,
        "title": "I can't wait to + 동사원형.",
        "examples": [
            "I can't wait to see the new apartment.",
            "I can't wait to try the food there.",
            "I can't wait to have a day off."
        ]
    },
    {
        "num": 105,
        "title": "The way I see it, + 문장.",
        "examples": [
            "The way I see it, we have two reasonable options.",
            "The way I see it, the fee should have been explained earlier.",
            "The way I see it, it's safer to leave now."
        ]
    },
    {
        "num": 106,
        "title": "I'm glad (that) + 문장.",
        "examples": [
            "I'm glad you made it home safely.",
            "I'm glad the doctor could see you today.",
            "I'm glad we cleared that up."
        ]
    },
    {
        "num": 107,
        "title": "As far as I know, + 문장.",
        "examples": [
            "As far as I know, the gym is open twenty-four hours.",
            "As far as I know, there isn't a fee for parking.",
            "As far as I know, you can cancel online."
        ]
    },
    {
        "num": 108,
        "title": "I'm sorry to hear (that) + 문장.",
        "examples": [
            "I'm sorry to hear that you're not feeling well.",
            "I'm sorry to hear that your flight was canceled.",
            "I'm sorry to hear about the problem with your apartment."
        ]
    },
    {
        "num": 109,
        "title": "From what I understand, + 문장.",
        "examples": [
            "From what I understand, utilities are not included.",
            "From what I understand, the repair should be finished today.",
            "From what I understand, we need to check in fifteen minutes early."
        ]
    },
    {
        "num": 110,
        "title": "That must be + 형용사.",
        "examples": [
            "That must be frustrating.",
            "That must be exciting for you.",
            "That must be hard to deal with."
        ]
    },
    {
        "num": 111,
        "title": "Correct me if I'm wrong, but + 문장.",
        "examples": [
            "Correct me if I'm wrong, but the deposit is refundable.",
            "Correct me if I'm wrong, but this bus stops near the hospital.",
            "Correct me if I'm wrong, but the deadline is next Monday."
        ]
    },
    {
        "num": 112,
        "title": "I can see why + 문장.",
        "examples": [
            "I can see why you like this neighborhood.",
            "I can see why that rule is confusing.",
            "I can see why you want to wait."
        ]
    },
    {
        "num": 113,
        "title": "I may be wrong, but + 문장.",
        "examples": [
            "I may be wrong, but I think this is the express train.",
            "I may be wrong, but the office might be closed today.",
            "I may be wrong, but I don't think that fee applies to us."
        ]
    },
    {
        "num": 114,
        "title": "By the way, + 문장",
        "examples": [
            "By the way, did you get my message?",
            "By the way, the laundry room is on the first floor.",
            "By the way, are you free this weekend?"
        ]
    },
    {
        "num": 115,
        "title": "I was under the impression (that) + 문장.",
        "examples": [
            "I was under the impression that breakfast was included.",
            "I was under the impression that the delivery was free.",
            "I was under the impression that my appointment was at two."
        ]
    },
    {
        "num": 116,
        "title": "Speaking of + 명사 / -ing, ...",
        "examples": [
            "Speaking of coffee, do you know a good place nearby?",
            "Speaking of weekends, are you doing anything on Saturday?",
            "Speaking of the landlord, did they call you back?"
        ]
    },
    {
        "num": 117,
        "title": "It's not that + 문장; it's just that + 문장.",
        "examples": [
            "It's not that I don't want to go; it's just that I'm exhausted.",
            "It's not that the apartment is bad; it's just that it's too far from work.",
            "It's not that I don't trust you; it's just that I want to check first."
        ]
    },
    {
        "num": 118,
        "title": "Actually, + 문장",
        "examples": [
            "Actually, I changed my mind about the blue one.",
            "Actually, the meeting starts at ten, not nine.",
            "Actually, I live just around the corner."
        ]
    },
    {
        "num": 119,
        "title": "The reason is (that) + 문장.",
        "examples": [
            "The reason is that my card was declined.",
            "The reason I called is that I have a question about the bill.",
            "The reason we're late is that the train stopped unexpectedly."
        ]
    },
    {
        "num": 120,
        "title": "To be honest, + 문장",
        "examples": [
            "To be honest, I don't know much about cars.",
            "To be honest, I'd rather stay home tonight.",
            "To be honest, that place was more expensive than I expected."
        ]
    },
    {
        "num": 121,
        "title": "What I meant was + 문장.",
        "examples": [
            "What I meant was that I need the receipt by Friday.",
            "What I meant was that I can't stay overnight.",
            "What I meant was that the smaller size fits better."
        ]
    },
    {
        "num": 122,
        "title": "The thing is, + 문장",
        "examples": [
            "The thing is, I don't have my ID with me.",
            "The thing is, the app won't let me log in.",
            "The thing is, I already have plans that evening."
        ]
    },
    {
        "num": 123,
        "title": "I didn't mean to + 동사원형.",
        "examples": [
            "I didn't mean to interrupt you.",
            "I didn't mean to sound rude.",
            "I didn't mean to send that message to everyone."
        ]
    },
    {
        "num": 124,
        "title": "You know what I mean?",
        "examples": [
            "It's one of those days, you know what I mean?",
            "The bus is always late when you're in a hurry, you know what I mean?",
            "You want somewhere quiet, you know what I mean?"
        ]
    },
    {
        "num": 125,
        "title": "I don't mean to + 동사원형, but ...",
        "examples": [
            "I don't mean to complain, but the room is very cold.",
            "I don't mean to rush you, but I need to leave soon.",
            "I don't mean to be difficult, but could you check that again?"
        ]
    },
    {
        "num": 126,
        "title": "What have you been up to?",
        "examples": [
            "What have you been up to lately?",
            "What have you been up to since you moved here?",
            "Hey, what have you been up to this weekend?"
        ]
    },
    {
        "num": 127,
        "title": "If you don't mind me asking, + 질문",
        "examples": [
            "If you don't mind me asking, how much is the monthly rent?",
            "If you don't mind me asking, which internet provider do you use?",
            "If you don't mind me asking, is this area usually quiet at night?"
        ]
    },
    {
        "num": 128,
        "title": "How did + 일/행사 + go?",
        "examples": [
            "How did your job interview go?",
            "How did the doctor's appointment go?",
            "How did your move go?"
        ]
    },
    {
        "num": 129,
        "title": "I'd appreciate it if + 문장.",
        "examples": [
            "I'd appreciate it if you could send me the receipt.",
            "I'd appreciate it if you didn't share my number.",
            "I'd appreciate it if the repair could be done this week."
        ]
    },
    {
        "num": 130,
        "title": "What was + it/that + like?",
        "examples": [
            "What was the neighborhood like?",
            "What was your first day at work like?",
            "What was it like living there?"
        ]
    },
    {
        "num": 131,
        "title": "I was hoping you could + 동사원형.",
        "examples": [
            "I was hoping you could check the status of my order.",
            "I was hoping you could explain this charge.",
            "I was hoping you could hold the table for ten more minutes."
        ]
    },
    {
        "num": 132,
        "title": "What do you think about + 명사 / -ing?",
        "examples": [
            "What do you think about taking the train instead?",
            "What do you think about this neighborhood?",
            "What do you think about meeting halfway?"
        ]
    },
    {
        "num": 133,
        "title": "I was wondering if + 문장.",
        "examples": [
            "I was wondering if you have any rooms available this weekend.",
            "I was wondering if I could change my appointment.",
            "I was wondering if the fee can be waived."
        ]
    },
    {
        "num": 134,
        "title": "There seems to be a problem with + 명사.",
        "examples": [
            "There seems to be a problem with my bill.",
            "There seems to be a problem with the heating in my room.",
            "There seems to be a problem with the payment terminal."
        ]
    },
    {
        "num": 135,
        "title": "Do you happen to know + 의문사절?",
        "examples": [
            "Do you happen to know where the nearest post office is?",
            "Do you happen to know if this bus stops at City Hall?",
            "Do you happen to know who I should contact about the noise?"
        ]
    },
    {
        "num": 136,
        "title": "I'm having trouble + -ing / with + 명사.",
        "examples": [
            "I'm having trouble logging into my account.",
            "I'm having trouble with the washing machine.",
            "I'm having trouble understanding this form."
        ]
    },
    {
        "num": 137,
        "title": "I wonder if + 문장.",
        "examples": [
            "I wonder if the store has a return policy.",
            "I wonder if we could get a table by the window.",
            "I wonder if there's a cheaper way to get there."
        ]
    },
    {
        "num": 138,
        "title": "It turns out (that) + 문장.",
        "examples": [
            "It turns out that the store was just around the corner.",
            "It turns out I had entered the wrong zip code.",
            "It turns out that the fee was already included."
        ]
    },
    {
        "num": 139,
        "title": "It won't + 동사원형.",
        "examples": [
            "The door won't lock.",
            "My phone won't connect to the Wi-Fi.",
            "The machine won't take my card."
        ]
    },
    {
        "num": 140,
        "title": "I thought + 과거동사, but ...",
        "examples": [
            "I thought the store closed at nine, but it closes at eight.",
            "I thought I had already paid, but I was wrong.",
            "I thought this was the express bus, but it isn't."
        ]
    },
    {
        "num": 141,
        "title": "It keeps + -ing.",
        "examples": [
            "The app keeps crashing.",
            "The smoke alarm keeps beeping.",
            "My neighbor's dog keeps barking at night."
        ]
    },
    {
        "num": 142,
        "title": "I didn't realize (that) + 문장.",
        "examples": [
            "I didn't realize that parking costs extra.",
            "I didn't realize the library was closed on Mondays.",
            "I didn't realize I needed to make a reservation."
        ]
    },
    {
        "num": 143,
        "title": "I can't remember + 의문사절 / if절.",
        "examples": [
            "I can't remember where I parked.",
            "I can't remember if I locked the door.",
            "I can't remember what the doctor said about the dosage."
        ]
    },
    {
        "num": 144,
        "title": "I'm afraid + 문장.",
        "examples": [
            "I'm afraid the item is out of stock.",
            "I'm afraid I won't be able to make it tonight.",
            "I'm afraid the next appointment isn't until Thursday."
        ]
    },
    {
        "num": 145,
        "title": "I have no idea + 의문사절.",
        "examples": [
            "I have no idea where my keys are.",
            "I have no idea why the payment failed.",
            "I have no idea how this machine works."
        ]
    },
    {
        "num": 146,
        "title": "I'm pretty sure (that) + 문장.",
        "examples": [
            "I'm pretty sure this is the right platform.",
            "I'm pretty sure the rent is due on the first.",
            "I'm pretty sure I left my umbrella at the café."
        ]
    },
    {
        "num": 147,
        "title": "I'd love to, but + 문장.",
        "examples": [
            "I'd love to, but I already have plans tonight.",
            "I'd love to help, but I have to work this weekend.",
            "I'd love to join you, but I'm not feeling well."
        ]
    },
    {
        "num": 148,
        "title": "I may have + 과거분사.",
        "examples": [
            "I may have left my wallet in the taxi.",
            "I may have typed the wrong password.",
            "I may have taken the wrong bus."
        ]
    },
    {
        "num": 149,
        "title": "I might + 동사원형.",
        "examples": [
            "I might be a few minutes late.",
            "I might take a class next semester.",
            "I might stay home if it keeps raining."
        ]
    },
    {
        "num": 150,
        "title": "I'd rather not + 동사원형.",
        "examples": [
            "I'd rather not drive at night.",
            "I'd rather not discuss that at work.",
            "I'd rather not sign anything until I read it carefully."
        ]
    },
    {
        "num": 151,
        "title": "I don't feel comfortable + -ing / with ...",
        "examples": [
            "I don't feel comfortable sharing my bank details.",
            "I don't feel comfortable with someone entering my room without notice.",
            "I don't feel comfortable signing this without more information."
        ]
    },
    {
        "num": 152,
        "title": "I bet + 문장.",
        "examples": [
            "I bet the restaurant is busy on weekends.",
            "I bet you're glad the move is over.",
            "I bet the traffic will be bad after the game."
        ]
    },
    {
        "num": 153,
        "title": "I'm not really into + 명사 / -ing.",
        "examples": [
            "I'm not really into horror movies.",
            "I'm not really into going out late.",
            "I'm not really into spicy food."
        ]
    },
    {
        "num": 154,
        "title": "I guess + 문장.",
        "examples": [
            "I guess we can take the next bus.",
            "I guess that makes sense.",
            "I guess I'll have to call them tomorrow."
        ]
    },
    {
        "num": 155,
        "title": "I'm not sure that's a good idea.",
        "examples": [
            "I'm not sure that's a good idea in this weather.",
            "I'm not sure that's a good idea if the store is about to close.",
            "I'm not sure that's a good idea without checking the contract first."
        ]
    },
    {
        "num": 156,
        "title": "It sounds like + 문장.",
        "examples": [
            "It sounds like you need to make an appointment.",
            "It sounds like the delivery was sent to the wrong address.",
            "It sounds like you had a busy week."
        ]
    },
    {
        "num": 157,
        "title": "That doesn't work for me.",
        "examples": [
            "Tuesday morning doesn't work for me.",
            "That payment plan doesn't work for me.",
            "Meeting that far from the station doesn't work for me."
        ]
    },
    {
        "num": 158,
        "title": "It looks like + 문장.",
        "examples": [
            "It looks like it's going to rain.",
            "It looks like the store is closed.",
            "It looks like we'll have to wait a while."
        ]
    },
    {
        "num": 159,
        "title": "Could we + 동사원형 + instead?",
        "examples": [
            "Could we meet tomorrow instead?",
            "Could we pay by card instead?",
            "Could we sit somewhere quieter instead?"
        ]
    },
    {
        "num": 160,
        "title": "Would it be possible to + 동사원형?",
        "examples": [
            "Would it be possible to check in early?",
            "Would it be possible to move the appointment?",
            "Would it be possible to get a refund?"
        ]
    },
    {
        "num": 161,
        "title": "Unless + 문장, + 문장",
        "examples": [
            "Unless it rains, I'll walk there.",
            "Unless you cancel today, there may be a fee.",
            "Unless the bus is late, I should be there by eight."
        ]
    },
    {
        "num": 162,
        "title": "As long as + 문장, + 문장",
        "examples": [
            "As long as the price stays the same, that works for me.",
            "As long as you let me know in advance, I don't mind.",
            "As long as the weather is okay, we'll go tomorrow."
        ]
    },
    {
        "num": 163,
        "title": "Is there anything I can do to + 동사원형?",
        "examples": [
            "Is there anything I can do to speed up the process?",
            "Is there anything I can do to fix this from my side?",
            "Is there anything I can do to avoid a late fee?"
        ]
    },
    {
        "num": 164,
        "title": "In case + 문장, + 문장",
        "examples": [
            "In case you're late, send me a message.",
            "Take an umbrella in case it rains.",
            "Keep this number in case you need help."
        ]
    },
    {
        "num": 165,
        "title": "What should I do if + 문장?",
        "examples": [
            "What should I do if I lose my key?",
            "What should I do if the medicine makes me feel worse?",
            "What should I do if the package never arrives?"
        ]
    },
    {
        "num": 166,
        "title": "What happens if + 문장?",
        "examples": [
            "What happens if I miss the payment date?",
            "What happens if I need to cancel my appointment?",
            "What happens if the train is delayed?"
        ]
    },
    {
        "num": 167,
        "title": "I'm in the middle of + 명사/동명사",
        "examples": [
            "I'm in the middle of a report.",
            "I'm in the middle of a meeting.",
            "I'm in the middle of cooking dinner."
        ]
    },
    {
        "num": 168,
        "title": "It's hard to + 동사원형",
        "examples": [
            "It's hard to believe him.",
            "It's hard to find a parking spot here.",
            "It's hard to say no to them."
        ]
    },
    {
        "num": 169,
        "title": "It takes [시간/자원] to + 동사원형",
        "examples": [
            "It takes an hour to get there.",
            "It takes a lot of effort to learn a language.",
            "It takes two days to finish this."
        ]
    },
    {
        "num": 170,
        "title": "No wonder + 평서문",
        "examples": [
            "No wonder you are exhausted after the night shift.",
            "No wonder he is so tired.",
            "No wonder it's so cold today."
        ]
    },
    {
        "num": 171,
        "title": "It's no use + 동명사",
        "examples": [
            "It's no use worrying about it now.",
            "It's no use complaining if we can't change it.",
            "It's no use waiting for a reply all night."
        ]
    },
    {
        "num": 172,
        "title": "There's no need to + 동사원형",
        "examples": [
            "There's no need to stress about it.",
            "There's no need to rush.",
            "There's no need to apologize."
        ]
    },
    {
        "num": 173,
        "title": "That's why + 평서문",
        "examples": [
            "That's why I called you.",
            "That's why she left early.",
            "That's why we need to make a change."
        ]
    },
    {
        "num": 174,
        "title": "I have no choice but to + 동사원형",
        "examples": [
            "I have no choice but to finish this.",
            "I have no choice but to accept it.",
            "I have no choice but to leave now."
        ]
    },
    {
        "num": 175,
        "title": "I'm proud of + 명사/동명사",
        "examples": [
            "I'm proud of you.",
            "I'm proud of your achievement.",
            "I'm proud of being part of this team."
        ]
    },
    {
        "num": 176,
        "title": "You might want to + 동사원형",
        "examples": [
            "You might want to check the weather.",
            "You might want to try this one.",
            "You might want to wait a bit."
        ]
    },
    {
        "num": 177,
        "title": "I'm tempted to + 동사원형",
        "examples": [
            "I'm tempted to buy it.",
            "I'm tempted to skip the class.",
            "I'm tempted to eat that cake."
        ]
    },
    {
        "num": 178,
        "title": "I feel like + 동명사/명사",
        "examples": [
            "I feel like having pizza.",
            "I feel like going for a walk.",
            "I feel like taking a nap."
        ]
    },
    {
        "num": 179,
        "title": "I'm worried about + 명사/동명사",
        "examples": [
            "I'm worried about the exam.",
            "I'm worried about his health.",
            "I'm worried about making a mistake."
        ]
    },
    {
        "num": 180,
        "title": "I'm sorry to + 동사원형",
        "examples": [
            "I'm sorry to bother you.",
            "I'm sorry to keep you waiting.",
            "I'm sorry to hear that."
        ]
    },
    {
        "num": 181,
        "title": "I can't believe + 평서문",
        "examples": [
            "I can't believe it's already Friday.",
            "I can't believe you did that.",
            "I can't believe we won."
        ]
    },
    {
        "num": 182,
        "title": "I'm calling to + 동사원형",
        "examples": [
            "I'm calling to confirm my reservation.",
            "I'm calling to ask a question.",
            "I'm calling to check on you."
        ]
    },
    {
        "num": 183,
        "title": "I'd love to + 동사원형",
        "examples": [
            "I'd love to join you.",
            "I'd love to see that movie.",
            "I'd love to visit your country."
        ]
    },
    {
        "num": 184,
        "title": "I'm interested in + 명사/동명사",
        "examples": [
            "I'm interested in learning English.",
            "I'm interested in art.",
            "I'm interested in taking this course."
        ]
    },
    {
        "num": 185,
        "title": "I'm curious about + 명사 / 의문사절",
        "examples": [
            "I'm curious about the result.",
            "I'm curious about his background.",
            "I'm curious about how it works."
        ]
    },
    {
        "num": 186,
        "title": "I'm excited about + 명사 / 동명사 / to + 동사원형",
        "examples": [
            "I'm excited about the trip.",
            "I'm excited about starting my new job.",
            "I'm excited to meet everyone."
        ]
    },
    {
        "num": 187,
        "title": "I'm nervous about + 명사/동명사",
        "examples": [
            "I'm nervous about the interview.",
            "I'm nervous about my presentation.",
            "I'm nervous about flying."
        ]
    },
    {
        "num": 188,
        "title": "I'm disappointed with + 명사",
        "examples": [
            "I'm disappointed with the service.",
            "I'm disappointed with my grades.",
            "I'm disappointed with the product."
        ]
    },
    {
        "num": 189,
        "title": "I owe you one for + 명사/동명사",
        "examples": [
            "I owe you one for helping me out.",
            "I owe you one for covering my shift.",
            "I owe you one for the coffee."
        ]
    },
    {
        "num": 190,
        "title": "I hope that + 평서문",
        "examples": [
            "I hope that you feel better soon.",
            "I hope that it doesn't rain tomorrow.",
            "I hope that everything goes well."
        ]
    },
    {
        "num": 191,
        "title": "I promise to + 동사원형",
        "examples": [
            "I promise to be there on time.",
            "I promise to call you later.",
            "I promise to keep it a secret."
        ]
    },
    {
        "num": 192,
        "title": "I'm sick of + 명사/동명사",
        "examples": [
            "I'm sick of this weather.",
            "I'm sick of eating the same food.",
            "I'm sick of waiting."
        ]
    },
    {
        "num": 193,
        "title": "I'm afraid of + 명사/동명사",
        "examples": [
            "I'm afraid of heights.",
            "I'm afraid of making mistakes.",
            "I'm afraid of dogs."
        ]
    },
    {
        "num": 194,
        "title": "I've decided to take up + 명사/동명사",
        "examples": [
            "I've decided to take up the guitar.",
            "I've decided to take up tennis.",
            "I've decided to take up photography."
        ]
    },
    {
        "num": 195,
        "title": "I'm trying my hand at + 명사/동명사",
        "examples": [
            "I'm trying my hand at baking.",
            "I'm trying my hand at gardening.",
            "I'm trying my hand at coding."
        ]
    },
    {
        "num": 196,
        "title": "I'm a beginner at + 명사/동명사",
        "examples": [
            "I'm a beginner at yoga.",
            "I'm a beginner at speaking Spanish.",
            "I'm a beginner at playing golf."
        ]
    },
    {
        "num": 197,
        "title": "I've been + 동명사 + for a long time.",
        "examples": [
            "I've been playing the piano for a long time.",
            "I've been living here for a long time.",
            "I've been studying English for a long time."
        ]
    },
    {
        "num": 198,
        "title": "I spend a lot of time + 동명사",
        "examples": [
            "I spend a lot of time reading.",
            "I spend a lot of time practicing.",
            "I spend a lot of time watching movies."
        ]
    },
    {
        "num": 199,
        "title": "It helps me unwind + [전치사구/부사]",
        "examples": [
            "It helps me unwind.",
            "It helps me unwind after work.",
            "It helps me unwind completely."
        ]
    },
    {
        "num": 200,
        "title": "What do you usually do on + 요일 / 휴일?",
        "examples": [
            "What do you usually do on weekends?",
            "What do you usually do on your days off?",
            "What do you usually do on Sundays?"
        ]
    },
    {
        "num": 201,
        "title": "Do you have anything planned for + 명사?",
        "examples": [
            "Do you have anything planned for this weekend?",
            "Do you have anything planned for the holidays?",
            "Do you have anything planned for tonight?"
        ]
    },
    {
        "num": 202,
        "title": "Have you seen any good [명사] recently?",
        "examples": [
            "Have you seen any good movies recently?",
            "Have you seen any good shows recently?",
            "Have you seen any good plays recently?"
        ]
    },
    {
        "num": 203,
        "title": "It has a great plot with + 명사.",
        "examples": [
            "It has a great plot with unexpected twists.",
            "It has a great plot with memorable characters.",
            "It has a great plot with a surprising ending."
        ]
    },
    {
        "num": 204,
        "title": "What kind of music do you listen to + [부사]?",
        "examples": [
            "What kind of music do you listen to mostly?",
            "What kind of music do you listen to when you study?",
            "What kind of music do you listen to usually?"
        ]
    },
    {
        "num": 205,
        "title": "I play the [악기], but I'm just an amateur",
        "examples": [
            "I play the piano, but I'm just an amateur.",
            "I play the guitar, but I'm just an amateur.",
            "I play the violin, but I'm just an amateur."
        ]
    },
    {
        "num": 206,
        "title": "I love going to + 명사 + for inspiration",
        "examples": [
            "I love going to museums for inspiration.",
            "I love going to art galleries for inspiration.",
            "I love going to nature for inspiration."
        ]
    },
    {
        "num": 207,
        "title": "The last time I heard live music was + 명사",
        "examples": [
            "The last time I heard live music was last year.",
            "The last time I heard live music was in college.",
            "The last time I heard live music was at a festival."
        ]
    },
    {
        "num": 208,
        "title": "Do you play any sports to + 동사원형?",
        "examples": [
            "Do you play any sports to stay healthy?",
            "Do you play any sports to relieve stress?",
            "Do you play any sports to keep fit?"
        ]
    },
    {
        "num": 209,
        "title": "I go [동명사] almost every weekend",
        "examples": [
            "I go hiking almost every weekend.",
            "I go fishing almost every weekend.",
            "I go swimming almost every weekend."
        ]
    },
    {
        "num": 210,
        "title": "I stay in shape by + 동명사.",
        "examples": [
            "I stay in shape by walking every day.",
            "I stay in shape by going to the gym.",
            "I stay in shape by swimming on weekends."
        ]
    },
    {
        "num": 211,
        "title": "I love exploring new places and + 동명사",
        "examples": [
            "I love exploring new places and trying local food.",
            "I love exploring new places and taking photos.",
            "I love exploring new places and meeting people."
        ]
    },
    {
        "num": 212,
        "title": "Have you ever gone camping in + 명사?",
        "examples": [
            "Have you ever gone camping in the mountains?",
            "Have you ever gone camping in the winter?",
            "Have you ever gone camping in a national park?"
        ]
    },
    {
        "num": 213,
        "title": "I'm drawn to + 명사.",
        "examples": [
            "I'm drawn to historical cities.",
            "I'm drawn to quiet neighborhoods.",
            "I'm drawn to places with a lot of character."
        ]
    },
    {
        "num": 214,
        "title": "Do you collect + 명사?",
        "examples": [
            "Do you collect anything?",
            "Do you collect stamps or coins?",
            "Do you collect vintage toys?"
        ]
    },
    {
        "num": 215,
        "title": "I collect + 명사.",
        "examples": [
            "I collect vinyl records.",
            "I collect rare books.",
            "I collect postcards from places I visit."
        ]
    },
    {
        "num": 216,
        "title": "Have you ever taken a class to learn + 명사?",
        "examples": [
            "Have you ever taken a structured class to learn the proper rope knots?",
            "Have you ever taken a class to learn French?",
            "Have you ever taken a class to learn coding?"
        ]
    },
    {
        "num": 217,
        "title": "I'm trying to get the hang of + 명사/동명사",
        "examples": [
            "I'm still trying to get the hang of the basic footwork.",
            "I'm trying to get the hang of driving.",
            "I'm trying to get the hang of this software."
        ]
    },
    {
        "num": 218,
        "title": "My ultimate goal is to + 동사원형.",
        "examples": [
            "My ultimate goal is to speak English confidently.",
            "My ultimate goal is to master French cooking.",
            "My ultimate goal is to travel more often."
        ]
    },
    {
        "num": 219,
        "title": "I need to get around to + 동명사.",
        "examples": [
            "I need to get around to vacuuming.",
            "I need to get around to doing the dishes.",
            "I need to get around to fixing the sink."
        ]
    },
    {
        "num": 220,
        "title": "Could you help me + 동사원형 / with + 명사?",
        "examples": [
            "Could you help me carry this box?",
            "Could you help me with the laundry?",
            "Could you help me find my size?"
        ]
    },
    {
        "num": 221,
        "title": "It needs to be + 과거분사",
        "examples": [
            "The light needs to be replaced.",
            "It needs to be fixed soon.",
            "It needs to be washed."
        ]
    },
    {
        "num": 222,
        "title": "I try to keep [명사] + 형용사",
        "examples": [
            "I try to keep my room clean.",
            "I try to keep the kitchen tidy.",
            "I try to keep the noise down."
        ]
    },
    {
        "num": 223,
        "title": "I usually do the cooking on + 요일",
        "examples": [
            "I usually do the cooking on Sundays.",
            "I usually do the cooking on weekends.",
            "I usually do the cooking on my days off."
        ]
    },
    {
        "num": 224,
        "title": "Could you please pass the + 명사?",
        "examples": [
            "Could you please pass the salt?",
            "Could you please pass the pepper?",
            "Could you please pass the salad?"
        ]
    },
    {
        "num": 225,
        "title": "What do you recommend for + 명사?",
        "examples": [
            "What do you recommend for a starter?",
            "What do you recommend for dessert?",
            "What do you recommend for a vegetarian?"
        ]
    },
    {
        "num": 226,
        "title": "Could you tell me more about + 명사?",
        "examples": [
            "Could you tell me more about this dish?",
            "Could you tell me more about the specials?",
            "Could you tell me more about the ingredients?"
        ]
    },
    {
        "num": 227,
        "title": "I'm allergic to + 명사",
        "examples": [
            "I'm allergic to nuts.",
            "I'm allergic to seafood.",
            "I'm allergic to dairy."
        ]
    },
    {
        "num": 228,
        "title": "Can you make this dish + 형용사?",
        "examples": [
            "Can you make this dish less spicy?",
            "Can you make this dish extra hot?",
            "Can you make this dish vegetarian?"
        ]
    },
    {
        "num": 229,
        "title": "The food was delicious, especially + 명사",
        "examples": [
            "The food was delicious.",
            "The food was delicious, especially the steak.",
            "The food was delicious, especially the dessert."
        ]
    },
    {
        "num": 230,
        "title": "Could we have the bill, please?",
        "examples": [
            "Could we have the bill, please?",
            "Could we have the check, please?",
            "Could we have the receipt, please?"
        ]
    },
    {
        "num": 231,
        "title": "It's on me this time",
        "examples": [
            "Don't worry, it's on me.",
            "It's on me this time.",
            "Dinner is on me tonight."
        ]
    },
    {
        "num": 232,
        "title": "We'd like to split the bill + 방법.",
        "examples": [
            "We'd like to split the bill evenly.",
            "We'd like to split the bill in half.",
            "We'd like to split the bill by items."
        ]
    },
    {
        "num": 233,
        "title": "I'll pay with + 결제수단",
        "examples": [
            "I'll pay with my credit card.",
            "I'll pay with cash.",
            "I'll pay with Apple Pay."
        ]
    },
    {
        "num": 234,
        "title": "Keep the change",
        "examples": [
            "Keep the change.",
            "Please keep the change.",
            "You can keep the change."
        ]
    },
    {
        "num": 235,
        "title": "I'm just browsing, thanks",
        "examples": [
            "I'm just browsing, thanks.",
            "I'm just browsing around, thanks.",
            "I'm just browsing for now, thanks."
        ]
    },
    {
        "num": 236,
        "title": "Do you have this in size + [치수]?",
        "examples": [
            "Do you have this wool jacket in size large?",
            "Do you have this in size medium?",
            "Do you have this in size 10?"
        ]
    },
    {
        "num": 237,
        "title": "Can I try this on?",
        "examples": [
            "Can I try this on in the fitting room?",
            "Can I try this on here?",
            "Can I try this on before I buy it?"
        ]
    },
    {
        "num": 238,
        "title": "Do you have this in a different color?",
        "examples": [
            "Do you have this in a different color?",
            "Do you have this in black?",
            "Do you have this style in a lighter color?"
        ]
    },
    {
        "num": 239,
        "title": "This is too + 형용사",
        "examples": [
            "This is unfortunately too loose around the shoulders.",
            "This is too tight.",
            "This is too expensive."
        ]
    },
    {
        "num": 240,
        "title": "Is this on sale/clearance?",
        "examples": [
            "Is this on sale?",
            "Is this on clearance?",
            "Is this item currently on sale?"
        ]
    },
    {
        "num": 241,
        "title": "Do you accept credit cards?",
        "examples": [
            "Do you accept credit cards?",
            "Do you accept foreign credit cards?",
            "Do you accept mobile payments?"
        ]
    },
    {
        "num": 242,
        "title": "Can I return or exchange this + 기간 / 조건?",
        "examples": [
            "Can I return this later with the receipt?",
            "Can I exchange this for a different size?",
            "Can I return this within a week?"
        ]
    },
    {
        "num": 243,
        "title": "Where is the nearest [transit stop]?",
        "examples": [
            "Where is the nearest subway station?",
            "Where is the nearest bus stop?",
            "Where is the nearest taxi stand?"
        ]
    },
    {
        "num": 244,
        "title": "Which bus/train goes to + 명사?",
        "examples": [
            "Which bus goes to the museum?",
            "Which train goes to the airport?",
            "Which bus goes downtown?"
        ]
    },
    {
        "num": 245,
        "title": "Do I need to transfer at + 명사?",
        "examples": [
            "Do I need to transfer at City Hall?",
            "Do I need to transfer to another line?",
            "Do I need to transfer at the next stop?"
        ]
    },
    {
        "num": 246,
        "title": "Can you get me a cab to + 명사?",
        "examples": [
            "Can you get me a cab to the airport?",
            "Can you get me a cab to the hotel?",
            "Can you get me a cab to the station?"
        ]
    },
    {
        "num": 247,
        "title": "Could you take me to + 명사?",
        "examples": [
            "Could you take me to this address?",
            "Could you take me to the central station?",
            "Could you take me to the museum?"
        ]
    },
    {
        "num": 248,
        "title": "Please drop me off near + 명사",
        "examples": [
            "Please drop me off near the coffee shop.",
            "Please drop me off near the entrance.",
            "Please drop me off here."
        ]
    },
    {
        "num": 249,
        "title": "I'd like to book a ticket to + 명사",
        "examples": [
            "I'd like to book a ticket to Edinburgh.",
            "I'd like to book a ticket to London.",
            "I'd like to book a ticket for tomorrow morning."
        ]
    },
    {
        "num": 250,
        "title": "Is there a direct train to + 명사?",
        "examples": [
            "Is there a direct train to Paris?",
            "Is there a direct train to the airport?",
            "Is there a direct flight to New York?"
        ]
    },
    {
        "num": 251,
        "title": "Which platform does the train leave from?",
        "examples": [
            "Which platform does the express train leave from?",
            "Which platform does the train leave from?",
            "Which platform do I need to go to?"
        ]
    },
    {
        "num": 252,
        "title": "Is this seat taken?",
        "examples": [
            "Excuse me, is this seat taken?",
            "Is this seat taken by anyone?",
            "Sorry, is this seat taken?"
        ]
    },
    {
        "num": 253,
        "title": "How do I get to + 명사?",
        "examples": [
            "How do I get to the shopping mall?",
            "How do I get to the nearest station?",
            "How do I get to the museum from here?"
        ]
    },
    {
        "num": 254,
        "title": "Is it within walking distance?",
        "examples": [
            "Is it within walking distance from this hotel?",
            "Is it within walking distance from here?",
            "Is it within walking distance or should I take a cab?"
        ]
    },
    {
        "num": 255,
        "title": "Turn left / right at + 장소.",
        "examples": [
            "Turn right at the post office.",
            "Turn left at the next corner.",
            "Turn right at the traffic light."
        ]
    },
    {
        "num": 256,
        "title": "Can you show me on the map?",
        "examples": [
            "Can you show me on the map where we are?",
            "Can you show me on the map how to get there?",
            "Can you show me on the map exactly?"
        ]
    },
    {
        "num": 257,
        "title": "I'd like to check in for my flight to + 명사",
        "examples": [
            "I'd like to check in for my flight to New York.",
            "I'd like to check in for my flight to Paris.",
            "I'd like to check in for the next flight."
        ]
    },
    {
        "num": 258,
        "title": "I have [개수] checked bag(s) and a carry-on",
        "examples": [
            "I have two checked bags and a carry-on backpack.",
            "I have one checked bag and a carry-on.",
            "I have no checked bags, just a carry-on."
        ]
    },
    {
        "num": 259,
        "title": "Can I get a window/aisle seat?",
        "examples": [
            "Can I get an aisle seat, please?",
            "Can I get a window seat, please?",
            "Can I get a seat near the front?"
        ]
    },
    {
        "num": 260,
        "title": "Is the flight on time?",
        "examples": [
            "Is the flight to London on time?",
            "Is the flight on time or delayed?",
            "Is the flight on time today?"
        ]
    },
    {
        "num": 261,
        "title": "Do I need to remove my [물품]?",
        "examples": [
            "Do I need to remove my laptop from the bag?",
            "Do I need to remove my shoes?",
            "Do I need to remove my jacket?"
        ]
    },
    {
        "num": 262,
        "title": "Are my liquids okay in this [용기]?",
        "examples": [
            "Are my liquids okay in this transparent zip-lock bag?",
            "Are my liquids okay in this container?",
            "Are my liquids okay for carry-on?"
        ]
    },
    {
        "num": 263,
        "title": "I have a stopover/layover in + 명사",
        "examples": [
            "I have a layover in Tokyo for three hours.",
            "I have a stopover in Dubai.",
            "I have a layover overnight."
        ]
    },
    {
        "num": 264,
        "title": "Will my luggage go straight through to + 명사?",
        "examples": [
            "Will my luggage go straight through to Chicago?",
            "Will my luggage go straight through to my final destination?",
            "Will my luggage go straight through or do I need to recheck it?"
        ]
    },
    {
        "num": 265,
        "title": "Excuse me, I think this is my seat",
        "examples": [
            "Excuse me, I think this is my seat, 14A.",
            "Excuse me, I think this is my seat.",
            "I think this is my reserved seat."
        ]
    },
    {
        "num": 266,
        "title": "How much longer until we land?",
        "examples": [
            "How much longer until we land in San Francisco?",
            "How much longer until we land?",
            "How much longer is the flight?"
        ]
    },
    {
        "num": 267,
        "title": "I have nothing to declare",
        "examples": [
            "I have nothing to declare, officer.",
            "I have nothing to declare.",
            "I have some items to declare."
        ]
    },
    {
        "num": 268,
        "title": "Where is the baggage claim area?",
        "examples": [
            "Excuse me, where is the baggage claim area?",
            "Where is the baggage claim for flight KE101?",
            "Could you point me to the baggage claim area?"
        ]
    },
    {
        "num": 269,
        "title": "My luggage didn't arrive.",
        "examples": [
            "My luggage didn't arrive on my flight.",
            "My luggage still hasn't arrived.",
            "My luggage didn't come out on the conveyor belt."
        ]
    },
    {
        "num": 270,
        "title": "It's a [크기/색상] suitcase with + [특징]",
        "examples": [
            "It's a large silver suitcase with a bright yellow sticker.",
            "It's a black suitcase with a red ribbon.",
            "It's a small blue carry-on bag."
        ]
    },
    {
        "num": 271,
        "title": "Can I track my luggage online?",
        "examples": [
            "Can I track my luggage online using this reference number?",
            "Can I track my luggage online?",
            "Can I track my luggage status online?"
        ]
    },
    {
        "num": 272,
        "title": "How will you contact me when [상황]?",
        "examples": [
            "How will you contact me when my bag is found?",
            "How will you contact me when it arrives?",
            "How will you contact me about the updates?"
        ]
    },
    {
        "num": 273,
        "title": "I have a reservation under + [이름]",
        "examples": [
            "I have a reservation under the name Minwoo Kim.",
            "I have a reservation under my company's name.",
            "I have a reservation under John Smith."
        ]
    },
    {
        "num": 274,
        "title": "What time is check-out?",
        "examples": [
            "What time is check-out on Sunday?",
            "What time is check-out tomorrow?",
            "What time is check-out usually?"
        ]
    },
    {
        "num": 275,
        "title": "Does the room include + [서비스]?",
        "examples": [
            "Does the room include complimentary breakfast?",
            "Does the room include free Wi-Fi?",
            "Does the room include room service?"
        ]
    },
    {
        "num": 276,
        "title": "Where is the nearest ATM or bank?",
        "examples": [
            "Where is the nearest ATM to withdraw some local cash?",
            "Where is the nearest ATM or bank?",
            "Where is the nearest ATM around here?"
        ]
    },
    {
        "num": 277,
        "title": "Let me know if + 평서문",
        "examples": [
            "Let me know if you need any help.",
            "Let me know if the time changes.",
            "Let me know if you have any questions."
        ]
    },
    {
        "num": 278,
        "title": "Have you had a chance to + 동사원형?",
        "examples": [
            "Have you had a chance to look at my email?",
            "Have you had a chance to call the landlord?",
            "Have you had a chance to try the new app?"
        ]
    },
    {
        "num": 279,
        "title": "I'm not familiar with + 명사",
        "examples": [
            "I'm not familiar with this area.",
            "I'm not familiar with the application process.",
            "I'm not familiar with this payment system."
        ]
    },
    {
        "num": 280,
        "title": "I'm not used to + 명사 / 동명사",
        "examples": [
            "I'm not used to driving in the snow.",
            "I'm not used to this much traffic.",
            "I'm not used to working this late."
        ]
    },
    {
        "num": 281,
        "title": "I forgot to + 동사원형",
        "examples": [
            "I forgot to bring my ID.",
            "I forgot to reply to your message.",
            "I forgot to lock the door."
        ]
    },
    {
        "num": 282,
        "title": "Is there any way I can + 동사원형?",
        "examples": [
            "Is there any way I can change my appointment?",
            "Is there any way I can track the package?",
            "Is there any way I can avoid this fee?"
        ]
    },
    {
        "num": 283,
        "title": "That makes sense.",
        "examples": [
            "That makes sense. Thanks for explaining.",
            "Okay, that makes sense now.",
            "That makes sense, especially with the traffic."
        ]
    },
    {
        "num": 284,
        "title": "I could use + 명사",
        "examples": [
            "I could use some help with this.",
            "I could use a break right now.",
            "I could use a ride to the station."
        ]
    }
];
