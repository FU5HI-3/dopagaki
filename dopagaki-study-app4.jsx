import React, { useState, useEffect, useRef } from "react";

// ═══════════ QUESTION BANK ═══════════
const Qs = [
  // 数学
  {q:"2x = 10、x = ?",opts:["3","5","8"],ans:1,s:"数学"},
  {q:"三角形の内角の和は？",opts:["90°","180°","360°"],ans:1,s:"数学"},
  {q:"√64 = ?",opts:["6","8","10"],ans:1,s:"数学"},
  {q:"3² + 4² = ?",opts:["20","25","30"],ans:1,s:"数学"},
  {q:"7 × 8 = ?",opts:["54","56","58"],ans:1,s:"数学"},
  {q:"100の25% = ?",opts:["20","25","30"],ans:1,s:"数学"},
  {q:"2 + 3 × 4 = ?",opts:["20","14","10"],ans:1,s:"数学"},
  {q:"2⁸ = ?",opts:["64","128","256"],ans:2,s:"数学"},
  {q:"正方形の内角の合計は？",opts:["180°","270°","360°"],ans:2,s:"数学"},
  {q:"円周率はどの文字？",opts:["e","π","φ"],ans:1,s:"数学"},
  // 英語（文法）
  {q:'"run" の過去形は？',opts:["ran","runned","run"],ans:0,s:"英語"},
  {q:'"go" の過去分詞は？',opts:["went","gone","go"],ans:1,s:"英語"},
  {q:'"child" の複数形は？',opts:["childs","children","childrens"],ans:1,s:"英語"},
  {q:'"happy" の反対語は？',opts:["sad","glad","bad"],ans:0,s:"英語"},
  {q:'"beautiful" の比較級は？',opts:["beautifuler","more beautiful","most beautiful"],ans:1,s:"英語"},
  {q:"I ___ a student. の空欄は？",opts:["am","is","are"],ans:0,s:"英語"},
  {q:'"speak" の過去分詞は？',opts:["spoke","spoken","speaking"],ans:1,s:"英語"},
  {q:'"water" の意味は？',opts:["火","水","土"],ans:1,s:"英語"},
  {q:"「彼女は先生です」は？",opts:["She am a teacher.","She is a teacher.","She are a teacher."],ans:1,s:"英語"},
  {q:"Can she sing? の正しい答えは？",opts:["Yes, she can.","Yes, she is.","Yes, she does."],ans:0,s:"英語"},
  // 英単語（TOEIC/英検レベル）
  {q:"「abandon」の意味は？",opts:["集める","放棄する","始める"],ans:1,s:"英単語"},
  {q:"「accomplish」の意味は？",opts:["達成する","拒否する","準備する"],ans:0,s:"英単語"},
  {q:"「abundant」の意味は？",opts:["不足した","豊富な","複雑な"],ans:1,s:"英単語"},
  {q:"「acknowledge」の意味は？",opts:["無視する","認める","否定する"],ans:1,s:"英単語"},
  {q:"「acquire」の意味は？",opts:["失う","取得する","与える"],ans:1,s:"英単語"},
  {q:"「advocate」の意味は？",opts:["批判する","支持する","阻止する"],ans:1,s:"英単語"},
  {q:"「apparent」の意味は？",opts:["隠れた","明らかな","複雑な"],ans:1,s:"英単語"},
  {q:"「assess」の意味は？",opts:["無視する","評価する","削除する"],ans:1,s:"英単語"},
  {q:"「assume」の意味は？",opts:["確認する","仮定する","否定する"],ans:1,s:"英単語"},
  {q:"「collaborate」の意味は？",opts:["競争する","協力する","独立する"],ans:1,s:"英単語"},
  {q:"「comprehensive」の意味は？",opts:["部分的な","包括的な","単純な"],ans:1,s:"英単語"},
  {q:"「contribute」の意味は？",opts:["妨害する","貢献する","無視する"],ans:1,s:"英単語"},
  {q:"「crucial」の意味は？",opts:["重要でない","重要な","おかしな"],ans:1,s:"英単語"},
  {q:"「demonstrate」の意味は？",opts:["隠す","実証する","否定する"],ans:1,s:"英単語"},
  {q:"「diverse」の意味は？",opts:["同一の","多様な","単調な"],ans:1,s:"英単語"},
  {q:"「efficient」の意味は？",opts:["非効率的な","効率的な","複雑な"],ans:1,s:"英単語"},
  {q:"「emerge」の意味は？",opts:["消える","現れる","固定する"],ans:1,s:"英単語"},
  {q:"「enhance」の意味は？",opts:["低下させる","高める","維持する"],ans:1,s:"英単語"},
  {q:"「establish」の意味は？",opts:["廃止する","設立する","批判する"],ans:1,s:"英単語"},
  {q:"「evaluate」の意味は？",opts:["無視する","評価する","作成する"],ans:1,s:"英単語"},
  {q:"「facilitate」の意味は？",opts:["妨げる","促進する","無効にする"],ans:1,s:"英単語"},
  {q:"「generate」の意味は？",opts:["消費する","生み出す","消滅させる"],ans:1,s:"英単語"},
  {q:"「identify」の意味は？",opts:["見失う","特定する","作成する"],ans:1,s:"英単語"},
  {q:"「implement」の意味は？",opts:["計画する","実装する","廃棄する"],ans:1,s:"英単語"},
  {q:"「maintain」の意味は？",opts:["廃止する","維持する","変更する"],ans:1,s:"英単語"},
  {q:"「minimize」の意味は？",opts:["最大化する","最小化する","固定する"],ans:1,s:"英単語"},
  {q:"「obtain」の意味は？",opts:["失う","得る","与える"],ans:1,s:"英単語"},
  {q:"「promote」の意味は？",opts:["阻害する","促進する","消滅させる"],ans:1,s:"英単語"},
  {q:"「significant」の意味は？",opts:["重要でない","重要な","複雑な"],ans:1,s:"英単語"},
  {q:"「sufficient」の意味は？",opts:["不十分な","十分な","過剰な"],ans:1,s:"英単語"},
  {q:"「vary」の意味は？",opts:["固定する","変化する","消える"],ans:1,s:"英単語"},
  {q:"「expand」の意味は？",opts:["縮小する","拡大する","固定する"],ans:1,s:"英単語"},
  {q:"「primary」の意味は？",opts:["二次的な","主要な","最終的な"],ans:1,s:"英単語"},
  // 理科
  {q:"光合成で使わないものは？",opts:["光","水","窒素"],ans:2,s:"理科"},
  {q:"水が凍る温度は？",opts:["-10°C","0°C","10°C"],ans:1,s:"理科"},
  {q:"地球の自転周期は？",opts:["約12時間","約24時間","約48時間"],ans:1,s:"理科"},
  {q:"電流の単位は？",opts:["V（ボルト）","A（アンペア）","W（ワット）"],ans:1,s:"理科"},
  {q:"力の単位は？",opts:["J","N（ニュートン）","Pa"],ans:1,s:"理科"},
  {q:"地球から一番近い星は？",opts:["火星","月","太陽"],ans:2,s:"理科"},
  {q:"DNAがある細胞の場所は？",opts:["細胞壁","核","液胞"],ans:1,s:"理科"},
  {q:"音の速さ（常温）は？",opts:["約100m/s","約340m/s","約3000m/s"],ans:1,s:"理科"},
  {q:"植物が光合成で作るのは？",opts:["窒素","酸素と糖","水素"],ans:1,s:"理科"},
  {q:"ヒトの体の細胞は約何個？",opts:["37億個","37兆個","37京個"],ans:1,s:"理科"},
  // 国語
  {q:"「七転び八起き」の意味は？",opts:["7回転ぶ","何度でも立ち直る","8回成功"],ans:1,s:"国語"},
  {q:"「一石二鳥」の意味は？",opts:["石を2個使う","1つの行動で2つの成果","2匹の鳥"],ans:1,s:"国語"},
  {q:"「猿も木から落ちる」は？",opts:["猿は木が得意","名人も失敗する","猿は危険"],ans:1,s:"国語"},
  {q:"「花」の訓読みは？",opts:["カ","はな","ホウ"],ans:1,s:"国語"},
  {q:"「美しい」の反対語は？",opts:["醜い","汚い","怖い"],ans:0,s:"国語"},
  {q:"「雨降って地固まる」の意味は？",opts:["農業に最適","困難の後に好転する","梅雨は来る"],ans:1,s:"国語"},
  {q:"「情けは人の為ならず」の意味は？",opts:["情けは不要","親切は自分に返る","人に厳しく"],ans:1,s:"国語"},
  {q:"俳句の音数は？",opts:["五・七・五","七・五・七","五・五・七"],ans:0,s:"国語"},
  {q:"「山」の音読みは？",opts:["やま","サン","もり"],ans:1,s:"国語"},
  {q:"「早い」と「速い」の違いは？",opts:["同じ","時間 vs スピード","大きさ"],ans:1,s:"国語"},
  // 社会
  {q:"日本の首都は？",opts:["大阪","東京","京都"],ans:1,s:"社会"},
  {q:"アメリカの首都は？",opts:["ニューヨーク","シカゴ","ワシントンD.C."],ans:2,s:"社会"},
  {q:"世界最長の川は？",opts:["アマゾン川","ナイル川","長江"],ans:1,s:"社会"},
  {q:"江戸幕府を開いたのは？",opts:["豊臣秀吉","徳川家康","織田信長"],ans:1,s:"社会"},
  {q:"日本国憲法の施行年は？",opts:["1945年","1947年","1951年"],ans:1,s:"社会"},
  {q:"日本の国会は何院制？",opts:["一院制","二院制","三院制"],ans:1,s:"社会"},
  {q:"世界最大の国（面積）は？",opts:["中国","アメリカ","ロシア"],ans:2,s:"社会"},
  {q:"人口が最多の国は？",opts:["インド","中国","アメリカ"],ans:0,s:"社会"},
  {q:"現在の日本の元号は？",opts:["平成","昭和","令和"],ans:2,s:"社会"},
  {q:"富士山の高さは？",opts:["3376m","3776m","4076m"],ans:1,s:"社会"},
  // IT・情報
  {q:"HTMLで段落を表すタグは？",opts:["<div>","<p>","<span>"],ans:1,s:"IT・情報"},
  {q:"CSSで文字色を変えるプロパティは？",opts:["font-color","color","text-color"],ans:1,s:"IT・情報"},
  {q:"HTTPのデフォルトポート番号は？",opts:["21","80","443"],ans:1,s:"IT・情報"},
  {q:"HTTPSのデフォルトポート番号は？",opts:["80","8080","443"],ans:2,s:"IT・情報"},
  {q:"DNSの役割は？",opts:["ファイル転送","名前→IP変換","メール送信"],ans:1,s:"IT・情報"},
  {q:"OSI参照モデルの層数は？",opts:["5層","7層","9層"],ans:1,s:"IT・情報"},
  {q:"SQLで行を選択するコマンドは？",opts:["GET","SELECT","FIND"],ans:1,s:"IT・情報"},
  {q:"SQLで新規レコードを追加するのは？",opts:["ADD","INSERT","CREATE"],ans:1,s:"IT・情報"},
  {q:"二分探索の計算量は？",opts:["O(n)","O(log n)","O(n²)"],ans:1,s:"IT・情報"},
  {q:"スタックのデータ取り出し方式は？",opts:["FIFO","LIFO","ランダム"],ans:1,s:"IT・情報"},
  {q:"キューのデータ取り出し方式は？",opts:["LIFO","FIFO","ランダム"],ans:1,s:"IT・情報"},
  {q:"Gitでコミットするコマンドは？",opts:["git save","git commit","git push"],ans:1,s:"IT・情報"},
  {q:"Gitで変更をステージングするのは？",opts:["git add","git commit","git init"],ans:0,s:"IT・情報"},
  {q:"Pythonで辞書型を作るのは？",opts:["[]","()","{}"],ans:2,s:"IT・情報"},
  {q:"JavaScriptで再代入可能な変数宣言は？",opts:["const","let","function"],ans:1,s:"IT・情報"},
  {q:"REST APIで新規作成に使うHTTPメソッドは？",opts:["GET","POST","DELETE"],ans:1,s:"IT・情報"},
  {q:"2進数の「1010」を10進数にすると？",opts:["8","10","12"],ans:1,s:"IT・情報"},
  {q:"16進数の「FF」を10進数にすると？",opts:["255","256","240"],ans:0,s:"IT・情報"},
  {q:"XSS（クロスサイトスクリプティング）とは？",opts:["SQLへの不正注入","悪意あるスクリプト埋め込み","DoS攻撃"],ans:1,s:"IT・情報"},
  {q:"機械学習で「過学習」の対策は？",opts:["データ増量・正則化","モデルの複雑化","学習率を上げる"],ans:0,s:"IT・情報"},
  {q:"APIとは？",opts:["OSのカーネル","プログラム間の接続口","ハードウェア部品"],ans:1,s:"IT・情報"},
  {q:"「フロントエンド」が担当するのは？",opts:["サーバー処理","UI・見た目","データベース設計"],ans:1,s:"IT・情報"},
  {q:"「バックエンド」が担当するのは？",opts:["デザイン","サーバー処理・DB","アニメーション"],ans:1,s:"IT・情報"},
  {q:"Reactで状態管理に使うフックは？",opts:["useEffect","useState","useRef"],ans:1,s:"IT・情報"},
  {q:"IPアドレスv4は何ビット？",opts:["16ビット","32ビット","64ビット"],ans:1,s:"IT・情報"},
  {q:"主キー（PRIMARY KEY）の役割は？",opts:["行の一意識別","行の並び替え","列の合計"],ans:0,s:"IT・情報"},
  {q:"Pythonのリスト内包表記は？",opts:["(x for x in list)","[x for x in list]","{x for x in list}"],ans:1,s:"IT・情報"},
  {q:"非同期処理を扱うJSの構文は？",opts:["sync/wait","async/await","try/catch"],ans:1,s:"IT・情報"},
  {q:"暗号化でSSL/TLSが使われる場面は？",opts:["ファイル圧縮","通信の暗号化","DB操作"],ans:1,s:"IT・情報"},
  {q:"「オープンソース」の意味は？",opts:["有料ソフト","ソースコードが公開されたソフト","クローズドな開発"],ans:1,s:"IT・情報"},
];

const SUBJECTS = ["全科目","数学","英語","英単語","理科","国語","社会","IT・情報"];

const getQ=(cur, subj, custom=[], wrongSet=null)=>{
  const allQs=[...Qs,...custom];
  const pool=subj==="全科目"?allQs:allQs.filter(q=>q.s===subj);
  if(pool.length===0)return Qs[Math.floor(Math.random()*Qs.length)];
  // Wrong answer priority: 65% chance to pick from wrong if available
  if(wrongSet&&wrongSet.size>0){
    const wrong=pool.filter(q=>wrongSet.has(q.q)&&q!==cur);
    const other=pool.filter(q=>!wrongSet.has(q.q)&&q!==cur);
    if(wrong.length>0&&Math.random()<0.65){
      return wrong[Math.floor(Math.random()*wrong.length)];
    }
    const src=other.length>0?other:pool.filter(q=>q!==cur);
    return src.length>0?src[Math.floor(Math.random()*src.length)]:pool[0];
  }
  const f=pool.filter(q=>q!==cur);
  const src=f.length>0?f:pool;
  return src[Math.floor(Math.random()*src.length)];
};

const BOSSES=[
  {name:"怠惰の魔王",  emoji:"😴",col:"#7B2FFF",hp:300,weak:"英単語"},
  {name:"SNSの誘惑神", emoji:"📱",col:"#FF3D9A",hp:400,weak:"IT・情報"},
  {name:"ゲーム廃人鬼",emoji:"🎮",col:"#00BFFF",hp:500,weak:"英語"},
  {name:"YouTube悪魔", emoji:"📺",col:"#FF6B35",hp:600,weak:"国語"},
  {name:"徹夜の死神",  emoji:"👻",col:"#00E676",hp:700,weak:"理科"},
  {name:"スマホ依存神",emoji:"🤳",col:"#FF006E",hp:800,weak:"数学"},
];
const BONUS_EVENTS=[
  {id:"xp2",   label:"XP 2倍！",     e:"📈",c:"#00FF88"},
  {id:"hp",    label:"ライフ回復！", e:"❤️",c:"#FF3D9A"},
  {id:"dmg",   label:"ダメージ2倍！",e:"⚔️",c:"#FFD700"},
  {id:"shield",label:"コンボシールド！",e:"🛡️",c:"#4FC3F7"},
  {id:"time",  label:"時間延長！",   e:"⏳",c:"#A5D6A7"},
];
const GACHA=[
  {r:"N",  n:"やる気の欠片",  e:"✨",w:22,c:"#9E9E9E",d:"XP+80"},
  {r:"R",  n:"時間延長の薬",  e:"⏳",w:22,c:"#4FC3F7",d:"+3秒×5問"},
  {r:"R",  n:"経験値アップ",  e:"📈",w:18,c:"#A5D6A7",d:"XP×2×8問"},
  {r:"SR", n:"ダメージアップ",e:"⚔️",w:14,c:"#FFD700",d:"ダメージ×2×6問"},
  {r:"SR", n:"コンボシールド",e:"🛡️",w:11,c:"#FF8A65",d:"ミスでもコンボ維持×2"},
  {r:"SSR",n:"無敵コンボ",   e:"💎",w:0.7,c:"#FF3D9A",d:"8問コンボ維持！"},
  {r:"SSR",n:"ボス弱点暴露", e:"💥",w:0.3,c:"#BD00FF",d:"×4ダメージ×6問！"},
];
const QUESTS=[
  {id:"c",icon:"✅",label:"3問正解",  goal:3,reward:"+200XP"},
  {id:"b",icon:"⚔️",label:"ボス討伐", goal:1,reward:"+300XP＋ガチャ"},
  {id:"f",icon:"🎯",label:"集中完了",  goal:1,reward:"XP×2（10問）"},
  {id:"s",icon:"🔥",label:"5連続正解",goal:5,reward:"シールド×2"},
];
const QUEST_GOALS={c:3,b:1,f:1,s:5};
const LV_REQ  =[0,120,300,600,1000,1600,2500,3800,5600,8200];
const LV_NAMES=["ドパガキ","見習い","集中見習い","努力家","探求者","賢者の卵","達人","知識の化身","伝説","神の域"];

const CSS=`
*{box-sizing:border-box;}body{margin:0;}
html,body{height:100%;overflow:hidden;}
*{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
button{-webkit-appearance:none;}

@keyframes appShake{0%,100%{transform:translate(0,0)}12%{transform:translate(-14px,-8px)rotate(-1.5deg)}24%{transform:translate(14px,8px)rotate(1.5deg)}36%{transform:translate(-11px,10px)rotate(-1deg)}48%{transform:translate(11px,-10px)rotate(1deg)}65%{transform:translate(-7px,5px)}80%{transform:translate(7px,-5px)}}
@keyframes microVibe{0%,100%{transform:translate(0,0)}25%{transform:translate(-2px,1px)rotate(0.2deg)}75%{transform:translate(2px,-1px)rotate(-0.2deg)}}
@keyframes overdriveFlicker{0%,100%{opacity:0.1}50%{opacity:0.22}}
@keyframes bossHit{0%,100%{transform:scale(1)}20%{transform:scale(0.75)rotate(-7deg)}55%{transform:scale(1.18)rotate(4deg)}80%{transform:scale(0.95)}}
@keyframes floatUp{0%{opacity:1;transform:translateY(0)scale(1)}12%{transform:translateY(-14px)scale(1.5)}100%{opacity:0;transform:translateY(-130px)scale(0.5)}}
@keyframes comboJump{0%,100%{transform:scale(1)}35%{transform:scale(1.7)}}
@keyframes critBurst{0%{transform:scale(0.1)rotate(-20deg);opacity:0}50%{transform:scale(1.25)rotate(5deg);opacity:1}100%{transform:scale(1)rotate(0);opacity:1}}
@keyframes lvUpIn{0%{transform:scale(0.1)rotate(-25deg);opacity:0}55%{transform:scale(1.2)rotate(4deg)}100%{transform:scale(1)rotate(0);opacity:1}}
@keyframes gachaIn{0%{transform:scale(0)rotate(30deg);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes flipCard{from{transform:rotateY(90deg)scale(0.8);opacity:0}to{transform:rotateY(0)scale(1);opacity:1}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px #7B2FFF}50%{box-shadow:0 0 50px #7B2FFF,0 0 90px #FF3D9A}}
@keyframes rainbow{0%{color:#FF006E}20%{color:#FF8C00}40%{color:#FFD700}60%{color:#00FF88}80%{color:#00F5FF}100%{color:#FF006E}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}
@keyframes hpBlink{0%,100%{opacity:1}50%{opacity:0.35}}
@keyframes slideDown{from{transform:translateY(-28px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes timerPanic{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.6)}}
@keyframes finishGlow{0%,100%{filter:drop-shadow(0 0 14px #FF1744)}50%{filter:drop-shadow(0 0 36px #FF1744)}}
@keyframes newBossIn{0%{transform:scale(0)rotate(20deg);opacity:0}65%{transform:scale(1.12)rotate(-3deg)}100%{transform:scale(1)rotate(0);opacity:1}}
@keyframes bonusBanner{from{transform:translateY(-60px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes countJump{0%{transform:scale(0.6);opacity:0.5}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes heartLose{0%{transform:scale(1)}30%{transform:scale(1.4)}100%{transform:scale(0);opacity:0}}
@keyframes gameOverIn{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes modeCardIn{0%{transform:translateY(30px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes reviveIn{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes finishHim{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes focusDoneIn{0%{opacity:0;transform:scale(0.8)rotate(-5deg)}60%{transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
@keyframes stagger0{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
@keyframes battleStartIn{0%{opacity:0}100%{opacity:1}}
@keyframes temptSlide{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes goldShine{0%,100%{filter:brightness(1)drop-shadow(0 0 8px #FFD700)}50%{filter:brightness(1.3)drop-shadow(0 0 24px #FFD700)}}
@keyframes focusPulse{0%,100%{opacity:0.5}50%{opacity:1}}
@keyframes weakFlash{0%{transform:scale(1)}30%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes questPop{0%{transform:scale(0.5);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
@keyframes genSpinner{to{transform:rotate(360deg)}}
@keyframes wrongBadge{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
`;

const getLv   =xp=>{let l=1;for(let i=0;i<LV_REQ.length;i++)if(xp>=LV_REQ[i])l=i+1;return Math.min(l,10);};
const getLvPct=xp=>{const l=getLv(xp);if(l>=10)return 100;return Math.round(((xp-LV_REQ[l-1])/(LV_REQ[l]-LV_REQ[l-1]))*100);};
const pullG   =()=>{const t=GACHA.reduce((s,g)=>s+g.w,0);let r=Math.random()*t;for(const g of GACHA){r-=g.w;if(r<=0)return g;}return GACHA[0];};
const getMulti=c=>c>=10?3:c>=5?2:c>=3?1.5:1;
const multiTag=c=>c>=10?"×3 💎":c>=5?"×2 🔥":c>=3?"×1.5 ⚡":"";
const fmtTime =s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

function useAudio(){
  const ctx=useRef(null);
  const C=()=>{if(!ctx.current)ctx.current=new(window.AudioContext||window.webkitAudioContext)();return ctx.current;};
  const t=(f,st,d,tp="sine",v=0.1)=>{try{const c=C(),n=c.currentTime,o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type=tp;o.frequency.value=f;g.gain.setValueAtTime(v,n+st);g.gain.exponentialRampToValueAtTime(0.001,n+st+d);o.start(n+st);o.stop(n+st+d+0.01);}catch(e){}};
  return{
    ok:      ()=>{t(440,0,0.04,"square",0.12);t(660,0.05,0.04,"square",0.12);t(880,0.1,0.09,"square",0.1);},
    weak:    ()=>{t(550,0,0.04,"square",0.15);t(770,0.05,0.05,"square",0.15);t(1100,0.1,0.12,"square",0.12);},
    miss:    ()=>{t(200,0,0.06,"sawtooth",0.18);t(140,0.07,0.16,"sawtooth",0.13);},
    crit:    ()=>{[523,659,784,1047,1318,1568].forEach((f,i)=>t(f,i*0.07,0.2,"square",0.1));},
    combo5:  ()=>{t(440,0,0.04,"square",0.1);t(550,0.05,0.04,"square",0.1);t(660,0.1,0.06,"square",0.1);},
    combo10: ()=>{[880,1100,1320,880,1760].forEach((f,i)=>t(f,i*0.06,0.15,"square",0.12));},
    gacha:   ()=>{t(440,0,0.03);t(550,0.04,0.03);t(660,0.08,0.05);t(880,0.13,0.12,"square",0.07);},
    lvUp:    ()=>{[523,659,784,659,1047,784,1318].forEach((f,i)=>t(f,i*0.09,0.19,"square",0.08));},
    boss:    ()=>{[880,660,440,220,110].forEach((f,i)=>t(f,i*0.11,0.19,"sawtooth",0.1));},
    bonus:   ()=>{t(660,0,0.05,"square",0.1);t(880,0.06,0.08,"square",0.08);},
    quest:   ()=>{[440,660,880,1100].forEach((f,i)=>t(f,i*0.08,0.15,"square",0.1));},
    tick:    ()=>{t(900,0,0.015,"square",0.03);},
    death:   ()=>{[440,330,220,110].forEach((f,i)=>t(f,i*0.13,0.2,"sawtooth",0.12));},
    revive:  ()=>{[220,330,440,660,880].forEach((f,i)=>t(f,i*0.1,0.18,"square",0.1));},
    focusDone:()=>{[523,659,784,1047,784,1047,1318].forEach((f,i)=>t(f,i*0.12,0.22,"square",0.08));},
  };
}

// ═══════════ AI問題生成 ═══════════
function QuestionGenerator({onAdd,onBack}){
  const [tab,setTab]=useState("ai"); // "ai" | "manual"
  const [topic,setTopic]=useState("");
  const [loading,setLoading]=useState(false);
  const [generated,setGenerated]=useState(null);
  const [error,setError]=useState("");
  const [selected,setSelected]=useState(new Set());
  // Manual form
  const [mQ,setMQ]=useState("");const [mA,setMA]=useState("");const [mB,setMB]=useState("");const [mC,setMC]=useState("");
  const [mAns,setMAns]=useState(0);const [mSub,setMSub]=useState("IT・情報");
  const [manualAdded,setManualAdded]=useState(0);

  const generate=async()=>{
    if(!topic.trim())return;
    setLoading(true);setError("");setGenerated(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",max_tokens:1000,
          messages:[{role:"user",content:`以下のテキスト・トピックから一問一答クイズを5問作ってください。

テキスト/トピック:
${topic}

JSON形式のみで出力（説明・マークダウン不要）:
[{"q":"問題文","opts":["A","B","C"],"ans":0,"s":"科目"}]

条件:
- ansはopts配列のインデックス(0,1,2)
- sは "英語" "英単語" "数学" "理科" "国語" "社会" "IT・情報" "その他" のどれか
- 3択・明確な正解
- 一問一答形式・実用的な知識`}]
        })
      });
      const data=await res.json();
      const text=data.content.map(c=>c.text||"").join("");
      const clean=text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
      const qs=JSON.parse(clean);
      setGenerated(qs);setSelected(new Set(qs.map((_,i)=>i)));
    }catch(e){setError("生成に失敗しました。もう一度試してください。");}
    setLoading(false);
  };

  const addGenerated=()=>{
    const toAdd=generated.filter((_,i)=>selected.has(i));
    onAdd(toAdd);setGenerated(null);setTopic("");setSelected(new Set());
  };

  const addManual=()=>{
    if(!mQ.trim()||!mA.trim()||!mB.trim()||!mC.trim())return;
    onAdd([{q:mQ,opts:[mA,mB,mC],ans:mAns,s:mSub}]);
    setMQ("");setMA("");setMB("");setMC("");setMAns(0);setManualAdded(n=>n+1);
  };

  const toggleSel=(i)=>{const s=new Set(selected);if(s.has(i))s.delete(i);else s.add(i);setSelected(s);};

  const inp={background:"#0A0A1A",border:"1px solid #2A2A4A",borderRadius:10,padding:"10px 14px",fontSize:14,color:"#FFF",width:"100%",outline:"none",fontFamily:"system-ui"};

  return(<><style>{CSS}</style>
    <div style={{background:"#05050E",minHeight:"100svh",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",padding:"0 0 40px"}}>
      {/* Header */}
      <div style={{background:"#0B0B1C",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #18183A"}}>
        <div style={{fontSize:16,fontWeight:900,color:"#7B2FFF"}}>🤖 問題を作る</div>
        <button onClick={onBack} style={{background:"transparent",border:"1px solid #2A2A4A",borderRadius:8,padding:"5px 14px",fontSize:13,color:"#9B86BF",cursor:"pointer"}}>← 戻る</button>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:"1px solid #18183A"}}>
        {[["ai","🤖 AI生成"],["manual","✏️ 手動追加"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,background:tab===id?"#7B2FFF22":"transparent",border:"none",borderBottom:tab===id?"2px solid #7B2FFF":"2px solid transparent",padding:"12px",fontSize:13,fontWeight:700,color:tab===id?"#B380FF":"#4A4A7A",cursor:"pointer"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{padding:"20px 16px",flex:1}}>
        {tab==="ai"&&(<>
          <div style={{fontSize:12,color:"#9B86BF",marginBottom:12,lineHeight:1.7}}>
            📌 使い方：トピック名や勉強したい文章を入れると問題を自動生成。NotebookLMで生成したQ&Aを貼り付けることも可能。
          </div>
          <textarea
            value={topic}onChange={e=>setTopic(e.target.value)}
            placeholder={"例：TOEIC英単語の「account」「adjust」「allocate」\n\nまたは教材のテキストをそのまま貼り付けてください"}
            style={{...inp,height:120,resize:"vertical",marginBottom:12}}
          />
          <button onClick={generate} disabled={loading||!topic.trim()}
            style={{width:"100%",background:loading||!topic.trim()?"#1A1A2E":"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:14,padding:"14px",fontSize:16,fontWeight:900,color:loading||!topic.trim()?"#4A4A7A":"#FFF",cursor:loading||!topic.trim()?"default":"pointer",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {loading?<><div style={{width:18,height:18,border:"2px solid #7B2FFF",borderTopColor:"transparent",borderRadius:"50%",animation:"genSpinner 0.8s linear infinite"}}/><span>生成中...</span></>:"🤖 問題を生成"}
          </button>
          {error&&<div style={{color:"#FF1744",fontSize:13,marginBottom:12,textAlign:"center"}}>{error}</div>}
          {generated&&(
            <div>
              <div style={{fontSize:12,color:"#9B86BF",marginBottom:10}}>✅ {generated.length}問生成されました。追加する問題を選んでください：</div>
              {generated.map((q,i)=>(
                <div key={i} onClick={()=>toggleSel(i)}
                  style={{background:selected.has(i)?"#1A1235":"#0E0E1E",border:selected.has(i)?"1px solid #7B2FFF":"1px solid #1A1A3A",borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                    <div style={{fontSize:16,flexShrink:0,marginTop:1}}>{selected.has(i)?"✅":"⬜"}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#E8E8FF",marginBottom:4}}>{q.q}</div>
                      <div style={{fontSize:11,color:"#9B86BF"}}>{q.opts.map((o,j)=>`${["A","B","C"][j]}:${o}`).join(" / ")}</div>
                      <div style={{fontSize:10,color:"#7B2FFF",marginTop:3}}>正解: {q.opts[q.ans]} | {q.s}</div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addGenerated}
                style={{width:"100%",background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:14,padding:"14px",fontSize:16,fontWeight:900,color:"#FFF",cursor:"pointer",marginTop:4}}>
                ✅ {selected.size}問を追加する
              </button>
            </div>
          )}
        </>)}

        {tab==="manual"&&(<>
          <div style={{fontSize:12,color:"#9B86BF",marginBottom:16,lineHeight:1.7}}>
            📌 手動で1問ずつ追加できます。追加した問題はすぐにゲームに反映されます。
            {manualAdded>0&&<span style={{color:"#00FF41",fontWeight:700,animation:"wrongBadge 0.3s ease"}}> {manualAdded}問追加済み！</span>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div>
              <div style={{fontSize:11,color:"#7B2FFF",marginBottom:4,fontWeight:700}}>問題文</div>
              <input value={mQ} onChange={e=>setMQ(e.target.value)} placeholder="例：「facilitate」の意味は？" style={inp}/>
            </div>
            {["A","B","C"].map((lbl,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                <button onClick={()=>setMAns(i)} style={{background:mAns===i?"#7B2FFF":"#1A1A2E",border:mAns===i?"2px solid #B380FF":"1px solid #2A2A4A",borderRadius:8,padding:"8px 12px",fontSize:13,fontWeight:900,color:mAns===i?"#FFF":"#6B5EA8",cursor:"pointer",flexShrink:0,minWidth:36}}>
                  {lbl}
                </button>
                <input value={[mA,mB,mC][i]} onChange={e=>{[setMA,setMB,setMC][i](e.target.value);}} placeholder={`選択肢${lbl}`} style={{...inp}}/>
              </div>
            ))}
            <div style={{fontSize:11,color:"#7B2FFF",marginBottom:-4,fontWeight:700}}>科目</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {SUBJECTS.filter(s=>s!=="全科目").map(s=>(
                <button key={s} onClick={()=>setMSub(s)} style={{background:mSub===s?"#7B2FFF":"#12122A",border:mSub===s?"1px solid #B380FF":"1px solid #1E1E3E",color:"#FFF",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{s}</button>
              ))}
            </div>
            <button onClick={addManual} disabled={!mQ.trim()||!mA.trim()||!mB.trim()||!mC.trim()}
              style={{background:!mQ||!mA||!mB||!mC?"#1A1A2E":"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:14,padding:"14px",fontSize:16,fontWeight:900,color:!mQ||!mA||!mB||!mC?"#4A4A7A":"#FFF",cursor:!mQ||!mA||!mB||!mC?"default":"pointer",marginTop:4}}>
              ➕ 問題を追加
            </button>
          </div>
        </>)}
      </div>
    </div>
  </>);
}

// ═══════════ GACHA SCREEN ═══════════
function GachaScreen({item,flipped,onFlip,onClose,snd}){
  if(!item)return null;const isSSR=item.r==="SSR";
  return(<><style>{CSS}</style>
    <div style={{position:"fixed",inset:0,background:"#030308",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:300,padding:"20px",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",textAlign:"center"}}>
      <div style={{fontSize:12,fontWeight:900,letterSpacing:7,color:"#7B2FFF",marginBottom:6}}>突然ガチャ発動！</div>
      <div style={{fontSize:34,fontWeight:900,marginBottom:44,animation:"gachaIn 0.5s ease",background:"linear-gradient(90deg,#FF006E,#FFD700,#00FF88)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>🎰 GACHA!!!</div>
      {!flipped?(<><div onClick={()=>{onFlip();snd.gacha();}}
        onMouseDown={e=>e.currentTarget.style.transform="scale(0.91)"}onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
        onTouchStart={e=>e.currentTarget.style.transform="scale(0.91)"}onTouchEnd={e=>e.currentTarget.style.transform="scale(1)"}
        style={{width:200,height:270,background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",borderRadius:22,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",fontSize:82,animation:"glowPulse 2s infinite",userSelect:"none",transition:"transform 0.1s"}}>
        🎴<div style={{fontSize:15,fontWeight:900,color:"rgba(255,255,255,0.8)",letterSpacing:4}}>TAP!</div>
      </div>
      <div style={{marginTop:28,color:"#7B2FFF",fontSize:15,animation:"pulse 1s infinite",fontWeight:900}}>タップして開封！</div></>
      ):(<><div style={{width:210,background:`linear-gradient(135deg,${item.c}15,${item.c}40)`,border:`3px solid ${item.c}`,borderRadius:22,display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 16px",gap:10,animation:"flipCard 0.45s ease",boxShadow:isSSR?`0 0 90px ${item.c}A0`:`0 0 35px ${item.c}60`}}>
        <div style={{background:item.c,borderRadius:8,padding:"4px 16px",fontSize:14,fontWeight:900,letterSpacing:4,color:isSSR?"#000":"#FFF"}}>{item.r}</div>
        <div style={{fontSize:72}}>{item.e}</div>
        <div style={{fontSize:16,fontWeight:900}}>{item.n}</div>
        <div style={{fontSize:12,color:item.c,background:`${item.c}18`,borderRadius:8,padding:"5px 12px",fontWeight:700}}>{item.d}</div>
      </div>
      {isSSR&&<div style={{marginTop:12,fontSize:16,fontWeight:900,animation:"rainbow 0.8s linear infinite"}}>✨ 超レア入手！ ✨</div>}
      <button onClick={onClose} style={{marginTop:28,background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:16,padding:"15px 48px",fontSize:18,fontWeight:900,color:"#FFF",cursor:"pointer",letterSpacing:2}}>続ける →</button></>
      )}
    </div>
  </>);
}

// ═══════════ FOCUS MODE ═══════════
function FocusMode({onComplete,onBack,onTempt,subject,setSubject}){
  const WORK=25*60,BREAK=5*60;
  const [isWork,setIsWork]=useState(true);const [time,setTime]=useState(WORK);
  const [running,setRunning]=useState(false);const [pomos,setPomos]=useState(0);
  const [temptLevel,setTemptLevel]=useState(0);
  const total=isWork?WORK:BREAK;const pct=time/total;
  const R=82,CIRC=2*Math.PI*R;const accent=isWork?"#2DD4BF":"#F59E0B";
  useEffect(()=>{
    if(!running)return;
    const id=setInterval(()=>{setTime(t=>{
      if(t<=1){clearInterval(id);if(isWork){setRunning(false);setTimeout(()=>onComplete(pomos+1),300);}
      else{setIsWork(true);setTime(WORK);setTemptLevel(0);}return 0;}
      if(isWork){if(t<=5*60&&temptLevel<2)setTemptLevel(2);else if(t<=10*60&&temptLevel<1)setTemptLevel(1);}
      return t-1;
    });},1000);return()=>clearInterval(id);
  },[running,isWork,pomos,temptLevel]);
  return(<><style>{CSS}</style>
    <div style={{background:"#090F1A",minHeight:"100svh",maxHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 16px 30px",maxWidth:430,margin:"0 auto",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",overflow:"hidden",position:"relative"}}>
      {temptLevel>=2&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"linear-gradient(90deg,#1A0A00,#2A1000)",borderBottom:"2px solid #FF6B35",padding:"10px 16px",zIndex:90,animation:"temptSlide 0.5s ease",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
        <div><div style={{fontSize:13,fontWeight:900,color:"#FF6B35"}}>⚡ ボーナスバトル解放中！</div><div style={{fontSize:11,color:"#CC7744"}}>今すぐドパへ行くとXP×2</div></div>
        <div style={{display:"flex",gap:6,flexShrink:0}}>
          <button onClick={onTempt} style={{background:"#FF6B35",border:"none",borderRadius:9,padding:"7px 12px",fontSize:12,fontWeight:900,color:"#FFF",cursor:"pointer"}}>⚡バトルへ</button>
          <button onClick={()=>setTemptLevel(0)} style={{background:"transparent",border:"1px solid #333",borderRadius:9,padding:"7px 10px",fontSize:11,color:"#666",cursor:"pointer"}}>×</button>
        </div>
      </div>}
      {temptLevel===1&&<div onClick={()=>setTemptLevel(2)} style={{position:"fixed",top:12,right:12,background:"#FF6B3530",border:"1px solid #FF6B35",borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:700,color:"#FF6B35",cursor:"pointer",animation:"pulse 2s infinite",zIndex:80}}>⚡ 解放待機中...</div>}
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,marginTop:temptLevel>=2?50:0,transition:"margin-top 0.3s"}}>
        <div style={{fontSize:13,fontWeight:900,color:accent,letterSpacing:3}}>🎯 フォーカスモード</div>
        <button onClick={()=>onBack(false)} style={{background:"transparent",border:"1px solid #1A2D3A",borderRadius:8,padding:"4px 12px",fontSize:12,color:"#4A7A7A",cursor:"pointer"}}>⚡ ドパへ</button>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:2,width:"100%"}}>
        {SUBJECTS.map(s=><button key={s} onClick={()=>setSubject(s)} style={{background:subject===s?`${accent}22`:"transparent",border:`1px solid ${subject===s?accent:"#1A2D3A"}`,color:subject===s?accent:"#4A7A7A",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>{s}</button>)}
      </div>
      <div style={{position:"relative",width:200,height:200,marginBottom:10}}>
        <svg width="200" height="200" style={{transform:"rotate(-90deg)"}}>
          <circle cx="100" cy="100" r={R} stroke="#0F1825" strokeWidth="12" fill="none"/>
          <circle cx="100" cy="100" r={R} stroke={accent} strokeWidth="12" fill="none" strokeDasharray={`${CIRC}`} strokeDashoffset={`${CIRC*(1-pct)}`} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontSize:40,fontWeight:900,letterSpacing:2,color:running?"#FFF":"#4A7A7A"}}>{fmtTime(time)}</div>
          <div style={{fontSize:11,color:accent,fontWeight:700,marginTop:4,letterSpacing:3}}>{isWork?"集中タイム":"休憩タイム"}</div>
        </div>
      </div>
      <div style={{fontSize:22,marginBottom:16,animation:running&&isWork?"focusPulse 4s infinite":"none"}}>{"🍅".repeat(Math.min(pomos,6))}{pomos===0&&<span style={{color:"#1A2D3A"}}>🍅🍅🍅</span>}</div>
      <button onClick={()=>setRunning(r=>!r)} style={{width:"100%",maxWidth:280,background:running?`${accent}22`:`linear-gradient(135deg,${accent},#0D7A6E)`,border:running?`2px solid ${accent}`:"none",borderRadius:18,padding:"18px",fontSize:20,fontWeight:900,color:"#FFF",cursor:"pointer",marginBottom:10,letterSpacing:2}}>
        {running?"⏸ 一時停止":"▶ 集中開始"}
      </button>
      <button onClick={()=>{setTime(isWork?WORK:BREAK);setRunning(false);setTemptLevel(0);}} style={{background:"transparent",border:"1px solid #1A2D3A",borderRadius:14,padding:"8px 28px",fontSize:12,color:"#4A7A7A",cursor:"pointer"}}>リセット</button>
    </div>
  </>);
}

// ═══════════ MAIN APP ═══════════
export default function App(){
  const [phase,    setPhase]    = useState("intro");
  const [customQs, setCustomQs] = useState([]);
  const [wrongQs,  setWrongQs]  = useState(new Set());
  const [Q,        setQ]        = useState(()=>getQ(null,"全科目",[],null));
  const [round,    setRound]    = useState(0);
  const [done,     setDone]     = useState(false);
  const [tLeft,    setTLeft]    = useState(50);
  const [combo,    setCombo]    = useState(0);
  const [xp,       setXp]       = useState(0);
  const [bossHP,   setBossHP]   = useState(300);
  const [bMaxHP,   setBMaxHP]   = useState(300);
  const [bIdx,     setBIdx]     = useState(0);
  const [kills,    setKills]    = useState(0);
  const [lives,    setLives]    = useState(3);
  const [subject,  setSubject]  = useState("全科目");
  const [practiceMode,setPracticeMode]=useState(false);
  const [introCount,setIntroCount]=useState(0);
  const [introScore,setIntroScore]=useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [pomCount, setPomCount] = useState(0);
  const [focusBonusLeft,setFocusBonusLeft]=useState(0);
  const [questP,   setQuestP]   = useState({c:0,b:0,f:0,s:0});
  const [questD,   setQuestD]   = useState({c:false,b:false,f:false,s:false});
  const [reviveUsed,setReviveUsed]=useState(false);
  const [reviveFailed,setReviveFailed]=useState(false);
  const [battleHasBonus,setBattleHasBonus]=useState(false);
  const [fxList,   setFxList]   = useState([]);
  const [bShake,   setBShake]   = useState(false);
  const [aShake,   setAShake]   = useState(false);
  const [flash,    setFlash]    = useState(null);
  const [weakAnim, setWeakAnim] = useState(false);
  const [bonus,    setBonus]    = useState(null);
  const [bonusBuff,setBonusBuff]=useState({xp2:0,dmg2:0,shield:0,time:0});
  const [gItem,    setGItem]    = useState(null);
  const [gFlip,    setGFlip]    = useState(false);
  const [lvNum,    setLvNum]    = useState(1);
  const [lvShow,   setLvShow]   = useState(false);
  const [bossDownShow,setBossDownShow]=useState(false);
  const [toast,    setToast]    = useState(null);
  const [questToast,setQuestToast]=useState(null);
  const [newBoss,  setNewBoss]  = useState(false);
  const [lostHi,   setLostHi]   = useState(-1);
  const [countAnim,setCountAnim]=useState(false);
  const prevCntRef=useRef(5);

  const QR=useRef(Q);const doneR=useRef(false);const phaseR=useRef("intro");
  const comboR=useRef(0);const hpR=useRef(300);const xpR=useRef(0);
  const bIdxR=useRef(0);const livesR=useRef(3);const pvLvR=useRef(1);
  const subjectR=useRef("全科目");const bonusBuffR=useRef({xp2:0,dmg2:0,shield:0,time:0});
  const focusBonusR=useRef(0);const pracR=useRef(false);
  const introCntR=useRef(0);const introScoreR=useRef(0);
  const questPR=useRef({c:0,b:0,f:0,s:0});const questDR=useRef({c:false,b:false,f:false,s:false});
  const customQsR=useRef([]);const wrongQsR=useRef(new Set());
  const sndRef=useRef(null);

  QR.current=Q;comboR.current=combo;hpR.current=bossHP;xpR.current=xp;
  bIdxR.current=bIdx;livesR.current=lives;subjectR.current=subject;
  bonusBuffR.current=bonusBuff;focusBonusR.current=focusBonusLeft;
  pracR.current=practiceMode;introCntR.current=introCount;introScoreR.current=introScore;
  questPR.current=questP;questDR.current=questD;
  customQsR.current=customQs;wrongQsR.current=wrongQs;

  const snd=useAudio();sndRef.current=snd;
  const boss=BOSSES[bIdx%BOSSES.length];
  const lv=getLv(xp);const lvPct=getLvPct(xp);
  const hpPct=Math.max(0,(bossHP/(bMaxHP||300))*100);
  const hpCol=hpPct>10?"#00E676":hpPct>0?"#FF1744":"#555";
  const isFinishing=hpPct<=10&&hpPct>0&&["dopa","intro"].includes(phase);
  const effSec=phase==="dopa"?3:5;
  const tPct=(tLeft/(effSec*10))*100;
  const tCol=tLeft>effSec*10*0.5?"#00E676":tLeft>effSec*10*0.2?"#FFD740":"#FF1744";
  const countNum=Math.max(0,Math.ceil(tLeft/10));
  const ci=combo>=10?3:combo>=5?2:combo>=3?1:0;
  const containerBg=ci>=3?"#0A0800":ci>=2?"#0A0508":"#05050E";
  const containerShadow=ci>=3?"inset 0 0 100px rgba(255,215,0,0.08),0 0 0 2px #FFD700,0 0 40px #FFD70050":ci>=2?"inset 0 0 80px rgba(255,61,154,0.06),0 0 0 2px #FF3D9A":ci>=1?"0 0 0 1px #7B2FFF50":"none";
  const isWeakSubject=subject===boss.weak;

  useEffect(()=>{if(countNum!==prevCntRef.current&&countNum>0){prevCntRef.current=countNum;setCountAnim(true);setTimeout(()=>setCountAnim(false),250);};},[countNum]);

  const fx=(txt,type)=>{const id=Date.now()+Math.random(),x=12+Math.random()*58;setFxList(p=>[...p,{id,txt,type,x}]);setTimeout(()=>setFxList(p=>p.filter(e=>e.id!==id)),1500);};
  const pop=msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const addWrong=(q)=>{const s=new Set(wrongQsR.current);s.add(q.q);setWrongQs(s);wrongQsR.current=s;};

  const updateQuest=(key,newVal)=>{
    const qd=questDR.current;if(qd[key])return;
    const qp={...questPR.current,[key]:newVal};setQuestP(qp);questPR.current=qp;
    if(newVal>=QUEST_GOALS[key]){
      const nd={...questDR.current,[key]:true};setQuestD(nd);questDR.current=nd;
      const q=QUESTS.find(x=>x.id===key);
      if(q){setQuestToast(`🎉 クエスト達成！${q.label} → ${q.reward}`);setTimeout(()=>setQuestToast(null),3000);sndRef.current.quest();
        if(key==="c"){const nx=xpR.current+200;setXp(nx);xpR.current=nx;pop("+200XP クエスト報酬！");}
        if(key==="b"){const nx=xpR.current+300;setXp(nx);xpR.current=nx;setTimeout(()=>{setGItem(pullG());setGFlip(false);phaseR.current="gacha";setPhase("gacha");},800);}
        if(key==="f"){setFocusBonusLeft(10);focusBonusR.current=10;}
        if(key==="s"){setBonusBuff(b=>({...b,shield:b.shield+2}));}
      }
    }
  };

  const applyBonus=(ev)=>{
    sndRef.current.bonus();setBonus(ev);setTimeout(()=>setBonus(null),2500);
    const b=bonusBuffR.current;let nb={...b};
    if(ev.id==="xp2")nb={...nb,xp2:nb.xp2+5};if(ev.id==="dmg")nb={...nb,dmg2:nb.dmg2+5};
    if(ev.id==="shield")nb={...nb,shield:nb.shield+1};if(ev.id==="time")nb={...nb,time:nb.time+3};
    if(ev.id==="hp")setLives(l=>Math.min(3,l+1));
    setBonusBuff(nb);bonusBuffR.current=nb;fx(ev.label,"combo");
  };

  const setComboN=v=>{setCombo(v);comboR.current=v;};
  const startDopa=(wb)=>{if(wb){setFocusBonusLeft(10);focusBonusR.current=10;}setLives(3);livesR.current=3;setComboN(0);phaseR.current="dopa";setPhase("dopa");loadNext();};
  const startBattle=(wb)=>{setBattleHasBonus(!!wb);phaseR.current="battlestart";setPhase("battlestart");setTimeout(()=>startDopa(wb),2200);};

  const loadNext=(skipQ)=>{
    const b=bonusBuffR.current;const extraTicks=b.time>0?b.time*10:0;
    const startTicks=effSec*10+extraTicks;
    if(b.time>0){const nb={...b,time:Math.max(0,b.time-1)};setBonusBuff(nb);bonusBuffR.current=nb;}
    const nq=skipQ||getQ(QR.current,subjectR.current,customQsR.current,wrongQsR.current);
    doneR.current=false;setDone(false);setQ(nq);setTLeft(startTicks);setRound(r=>r+1);
  };

  useEffect(()=>{
    if(!["intro","dopa","revive"].includes(phaseR.current))return;
    const id=setInterval(()=>{setTLeft(t=>{
      if(t<=1){clearInterval(id);if(!doneR.current&&["intro","dopa","revive"].includes(phaseR.current)){doneR.current=true;handleTimeout();}return 0;}
      if(t===Math.floor(effSec*10*0.35))sndRef.current.tick();return t-1;
    });},100);return()=>clearInterval(id);
  },[round,phase]); // eslint-disable-line

  const handleTimeout=()=>{
    const ph=phaseR.current;sndRef.current.miss();setFlash("miss");setAShake(true);setTimeout(()=>{setFlash(null);setAShake(false);},520);
    const b=bonusBuffR.current;
    if(b.shield>0){const nb={...b,shield:b.shield-1};setBonusBuff(nb);bonusBuffR.current=nb;fx("🛡️ GUARD!","combo");}
    else{if(comboR.current>=3)fx("COMBO BREAK!","break");setComboN(0);}
    addWrong(QR.current);setDone(true);
    if(ph==="intro"){const nc=introCntR.current+1;setIntroCount(nc);introCntR.current=nc;if(nc>=3){setTimeout(()=>{phaseR.current="modesel";setPhase("modesel");},550);}else{setTimeout(()=>loadNext(),550);}return;}
    if(ph==="revive"){setReviveFailed(true);setTimeout(()=>{phaseR.current="gameover";setPhase("gameover");},700);return;}
    if(!pracR.current){const nl=livesR.current-1;setLives(nl);livesR.current=nl;setLostHi(nl);setTimeout(()=>setLostHi(-1),600);if(nl<=0){sndRef.current.death();setTimeout(()=>{phaseR.current="gameover";setPhase("gameover");},700);return;}}
    setTimeout(()=>loadNext(),550);
  };

  const answer=(idx)=>{
    if(doneR.current||!["intro","dopa","revive"].includes(phaseR.current))return;
    doneR.current=true;setDone(true);
    const ph=phaseR.current;const isOk=idx!==null&&idx===QR.current.ans;
    if(!isOk)addWrong(QR.current);

    if(ph==="intro"){
      const nc=introCntR.current+1;setIntroCount(nc);introCntR.current=nc;
      if(isOk){sndRef.current.ok();setFlash("ok");setTimeout(()=>setFlash(null),350);fx("+10XP","xp");const nx=xpR.current+10;setXp(nx);xpR.current=nx;setIntroScore(s=>s+1);introScoreR.current++;}
      else{sndRef.current.miss();setFlash("miss");setTimeout(()=>setFlash(null),350);}
      if(nc>=3){setTimeout(()=>{phaseR.current="modesel";setPhase("modesel");},550);}else{setTimeout(()=>loadNext(),550);}
      return;
    }
    if(ph==="revive"){
      if(isOk){sndRef.current.revive();setFlash("ok");setTimeout(()=>setFlash(null),500);fx("復活！","combo");setTimeout(()=>{setLives(1);livesR.current=1;phaseR.current="dopa";setPhase("dopa");loadNext();},600);}
      else{sndRef.current.miss();setFlash("miss");setTimeout(()=>setFlash(null),500);setReviveFailed(true);setTimeout(()=>{phaseR.current="gameover";setPhase("gameover");},700);}
      return;
    }
    if(isOk){
      const b=bonusBuffR.current;const newC=comboR.current+1;const multi=getMulti(newC);const isCrit=newC>=10;
      const dmgM=b.dmg2>0?2:1;const xpM=(b.xp2>0?2:1)*(focusBonusR.current>0?2:1);
      const isWeak=QR.current.s===BOSSES[bIdxR.current%BOSSES.length].weak&&QR.current.s!=="全科目";
      const weakMult=isWeak?2:1;
      const dmg=Math.round((isCrit?55:10)*multi*dmgM*weakMult);
      const gainXP=Math.round(6*multi*xpM);
      const newHP=Math.max(0,hpR.current-dmg);const newXP=xpR.current+gainXP;
      setComboN(newC);if(newC>maxCombo)setMaxCombo(newC);
      setBossHP(newHP);hpR.current=newHP;setXp(newXP);xpR.current=newXP;
      const nb={...b,dmg2:Math.max(0,b.dmg2-1),xp2:Math.max(0,b.xp2-1)};setBonusBuff(nb);bonusBuffR.current=nb;
      if(focusBonusR.current>0){const nfl=focusBonusR.current-1;setFocusBonusLeft(nfl);focusBonusR.current=nfl;}
      if(isCrit)sndRef.current.crit();else if(newC===10)sndRef.current.combo10();else if(newC===5)sndRef.current.combo5();else if(isWeak)sndRef.current.weak();else sndRef.current.ok();
      setFlash(isCrit?"crit":"ok");setTimeout(()=>setFlash(null),340);
      setBShake(true);setTimeout(()=>setBShake(false),520);
      if(isWeak){setWeakAnim(true);setTimeout(()=>setWeakAnim(false),500);fx("⚠️ 弱点！","weak");fx(`-${dmg}×2`,"dmg");}
      else{fx(isCrit?`💥 ${dmg}!!`:`-${dmg}`,"dmg");}
      fx(`+${gainXP}XP`,"xp");if(newC>=3)fx(multiTag(newC),"combo");
      updateQuest("c",questPR.current.c+1);if(newC>=5)updateQuest("s",5);
      const nLv=getLv(newXP);const didLv=nLv>pvLvR.current;
      if(didLv){pvLvR.current=nLv;setLvNum(nLv);sndRef.current.lvUp();}
      if(newHP<=0){
        sndRef.current.boss();setBossDownShow(true);setTimeout(()=>setBossDownShow(false),1800);
        pop(`⚔️ ${BOSSES[bIdxR.current%BOSSES.length].name} 討伐！`);updateQuest("b",questPR.current.b+1);
        setTimeout(()=>{const ni=bIdxR.current+1;const nb2=BOSSES[ni%BOSSES.length];setBIdx(ni);bIdxR.current=ni;setBossHP(nb2.hp);hpR.current=nb2.hp;setBMaxHP(nb2.hp);setKills(k=>k+1);setNewBoss(true);setTimeout(()=>setNewBoss(false),800);},500);
        if(didLv)setTimeout(()=>{setLvShow(true);setTimeout(()=>setLvShow(false),2500);},900);
        setTimeout(()=>loadNext(),1900);return;
      }
      if(didLv)setTimeout(()=>{setLvShow(true);setTimeout(()=>setLvShow(false),2500);},400);
      if(Math.random()<0.15){const ev=BONUS_EVENTS[Math.floor(Math.random()*BONUS_EVENTS.length)];applyBonus(ev);}
      const ansCount=Math.floor(xpR.current/6);
      if(Math.random()<0.15||ansCount%5===0){setTimeout(()=>{setGItem(pullG());setGFlip(false);phaseR.current="gacha";setPhase("gacha");},380);return;}
      setTimeout(()=>loadNext(),370);
    } else {
      const b=bonusBuffR.current;sndRef.current.miss();setFlash("miss");setAShake(true);setTimeout(()=>{setFlash(null);setAShake(false);},520);
      if(b.shield>0){const nb={...b,shield:b.shield-1};setBonusBuff(nb);bonusBuffR.current=nb;fx("🛡️ GUARD!","combo");}
      else{if(comboR.current>=3)fx("COMBO BREAK!","break");setComboN(0);}
      if(!pracR.current){const nl=livesR.current-1;setLives(nl);livesR.current=nl;setLostHi(nl);setTimeout(()=>setLostHi(-1),600);if(nl<=0){sndRef.current.death();setTimeout(()=>{phaseR.current="gameover";setPhase("gameover");},700);return;}}
      setTimeout(()=>loadNext(),540);
    }
  };

  if(phase==="generate") return (<QuestionGenerator onAdd={(qs)=>{setCustomQs(p=>[...p,...qs]);customQsR.current=[...customQsR.current,...qs];pop(`✅ ${qs.length}問を追加しました！`);}} onBack={()=>{phaseR.current="modesel";setPhase("modesel");}}/>);
  if(phase==="gacha") return (<GachaScreen item={gItem} flipped={gFlip} onFlip={()=>setGFlip(true)} onClose={()=>{phaseR.current="dopa";setPhase("dopa");loadNext();}} snd={snd}/> );
  if(phase==="focus") return (<FocusMode onComplete={(pc)=>{sndRef.current.focusDone();setPomCount(pc);updateQuest("f",1);phaseR.current="focusdone";setPhase("focusdone");}} onBack={(wb)=>{if(wb)startBattle(true);else startDopa(false);}} onTempt={()=>startBattle(true)} subject={subject} setSubject={setSubject}/> );

  if(phase==="focusdone")return(<><style>{CSS}</style>
    <div style={{background:"#000",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",textAlign:"center",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",overflow:"hidden"}}>
      <div style={{fontSize:80,marginBottom:10,animation:"focusDoneIn 0.7s ease 0.1s both"}}>🏆</div>
      <div style={{fontSize:38,fontWeight:900,letterSpacing:3,animation:"stagger0 0.6s ease 0.5s both",textShadow:"0 0 40px #FFD700",background:"linear-gradient(90deg,#FFD700,#FF8C00,#FFD700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>集中完了！</div>
      <div style={{fontSize:16,color:"#4A7A7A",marginTop:10,animation:"stagger0 0.5s ease 0.9s both"}}>{"🍅".repeat(Math.min(pomCount,6))} {pomCount}ポモドーロ達成</div>
      <div style={{width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:12,marginTop:44,animation:"stagger0 0.5s ease 1.4s both"}}>
        <button onClick={()=>{setGItem(pullG());setGFlip(false);phaseR.current="gacha";setPhase("gacha");}} style={{background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:16,padding:"18px",fontSize:18,fontWeight:900,color:"#FFF",cursor:"pointer",boxShadow:"0 0 30px #7B2FFF60"}}>🎰 ガチャを引く！</button>
        <button onClick={()=>startBattle(true)} style={{background:"#0A0A1A",border:"2px solid #FFD700",borderRadius:16,padding:"16px",fontSize:16,fontWeight:700,color:"#FFD700",cursor:"pointer",animation:"goldShine 2s infinite"}}>⚡ バトルへ（XP×2ボーナス）</button>
        <button onClick={()=>startDopa(false)} style={{background:"transparent",border:"1px solid #1A2D3A",borderRadius:16,padding:"12px",fontSize:13,color:"#4A7A7A",cursor:"pointer"}}>通常ドパモードへ</button>
      </div>
    </div></>);

  if(phase==="battlestart")return(<><style>{CSS}</style>
    <div style={{position:"fixed",inset:0,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:500,fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",animation:"battleStartIn 0.3s ease"}}>
      <div style={{fontSize:110,animation:"newBossIn 0.7s ease 0.2s both"}}>{BOSSES[bIdx%BOSSES.length].emoji}</div>
      <div style={{fontSize:42,fontWeight:900,letterSpacing:4,marginTop:16,animation:"lvUpIn 0.5s ease 0.6s both",background:"linear-gradient(90deg,#FF3D9A,#7B2FFF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>⚡ バトル開始！</div>
      <div style={{fontSize:13,color:"#6B5EA8",marginTop:8,animation:"stagger0 0.5s ease 0.9s both"}}>⚠️ 弱点: {BOSSES[bIdx%BOSSES.length].weak} → ×2ダメージ！</div>
      {battleHasBonus&&<div style={{fontSize:20,color:"#FFD700",fontWeight:700,marginTop:14,animation:"pulse 0.8s infinite",textShadow:"0 0 20px #FFD700"}}>🔥 XP×2 ボーナス発動！</div>}
    </div></>);

  if(phase==="gameover")return(<><style>{CSS}</style>
    <div style={{background:"#05000A",minHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",maxWidth:430,margin:"0 auto",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",textAlign:"center"}}>
      <div style={{animation:"gameOverIn 0.5s ease"}}>
        <div style={{fontSize:72,marginBottom:8}}>💀</div>
        <div style={{fontSize:46,fontWeight:900,letterSpacing:4,background:"linear-gradient(90deg,#FF1744,#FF6B35)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>GAME OVER</div>
        {reviveFailed&&<div style={{fontSize:14,color:"#FF1744",marginBottom:12}}>復活失敗...</div>}
        <div style={{background:"#100A14",borderRadius:18,padding:"18px 24px",marginBottom:24,display:"flex",gap:20,justifyContent:"center"}}>
          {[["⚔️",kills,"ボス討伐"],["🔥",maxCombo,"最大コンボ"],["✨",xp,"XP"]].map(([ic,v,l])=>(
            <div key={l}><div style={{fontSize:22}}>{ic}</div><div style={{fontSize:26,fontWeight:900}}>{v}</div><div style={{fontSize:11,color:"#6B5EA8"}}>{l}</div></div>
          ))}
        </div>
        {wrongQs.size>0&&<div style={{background:"#0A0A1A",borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#9B86BF"}}>🎯 次のゲームで間違えた{wrongQs.size}問を優先出題します</div>}
        {!reviveUsed&&!reviveFailed&&(
          <button onClick={()=>{setReviveUsed(true);phaseR.current="revive";setPhase("revive");setComboN(0);setTLeft(50);setRound(r=>r+1);setQ(getQ(QR.current,subjectR.current,customQsR.current,wrongQsR.current));doneR.current=false;setDone(false);}}
            style={{width:"100%",background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",border:"none",borderRadius:18,padding:"18px",fontSize:18,fontWeight:900,color:"#FFF",cursor:"pointer",marginBottom:12}}>🔄 あと1問正解で復活！</button>
        )}
        <button onClick={()=>{setLives(3);livesR.current=3;setComboN(0);setReviveUsed(false);setReviveFailed(false);setMaxCombo(0);phaseR.current="modesel";setPhase("modesel");}}
          style={{width:"100%",background:"#100A14",border:"2px solid #333",borderRadius:18,padding:"16px",fontSize:16,fontWeight:700,color:"#FFF",cursor:"pointer"}}>↩ モード選択に戻る</button>
      </div>
    </div></>);

  if(phase==="revive")return(<><style>{CSS}</style>
    <div style={{background:"#05000A",minHeight:"100svh",maxHeight:"100svh",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",overflow:"hidden",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",animation:aShake?"appShake 0.45s ease":"none",position:"relative"}}>
      {flash&&<div style={{position:"fixed",inset:0,zIndex:90,pointerEvents:"none",background:flash==="ok"?"rgba(0,255,65,0.20)":"rgba(255,0,60,0.30)"}}/>}
      <div style={{width:"100%",background:"#150010",padding:"14px 16px",textAlign:"center",borderBottom:"2px solid #FF1744",flexShrink:0}}>
        <div style={{fontSize:18,fontWeight:900,color:"#FF1744",letterSpacing:3,animation:"finishHim 0.8s infinite"}}>💀 復活チャンス！正解で復活！</div>
      </div>
      <div style={{width:"100%",background:"#200010",height:8,flexShrink:0}}><div style={{height:"100%",width:`${tPct}%`,background:"#FF1744",transition:"width 0.1s linear",boxShadow:"0 0 10px #FF1744",animation:tLeft<=10?"timerPanic 0.3s infinite":"none"}}/></div>
      <div style={{flexShrink:0,height:62,display:"flex",alignItems:"center",justifyContent:"center",background:"#06000C"}}><div style={{fontSize:88,fontWeight:900,lineHeight:1,color:countNum<=1?"#FF1744":"#CC3344",animation:countAnim?"countJump 0.28s ease":"none",textShadow:"0 0 30px #FF1744"}}>{countNum>0?countNum:"!"}</div></div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 18px",background:"#06000C",position:"relative"}}>
        {done&&flash&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:40,fontWeight:900,color:flash==="ok"?"#FF1744":"#FF3366",textShadow:"0 0 30px #FF1744",whiteSpace:"nowrap",zIndex:20,pointerEvents:"none"}}>{flash==="ok"?"✓ 復活！":"✗ MISS..."}</div>}
        {Q.s&&<div style={{fontSize:10,color:"#CC3344",fontWeight:700,letterSpacing:3,marginBottom:6,background:"#CC334422",borderRadius:6,padding:"2px 10px"}}>{Q.s}</div>}
        <div style={{fontSize:Q.q.length>16?17:Q.q.length>8?22:28,fontWeight:900,color:done?"#1A0010":"#FFB3B3",textAlign:"center",lineHeight:1.5}}>{Q.q}</div>
      </div>
      <div style={{padding:"8px 12px 20px",background:"#06000C",display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
        {Q.opts.map((opt,i)=>{const isAns=done&&i===Q.ans;return(
          <button key={i} onClick={()=>answer(i)} disabled={done}
            onMouseDown={e=>{if(!done)e.currentTarget.style.transform="scale(0.97)";}}
            onMouseUp={e=>{e.currentTarget.style.transform="";}}
            onTouchStart={e=>{if(!done)e.currentTarget.style.transform="scale(0.97)";}}
            onTouchEnd={e=>{e.currentTarget.style.transform="";}}
            style={{background:isAns?"rgba(255,23,68,0.2)":"#100010",border:isAns?"2px solid #FF1744":"2px solid #1A0020",borderRadius:13,padding:"12px 14px",fontSize:opt.length>14?13:15,fontWeight:700,color:isAns?"#FF1744":"#CC8899",cursor:done?"default":"pointer",display:"flex",alignItems:"center",gap:11,transition:"all 0.1s"}}>
            <span style={{background:isAns?"#FF1744":"#1A0020",borderRadius:7,minWidth:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0,color:isAns?"#000":"#CC3344"}}>{"ABC"[i]}</span>{opt}
          </button>
        );})}
      </div>
    </div></>);

  if(phase==="modesel"){
    const sc=introScoreR.current;const msg=sc>=3?"🔥 パーフェクト！最高の滑り出し！":sc>=2?"✅ 好調！勢いそのままに":sc>=1?"💪 まだいける！":sc===0&&introCntR.current>0?"😤 次は絶対に正解！":"";
    return(<><style>{CSS}</style>
    <div style={{background:"#080812",minHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px",maxWidth:430,margin:"0 auto",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF"}}>
      {introCntR.current>0&&<div style={{background:"#0F0F22",borderRadius:14,padding:"10px 16px",marginBottom:14,width:"100%",textAlign:"center",border:"1px solid #2A2A4A"}}>
        <div style={{fontSize:13,color:"#9B86BF",marginBottom:3}}>1分バトル: <span style={{fontWeight:900,color:"#FFF"}}>{sc}/3 正解</span></div>
        {msg&&<div style={{fontSize:14,fontWeight:700,color:sc>=3?"#FFD700":sc>=2?"#00E676":"#FF8A65"}}>{msg}</div>}
      </div>}
      <div style={{background:`${boss.col}18`,borderRadius:12,padding:"8px 14px",marginBottom:12,width:"100%",textAlign:"center",border:`1px solid ${boss.col}44`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <span style={{fontSize:22}}>{boss.emoji}</span>
        <div><div style={{fontSize:12,fontWeight:700,color:boss.col}}>弱点: <span style={{color:"#FFD700"}}>【{boss.weak}】</span> で×2ダメージ！</div>
        <div style={{fontSize:10,color:"#9B86BF"}}>上の科目を選んで攻略優位に立て</div></div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2,width:"100%"}}>
        {SUBJECTS.map(s=><button key={s} onClick={()=>{setSubject(s);subjectR.current=s;}} style={{background:s===boss.weak&&subject===s?"#FFD70030":subject===s?"#7B2FFF":"#12122A",border:s===boss.weak?"2px solid #FFD700":subject===s?"2px solid #B380FF":"2px solid #1E1E3E",color:s===boss.weak?"#FFD700":"#FFF",borderRadius:10,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>{s}{s===boss.weak?"⚠️":""}</button>)}
      </div>
      <div onClick={()=>{setLives(3);livesR.current=3;setComboN(0);phaseR.current="dopa";setPhase("dopa");loadNext();}}
        style={{width:"100%",background:"linear-gradient(135deg,#1A0A2E,#2A0A3E)",border:"2px solid #7B2FFF",borderRadius:22,padding:"18px 20px",marginBottom:10,cursor:"pointer",animation:"modeCardIn 0.4s ease",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:4}}>⚡</div>
        <div style={{fontSize:18,fontWeight:900,color:"#B380FF",letterSpacing:2,marginBottom:3}}>ドパモード</div>
        <div style={{fontSize:11,color:"#9B86BF",marginBottom:12,lineHeight:1.6}}>3秒で答えてボスを倒せ！ライフ3・コンボ火力UP</div>
        <div style={{background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",borderRadius:14,padding:"11px",fontSize:15,fontWeight:900,letterSpacing:3}}>今すぐバトル！ ⚡</div>
      </div>
      <div style={{position:"relative",width:"100%",marginBottom:10}}>
        <div style={{position:"absolute",top:-8,right:8,zIndex:10,background:"#FFD700",color:"#000",borderRadius:10,padding:"2px 8px",fontSize:11,fontWeight:900,animation:"pulse 1.5s infinite"}}>XP×2</div>
        <div onClick={()=>{phaseR.current="focus";setPhase("focus");}}
          style={{width:"100%",background:"linear-gradient(135deg,#061218,#091A20)",border:"2px solid #2DD4BF",borderRadius:22,padding:"18px 20px",cursor:"pointer",animation:"modeCardIn 0.5s ease",textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:4}}>🎯</div>
          <div style={{fontSize:18,fontWeight:900,color:"#2DD4BF",letterSpacing:2,marginBottom:3}}>フォーカスモード</div>
          <div style={{fontSize:11,color:"#4A7A7A",marginBottom:12,lineHeight:1.6}}>25分集中タイマー（ポモドーロ）<br/>完了でガチャ＋XP×2ボーナス解放</div>
          <div style={{background:"linear-gradient(135deg,#0D7A6E,#2DD4BF)",borderRadius:14,padding:"11px",fontSize:15,fontWeight:900,letterSpacing:3,color:"#000"}}>集中タイムへ 🎯</div>
        </div>
      </div>
      <button onClick={()=>{phaseR.current="generate";setPhase("generate");}}
        style={{width:"100%",background:"transparent",border:"1px solid #2A2A4A",borderRadius:18,padding:"12px",fontSize:14,fontWeight:700,color:"#7B2FFF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        🤖 AI問題生成 / 問題を追加
        {customQs.length>0&&<span style={{background:"#7B2FFF",color:"#FFF",borderRadius:8,padding:"1px 7px",fontSize:11}}>{customQs.length}問</span>}
      </button>
      {wrongQs.size>0&&<div style={{marginTop:8,fontSize:11,color:"#FF8A65",textAlign:"center"}}>🎯 間違えた問題 {wrongQs.size}件 → 優先出題中</div>}
    </div></>);
  }

  // ── MAIN QUIZ (intro/dopa) ──
  return(<><style>{CSS}</style>
    {flash&&<div style={{position:"fixed",inset:0,zIndex:90,pointerEvents:"none",background:flash==="crit"?"rgba(255,215,0,0.28)":flash==="ok"?"rgba(0,255,65,0.20)":"rgba(255,0,60,0.30)"}}/>}
    {ci>=3&&<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:4,background:"radial-gradient(ellipse at 50% 30%, rgba(255,215,0,0.12), transparent 65%)",animation:"overdriveFlicker 0.4s infinite"}}/>}
    {ci===2&&<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:4,background:"radial-gradient(ellipse at 50% 30%, rgba(255,61,154,0.07), transparent 65%)",animation:"pulse 2s infinite"}}/>}
    {ci>=3&&<div style={{position:"fixed",top:8,left:"50%",transform:"translateX(-50%)",zIndex:70,fontSize:10,fontWeight:900,color:"#FFD700",letterSpacing:4,animation:"rainbow 0.5s linear infinite",pointerEvents:"none"}}>⚡ OVERDRIVE ⚡</div>}
    {isFinishing&&<div style={{position:"fixed",inset:0,zIndex:5,pointerEvents:"none",background:"rgba(255,0,0,0.05)"}}/>}
    {bonus&&<div style={{position:"fixed",top:48,left:"50%",transform:"translateX(-50%)",zIndex:95,background:`linear-gradient(90deg,${bonus.c}AA,${bonus.c}44)`,border:`2px solid ${bonus.c}`,borderRadius:14,padding:"10px 20px",display:"flex",alignItems:"center",gap:10,animation:"bonusBanner 0.4s ease",whiteSpace:"nowrap",maxWidth:440,width:"calc(100% - 32px)"}}>
      <span style={{fontSize:24}}>{bonus.e}</span><span style={{fontSize:15,fontWeight:900,color:"#FFF"}}>{bonus.label}</span>
    </div>}
    {questToast&&<div style={{position:"fixed",top:bonus?96:48,left:"50%",transform:"translateX(-50%)",zIndex:96,background:"#1A1235",border:"2px solid #FFD700",borderRadius:14,padding:"10px 20px",fontSize:13,fontWeight:700,color:"#FFD700",whiteSpace:"nowrap",animation:"questPop 0.4s ease",maxWidth:440,width:"calc(100% - 32px)",textAlign:"center"}}>{questToast}</div>}
    {lvShow&&<div onClick={()=>setLvShow(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.93)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:200,animation:"lvUpIn 0.5s ease",cursor:"pointer"}}>
      <div style={{fontSize:100,marginBottom:6}}>⭐</div>
      <div style={{fontSize:52,fontWeight:900,letterSpacing:5,background:"linear-gradient(90deg,#FFD700,#FF8C00)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>LEVEL UP!</div>
      <div style={{fontSize:26,color:"#FFF",marginTop:14,fontWeight:700}}>Lv.{lvNum} — {LV_NAMES[lvNum-1]}</div>
      <div style={{marginTop:40,fontSize:13,color:"#6B5EA8",animation:"pulse 1.5s infinite"}}>タップして続ける</div>
    </div>}
    {bossDownShow&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.90)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:200,animation:"lvUpIn 0.5s ease"}}>
      <div style={{fontSize:100,marginBottom:8}}>💥</div>
      <div style={{fontSize:40,fontWeight:900,letterSpacing:3,background:"linear-gradient(90deg,#FF3D9A,#FF006E)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BOSS DEFEAT!</div>
      <div style={{fontSize:20,color:"#EEE",marginTop:12}}>{boss.name} を討伐した！</div>
    </div>}
    {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:"#100D20",border:"2px solid #7B2FFF",borderRadius:14,padding:"9px 22px",fontSize:15,fontWeight:700,zIndex:150,whiteSpace:"nowrap",animation:"slideDown 0.28s ease"}}>{toast}</div>}

    <div style={{background:containerBg,minHeight:"100svh",maxHeight:"100svh",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",overflow:"hidden",fontFamily:"system-ui,-apple-system,sans-serif",color:"#FFF",animation:ci>=3?"microVibe 0.2s infinite":aShake?"appShake 0.45s ease":"none",position:"relative",boxShadow:containerShadow,transition:"background 0.5s,box-shadow 0.5s"}}>
      {fxList.map(ef=>(
        <div key={ef.id} style={{position:"absolute",left:`${ef.x}%`,top:ef.type==="xp"?"34%":ef.type==="combo"?"7%":"20%",fontSize:ef.type==="weak"?28:ef.type==="dmg"?32:ef.type==="crit"?38:ef.type==="combo"?20:ef.type==="xp"?19:28,fontWeight:900,color:ef.type==="weak"?"#FFD700":ef.type==="dmg"||ef.type==="crit"?"#FF6B35":ef.type==="xp"?"#00F5FF":ef.type==="combo"?"#FFD700":"#FF1744",animation:"floatUp 1.5s ease forwards",pointerEvents:"none",zIndex:60,whiteSpace:"nowrap",textShadow:ef.type==="weak"||ef.type==="crit"?"0 0 20px #FFD700":"none"}}>
          {ef.txt}
        </div>
      ))}
      <div style={{background:"#0B0B1C",padding:"7px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #18183A",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{background:"linear-gradient(135deg,#7B2FFF,#FF3D9A)",borderRadius:8,padding:"3px 10px",fontSize:13,fontWeight:900}}>Lv.{lv}</div>
          <div style={{width:52,background:"#18183A",borderRadius:5,height:6,overflow:"hidden"}}><div style={{width:`${lvPct}%`,height:"100%",background:"linear-gradient(90deg,#7B2FFF,#FF3D9A)",transition:"width 1s ease"}}/></div>
        </div>
        {practiceMode?<div style={{fontSize:11,fontWeight:900,color:"#00FF41",background:"#00FF4122",borderRadius:8,padding:"3px 8px",border:"1px solid #00FF41"}}>👤 練習中∞</div>
          :<div style={{display:"flex",gap:3,alignItems:"center"}}>{[0,1,2].map(i=><span key={i} style={{fontSize:20,display:"inline-block",animation:lostHi===i?"heartLose 0.5s ease forwards":"none",opacity:i<lives?1:0.15}}>❤️</span>)}</div>}
        <div style={{textAlign:"right",minWidth:80,fontSize:combo>=10?20:combo>=5?16:combo>=3?13:11,fontWeight:900,color:ci>=3?"#FFD700":ci>=2?"#FF3D9A":ci>=1?"#FF8C00":"#1E1E3A",textShadow:ci>=3?"0 0 18px #FFD700":ci>=2?"0 0 10px #FF3D9A":"none",animation:combo>=3?"comboJump 0.3s ease":"none",transition:"color 0.2s,font-size 0.2s"}}>
          {combo>=3?`${combo}HIT ${multiTag(combo)}`:combo>0?`${combo}HIT`:""}
        </div>
      </div>
      <div style={{background:"#06060F",padding:"4px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,borderBottom:"1px solid #0E0E1E"}}>
        {phase==="intro"?<div style={{fontSize:10,fontWeight:900,color:"#7B2FFF"}}>⚡ 1分バトル {introCount}/3</div>
          :<div style={{display:"flex",gap:8,alignItems:"center"}}>
            {QUESTS.map(q=>{const p=questP[q.id];const gl=QUEST_GOALS[q.id];const d=questD[q.id];return(
              <div key={q.id} style={{display:"flex",alignItems:"center",gap:2,opacity:d?1:0.6}}>
                <span style={{fontSize:11}}>{q.icon}</span>
                <span style={{fontSize:9,fontWeight:700,color:d?"#00FF41":"#555"}}>{d?"✓":`${p}/${gl}`}</span>
              </div>
            );})}
          </div>}
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {focusBonusLeft>0&&<span style={{fontSize:9,color:"#FFD700",fontWeight:700,animation:"pulse 1s infinite"}}>🔥×2 {focusBonusLeft}問</span>}
          {wrongQs.size>0&&<span style={{fontSize:9,color:"#FF8A65"}}>🎯{wrongQs.size}問優先</span>}
          {phase==="dopa"&&<button onClick={()=>setPracticeMode(m=>!m)} style={{background:practiceMode?"#00FF4122":"transparent",border:`1px solid ${practiceMode?"#00FF41":"#1A2D3A"}`,borderRadius:6,padding:"2px 7px",fontSize:9,color:practiceMode?"#00FF41":"#4A4A7A",cursor:"pointer",fontWeight:700}}>{practiceMode?"👤練習":"⚔️バトル"}</button>}
          {phase==="dopa"&&<button onClick={()=>{phaseR.current="modesel";setPhase("modesel");}} style={{background:"transparent",border:"none",color:"#4A4A7A",fontSize:9,cursor:"pointer"}}>変更</button>}
        </div>
      </div>
      {phase==="intro"&&<div style={{width:"100%",height:3,background:"#1A1A3A",flexShrink:0}}><div style={{height:"100%",width:`${(introCount/3)*100}%`,background:"linear-gradient(90deg,#7B2FFF,#FF3D9A)",transition:"width 0.3s ease"}}/></div>}
      <div style={{background:"#08081A",padding:"7px 12px 3px",borderBottom:"1px solid #18183A",flexShrink:0,position:"relative"}}>
        {isFinishing&&<div style={{position:"absolute",top:6,right:12,fontSize:12,fontWeight:900,color:"#FF1744",animation:"finishHim 0.7s infinite",letterSpacing:2}}>⚠ FINISH HIM!</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
          <span style={{fontSize:12,fontWeight:700,color:boss.col}}>⚔️ {boss.name}</span>
          <span style={{fontSize:11,fontWeight:700,color:hpCol}}>{Math.max(0,Math.round(bossHP))}/{bMaxHP} HP</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <span style={{fontSize:9,color:"#FFD70090"}}>⚠️弱点: {boss.weak}</span>
          {isWeakSubject&&<span style={{fontSize:9,fontWeight:900,color:"#FFD700",animation:weakAnim?"weakFlash 0.5s ease":"pulse 2s infinite",background:"#FFD70022",borderRadius:4,padding:"0 4px"}}>×2ダメージ中！</span>}
        </div>
        <div style={{background:"#14143A",borderRadius:6,height:10,overflow:"hidden",marginBottom:4}}>
          <div style={{width:`${hpPct}%`,height:"100%",background:`linear-gradient(90deg,${hpCol}55,${hpCol})`,borderRadius:6,transition:"width 0.22s ease",animation:isFinishing?"hpBlink 0.5s infinite":"none"}}/>
        </div>
        <div style={{textAlign:"center",paddingBottom:2}}>
          <div style={{fontSize:94,lineHeight:1,display:"inline-block",animation:bShake?"bossHit 0.52s ease":newBoss?"newBossIn 0.6s ease":weakAnim?"weakFlash 0.4s ease":isFinishing?"finishGlow 0.8s infinite":"none",filter:!bShake&&!newBoss&&!isFinishing?`drop-shadow(0 0 ${ci>=3?30:16}px ${ci>=3?"#FFD700":boss.col})`:"none"}}>
            {boss.emoji}
          </div>
        </div>
      </div>
      <div style={{background:"#0E0E26",height:5,overflow:"hidden",flexShrink:0}}><div style={{height:"100%",width:`${tPct}%`,background:tCol,transition:"width 0.1s linear",boxShadow:`0 0 8px ${tCol}`,animation:tLeft<=effSec*10*0.2?"timerPanic 0.3s infinite":"none"}}/></div>
      <div style={{flexShrink:0,height:60,display:"flex",alignItems:"center",justifyContent:"center",background:"#060610"}}>
        <div style={{fontSize:88,fontWeight:900,lineHeight:1,color:countNum<=1?"#FF1744":countNum<=2?"#FFD740":"#00E676",animation:countAnim?"countJump 0.28s ease":countNum<=1?"pulse 0.4s infinite":"none",textShadow:`0 0 28px ${countNum<=1?"#FF1744":countNum<=2?"#FFD740":"#00E676"}`}}>
          {countNum>0?countNum:"!"}
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4px 18px 2px",background:"#06060E",position:"relative",minHeight:0}}>
        {done&&flash&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:flash==="crit"?50:40,fontWeight:900,color:flash==="miss"?"#FF1744":flash==="crit"?"#FFD700":"#00FF41",textShadow:`0 0 35px ${flash==="miss"?"#FF1744":flash==="crit"?"#FFD700":"#00FF41"}`,animation:flash==="crit"?"critBurst 0.4s ease":"none",whiteSpace:"nowrap",zIndex:20,pointerEvents:"none"}}>
          {flash==="ok"?"✓ CORRECT!":flash==="crit"?"💥 CRITICAL!!!":"✗ MISS!"}
        </div>}
        {Q.s&&<div style={{fontSize:10,fontWeight:700,letterSpacing:3,marginBottom:4,borderRadius:6,padding:"2px 10px",transition:"all 0.5s",color:Q.s===boss.weak?"#FFD700":ci>=3?"#FFD700":ci>=2?"#FF3D9A":"#7B2FFF",background:Q.s===boss.weak?"#FFD70022":ci>=3?"#FFD70018":ci>=2?"#FF3D9A18":"#7B2FFF18"}}>{Q.s}{Q.s===boss.weak?" ⚠️":""}</div>}
        {wrongQs.has(Q.q)&&<div style={{fontSize:9,color:"#FF8A65",marginBottom:3,animation:"pulse 2s infinite"}}>🔄 苦手問題</div>}
        <div style={{fontSize:Q.q.length>16?17:Q.q.length>8?22:28,fontWeight:900,color:done?"#1A1A3A":"#E8E8FF",textAlign:"center",lineHeight:1.5,transition:"color 0.12s"}}>{Q.q}</div>
      </div>
      <div style={{padding:"6px 12px 12px",background:"#05050E",display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
        {Q.opts.map((opt,i)=>{const isAns=done&&i===Q.ans;return(
          <button key={i} onClick={()=>answer(i)} disabled={done}
            onMouseDown={e=>{if(!done)e.currentTarget.style.transform="scale(0.97)translateX(3px)";}}
            onMouseUp={e=>{e.currentTarget.style.transform="";}}
            onTouchStart={e=>{if(!done)e.currentTarget.style.transform="scale(0.97)";}}
            onTouchEnd={e=>{e.currentTarget.style.transform="";}}
            style={{background:isAns?"rgba(0,255,65,0.16)":"#0F0F26",border:isAns?"2px solid #00FF41":"2px solid #1C1C3A",borderRadius:13,padding:"11px 14px",fontSize:opt.length>14?13:opt.length>8?14:16,fontWeight:700,color:isAns?"#00FF41":"#D8D8F0",cursor:done?"default":"pointer",display:"flex",alignItems:"center",gap:11,transition:"all 0.1s",flexShrink:0}}>
            <span style={{background:isAns?"#00FF41":"#1C1C3A",borderRadius:7,minWidth:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0,color:isAns?"#000":"#7B2FFF"}}>{"ABC"[i]}</span>{opt}
          </button>
        );})}
      </div>
    </div>
  </>);
}
