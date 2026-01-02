/* ============================================
   おみくじデータ
   百人一首の和歌と運勢データ
   ============================================ */

const OMIKUJI_DATA = {
    // 運勢ランク（出現確率付き）
    fortunes: [
        { id: 'daikichi', name: '大吉', weight: 15, class: 'daikichi' },
        { id: 'kichi', name: '吉', weight: 20, class: 'kichi' },
        { id: 'chukichi', name: '中吉', weight: 20, class: 'chukichi' },
        { id: 'shokichi', name: '小吉', weight: 20, class: 'shokichi' },
        { id: 'suekichi', name: '末吉', weight: 15, class: 'suekichi' },
        { id: 'kyo', name: '凶', weight: 8, class: 'kyo' },
        { id: 'daikyo', name: '大凶', weight: 2, class: 'daikyo' }
    ],

    // 百人一首からの和歌（運勢ごとに分類）
    waka: {
        // 大吉：希望・喜び・成功の歌
        daikichi: [
            {
                kami: '久方の 光のどけき 春の日に',
                shimo: 'しづ心なく 花の散るらむ',
                author: '紀友則'
            },
            {
                kami: '春過ぎて 夏来にけらし 白妙の',
                shimo: '衣ほすてふ 天の香具山',
                author: '持統天皇'
            },
            {
                kami: '天つ風 雲の通ひ路 吹きとぢよ',
                shimo: 'をとめの姿 しばしとどめむ',
                author: '僧正遍昭'
            },
            {
                kami: 'このたびは ぬさもとりあへず 手向山',
                shimo: '紅葉のにしき 神のまにまに',
                author: '菅家'
            },
            {
                kami: '筑波嶺の 峰より落つる みなの川',
                shimo: '恋ぞつもりて 淵となりぬる',
                author: '陽成院'
            }
        ],

        // 吉：穏やかな幸せの歌
        kichi: [
            {
                kami: '秋の田の かりほの庵の 苫をあらみ',
                shimo: 'わが衣手は 露にぬれつつ',
                author: '天智天皇'
            },
            {
                kami: '田子の浦に うち出でてみれば 白妙の',
                shimo: '富士の高嶺に 雪は降りつつ',
                author: '山部赤人'
            },
            {
                kami: '夏の夜は まだ宵ながら 明けぬるを',
                shimo: '雲のいづこに 月やどるらむ',
                author: '清原深養父'
            },
            {
                kami: '白露に 風の吹きしく 秋の野は',
                shimo: 'つらぬきとめぬ 玉ぞ散りける',
                author: '文屋朝康'
            },
            {
                kami: 'みかの原 わきて流るる いづみ川',
                shimo: 'いつみきとてか 恋しかるらむ',
                author: '中納言兼輔'
            }
        ],

        // 中吉：安定・調和の歌
        chukichi: [
            {
                kami: '住の江の 岸に寄る波 よるさへや',
                shimo: '夢の通ひ路 人目よくらむ',
                author: '藤原敏行朝臣'
            },
            {
                kami: '奥山に 紅葉踏み分け 鳴く鹿の',
                shimo: '声きく時ぞ 秋は悲しき',
                author: '猿丸大夫'
            },
            {
                kami: '吹くからに 秋の草木の しをるれば',
                shimo: 'むべ山風を 嵐といふらむ',
                author: '文屋康秀'
            },
            {
                kami: '月見れば ちぢにものこそ 悲しけれ',
                shimo: 'わが身ひとつの 秋にはあらねど',
                author: '大江千里'
            },
            {
                kami: 'ちはやぶる 神代もきかず 竜田川',
                shimo: 'からくれなゐに 水くくるとは',
                author: '在原業平朝臣'
            }
        ],

        // 小吉：努力の歌
        shokichi: [
            {
                kami: '花の色は うつりにけりな いたづらに',
                shimo: 'わが身世にふる ながめせしまに',
                author: '小野小町'
            },
            {
                kami: 'わたの原 八十島かけて 漕ぎ出でぬと',
                shimo: '人には告げよ 海人の釣舟',
                author: '参議篁'
            },
            {
                kami: '心あてに 折らばや折らむ 初霜の',
                shimo: 'おきまどはせる 白菊の花',
                author: '凡河内躬恒'
            },
            {
                kami: '有明の つれなく見えし 別れより',
                shimo: '暁ばかり 憂きものはなし',
                author: '壬生忠岑'
            },
            {
                kami: '逢ひ見ての のちの心に くらぶれば',
                shimo: '昔はものを 思はざりけり',
                author: '権中納言敦忠'
            }
        ],

        // 末吉：忍耐・これからの歌
        suekichi: [
            {
                kami: '山里は 冬ぞさびしさ まさりける',
                shimo: '人目も草も かれぬと思へば',
                author: '源宗于朝臣'
            },
            {
                kami: '由良の門を 渡る舟人 かぢを絶え',
                shimo: 'ゆくへも知らぬ 恋のみちかな',
                author: '曽禰好忠'
            },
            {
                kami: 'みちのくの しのぶもぢずり たれゆゑに',
                shimo: '乱れそめにし われならなくに',
                author: '河原左大臣'
            },
            {
                kami: '明けぬれば 暮るるものとは 知りながら',
                shimo: 'なほ恨めしき 朝ぼらけかな',
                author: '藤原道信朝臣'
            },
            {
                kami: 'やすらはで 寝なましものを 小夜ふけて',
                shimo: 'かたぶくまでの 月を見しかな',
                author: '赤染衛門'
            }
        ],

        // 凶：戒め・内省の歌
        kyo: [
            {
                kami: 'あはれとも いふべき人は 思ほえで',
                shimo: '身のいたづらに なりぬべきかな',
                author: '謙徳公'
            },
            {
                kami: '忘らるる 身をば思はず 誓ひてし',
                shimo: '人の命の 惜しくもあるかな',
                author: '右近'
            },
            {
                kami: '嘆きつつ ひとり寝る夜の 明くる間は',
                shimo: 'いかに久しき ものとかは知る',
                author: '右大将道綱母'
            },
            {
                kami: '忍ぶれど 色に出でにけり わが恋は',
                shimo: 'ものや思ふと 人の問ふまで',
                author: '平兼盛'
            }
        ],

        // 大凶：逆境からの再起の歌
        daikyo: [
            {
                kami: '瀬をはやみ 岩にせかるる 滝川の',
                shimo: 'われても末に 逢はむとぞ思ふ',
                author: '崇徳院'
            },
            {
                kami: '世の中よ 道こそなけれ 思ひ入る',
                shimo: '山の奥にも 鹿ぞ鳴くなる',
                author: '皇太后宮大夫俊成'
            },
            {
                kami: '来ぬ人を まつほの浦の 夕なぎに',
                shimo: '焼くや藻塩の 身もこがれつつ',
                author: '権中納言定家'
            }
        ]
    },

    // 恋愛運（良い / 普通 / 注意）
    love: {
        good: [
            '良縁あり。春に素敵な出会いの予感',
            '想いは届く。勇気を持って伝えよ',
            '運命の人との絆が深まる時',
            '愛情運絶好調。幸せな時が訪れる',
            '新たな恋の始まりあり'
        ],
        normal: [
            '焦らず待て。時が来れば自然と結ばれる',
            '今の関係を大切に。信頼が絆を深める',
            '穏やかな愛情に包まれる',
            '小さな優しさが大きな幸せを呼ぶ',
            'ゆっくりと愛を育む時'
        ],
        caution: [
            '高望みは禁物。身近な人に目を向けよ',
            '相手の気持ちを考えて行動せよ',
            '急がば回れ。慎重に進めよ',
            '言葉より行動で示せ',
            '一時の感情に流されるな'
        ]
    },

    // 仕事運
    work: {
        good: [
            '大いに発展す。新しい挑戦に吉',
            '努力が実る年。昇進・成功の兆し',
            '飛躍の時。思い切った行動が吉',
            '周囲からの評価高まる',
            '新たな道が開ける'
        ],
        normal: [
            '堅実に進めば成果あり',
            '周囲との協力が鍵となる',
            '地道な努力が実を結ぶ',
            '変化を恐れず柔軟に対応せよ',
            '学びの姿勢が運を開く'
        ],
        caution: [
            '焦りは禁物。一歩ずつ進め',
            '独断は避け、相談して進めよ',
            '細部まで確認を怠るな',
            '休息も仕事のうち',
            '謙虚な姿勢を忘れずに'
        ]
    },

    // 金運
    money: {
        good: [
            '思わぬ臨時収入あり',
            '金運上昇。投資に良い時期',
            '財運に恵まれる一年',
            '努力に見合った報酬を得る'
        ],
        normal: [
            '貯蓄に励め。後に大きな実りとなる',
            '堅実な金銭管理が吉',
            '入るを量りて出ずるを制せよ',
            '地道に増やす時'
        ],
        caution: [
            '散財に注意。計画的な支出を',
            '衝動買いは控えよ',
            'うまい話には気をつけよ',
            '守りの姿勢が吉'
        ]
    },

    // 健康運
    health: {
        good: [
            '無病息災。活力に満ちた一年',
            '心身ともに充実する',
            '健やかに過ごせる',
            '新しい習慣が良い結果を生む'
        ],
        normal: [
            '睡眠を大切に。休息が運気を上げる',
            '食生活の見直しが吉',
            '規則正しい生活を心がけよ',
            '軽い運動が開運の鍵'
        ],
        caution: [
            '無理は禁物。体の声を聞け',
            '冷えに注意。温かくして過ごせ',
            '定期的な検診を心がけよ',
            'ストレス発散を忘れずに'
        ]
    },

    // ラッキーカラー（和の色名）
    luckyColors: [
        { name: '紅', code: '#C41E3A' },
        { name: '藍', code: '#264348' },
        { name: '金', code: '#D4AF37' },
        { name: '翠', code: '#3B7960' },
        { name: '紫', code: '#8B008B' },
        { name: '桜', code: '#FEDFE1' },
        { name: '藤', code: '#8B81C3' },
        { name: '浅葱', code: '#48929B' },
        { name: '茜', code: '#B7282E' },
        { name: '萌黄', code: '#A7D28D' },
        { name: '琥珀', code: '#BF783A' },
        { name: '白', code: '#FFFEF8' }
    ],

    // ラッキーナンバー
    luckyNumbers: [1, 2, 3, 5, 7, 8, 9, 11, 12, 15, 17, 21, 24, 28, 31, 33],

    // ラッキー方位
    luckyDirections: ['東', '西', '南', '北', '北東', '南東', '南西', '北西']
};

// 運勢に応じた項目のレベルを決定
function getFortuneLevel(fortuneId) {
    const levels = {
        daikichi: { love: 'good', work: 'good', money: 'good', health: 'good' },
        kichi: { love: 'good', work: 'good', money: 'normal', health: 'good' },
        chukichi: { love: 'normal', work: 'good', money: 'normal', health: 'normal' },
        shokichi: { love: 'normal', work: 'normal', money: 'normal', health: 'normal' },
        suekichi: { love: 'normal', work: 'normal', money: 'caution', health: 'normal' },
        kyo: { love: 'caution', work: 'caution', money: 'caution', health: 'caution' },
        daikyo: { love: 'caution', work: 'caution', money: 'caution', health: 'caution' }
    };
    return levels[fortuneId] || levels.shokichi;
}

// ランダムに要素を選択
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 重み付きランダム選択（運勢用）
function getWeightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
        random -= item.weight;
        if (random <= 0) {
            return item;
        }
    }
    return items[items.length - 1];
}

// おみくじ結果を生成
function generateOmikuji() {
    // 運勢を決定
    const fortune = getWeightedRandom(OMIKUJI_DATA.fortunes);
    
    // 和歌を選択
    const wakaList = OMIKUJI_DATA.waka[fortune.id];
    const waka = getRandomItem(wakaList);
    
    // 運勢レベルを取得
    const levels = getFortuneLevel(fortune.id);
    
    // 各項目を選択
    const love = getRandomItem(OMIKUJI_DATA.love[levels.love]);
    const work = getRandomItem(OMIKUJI_DATA.work[levels.work]);
    const money = getRandomItem(OMIKUJI_DATA.money[levels.money]);
    const health = getRandomItem(OMIKUJI_DATA.health[levels.health]);
    
    // ラッキーアイテムを選択
    const luckyColor = getRandomItem(OMIKUJI_DATA.luckyColors);
    const luckyNumber = getRandomItem(OMIKUJI_DATA.luckyNumbers);
    const luckyDirection = getRandomItem(OMIKUJI_DATA.luckyDirections);
    
    return {
        fortune,
        waka,
        details: {
            love,
            work,
            money,
            health
        },
        lucky: {
            color: luckyColor,
            number: luckyNumber,
            direction: luckyDirection
        },
        timestamp: Date.now()
    };
}

