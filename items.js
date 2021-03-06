// res = ""; for(let child of document.querySelectorAll("tbody")[1].children) {let cs = Array.from(child.children).map(x => x.innerText);res += `{name: "${cs[0]}", color: "${cs[2]}", categories: \{${cs[4].split("\n").map(x=>"\""+x.split(")")[0]+")\":"+x.split(")")[1])}\}},`; }console.log(res)
// for (let x of [...document.body.innerText.matchAll(/材料：.+/g)].map(x => x[0].replace(/×\d+/g,"").replace("材料：","").replace(/、/g,"\",\""))) console.log("\""+x+"\"")
// 敵を倒さないので以下の制約あり
// - ドンケルシュテルン・邪な核石・竜核・プニの体液・虹プニの体液 は敵を倒せないので得られない
// - 万能厄除け香 を得るのは封印された寺院に行く必要があるので排除
// - 夕闇の雫・深紅の石・天界の大掃除・アンブロシアの花冠・ヴェルべディス・エレメントガードも排除
// 意味があるのは17種類
let categories = [
  '(中和剤)', '(燃料)', '(毒の材料)', '(薬の材料)', '(食材)', '(水)',
  '(神秘の力)', '(火薬)', '(紙)', '(金属)', '(粘土)', '(エリキシル)',
  '(糸素材)', '(木材)', '(布)', '(宝石)', '(魔法の道具)', '(動物素材)',
]
let items = [
  // 素材
  { name: "魔法の草", color: "緑", categories: { "(植物類)": 10, "(薬の材料)": 10 } },
  { name: "コバルト草", color: "青", categories: { "(植物類)": 15, "(水)": 5 } },
  { name: "妖精の毒草", color: "青", categories: { "(植物類)": 10, "(毒の材料)": 10 } },
  { name: "ミスティックハーブ", color: "白", categories: { "(植物類)": 20, "(神秘の力)": 10, "(薬の材料)": 15 } },
  { name: "夕焼け草", color: "黄", categories: { "(植物類)": 5, "(燃料)": 10 } },
  { name: "五日ヅル", color: "緑", categories: { "(植物類)": 20, "(神秘の力)": 5 } },
  { name: "峰綿花", color: "白", categories: { "(植物類)": 20, "(糸素材)": 15, "(燃料)": 10 } },
  { name: "苔むした流木", color: "緑", categories: { "(木材)": 10, "(植物類)": 5 } },
  { name: "キーファ", color: "黄", categories: { "(木材)": 20, "(植物類)": 10 } },
  { name: "アルタル", color: "緑", categories: { "(植物類)": 10, "(薬の材料)": 20 } },
  { name: "紅草", color: "赤", categories: { "(植物類)": 15, "(薬の材料)": 25 } },
  { name: "シロヒメクサ", color: "白", categories: { "(植物類)": 30, "(薬の材料)": 30 } },
  { name: "常世の仙花", color: "白", categories: { "(植物類)": 40, "(エリキシル)": 30 } },
  { name: "ドンケルハイト", color: "白", categories: { "(植物類)": 50, "(薬の材料)": 50, "(エリキシル)": 50 } },
  // { name: "ドンケルシュテルン", color: "赤", categories: { "(植物類)": 40, "(毒の材料)": 40, "(神秘の力)": 40 } },
  { name: "アイゼン鉱", color: "黄", categories: { "(鉱石)": 10 } },
  { name: "ライデン鉱", color: "緑", categories: { "(鉱石)": 10 } },
  { name: "クプルフ鉱", color: "赤", categories: { "(鉱石)": 15 } },
  { name: "カーエン石", color: "赤", categories: { "(鉱石)": 10, "(火薬)": 5 } },
  { name: "ハクレイ石", color: "青", categories: { "(鉱石)": 10, "(宝石)": 5 } },
  { name: "ソウルストン", color: "白", categories: { "(鉱石)": 20, "(金属)": 10 } },
  { name: "黒の燃球", color: "白", categories: { "(鉱石)": 30, "(毒の材料)": 20, "(燃料)": 15 } },
  { name: "妖精の土だんご", color: "黄", categories: { "(粘土)": 10, "(薬の材料)": 20 } },
  { name: "湖底の土", color: "緑", categories: { "(粘土)": 15 } },
  { name: "海底の土", color: "青", categories: { "(粘土)": 25 } },
  { name: "古い石版", color: "白", categories: { "(鉱石)": 10, "(粘土)": 10, "(神秘の力)": 5 } },
  { name: "砕けた石材", color: "黄", categories: { "(鉱石)": 15, "(粘土)": 15 } },
  { name: "古代の石柱", color: "緑", categories: { "(鉱石)": 25, "(植物類)": 5 } },
  { name: "くすぶる鍛石", color: "白", categories: { "(鉱石)": 25, "(粘土)": 20, "(金属)": 15 } },
  { name: "ファーデンライト", color: "白", categories: { "(鉱石)": 15, "(糸素材)": 20 } },
  { name: "夜水晶", color: "青", categories: { "(鉱石)": 35, "(宝石)": 15 } },
  { name: "輝く原石", color: "青", categories: { "(鉱石)": 40, "(宝石)": 25 } },
  { name: "銀霊結晶", color: "青", categories: { "(鉱石)": 35, "(神秘の力)": 15 } },
  { name: "精霊結晶", color: "白", categories: { "(鉱石)": 40, "(宝石)": 30, "(エリキシル)": 20, "(神秘の力)": 30 } },
  { name: "魔鳥の羽", color: "赤", categories: { "(動物素材)": 10, "(糸素材)": 10 } },
  { name: "丈夫な骨", color: "黄", categories: { "(動物素材)": 15, "(薬の材料)": 5 } },
  { name: "島魚のヒレ", color: "緑", categories: { "(動物素材)": 15, "(食材)": 10, "(薬の材料)": 5 } },
  { name: "ケモノの毛皮", color: "黄", categories: { "(動物素材)": 20, "(糸素材)": 10 } },
  { name: "アカツキの毛皮", color: "赤", categories: { "(動物素材)": 30, "(糸素材)": 20 } },
  { name: "粘銀の糸", color: "黄", categories: { "(糸素材)": 20 } },
  { name: "粘金の鋼糸", color: "黄", categories: { "(糸素材)": 35 } },
  { name: "竜のウロコ", color: "白", categories: { "(動物素材)": 40, "(薬の材料)": 30, "(エリキシル)": 20 } },
  { name: "井戸水", color: "青", categories: { "(水)": 20 } },
  { name: "おいしい水", color: "青", categories: { "(水)": 25 } },
  { name: "キルヘンミルク", color: "青", categories: { "(食材)": 25, "(水)": 15 } },
  { name: "夜光水", color: "緑", categories: { "(水)": 30, "(神秘の力)": 10 } },
  { name: "ニトロ水", color: "赤", categories: { "(火薬)": 25, "(水)": 10, "(毒の材料)": 15 } },
  { name: "妖しい液体", color: "赤", categories: { "(水)": 15, "(毒の材料)": 25 } },
  // { name: "プニの体液", color: "青", categories: { "(水)": 10, "(薬の材料)": 5 } },
  // { name: "虹プニの体液", color: "白", categories: { "(水)": 35, "(神秘の力)": 35, "(薬の材料)": 30 } },
  { name: "竜の血晶", color: "赤", categories: { "(水)": 20, "(エリキシル)": 40, "(毒の材料)": 40 } },
  { name: "聖水", color: "白", categories: { "(水)": 20, "(神秘の力)": 5 } },
  { name: "プニプニ玉", color: "青", categories: { "(食材)": 5, "(神秘の力)": 5 } },
  { name: "黄金のプニプニ玉", color: "黄", categories: { "(食材)": 10, "(神秘の力)": 20 } },
  { name: "うに", color: "黄", categories: { "(食材)": 15, "(植物類)": 10 } },
  { name: "赤うに", color: "赤", categories: { "(食材)": 20, "(植物類)": 15, "(火薬)": 15 } },
  { name: "ラーメル麦", color: "緑", categories: { "(食材)": 15, "(植物類)": 10 } },
  { name: "ヴァイツェ粉", color: "緑", categories: { "(食材)": 20, "(火薬)": 20 } },
  { name: "土いも", color: "黄", categories: { "(食材)": 15, "(植物類)": 5 } },
  { name: "銀いも", color: "黄", categories: { "(食材)": 20, "(金属)": 5 } },
  { name: "ハチの巣", color: "黄", categories: { "(食材)": 15, "(火薬)": 10 } },
  { name: "正体不明のタマゴ", color: "黄", categories: { "(食材)": 25, "(燃料)": 15, "(薬の材料)": 20 } },
  { name: "きまぐれいちご", color: "緑", categories: { "(食材)": 15, "(植物類)": 10 } },
  { name: "はじけるベリー", color: "青", categories: { "(食材)": 20, "(植物類)": 15 } },
  { name: "破れた紙片", color: "緑", categories: { "(紙)": 10, "(燃料)": 5 } },
  { name: "自然油", color: "黄", categories: { "(燃料)": 20 } },
  { name: "ザフロア油", color: "緑", categories: { "(燃料)": 35 } },
  { name: "教会のお札", color: "緑", categories: { "(紙)": 15, "(燃料)": 10 } },
  { name: "高級なお札", color: "緑", categories: { "(紙)": 20, "(燃料)": 15 } },
  { name: "敬虔な信者用お札", color: "白", categories: { "(紙)": 25, "(燃料)": 20, "(魔法の道具)": 5 } },
  { name: "きれいな貝殻", color: "青", categories: { "(宝石)": 15, "(薬の材料)": 5 } },
  { name: "ペルレムシェル", color: "白", categories: { "(宝石)": 20, "(薬の材料)": 15 } },
  { name: "蒼剛石", color: "青", categories: { "(宝石)": 25, "(鉱石)": 10 } },
  { name: "星の粉", color: "赤", categories: { "(エリキシル)": 30, "(火薬)": 25 } },
  { name: "太陽の粉", color: "赤", categories: { "(エリキシル)": 35, "(火薬)": 30 } },
  { name: "水晶のかけら", color: "青", categories: { "(宝石)": 10, "(鉱石)": 5 } },
  { name: "虹色の水晶片", color: "白", categories: { "(宝石)": 15, "(鉱石)": 10, "(神秘の力)": 5 } },
  { name: "ペンデローク", color: "青", categories: { "(神秘の力)": 25, "(宝石)": 10 } },
  { name: "ペンデグリュン", color: "緑", categories: { "(神秘の力)": 30, "(エリキシル)": 25 } },
  // { name: "邪な核石", color: "青", categories: { "(宝石)": 15, "(毒の材料)": 10 } },
  // { name: "竜核", color: "赤", categories: { "(宝石)": 35, "(神秘の力)": 30, "(エリキシル)": 25 } },
  // { name: "忘れ去られた霊樹", color: "白", categories: { "(木材)": 50 } },
  // { name: "忘れ去られた宝石", color: "白", categories: { "(宝石)": 50 } },
  // { name: "忘れ去られた鉱物", color: "白", categories: { "(鉱石)": 50 } },
  // { name: "忘れ去られた部品", color: "白", categories: { "(金属)": 50 } },
  { name: "出来損ないの欠片", color: "黄", categories: { "(エリキシル)": 10 } },
  { name: "焦げた欠片", color: "緑", categories: { "(エリキシル)": 10 } },
  { name: "臭う欠片", color: "青", categories: { "(エリキシル)": 10 } },
  { name: "綺麗な欠片", color: "赤", categories: { "(エリキシル)": 10 } },
  { name: "魔力を秘めたページ", color: "青", categories: { "(紙)": 20, "(燃料)": 15, "(魔法の道具)": 10 } },
  { name: "破れた魔道書", color: "赤", categories: { "(魔法の道具)": 20, "(燃料)": 10, "(紙)": 10 } },
  { name: "未知なる知の欠片", color: "緑", categories: { "(紙)": 15, "(燃料)": 20, "(神秘の力)": 15 } },
  { name: "封じられた知の欠片", color: "黄", categories: { "(紙)": 15, "(燃料)": 15, "(神秘の力)": 20 } },
  // 調合
  { name: "失敗作の灰", color: "白", categories: { "(エリキシル)": 5, "(魔法の道具)": 5 } },
  { name: "中和剤・赤", color: "赤", categories: { "(中和剤)": 30, "(燃料)": 10 }, srcs: ["(火薬)", "(水)"] },
  { name: "中和剤・青", color: "青", categories: { "(中和剤)": 30, "(毒の材料)": 10 }, srcs: ["(鉱石)", "(水)"] },
  { name: "中和剤・緑", color: "緑", categories: { "(中和剤)": 30, "(薬の材料)": 10 }, srcs: ["(植物類)", "(水)"] },
  { name: "中和剤・黄", color: "黄", categories: { "(中和剤)": 30, "(食材)": 10 }, srcs: ["(粘土)", "(水)"] },
  { name: "ピュアウォーター", color: "青", categories: { "(水)": 50 }, srcs: ["峰綿花", "キーファ", "(水)", "(鉱石)"] },
  { name: "精霊の涙", color: "青", categories: { "(水)": 30, "(神秘の力)": 20 }, srcs: ["銀霊結晶", "水晶のかけら", "ピュアウォーター", "(中和剤)"] },
  { name: "アプコール", color: "黄", categories: { "(食材)": 15, "(薬の材料)": 5 }, srcs: ["きまぐれいちご", "(植物類)", "(水)"] },
  { name: "ラーメル麦粉", color: "赤", categories: { "(食材)": 25, "(火薬)": 20 }, srcs: ["ラーメル麦", "(紙)", "(鉱石)"] },
  { name: "ハチミツ", color: "黄", categories: { "(食材)": 30 }, srcs: ["ハチの巣", "(中和剤)"] },
  { name: "天然酵母", color: "緑", categories: { "(食材)": 20, "(火薬)": 20, "(毒の材料)": 10 }, srcs: ["土いも", "(植物類)", "(薬の材料)", "(神秘の力)"] },
  { name: "万薬のもと", color: "赤", categories: { "(薬の材料)": 30, "(毒の材料)": 20 }, srcs: ["魔法の草", "(毒の材料)", "(薬の材料)", "(エリキシル)"] },
  { name: "ゼッテル", color: "赤", categories: { "(紙)": 40, "(燃料)": 20 }, srcs: ["(植物類)", "(水)", "(中和剤)"] },
  { name: "リフレッシュオイル", color: "黄", subcolor: "赤", categories: { "(燃料)": 35, "(水)": 10 }, srcs: ["自然油", "(植物類)", "(中和剤)"] },
  { name: "炎帝の粉", color: "赤", subcolor: "青", categories: { "(火薬)": 40 }, srcs: ["カーエン石", "黒の燃球", "(火薬)", "(中和剤)"] },
  { name: "ブリッツライト", color: "緑", subcolor: "黄", categories: { "(金属)": 30 }, srcs: ["ライデン鉱", "ニトロ水", "(鉱石)", "(中和剤)"] },
  { name: "ガイストアイゼン", color: "白", categories: { "(金属)": 35, "(神秘の力)": 15 }, srcs: ["銀霊結晶", "古代の石柱", "(神秘の力)", "(鉱石)"] },
  { name: "錬金粘土", color: "白", categories: { "(粘土)": 40, "(エリキシル)": 10 }, srcs: ["(粘土)", "(神秘の力)", "(中和剤)"] },
  { name: "束ねた金糸", color: "黄", categories: { "(糸素材)": 45, "(金属)": 10 }, srcs: ["粘銀の糸", "(金属)", "(燃料)"] },
  { name: "スプルース", color: "緑", categories: { "(木材)": 35 }, srcs: ["キーファ", "(木材)", "(布)"] },
  { name: "インゴット", color: "赤", categories: { "(武器素材)": 15, "(金属)": 10 }, srcs: ["(鉱石)", "(燃料)"] },
  { name: "シュタルメタル", color: "赤", categories: { "(武器素材)": 25, "(金属)": 15 }, srcs: ["ライデン鉱", "アイゼン鉱", "(燃料)"] },
  { name: "シルヴァリア", color: "赤", categories: { "(武器素材)": 30, "(金属)": 20 }, srcs: ["クプルフ鉱", "ソウルストン", "(鉱石)", "(燃料)"] },
  { name: "ルビリウム", color: "赤", categories: { "(武器素材)": 35, "(金属)": 25 }, srcs: ["くすぶる鍛石", "黒の燃球", "(鉱石)", "(燃料)"] },
  { name: "ゴルトアイゼン", color: "赤", categories: { "(武器素材)": 40, "(金属)": 30 }, srcs: ["ガイストアイゼン", "砕けた石材", "(鉱石)", "(燃料)"] },
  // { name: "ハルモニウム", color: "赤", categories: { "(武器素材)": 45, "(金属)": 35 }, srcs: ["深紅の石", "精霊結晶", "(鉱石)", "(燃料)"] },
  { name: "クロース", color: "黄", categories: { "(防具素材)": 20, "(布)": 20 }, srcs: ["(糸素材)", "(植物類)", "(動物素材)"] },
  { name: "モフコット", color: "黄", categories: { "(防具素材)": 25, "(布)": 25 }, srcs: ["峰綿花", "(植物類)", "(糸素材)", "(動物素材)"] },
  { name: "アダールクロス", color: "黄", categories: { "(防具素材)": 30, "(布)": 30 }, srcs: ["粘銀の糸", "ケモノの毛皮", "(植物類)", "(水)"] },
  { name: "フリューゲル", color: "黄", categories: { "(防具素材)": 35, "(布)": 35 }, srcs: ["ファーデンライト", "(糸素材)", "(動物素材)", "(水)"] },
  { name: "フェアハイト", color: "黄", categories: { "(防具素材)": 40, "(布)": 40 }, srcs: ["束ねた金糸", "ピュアウォーター", "(糸素材)", "(神秘の力)"] },
  // { name: "ヴェルベティス", color: "黄", categories: { "(防具素材)": 45, "(布)": 45 }, srcs: ["粘金の鋼糸", "虹プニの体液", "(植物類)", "(エリキシル)"] },
  { name: "雪花水晶", color: "青", subcolor: "緑", categories: { "(金属)": 30, "(宝石)": 20 }, srcs: ["銀霊結晶", "(水)", "(神秘の力)"] },
  { name: "ノーブルサファイア", color: "青", categories: { "(宝石)": 40 }, srcs: ["蒼剛石", "錬金粘土", "(鉱石)", "(水)"] },
  // { name: "夕闇の雫", color: "赤", categories: { "(毒の材料)": 40, "(水)": 40, "(燃料)": 40, "(鉱石)": 40 }, srcs: ["妖しい液体", "妖精の毒草", "(水)", "(中和剤)"] },
  { name: "先見の水晶玉", color: "黄", categories: { "(宝石)": 25, "(神秘の力)": 10 }, srcs: ["ペンデローク", "水晶のかけら", "(布)", "(粘土)"] },
  // { name: "深紅の石", color: "赤", subcolor: "白", categories: { "(動物素材)": 35, "(火薬)": 35, "(エリキシル)": 35, "(中和剤)": 35 }, srcs: ["竜の血晶", "星の粉", "(火薬)", "(エリキシル)"] },
  // { name: "賢者の石", color: "白", categories: { "(金属)": 99, "(薬の材料)": 99, "(エリキシル)": 99, "(神秘の力)": 99 }, srcs: ["深紅の石", "失敗作の灰", "(エリキシル)", "(宝石)"] },
  { name: "ミネラルエキス", color: "緑", categories: { "(薬の材料)": 20, "(水)": 10, "(金属)": 5 }, srcs: ["アプコール", "(鉱石)", "(中和剤)"] },
  { name: "緑を育む活性土", color: "黄", categories: { "(粘土)": 20 }, srcs: ["万薬のもと", "(木材)", "(鉱石)"] },
  { name: "精密な部品", color: "白", categories: { "(金属)": 40 }, srcs: ["シュタルメタル", "(鉱石)", "(燃料)", "(神秘の力)"] },
  { name: "ヘクセ・アウリス", color: "白", categories: { "(金属)": 30, "(魔法の道具)": 20 }, srcs: ["シルヴァリア", "ソウルストン", "(宝石)", "(神秘の力)"] },
  { name: "人形師の糸", color: "黄", categories: { "(糸素材)": 25 }, srcs: ["粘銀の糸", "(糸素材)", "(燃料)"] },
  { name: "賢き者の土", color: "黄", categories: { "(粘土)": 30 }, srcs: ["湖底の土", "海底の土", "(水)", "(神秘の力)"] },
  // 攻撃
  { name: "うに袋", color: "黄", categories: { "(爆弾)": 10 }, srcs: ["うに", "(火薬)", "(鉱石)"] },
  { name: "フラム", color: "赤", categories: { "(爆弾)": 20 }, srcs: ["カーエン石", "(火薬)", "(紙)", "(中和剤)"] },
  { name: "レヘルン", color: "青", categories: { "(爆弾)": 15 }, srcs: ["ハクレイ石", "(水)", "(中和剤)"] },
  { name: "ドナーストーン", color: "緑", categories: { "(爆弾)": 15 }, srcs: ["ライデン鉱", "(粘土)", "(中和剤)"] },
  { name: "クラフト", color: "黄", categories: { "(爆弾)": 15 }, srcs: ["うに袋", "(金属)", "(火薬)", "(中和剤)"] },
  { name: "オリフラム", color: "赤", categories: { "(爆弾)": 30 }, srcs: ["フラム", "炎帝の粉", "(火薬)", "(中和剤)"] },
  { name: "シュタルレヘルン", color: "青", categories: { "(爆弾)": 25 }, srcs: ["レヘルン", "雪花水晶", "(水)", "(中和剤)"] },
  { name: "ドナークリスタル", color: "緑", categories: { "(爆弾)": 25 }, srcs: ["ドナーストーン", "ブリッツライト", "(宝石)", "(金属)"] },
  { name: "プニプニ弾", color: "青", categories: { "(爆弾)": 20 }, srcs: ["シュタルメタル", "プニプニ玉", "(火薬)", "(中和剤)"] },
  // { name: "神の落し物", color: "黄", categories: { "(爆弾)": 15, "(魔法の道具)": 10 }, srcs: ["ノーブルサファイア", "邪な核石", "(爆弾)", "(金属)"] },
  // { name: "原初の種火", color: "白", categories: { "(爆弾)": 30, "(魔法の道具)": 25 }, srcs: ["深紅の石", "星の粉", "(爆弾)", "(神秘の力)"] },
  { name: "魔法使いの笛", color: "緑", categories: { "(魔法の道具)": 30 }, srcs: ["スプルース", "天使のささやき", "(動物素材)", "(糸素材)"] },
  // { name: "天界の大掃除", color: "黄", categories: { "(爆弾)": 30, "(魔法の道具)": 20 }, srcs: ["ノーブルサファイア", "竜核", "(爆弾)", "(金属)"] },
  // { name: "終末の種火", color: "白", categories: { "(爆弾)": 40, "(魔法の道具)": 30 }, srcs: ["深紅の石", "太陽の粉", "(爆弾)", "(神秘の力)"] },
  { name: "死霊使いの笛", color: "緑", categories: { "(魔法の道具)": 35 }, srcs: ["スプルース", "小悪魔のいたずら", "(動物素材)", "(糸素材)"] },
  { name: "不幸の瓶詰め", color: "赤", categories: { "(薬品)": 20 }, srcs: ["妖しい液体", "ペンデローク", "(動物素材)", "(水)"] },
  { name: "万物の写本", color: "白", categories: { "(魔法の道具)": 30, "(紙)": 10 }, srcs: ["ゼッテル", "ペンデローク", "(糸素材)", "(神秘の力)"] },
  { name: "小悪魔のいたずら", color: "黄", categories: { "(魔法の道具)": 25 }, srcs: ["妖しい液体", "(毒の材料)", "(金属)", "(神秘の力)"] },
  { name: "封じの白本", color: "白", categories: { "(魔法の道具)": 40, "(紙)": 20 }, srcs: ["(紙)", "ペンデグリュン", "(動物素材)", "(神秘の力)"] },
  // 回復
  { name: "山師の薬", color: "緑", categories: { "(薬品)": 10 }, srcs: ["魔法の草", "(動物素材)", "(水)"] },
  { name: "リフュールボトル", color: "青", categories: { "(薬品)": 15 }, srcs: ["コバルト草", "(薬の材料)", "(水)", "(中和剤)"] },
  { name: "そよ風のアロマ", color: "緑", categories: { "(薬品)": 15 }, srcs: ["リフレッシュオイル", "(薬の材料)", "(紙)", "(中和剤)"] },
  { name: "生命の蜜", color: "白", categories: { "(薬品)": 20, "(神秘の力)": 5 }, srcs: ["ミスティックハーブ", "(エリキシル)", "(神秘の力)", "(中和剤)"] },
  { name: "神秘の霊薬", color: "白", categories: { "(薬品)": 25, "(エリキシル)": 25 }, srcs: ["ドンケルハイト", "(エリキシル)", "(水)", "(中和剤)"] },
  { name: "素朴な焼き菓子", color: "緑", categories: { "(食品)": 10, "(お菓子)": 10 }, srcs: ["うに", "(水)", "(植物類)"] },
  { name: "ソティー", color: "青", categories: { "(食品)": 15, "(お菓子)": 10 }, srcs: ["(植物類)", "(燃料)", "(水)"] },
  { name: "プニゼリー", color: "青", categories: { "(食品)": 15, "(お菓子)": 15, "(神秘の力)": 5 }, srcs: ["プニプニ玉", "(水)", "(中和剤)"] },
  { name: "ソフィナンシェ", color: "黄", categories: { "(食品)": 35, "(お菓子)": 30 }, srcs: ["ラーメル麦粉", "天然酵母", "(食材)", "(水)"] },
  { name: "ピロソティー", color: "青", categories: { "(食品)": 30, "(神秘の力)": 10 }, srcs: ["ミスティックハーブ", "ピュアウォーター", "(水)", "(紙)"] },
  { name: "錬金ドロップ", color: "赤", categories: { "(食品)": 10, "(お菓子)": 15, "(宝石)": 5 }, srcs: ["きまぐれいちご", "ハチミツ", "(紙)"] },
  { name: "プレーンワッフル", color: "赤", categories: { "(食品)": 20 }, srcs: ["ラーメル麦粉", "ハニーシロップ", "最高級ホットミルク", "(中和剤)"] },
  { name: "ベーグルサンド", color: "赤", categories: { "(食品)": 20 }, srcs: ["ラーメル麦粉", "(食材)", "(水)", "(紙)"] },
  { name: "最高級ホットミルク", color: "青", categories: { "(食品)": 25 }, srcs: ["キルヘンミルク", "(燃料)", "(薬の材料)"] },
  { name: "ハニーシロップ", color: "青", categories: { "(薬品)": 30 }, srcs: ["ハチミツ", "(薬品)", "(水)"] },
  { name: "天使のささやき", color: "白", categories: { "(魔法の道具)": 20 }, srcs: ["聖水", "ペンデローク", "(金属)", "(粘土)"] },
  // { name: "万能厄除け香", color: "緑", categories: { "(薬品)": 10 }, srcs: ["万薬のもと", "(植物類)", "(紙)", "(燃料)"] },
  { name: "精霊織りの帳", color: "青", categories: { "(布)": 15 }, srcs: ["粘銀の糸", "(布)", "(糸素材)", "(神秘の力)"] },
  { name: "火竜の気付け薬", color: "赤", categories: { "(薬品)": 25 }, srcs: ["竜の血晶", "(火薬)", "(水)"] },
  { name: "英雄降ろしの丸薬", color: "赤", categories: { "(薬品)": 25 }, srcs: ["竜のウロコ", "(エリキシル)", "(食材)", "(中和剤)"] },
  // 探索
  { name: "万能促進剤", color: "緑", categories: { "(薬品)": 20 }, srcs: ["(植物類)", "(薬の材料)", "(水)"] },
  { name: "妖精の道標", color: "黄", categories: { "(魔法の道具)": 30 }, srcs: ["(木材)", "(金属)", "(紙)", "(神秘の力)"] },
  { name: "生きてる荷車", color: "黄", categories: { "(魔法の道具)": 25, "(木材)": 15 }, srcs: ["スプルース", "(糸素材)", "(金属)"] },
  { name: "クリアドロップ", color: "青", categories: { "(魔法の道具)": 20 }, srcs: ["錬金ドロップ", "(食材)", "(水)"] },
  { name: "マナフェザー", color: "青", categories: { "(魔法の道具)": 10, "(動物素材)": 10 }, srcs: ["魔鳥の羽", "(魔法の道具)", "(糸素材)"] },
  { name: "旅人の靴", color: "緑", categories: { "(布)": 10 }, srcs: ["(動物素材)", "(糸素材)", "(金属)"] },
  { name: "特製バックパック", color: "黄", categories: { "(布)": 20 }, srcs: ["ケモノの毛皮", "(神秘の力)", "(糸素材)"] },
  { name: "緊急避難バッグ", color: "黄", categories: { "(魔法の道具)": 25 }, srcs: ["(布)", "(糸素材)", "(神秘の力)"] },
  { name: "摘み取り軍手", color: "青", categories: { "(布)": 5 }, srcs: ["(動物素材)", "(植物類)", "(糸素材)"] },
  { name: "勝者のお守り", color: "赤", categories: { "(魔法の道具)": 10 }, srcs: ["高級なお札", "(紙)", "(布)"] },
  { name: "鍛錬のお守り", color: "緑", categories: { "(魔法の道具)": 15 }, srcs: ["高級なお札", "(木材)", "(布)"] },
  { name: "魔除けの護符", color: "黄", categories: { "(魔法の道具)": 20, "(紙)": 15 }, srcs: ["敬虔な信者用お札", "聖水", "(布)", "(神秘の力)"] },
  { name: "ハートペンダント", color: "白", categories: { "(金属)": 25 }, srcs: ["蒼剛石", "(金属)", "(宝石)"] },
]
function shuffle([...array], seed = 88675123) {
  class Random {
    constructor(seed) {
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = seed;
    }
    next(max) {
      let t = this.x ^ (this.x << 11);
      this.x = this.y; this.y = this.z; this.z = this.w;
      this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
      return Math.abs(this.w) % (max + 1);
    }
  }
  const random = new Random(seed)
  for (let i = array.length - 1; i >= 0; i--) {
    const j = random.next(i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function createEdgeMap(items, concate = true) {
  let itemsMap = {}
  for (let item of items) {
    itemsMap[item.name] = item
  }
  function nameMap(name) {
    // let ingots = ["シュタルメタル", "シルヴァリア", "ルビリウム", "ゴルトアイゼン"]
    // if (ingots.some(x => x === name)) return ""
    // if (name === "インゴット") return name + "\n" + ingots.join("\n")
    return name
  }
  // src -> dst -> [names]
  let edgeMap = {}
  for (let item of items) {
    let name = item.name;
    name = nameMap(name)
    if (!name) continue
    // 素材は書かなくても図を見ればわかる
    if (!item.srcs) continue
    let outCount = 0
    let dsts = []
    for (let cat in item.categories) {
      if (cat === "(武器素材)") continue
      if (cat === "(防具素材)") continue
      if (cat === "(お菓子)") continue
      if (cat === "(食品)") continue
      if (cat === "(爆弾)") continue // 深紅の石が作れないため
      if (cat === "(薬品)") continue // ハニーシロップループしかできないため
      if (concate) {
        // 全ての素材は失敗作の灰にできる...がそれは自明なので除外(強制品質 0)
        // 英雄降ろしが薬品->ハニーシロップループなのでクリアドロップ一意(=魔法の道具)
        // 火薬は中和剤赤は中和剤として使うしかない
        if (cat === "(食材)") cat = "(魔法の道具)" // クリアドロップ
        if (cat === "(火薬)") cat = "(中和剤)" // 中和剤・赤
        if (cat === "(薬の材料)") cat = "(魔法の道具)" // 万薬のもと -> 小悪魔のいたずら
        if (cat === "(毒の材料)") cat = "(魔法の道具)" // 万薬のもと -> 小悪魔のいたずら
        if (cat === "(魔法の道具)") cat = "(動物素材)" // マナフェザー
      }
      dsts.push(cat)
      outCount++
    }
    // 終点
    if (outCount === 0) continue
    let srcs = []
    for (let src of item.srcs) {
      if (itemsMap[src] && !itemsMap[src].src) {
        // 素材なら別に書く必要なし
        continue
      }
      if (src === "(鉱石)") continue // 作れない...
      if (src === "(植物類)") continue // 作れない...
      if (concate) {
        if (src === "(食材)") src = "(魔法の道具)" // クリアドロップ
        if (src === "(火薬)") src = "(中和剤)" // 中和剤・赤
        if (src === "(薬の材料)") src = "(魔法の道具)" // 万薬のもと -> 小悪魔のいたずら
        if (src === "(毒の材料)") src = "(魔法の道具)" // 万薬のもと -> 小悪魔のいたずら
        if (src === "(魔法の道具)") src = "(動物素材)" // マナフェザー
      }
      srcs.push(src)
    }
    for (let src of srcs) {
      for (let dst of dsts) {
        if (!edgeMap[src]) edgeMap[src] = {}
        if (!edgeMap[src][dst]) edgeMap[src][dst] = new Set()
        edgeMap[src][dst].add(name)
      }
    }
  }
  for (let src in edgeMap) {
    for (let dst in edgeMap[src]) {
      edgeMap[src][dst] = Array.from(edgeMap[src][dst])
    }
  }
  return edgeMap;
}
function getRankMap(edgeMap, ...theSrcs) {
  // from: src->dst->list
  //   to: node->rank
  let rankMap = {}
  function dfs(src, rank) {
    for (let dst in edgeMap[src]) {
      if (rankMap[dst] !== undefined && rankMap[dst] <= rank) continue
      rankMap[dst] = rank
      dfs(dst, rank + 1)
    }
  }
  for (let theSrc of theSrcs) {
    rankMap[theSrc] = 0
    dfs(theSrc, 1)
  }
  return rankMap
}
function edgeMapToDot(edgeMap, rankMap = null) {
  let nodes = []
  let nameTable = {}
  let now = 0
  function find(name) {
    if (!nameTable[name]) {
      now++;
      nameTable[name] = "node" + now
      nodes.push(name)
    }
    return nameTable[name]
  }
  let edges = []
  for (let src in edgeMap) {
    for (let dst in edgeMap[src]) {
      if (rankMap) {
        if (rankMap[src] >= rankMap[dst]) continue
      }
      edges.push(`${find(src)} -> ${find(dst)} [label= "${edgeMap[src][dst].join("\n")}"];`)
    }
  }
  let option = "";
  if (!rankMap) {
    nodes = shuffle(nodes, 18)
  } else {
    nodes.sort((x, y) => rankMap[x] - rankMap[y])
    let sameRanks = {}
    for (let src in rankMap) {
      let rank = rankMap[src]
      if (!sameRanks[rank]) sameRanks[rank] = []
      sameRanks[rank].push(nameTable[src])
    }
    for (let rank in sameRanks) {
      option += `\{rank = same; ${sameRanks[rank].join("; ")}; \}\n`
    }
  }
  let text = `
  digraph {
    // ratio=auto;
    // concentrate=true;
    graph[layout=dot];
    node[shape = box, style = rounded];
    ${nodes.map(x => `${nameTable[x]} [label="${x}"];`).join("\n")}
    ${edges.join("\n")}
    ${option};
  } `
  return text
}
let edgeMap = createEdgeMap(items, false)
let rankMap = getRankMap(edgeMap, "(食材)", "(神秘の力)")
console.log(edgeMapToDot(edgeMap, rankMap))
