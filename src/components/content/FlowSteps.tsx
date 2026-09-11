const steps = [
  ['01', 'ご来店・カウンセリング', 'お疲れの場所や睡眠のこと、その日の体調を伺います。会話を控えて休みたい方も遠慮なくお知らせください。'],
  ['02', '施術', '照明を落とした静かな個室で、呼吸のリズムに合わせながら頭・首まわりをゆっくりケアします。'],
  ['03', 'お目覚め・身支度・お会計', '施術後は急かさず、温かいお茶をご用意します。鏡とブラシのある身支度スペースをご利用いただいた後、お会計となります。'],
]
export function FlowSteps() { return <ol className="flow-steps">{steps.map(([num, title, text]) => <li key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol> }
